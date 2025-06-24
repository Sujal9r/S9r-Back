const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sendWelcomeEmail = async (email, name, role, yearOfExperience = '', specialization = '') => {
    const mailOptions = {
        from: 'support@gmail.com',
        to: email,
        subject: 'Welcome to the S9r Team',
        text: `Dear ${name},\n\nYou have been successfully added as a ${role} with ${yearOfExperience} year${yearOfExperience > 1 ? 's' : ''} of experience. ${specialization}\n\nWelcome aboard! We're excited to have you as part of the team.\n\nBest Regards,\nS9r Team`
    };
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
        return info;
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
};

module.exports = {
    sendWelcomeEmail,
    transporter
};