// /src/controllers/transfer.controller.js
import Account from '../models/Account.js';
import Transfer from '../models/transfer.model.js';

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

    res.status(200).json({ message: "Transfer successful", transfer: newTransfer });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTransfers = async (req, res) => {
  try {
    const transfers = await Transfer.find().populate('fromAccount toAccount');
    res.status(200).json(transfers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
