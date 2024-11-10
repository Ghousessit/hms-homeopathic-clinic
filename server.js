const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/send-email', (req, res) => {
    const { name, email, phone, date, message } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',  // Replace with your email provider
        auth: {
            user: 'your-email@gmail.com',  // Replace with your email
            pass: 'your-password'          // Replace with your email password
        }
    });

    const mailOptions = {
        from: email,
        to: 'hmshomeopathic@gmail.com',  // Your clinic's email
        subject: 'New Appointment Request',
        text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nPreferred Date: ${date}\nMessage: ${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.send('Error occurred while sending email.');
        } else {
            console.log('Email sent: ' + info.response);
            res.send('Thank you for booking an appointment! We will get back to you soon.');
        }
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
