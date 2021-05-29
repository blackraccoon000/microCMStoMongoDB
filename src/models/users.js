const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Acquisitions = require('./acquisitions');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      default: 'anonymous',
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      default: 'anonymous',
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Email is invalid');
        }
      },
    },
    age: {
      type: Number,
      default: 0,
      validate(value) {
        if (value < 0) {
          throw new Error('Age must be a positive number');
        }
      },
      required: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      validate(value) {
        if (value.toLowerCase().includes('password')) {
          throw new Error('Password can not contain "Password"');
        }
      },
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.virtual('acquisitions', {
  ref: 'acquisitions',
  localField: '_id',
  foreignField: 'owner',
});

// 取得してきたデータを公開しても良い状態に可変させる。
userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;

  return userObject;
};

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  console.log('gen:', user);
  const token = jwt.sign({ _id: user._id.toString() }, process.env.VERIFY);
  console.log('gen:', token);
  user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
};

/** userSchemaにメソッドを追加 */
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await Users.findOne({ email });
  if (!user) {
    throw new Error('入力されたEmail情報は登録がありません');
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('入力されたPasswordが間違っています');
  }
  return user;
};

/** Middle ware Before Save Use */
userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

/** Middleware Before Remove Use */
userSchema.pre('remove', async function (next) {
  const user = this;
  await Acquisitions.deleteMany({ owner: user._id });
  return next();
});

const Users = mongoose.model('Users', userSchema);
module.exports = Users;
