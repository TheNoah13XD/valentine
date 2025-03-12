import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
    const body = await req.json();
    const { to, text } = body;

    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.NEXT_PUBLIC_MAILER_EMAIL,
            pass: process.env.NEXT_PUBLIC_MAILER_PASSWORD,
        },
    });

    const defaultRecipients = 'broken.personal.1211@gmail.com, nidhikulkarni4276@gmail.com';
    const recipients = to ? to : defaultRecipients;

    const mailOptions = {
        from: process.env.NEXT_PUBLIC_MAILER_EMAIL,
        to: recipients,
        subject: 'your dumbass cant crack a password.',
        text: text || body
    };

    try {
        await transporter.sendMail(mailOptions);
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json({ success: false });
    }
}