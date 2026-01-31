async function test() {
    try {
        console.log('Logging in...');
        const loginRes = await fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: 'admin@cosevi.com',
                password: 'password123'
            })
        });

        const loginData = await loginRes.json();
        const token = loginData.access_token;
        console.log('Login success. Token obtained.');

        console.log('Sending emergency alert...');
        const alertRes = await fetch('http://localhost:3000/emergencies', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                type: 'TEST_EMERGENCY',
                location: 'Test Location'
            })
        });

        const alertData = await alertRes.json();
        console.log('Alert response status:', alertRes.status);
        console.log('Alert response data:', alertData);
    } catch (error) {
        console.error('Error:', error.message);
    }
}

test();
