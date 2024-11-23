const adminModel = require('../model/adminModel')
const userModel = require('../model/userModel')
const loadLogin = (req, res) => {
  res.render('admin/login')
}


const login = async (req, res) => {
  try {
    const { username, password } = req.body


    const admin = await adminModel.findOne({ username })

    if (!admin) return res.render('admin/login', { errorMessage: 'Admin does not exist' })

    if (admin.password != password) return res.render('admin/login', { errorMessage: 'Incorrect Password' })
    req.session.admin = true
    req.session.successMessage = 'Login successful';
    res.redirect('/admin/dashboard')

  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).render('admin/login', { errorMessage: 'Internal Server Error' });
  }
}
const loadDashboard = async (req, res) => {
  try {
    const admin = req.session.admin;
    if (!admin) return res.redirect('/admin/login');

    const users = await userModel.find({});
    const errorMessage = req.session.errorMessage;
    const successMessage = req.session.successMessage;

    // Clear the messages from the session
    req.session.errorMessage = null;
    req.session.successMessage = null;

    res.render('admin/dashboard', { users, errorMessage, successMessage });
  } catch (error) {
    console.error('Error loading dashboard:', error);
    // req.session.errorMessage = 'Internal Server Error';
    res.redirect('/admin/login');
  }
};


const logout = (req, res) => {
  req.session.successMessage = 'Logout successful';
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send('Failed to log out');
    }
    res.redirect('/admin/login');
  });
};




const editUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    // Find the user and update their password
    const user = await userModel.findOneAndUpdate(
      { username }
      , { password }
      , { new: true });
    if (!user) {
      return res.status(404).json({ success: false, errorMessage: 'User not found' });
    }
    res.json({ success: true, successMessage: 'User details updated' });
  }
  catch (error) {
    console.error('Error updating user details:', error);
    res.status(500).json({ errorMessage: 'Internal Server Error' });
  }
};
const deleteUser = async (req, res) => {
  try {
    const { username } = req.body;
    // Find and delete the user 
    const user = await userModel.findOneAndDelete({ username });
    if (!user) {
      return res.status(404).json({ success: false, errorMessage: 'User not found' });
    }
    res.json({ success: true, successMessage: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ success: false, errorMessage: 'Internal Server Error' });
  }
};
const addUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const existingUser = await userModel.findOne({ username });
    if (existingUser) {
      return res.json({ success: false, errorMessage: 'Username already exists' });
    }

    const newUser = new userModel({ username, password });
    await newUser.save();

    res.json({ success: true, successMessage: 'User added successfully' });
  } catch (error) {
    console.error('Error adding user:', error);
    res.status(500).json({ success: false, errorMessage: 'Internal Server Error' });
  }
};






module.exports = { loadLogin, login, loadDashboard, logout, editUser, deleteUser, addUser }