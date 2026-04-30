//const User = require('../models/user.model');

exports.listUsers = async (req, res) => {
  try {
    //const users = await User.find();
    const users = [{
      "_id": "64b8c9e5f1a2c8b9d6e4f123",
      "name": "John Doe",
      "email": "nabajyoti@gmail.com"
    }]
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// exports.getUser = async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }
//     res.json(user);
//   } catch (error) {
//     if (error.name === 'CastError') {
//       return res.status(400).json({ error: "Invalid user ID" });
//     }
//     res.status(500).json({ error: error.message });
//   }
// };

// exports.createUser = async (req, res) => {
//   try {
//     const { name, email, age } = req.body;
//     if (!name || !email) {
//       return res.status(400).json({ error: "Name and email are required" });
//     }

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ error: "Email already exists" });
//     }

//     const newUser = new User({ name, email, age });
//     await newUser.save();
//     res.status(201).json(newUser);
//   } catch (error) {
//     if (error.name === 'ValidationError') {
//       return res.status(400).json({ error: error.message });
//     }
//     res.status(500).json({ error: error.message });
//   }
// };

// exports.updateUser = async (req, res) => {
//   try {
//     const { name, email, age } = req.body;
//     if (!name && !email && age === undefined) {
//       return res.status(400).json({ error: "At least one field must be provided for update" });
//     }

//     const updateData = {};
//     if (name) updateData.name = name;
//     if (email) updateData.email = email;
//     if (age !== undefined) updateData.age = age;

//     const user = await User.findByIdAndUpdate(
//       req.params.id,
//       updateData,
//       { new: true, runValidators: true }
//     );

//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     res.json(user);
//   } catch (error) {
//     if (error.name === 'CastError') {
//       return res.status(400).json({ error: "Invalid user ID" });
//     }
//     if (error.name === 'ValidationError') {
//       return res.status(400).json({ error: error.message });
//     }
//     res.status(500).json({ error: error.message });
//   }
// };

// exports.deleteUser = async (req, res) => {
//   try {
//     const user = await User.findByIdAndDelete(req.params.id);
//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }
//     res.json({ message: "User deleted successfully", user });
//   } catch (error) {
//     if (error.name === 'CastError') {
//       return res.status(400).json({ error: "Invalid user ID" });
//     }
//     res.status(500).json({ error: error.message });
//   }
// };