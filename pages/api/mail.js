export default function handler(req, res) {
  require("dotenv").config();

  let nodemailer = require("nodemailer");
  const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
      user: "egriboz.mail@gmail.com",
      pass: process.env.password,
    },
    secure: true,
  });

  const mailData = {
    from: "egriboz.mail@gmail.com",
    to: "egriboz@gmail.com",
    subject: `[Web Contact Form] Message From ${req.body.name}`,
    text: req.body.message + " | Sent from: " + req.body.email,
    html: `<div style="border:1px solid #eceff1;padding: 30px;"><h1>Contact Form with Next.js and Nodemailer</h1><p>${req.body.message}</p><p style="padding: 30px 0 0 0;margin: 30px 0 0 0;border-top: 1px solid #eceff1;">Sent from: ${req.body.email}</p><p style="padding:30px 0 0 0;margin:30px 0 0 0;border-top:1px solid #eceff1"><img src="https://egriboz.com/raven.gif"></p></div>`,
  };

  transporter.sendMail(mailData, function (err, info) {
    if (err) console.log(err);
    else console.log(info);
  });

  console.log(req.body);
  res.send("success");
}
