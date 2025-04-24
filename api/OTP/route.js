import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export async function GET() {
    const data = {
        message: 'Hello from the OTP API',
    }
    return Response.json({ data })
}
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
         user: "youGmail@gmail.com",
        pass: "you gmail Pass Key"
    }
});

export async function POST(req) {
    try {
        const { email, otp } = await req.json();

        console.log('Received OTP Request:', { email, otp });

        if (!email || !otp) {
            return NextResponse.json({ error: 'Email and OTP are required' }, { status: 400 });
        }

        const mailOptions = {
            from: "toss125training@gmail.com",
            to: email,
            subject: 'Your OTP Code',
            text: `Dear Candidate,

You have successfully generated an OTP for you Parpas.
Your OTP is valid for 15 minutes.
Do not share this OTP with anyone to avoid misuse of your account.

Your OTP: ${otp}

If you did not request this, please contact the support team immediately.

Thank you, 
our Team.`,
        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json({ message: 'OTP sent successfully' }, { status: 200 });

    } catch (error) {
        console.error('OTP Send Error:', error);
        return NextResponse.json({ error: error.message || 'Failed to send OTP' }, { status: 500 });
    }
}