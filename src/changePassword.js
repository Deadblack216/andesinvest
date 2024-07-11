// Importar dependencias necesarias
import express from 'express';
import bcrypt from 'bcryptjs';
import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const changePasswordApp = express();
changePasswordApp.use(express.json());

const mongoClient = new MongoClient(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Ruta para cambiar la contraseña
changePasswordApp.post('/change-password', async (req, res) => {
  const { currentPassword, newPassword, userId } = req.body;

  try {
    await mongoClient.connect();
    const database = mongoClient.db('test');
    const collection = database.collection('users');
    
    // Verificar la existencia del usuario
    const user = await collection.findOne({ _id: new ObjectId(userId) });

    if (!user) {
      return res.status(404).send('Usuario no encontrado.');
    }

    // Verificar la contraseña actual
    const passwordIsValid = await bcrypt.compare(currentPassword, user.password);

    if (!passwordIsValid) {
      return res.status(400).send('La contraseña actual no es correcta.');
    }

    // Cambiar la contraseña si la contraseña actual es correcta
    const newPasswordHash = await bcrypt.hash(newPassword, 10);
    const result = await collection.updateOne(
      { _id: new ObjectId(userId) },
      { $set: { password: newPasswordHash, updatedAt: new Date() } }
    );

    if (result.matchedCount === 1) {
      res.send('Contraseña actualizada con éxito.');
    } else {
      res.status(500).send('Error al actualizar la contraseña.');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al procesar la solicitud.');
  } finally {
    await mongoClient.close();
  }
});

export default changePasswordApp;
