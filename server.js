const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'hmshomeopathic@gmail.com', // Replace with your email
        pass: 'Sh8095946814'         // Replace with your email password
    }
});

app.post('/send-email', (req, res) => {
    const { name, email, phone, date, message } = req.body;

    const mailOptions = {
        from: 'ghouse.ahamed@gmail.com',
        to: 'hmshomeopathic@gmail.com', // Replace with your preferred email to receive form data
        subject: 'New Appointment Request',
        text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nDate: ${date}\nMessage: ${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Error occurred while sending email.');
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('Thank you for booking an appointment! We will get back to you soon.');
        }
    });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
