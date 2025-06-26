import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const generateSharingCode = () => {
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  return code;
};

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email',
      ],
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
      minlength: [6, 'Password must be at least 6 characters'],
    },
    sharingCode: {
      type: String,
      unique: true,
      default: generateSharingCode,
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Regenerate sharing code
userSchema.methods.regenerateSharingCode = function () {
  this.sharingCode = generateSharingCode();
  return this.sharingCode;
};

const User = mongoose.model('User', userSchema);

export default User;