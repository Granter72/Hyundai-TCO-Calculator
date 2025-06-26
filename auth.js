 ```javascript
    // api/auth.js
    export default function handler(req, res) {
      const username = process.env.AUTH_USERNAME; // Set these as environment variables in Vercel
      const password = process.env.AUTH_PASSWORD;

      const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
      const [user, pass] = Buffer.from(b64auth, 'base64').toString().split(':');

      if (user && pass && user === username && pass === password) {
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
    ```
