import Account from "../models/Account.js";
import User from "../models/user.model.js";

const generateAccountNumber = () => {
  return Math.random().toString().slice(2, 22);
};

export const createAccount = async (req, res) => {
  try {
    const { accountType } = req.body;
    const userId = req.user.id; // Utilizar req.user.id
    const user = await User.findById(userId);

    const newAccount = new Account({
      userId,
      accountType,
      balance: 100,
      accountNumber: generateAccountNumber(),
    });

    await newAccount.save();
    res.status(201).json(newAccount);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getAccounts = async (req, res) => {
  try {
    const userId = req.user.id; // Utilizar req.user.id
    const accounts = await Account.find({ userId }).populate(
      "userId",
      "fullName"
    );
    res.status(200).json(accounts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteAccount = async (req, res) => {
  try {
    const accountId = req.params.id;
    const userId = req.user.id; // Utilizar req.user.id
    const account = await Account.findOneAndDelete({ _id: accountId, userId });
    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }
    res.status(200).json({ message: "Account deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
