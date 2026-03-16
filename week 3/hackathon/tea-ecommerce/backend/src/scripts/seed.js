const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');

dotenv.config({ path: __dirname + '/../../.env' });

const seedSuperAdmin = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/tea-ecommerce';
    await mongoose.connect(mongoUri);

    const superAdminExists = await User.findOne({ email: 'superadmin@tea.com' });
    if (superAdminExists) {
      console.log('Superadmin already exists!');
      process.exit(0);
    }

    const superAdmin = new User({
      name: 'Super Admin',
      email: 'superadmin@tea.com',
      password: 'superadmin123',
      role: 'superadmin',
    });

    await superAdmin.save();
    console.log('Superadmin seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding superadmin:', error);
    process.exit(1);
  }
};

seedSuperAdmin();
