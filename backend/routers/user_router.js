const express  = require('express');
const router   = express.Router();
const mongoose = require('mongoose');
const jwt      = require('jsonwebtoken');
const bcrypt   = require('bcryptjs');
const User     = require('../model/user_model');
const AuthUser = require('../model/auth_user');
const auth     = require('../middleware/auth');

const JWT_SECRET = '1234'; // Replace with environment variable in production

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existing = await AuthUser.findOne({ email });
    if (existing) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new AuthUser({ name, email, password: hashedPassword });
    await user.save();

    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '1d' });
    res.status(201).json({ message: 'User registered successfully', user, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error registering user', error: err.message });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await AuthUser.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid email or password' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid email or password' });

    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '1d' });
    res.status(200).json({ message: 'Login successful', user, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error logging in', error: err.message });
  }
});

router.post('/addUser', auth, async (req, res) => {
  const { name, email, offeredSkills, wantedSkills } = req.body;
  try {
    const user = new User({ name, email, offeredSkills, wantedSkills });
    await user.save();
    res.status(201).json({ message: 'User added successfully', user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error adding user', error: err.message });
  }
});

router.get('/getAllUsers', auth, async (_req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.status(200).json({ users });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching users', error: err.message });
  }
});

router.delete('/deleteUser/:id', auth, async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting user', error: err.message });
  }
});

router.get('/matchUsers/:id', auth, async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid user ID' });
  }
  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const matchedUsers = await User.find({
      _id: { $ne: id },
      offeredSkills: { $in: user.wantedSkills },
      wantedSkills:  { $in: user.offeredSkills },
    });

    res.status(200).json({ matchedUsers });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching matched users', error: err.message });
  }
});

router.put('/updateUser/:id', auth, async (req, res) => {
  const { id } = req.params;
  const { name, email, offeredSkills, wantedSkills } = req.body;
  try {
    const user = await User.findByIdAndUpdate(id, { name, email, offeredSkills, wantedSkills }, { new: true });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ message: 'User updated successfully', user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating user', error: err.message });
  }
});

module.exports = router;
