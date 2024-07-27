import Account from '../models/Account.js';
import Transfer from '../models/transfer.model.js';
import crypto from 'crypto';

const decrypt = (text) => {
  const decipher = crypto.createDecipher('aes-256-cbc', process.env.ENCRYPTION_KEY);
  let decrypted = decipher.update(text, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
};

export const transferFunds = async (req, res) => {
  const { fromAccountId, toAccountNumber, amount, beneficiaryName, description, notificationEmail } = req.body;

  try {
    const fromAccount = await Account.findById(fromAccountId);
    if (!fromAccount) {
      return res.status(404).json({ message: "Source account not found" });
    }

    const toAccount = await Account.findOne({ accountNumber: toAccountNumber });
    if (!toAccount) {
      return res.status(404).json({ message: "Destination account not found" });
    }

    if (fromAccount.userId.equals(toAccount.userId)) {
      // Transferencia entre cuentas propias del mismo usuario
      if (fromAccount.balance < amount) {
        return res.status(400).json({ message: "Insufficient funds" });
      }

      // Update account balances
      fromAccount.balance -= amount;
      toAccount.balance += amount;

      await fromAccount.save();
      await toAccount.save();

      // Create a new transfer record
      const newTransfer = new Transfer({
        fromAccount: fromAccount._id,
        toAccount: toAccount._id,
        amount,
        beneficiaryName,
        description,
        notificationEmail
      });

      await newTransfer.save();

      return res.status(200).json({ message: "Transfer successful", transfer: newTransfer });
    } else {
      // Transferencia entre cuentas de diferentes usuarios
      if (fromAccount.balance < amount) {
        return res.status(400).json({ message: "Insufficient funds" });
      }

      // Update account balances
      fromAccount.balance -= amount;
      toAccount.balance += amount;

      await fromAccount.save();
      await toAccount.save();

      // Create a new transfer record
      const newTransfer = new Transfer({
        fromAccount: fromAccount._id,
        toAccount: toAccount._id,
        amount,
        beneficiaryName,
        description,
        notificationEmail
      });

      await newTransfer.save();

      return res.status(200).json({ message: "Transfer successful", transfer: newTransfer });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTransfers = async (req, res) => {
  try {
    const transfers = await Transfer.find().populate('fromAccount toAccount');
    const decryptedTransfers = transfers.map((transfer) => ({
      ...transfer._doc,
      beneficiaryName: decrypt(transfer.beneficiaryName),
      description: decrypt(transfer.description),
    }));
    res.status(200).json(decryptedTransfers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
