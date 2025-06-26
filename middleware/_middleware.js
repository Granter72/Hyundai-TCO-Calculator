// middleware/_middleware.js
import { NextResponse } from 'next/server';

export async function middleware(request) {
  const allowedDomain = "@hyundai.co.za"; // The domain you want to allow
  const sharedPassword = process.env.AUTH_PASSWORD; // The shared password set in Vercel

  const authorizationHeader = request.headers.get('authorization');

  if (!authorizationHeader) {
    // No authorization header, prompt for credentials
    return new NextResponse('Authentication Required', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Restricted Area"',
      },
    });
  }

  const b64auth = authorizationHeader.split(' ')[1];
  const [userEmail, enteredPassword] = Buffer.from(b64auth, 'base64').toString().split(':');

  // Check if the userEmail ends with the allowedDomain AND the enteredPassword matches the sharedPassword
  if (userEmail && userEmail.endsWith(allowedDomain) && enteredPassword === sharedPassword) {
    // Authentication successful, allow the request to proceed
    return NextResponse.next();
  } else {
    // Authentication failed, prompt for credentials again
    return new NextResponse('Authentication Required', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Restricted Area"',
      },
    });
  }
}
