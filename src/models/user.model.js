import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  amount: { type: Number, required: true },
  type: { type: String, enum: ["deposit", "withdrawal"], required: true },
  description: { type: String, required: true },
});

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    fullName: { type: String },
    dateOfBirth: { type: Date },
    phoneNumber: { type: String },
    accountNumber: { type: String, default: () => Math.floor(1000000000 + Math.random() * 9000000000).toString() }, // Genera un número de cuenta aleatorio
    accountType: { type: String, enum: ["checking", "savings"], default: "savings" },
    balance: { type: Number, default: 100 },
    transactionHistory: { type: [transactionSchema], default: [] }, // Historial de transacciones vacío al inicio
    lastLogin: { type: Date },
    loginAttempts: { type: Number, default: 0 },
    address: { type: String }, // Cambiado a tipo String para guardar la dirección como un solo campo
    status: { type: String, enum: ["active", "inactive"], default: "active" },
    cedula: { type: Number, required: true }, // Cambiado a tipo Number para la cédula
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);