import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const getUserDataApp = express();
getUserDataApp.use(express.json());

const mongoClient = new MongoClient(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

getUserDataApp.get('/api/get-user-data/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    await mongoClient.connect();
    const database = mongoClient.db('test');
    const collection = database.collection('users');
    
    const user = await collection.findOne({ _id: new ObjectId(userId) });

    if (!user) {
      return res.status(404).send('Usuario no encontrado.');
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener los datos del usuario.');
  } finally {
    await mongoClient.close();
  }
});

getUserDataApp.put('/api/update-user-data/:userId', async (req, res) => {
  const { userId } = req.params;
  const { phoneNumber, address } = req.body;

  try {
    await mongoClient.connect();
    const database = mongoClient.db('test');
    const collection = database.collection('users');
    
    const result = await collection.updateOne(
      { _id: new ObjectId(userId) },
      { $set: { phoneNumber, address, modifiedAt: new Date() } }
    );

    if (result.matchedCount === 1) {
      res.status(200).json({ message: 'Información actualizada con éxito.' });
    } else {
      res.status(500).send('Error al actualizar la información.');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al procesar la solicitud.');
  } finally {
    await mongoClient.close();
  }
});

export default getUserDataApp;
