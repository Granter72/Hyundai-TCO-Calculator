// api/auth.js
export default function handler(req, res) {
  const allowedDomain = "@hyundai.co.za"; // The domain you want to allow
  const sharedPassword = process.env.AUTH_PASSWORD; // The shared password set in Vercel

  const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
  const [userEmail, enteredPassword] = Buffer.from(b64auth, 'base64').toString().split(':');

  // Check if the userEmail ends with the allowedDomain AND the enteredPassword matches the sharedPassword
  if (userEmail && userEmail.endsWith(allowedDomain) && enteredPassword === sharedPassword) {
    // Authentication successful, redirect to the main page
    res.writeHead(302, { Location: '/' });
    res.end();
  } else {
    // Authentication failed, prompt for credentials
    res.writeHead(401, {
      'WWW-Authenticate': 'Basic realm="Restricted Area"',
      'Content-Type': 'text/html',
    });
    res.end('<h1>Authentication Required</h1>');
  }
}
