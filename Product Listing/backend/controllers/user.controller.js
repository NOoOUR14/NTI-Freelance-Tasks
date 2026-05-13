const User = require('../models/user.model');

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: users.length, data: users });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ success: false, error: 'User not found' });
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

exports.createUser = async (req, res) => {
  try {
    const userData = { ...req.body };

    // Set Professional Initials Avatar
    const userName = userData.name || 'U';
    userData.image = `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=random&color=fff&size=128`;

    if (userData.skills && typeof userData.skills === 'string') {
      userData.skills = userData.skills.split(',').map(s => s.trim());
    }

    const user = await User.create(userData);
    res.status(201).json({ success: true, data: user });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const userData = { ...req.body };
    
    // Force update image to avatar during update to clean old human images
    if (userData.name) {
      userData.image = `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name)}&background=random&color=fff&size=128`;
    }

    if (userData.skills && typeof userData.skills === 'string') {
      userData.skills = userData.skills.split(',').map(s => s.trim());
    }

    const user = await User.findByIdAndUpdate(req.params.id, userData, {
      new: true,
      runValidators: true
    });
    if (!user) return res.status(404).json({ success: false, error: 'User not found' });
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ success: false, error: 'User not found' });
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};