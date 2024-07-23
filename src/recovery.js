import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import SibApiV3Sdk from 'sib-api-v3-sdk';

dotenv.config();

const recoveryApp = express();

recoveryApp.use(bodyParser.json());
recoveryApp.use(cors());

const mongoClient = new MongoClient(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

let verificationCodes = {};

// Configuración de Brevo (Sendinblue)
const defaultClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.BREVO_API_KEY;

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

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

      const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
      sendSmtpEmail.sender = { name: 'AndesInvest Support', email: 'noreply.andesinvest@gmail.com' };
      sendSmtpEmail.to = [{ email: email }];
      sendSmtpEmail.subject = 'Código de verificación';
      sendSmtpEmail.htmlContent = `<p>Tu código de verificación es: <b>${code}</b></p>`;

      apiInstance.sendTransacEmail(sendSmtpEmail).then((data) => {
        console.log('API called successfully. Returned data: ' + data);
        res.send('Correo enviado');
      }, (error) => {
        console.error(error);
        res.status(500).send('Error al enviar el correo');
      });
    } else {
      res.status(404).send('Correo no encontrado');
    }
  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).send('Error al procesar la solicitud');
  } finally {
    await mongoClient.close();
  }
});

// Nueva ruta para verificar el código
recoveryApp.post('/verify-code', async (req, res) => {
  const { email, code } = req.body;

  const verificationData = verificationCodes[email];

  if (!verificationData || verificationData.code !== code || verificationData.expiration < new Date()) {
    return res.status(400).send('Código de verificación incorrecto o expirado');
  }

  res.send('Código verificado con éxito');
});

// Nueva ruta para cambiar la contraseña
recoveryApp.post('/reset-password', async (req, res) => {
  const { email, newPassword } = req.body;

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
    console.error('Error processing request:', error);
    res.status(500).send('Error al procesar la solicitud');
  } finally {
    await mongoClient.close();
  }

  delete verificationCodes[email];
});

export default recoveryApp;
