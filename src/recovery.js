import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import postmark from 'postmark';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

dotenv.config();

const recoveryApp = express();

recoveryApp.use(bodyParser.json());
recoveryApp.use(cors());

const client = new postmark.ServerClient(process.env.POSTMARK_API_KEY);

const mongoClient = new MongoClient(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

let verificationCodes = {};

// Ruta para "olvidé mi contraseña"
recoveryApp.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  try {
    await mongoClient.connect();
    const database = mongoClient.db('test');
    const collection = database.collection('users');
    const user = await collection.findOne({ email });

    if (user) {
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      const expiration = new Date(Date.now() + 3600000);

      verificationCodes[email] = { code, expiration };

      await client.sendEmail({
        From: 'andres.zambrano03@epn.edu.ec',
        To: email,
        Subject: 'Código de verificación',
        TextBody: `Tu código de verificación es: ${code}`,
        HtmlBody: `<p>Tu código de verificación es: <b>${code}</b></p>`
      });
      res.send('Correo enviado');
    } else {
      res.status(404).send('Correo no encontrado');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al procesar la solicitud');
  } finally {
    await mongoClient.close();
  }
});

// Ruta para verificar el código y cambiar la contraseña
recoveryApp.post('/verify-code', async (req, res) => {
  const { email, code, newPassword } = req.body;

  const verificationData = verificationCodes[email];

  if (!verificationData || verificationData.code !== code || verificationData.expiration < new Date()) {
    return res.status(400).send('Código de verificación incorrecto o expirado');
  }

  try {
    // Hashing the new password
    const passwordHash = await bcrypt.hash(newPassword, 10);

    await mongoClient.connect();
    const database = mongoClient.db('test');
    const collection = database.collection('users');
    const result = await collection.updateOne(
      { email },
      { $set: { password: passwordHash, updatedAt: new Date() } }
    );

    if (result.matchedCount === 1) {
      res.send('Contraseña cambiada con éxito');
    } else {
      res.status(404).send('Usuario no encontrado');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al procesar la solicitud');
  } finally {
    await mongoClient.close();
  }

  delete verificationCodes[email];
});

export default recoveryApp;
