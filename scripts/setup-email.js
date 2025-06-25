#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🎉 Welcome to S9r Technology Email Setup!');
console.log('This script will help you configure email settings for the developer hire notifications.\n');

console.log('📋 Prerequisites:');
console.log('1. Gmail account with 2-Step Verification enabled');
console.log('2. Gmail App Password generated');
console.log('3. If you haven\'t set up 2-Step Verification, please do so first.\n');

console.log('🔗 How to get Gmail App Password:');
console.log('1. Go to https://myaccount.google.com/security');
console.log('2. Enable 2-Step Verification if not already enabled');
console.log('3. Go to "App passwords" (under 2-Step Verification)');
console.log('4. Generate a new app password for "Mail"');
console.log('5. Copy the 16-character password\n');

function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer.trim());
    });
  });
}

async function setupEmail() {
  try {
    const email = await askQuestion('Enter your Gmail address: ');
    const password = await askQuestion('Enter your Gmail App Password: ');

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log('❌ Invalid email format. Please try again.');
      rl.close();
      return;
    }

    // Validate password length (Gmail app passwords are 16 characters)
    if (password.length !== 16) {
      console.log('❌ Gmail App Password should be 16 characters long. Please check your app password.');
      rl.close();
      return;
    }

    // Create .env file
    const envContent = `# Email Configuration
EMAIL_USER=${email}
EMAIL_PASS=${password}

# Server Configuration
PORT=5000
NODE_ENV=development
`;

    const envPath = path.join(__dirname, '.env');
    fs.writeFileSync(envPath, envContent);

    console.log('\n✅ Email configuration saved successfully!');
    console.log('📧 Email will be sent from:', email);
    console.log('🔒 Configuration saved to:', envPath);
    console.log('\n🚀 You can now start the server with: npm run dev');

  } catch (error) {
    console.error('❌ Error during setup:', error.message);
  } finally {
    rl.close();
  }
}

setupEmail(); 