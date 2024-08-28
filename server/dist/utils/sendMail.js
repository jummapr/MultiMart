"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const ejs_1 = __importDefault(require("ejs"));
const path_1 = __importDefault(require("path"));
;
const sendMail = async (options) => {
    const transporter = nodemailer_1.default.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || "587"),
        secure: true,
        auth: {
            user: process.env.SMTP_MAIL,
            pass: process.env.SMTP_PASSWORD
        }
    });
    const { email, subject, template, data } = options;
    // get the path to the email 
    const templatePath = path_1.default.join(__dirname, `../mails/${template}`);
    // render the Email templete with Ejs
    const html = await ejs_1.default.renderFile(templatePath, data);
    const mailOption = {
        from: process.env.SMTP_MAIL,
        to: email,
        subject,
        html
    };
    await transporter.sendMail(mailOption);
};
exports.default = sendMail;
//# sourceMappingURL=sendMail.js.map