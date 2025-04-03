import axios from 'axios';
// Generate a random CAPTCHA string
function generateCaptcha() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let captcha = '';
    for (let i = 0; i < 6; i++) {
        captcha += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return captcha;
}

// Initialize CAPTCHA
let currentCaptcha = generateCaptcha();
document.getElementById('captchaText').textContent = currentCaptcha;

// Refresh CAPTCHA when the refresh button is clicked
document.getElementById('refreshCaptcha').addEventListener('click', () => {
    currentCaptcha = generateCaptcha();
    document.getElementById('captchaText').textContent = currentCaptcha;
});

// Handle form submission
document.getElementById('loginForm').addEventListener('submit', (e) => {
    // e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const captchaInput = document.getElementById('captchaInput').value;

    // Validate CAPTCHA
    if (captchaInput !== currentCaptcha) {
        
        // currentCaptcha = generateCaptcha();
        // document.getElementById('captchaText').textContent = currentCaptcha;
        // document.getElementById('captchaInput').value = '';
        return;
    }
    //chatgpt
    

async function sendData() {
    try {
        const response = await axios.post('/api/data', {
            username: 'johndoe',
            email: 'john@example.com'
        });
        console.log(response.data);
    } catch (error) {
        console.error('Error sending data:', error);
    }
}
sendData();

    // Here you would typically send the data to a server
    console.log('Login attempt:', { email, password });
    // alert('Login successful!');
    
    // Reset form and generate new CAPTCHA
    // e.target.reset();
    // currentCaptcha = generateCaptcha();
    // document.getElementById('captchaText').textContent = currentCaptcha;

});