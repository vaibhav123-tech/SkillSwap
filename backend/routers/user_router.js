// routes/userRoutes.js
const express  = require('express');
const router   = express.Router();
const mongoose = require('mongoose');
const User     = require('../model/user_model');
const AuthUser = require('../model/auth_user');

router.post('/addUser', async (req, res) => {
  const {name,email, offeredSkills, wantedSkills } = req.body;
  try {
    const user = new User({name,email,offeredSkills, wantedSkills });
    await user.save();
    res.status(201).json({ message: 'User added successfully', user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error adding user', error: err.message });
  }
});

router.get('/getAllUsers', async (_req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.status(200).json({ users });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching users', error: err.message });
  }
});

router.delete('/deleteUser/:id', async (req, res) => {
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

router.get('/matchUsers/:id', async (req, res) => {
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

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = new AuthUser({ name, email, password });
    await user.save();
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error registering user', error: err.message });
  }
});
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await AuthUser.find({ email, password });
    if (user.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    res.status(200).json({ message: 'Login successful', user });
  } catch (err) { 
    console.error(err);
    res.status(500).json({ message: 'Error logging in', error: err.message });
  }
});
router.put('/updateUser/:id', async (req, res) => {
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
