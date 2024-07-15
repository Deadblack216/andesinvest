import mongoose from 'mongoose';

const transferSchema = new mongoose.Schema({
  fromAccount: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account',
    required: true,
  },
  toAccount: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account',
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  beneficiaryName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  notificationEmail: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

const Transfer = mongoose.model('Transfer', transferSchema);
export default Transfer;
