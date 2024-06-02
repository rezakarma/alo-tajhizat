"use server"

import * as nodemailer from "nodemailer";
const MAIL_HOST = process.env.MAIL_HOST as string;
const MAIL_PORT = process.env.MAIL_PORT;
const MAIL_USER = process.env.MAIL_USER;
const MAIL_PASSWORD = process.env.MAIL_PASSWORD;
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${baseUrl}/auth/new-verification?token=${token}`;

  const transporter = nodemailer.createTransport({
    host: MAIL_HOST,
    port: MAIL_PORT,
    tls: true,
    auth: {
      user: MAIL_USER,
      pass: MAIL_PASSWORD,
    },
  });

  // transporter
  //   .sendMail({
  //     from: "alotajhizat <info@mail.alotajhizat.ir",
  //     to: email,
  //     subject: "Test Email Subject",
  //     html: `<p>Example HTML Message Body <a href="${confirmLink}">click here</a></p>`,
  //   },)
  //   .then(() => console.log("OK, Email has been sent."))
  //   .catch(console.error);
  try {
    const result = await transporter.sendMail({
      from: "alotajhizat <info@mail.alotajhizat.ir",
      to: email,
      subject: "ایمیل خود را تایید کنید",
      html: `<p>برای تایید ایمیل خود روی لینک زیر کلیک کنید  </br><a href="${confirmLink}">click here</a></p>`,
    });
    return result;
  } catch (error) {
    return error;
  }
};


export const sendPasswordResetEmail = async (email: string, token: string) => {
  const confirmLink = `${baseUrl}/auth/new-password?token=${token}`;

  const transporter = nodemailer.createTransport({
    host: MAIL_HOST,
    port: MAIL_PORT,
    tls: true,
    auth: {
      user: MAIL_USER,
      pass: MAIL_PASSWORD,
    },
  });
  
  try {
    const result = await transporter.sendMail({
      from: "alotajhizat <info@mail.alotajhizat.ir",
      to: email,
      subject: "ایمیل خود را تایید کنید",
      html: `<p>برای بازیابی رمزعبور خود روی لینک زیر کلیک کنید  </br><a href="${confirmLink}">click here</a></p>`,
    });
    console.log('this is result from mail',result)
    return {result};
  } catch (error) {
    console.log('this is error from mail',error)
    return {error};
  }
};
