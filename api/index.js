import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";

import authRoute from './routes/auth.route.js';

import feedbackRoute from './routes/feedback.route.js';


dotenv.config();

const app = express();

app.use(cookieParser());
app.use(express.json());

// Connect to MongoDB

mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log('Connected to MongoDB!');
    }
).catch(err => {
    console.error('Error connecting to mongoDB', err);
    }
);

// Set the __dirname to the current working directory



// Start the server

app.listen(3000, () => {
    console.log('Server is running on port 3000!');
    }
);

// Routes


app.use('/api/auth', authRoute);

app.use('/api/feedback', feedbackRoute);




app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
})

app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message || 'Internal Server Error';
    return res.status(status).json({
        success: false,
        status,
        message,
    });
});
