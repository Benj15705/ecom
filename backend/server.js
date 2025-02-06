const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
require('dotenv').config(); // Load environment variables

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const PORT = process.env.PORT || 5500;
const JWT_SECRET = process.env.c5d3c85bc17329ecd20a7f133d59f73e80c690f796bcaabf690d9d41272d9f49; // Use the JWT secret from environment variables

app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:5500', // Replace with your frontend URL
    credentials: true,
}));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
});

// Define User schema and model
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: ['user', 'seller', 'owner'] },
});

const User = mongoose.model('User', userSchema);

// Define Product schema and model
const productSchema = new mongoose.Schema({
    seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    inventory: { type: Number, required: true },
    imageUrl: { type: String, required: true },
});

const Product = mongoose.model('Product', productSchema);

// Define Chat schema and model
const chatSchema = new mongoose.Schema({
    sender: { type: String, required: true },
    receiver: { type: String, required: true },
    message: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
});

const Chat = mongoose.model('Chat', chatSchema);

// Create the owner account if it doesn't exist
async function createOwnerAccount() {
    const owner = await User.findOne({ username: 'Owner' });
    if (!owner) {
        const hashedPassword = await bcrypt.hash('OwnerAccess', 10);
        const newOwner = new User({ username: 'Owner', password: hashedPassword, role: 'owner' });
        await newOwner.save();
        console.log('Owner account created');
    }
}

createOwnerAccount();

// Signup route
app.post('/signup', async (req, res) => {
    const { username, password, role } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword, role });
        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(400).json({ error: 'Username already exists' });
    }
});

// Login route
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ error: 'Invalid username or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid username or password' });
        }

        const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, role: user.role });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Owner overview route
app.post('/owner-overview', async (req, res) => {
    const { password } = req.body;

    try {
        const owner = await User.findOne({ role: 'owner' });
        if (!owner) {
            return res.status(400).json({ error: 'Owner not found' });
        }

        const isMatch = await bcrypt.compare(password, owner.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid password' });
        }

        // Fetch overview data
        const overviewData = {
            totalUsers: await User.countDocuments({ role: 'user' }),
            totalSellers: await User.countDocuments({ role: 'seller' }),
            totalProducts: await Product.countDocuments(),
            totalOrders: 200, // Replace with real order count
        };

        res.json(overviewData);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Get chat history route
app.get('/chat/:sender/:receiver', async (req, res) => {
    const { sender, receiver } = req.params;

    try {
        const chatHistory = await Chat.find({
            $or: [
                { sender, receiver },
                { sender: receiver, receiver: sender },
            ],
        }).sort({ timestamp: 1 });

        res.json(chatHistory);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Add product route
app.post('/products', async (req, res) => {
    const { token, name, price, description, inventory, imageUrl } = req.body;

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const seller = await User.findById(decoded.userId);
        if (!seller || seller.role !== 'seller') {
            return res.status(403).json({ error: 'Unauthorized' });
        }

        const newProduct = new Product({
            seller: seller._id,
            name,
            price,
            description,
            inventory,
            imageUrl,
        });
        await newProduct.save();
        res.status(201).json({ message: 'Product added successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Get products route
app.get('/products', async (req, res) => {
    try {
        const products = await Product.find().populate('seller', 'username');
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Socket.IO connection
io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('join', ({ username }) => {
        socket.join(username);
        console.log(`${username} joined the chat`);
    });

    socket.on('sendMessage', async ({ sender, receiver, message }) => {
        const chatMessage = new Chat({ sender, receiver, message });
        await chatMessage.save();

        io.to(receiver).emit('receiveMessage', { sender, message, timestamp: chatMessage.timestamp });
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

// Start the server
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});