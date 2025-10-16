import nodemailer from "nodemailer";

// const SMTP_HOST="smtp.gmail.com"
// const SMTP_PORT=587
// const SMTP_USER="amrik.bhadra@gmail.com"
// const SMTP_PASS="dvwj reiu mbpc duky"

// const mailConfig = {
//     host: SMTP_HOST,
//     port: SMTP_PORT,
//     user: SMTP_USER,
//     pass: SMTP_PASS,
// };


const mailConfig = {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
};

if (!mailConfig.host || !mailConfig.port || !mailConfig.user || !mailConfig.pass) {
    console.error("❌ FATAL ERROR: SMTP configuration is missing in .env file.");
    process.exit(1); 
}


const transporter = nodemailer.createTransport({
    host: mailConfig.host,
    port: Number(mailConfig.port),
    secure: false,
    auth: {
        user: mailConfig.user,
        pass: mailConfig.pass,
    },
});

transporter.verify((error, success) => {
    if (error) {
        console.error("❌ Email transporter connection failed:", error);
    } else {
        console.log("✅ Email transporter is ready to send messages", success);
    }
});

export default transporter;
