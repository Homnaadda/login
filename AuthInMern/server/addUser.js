require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    userType: { type: String, required: true, enum: ['admin', 'police', 'forensic'] }
});

const User = mongoose.model("user", userSchema);

const users = [
    {
        firstName: "Admin",
        lastName: "User",
        email: "admin@example.com",
        password: "Admin123!",
        userType: "admin"
    },
    {
        firstName: "Police",
        lastName: "Officer",
        email: "police@example.com",
        password: "Police123!",
        userType: "police"
    },
    {
        firstName: "Forensic",
        lastName: "Analyst",
        email: "forensic@example.com",
        password: "Forensic123!",
        userType: "forensic"
    }
];

async function connectToDatabase() {
    try {
        await mongoose.connect(process.env.DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB successfully');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
}

async function addUsers() {
    await connectToDatabase();

    for (let user of users) {
        try {
            const salt = await bcrypt.genSalt(Number(process.env.SALT));
            const hashedPassword = await bcrypt.hash(user.password, salt);

            const newUser = new User({
                ...user,
                password: hashedPassword
            });

            await newUser.save();
            console.log(`User ${user.email} added successfully.`);
        } catch (error) {
            console.error(`Error adding user ${user.email}:`, error.message);
        }
    }

    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
}

addUsers().catch(console.error);