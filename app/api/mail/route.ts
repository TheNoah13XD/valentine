import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
    const body = await req.json();
  
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.NEXT_PUBLIC_MAILER_EMAIL,
            pass: process.env.NEXT_PUBLIC_MAILER_PASSWORD,
        },
    });
  
    const mailOptions = {
        from: process.env.NEXT_PUBLIC_MAILER_EMAIL,
        to: 'broken.contact.1211@gmail.com',
        subject: 'your dumbass cant crack a password.',
        text: body
    };
  
    try {
        await transporter.sendMail(mailOptions);
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json({ success: false });
    }
  }