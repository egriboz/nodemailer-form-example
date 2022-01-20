const nodemailer = require("nodemailer");
require("dotenv").config();

// export default async function (req, res) {
const Run = async (req, res) => {
  const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
      user: "egriboz.mail@gmail.com",
      pass: process.env.password,
    },
    secure: true,
  });
  await new Promise((resolve, reject) => {
    // verify connection configuration
    transporter.verify(function (error, success) {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        console.log("Server is ready to take our messages");
        resolve(success);
      }
    });
  });
  const mailData = {
    // from: "egriboz.mail@gmail.com",
    from: {
      name: `${req.body.name}`,
      address: "egriboz.mail@gmail.com",
    },
    to: "egriboz@gmail.com",
    subject: `[Web Contact Form] Message From ${req.body.name}`,
    text: req.body.message + " | Sent from: " + req.body.email,
    html: `<div style="border:1px solid #eceff1;padding: 30px;"><h1>Contact Form with Next.js and Nodemailer</h1><p>${req.body.message}</p><p style="padding: 30px 0 0 0;margin: 30px 0 0 0;border-top: 1px solid #eceff1;">Sent from: ${req.body.email}</p><p style="padding:30px 0 0 0;margin:30px 0 0 0;border-top:1px solid #eceff1"><img src="https://egriboz.com/raven.gif"></p></div>`,
  };

  // await new Promise((resolve, reject) => {
  //   // send mail
  //   transporter.sendMail(mailData, (err, info) => {
  //     if (err) {
  //       console.error("err", err);
  //       reject(err);
  //     } else {
  //       console.log("info", info);
  //       resolve(info);
  //     }
  //   });
  // });

  transporter.sendMail(mailData, function (err, info) {
    if (err) console.log(err);
    else console.log(info);
  });

  console.log("body:", req.body);
  res.send("success");
  res.status(200).json({ status: "OK" });
};

export default Run;
