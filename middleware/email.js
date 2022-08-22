const nodemailer = require("nodemailer");
const ejs = require("ejs");

let transport = nodemailer.createTransport({
  port: process.env.SMTP_PORT,
  host: process.env.SMTP_HOST,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

transport.verify(function (err) {
  if (err) {
    throw new Error("Invalid email configuration!");
  }
});

const sendEmail = async (template, vars, mailOptions) => {
  ejs.renderFile(
    `${process.cwd()}/middleware/emails/${template}.ejs`,
    vars,
    async function (err, data) {
      if (err) {
        throw new Error(err);
      }
      
      mailOptions = {
        from: `"Hoopla" <no-reply@${process.env.WEBSITE_DOMAIN}>`,
        html: data,
        ...mailOptions,
      };
      await transport.sendMail(mailOptions, function (err, info) {
        if (err) {
          return [false, err];
        }
        return [true, info];
      });
    },
  );
};

export default sendEmail;