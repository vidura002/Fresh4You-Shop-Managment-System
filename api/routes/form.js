// routes/form.js

const express = require('express');
const router = express.Router();
const Form = require('../models/Form'); // Assuming you have a Form model

router.post('/submit', async (req, res) => {
  try {
    const formData = req.body; // Assuming form data is sent in the request body
    const newForm = new Form(formData);
    await newForm.save(); // Save the form data to your database or perform any other necessary actions
    res.status(201).json({ message: 'Form submitted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
