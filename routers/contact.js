import nodemailer from 'nodemailer';
import express from 'express';

const router = express.Router();
const app = express();



    router.post("/api/contact", (req, res) => {
        console.log(req.body);
    
        async function main() {
    
            let transporter = nodemailer.createTransport({
                host: 'smtp-mail.outlook.com',                  // hostname
                service: 'outlook',                             // service name
                secureConnection: false,
                auth: {
                    user: "plowie22@live.dk", // generated ethereal user
                    pass: "djz99pqt", // generated ethereal password
                },
                tls: {
                    ciphers: "SSLv3",
                    rejectUnauthorized: false,
                },
            });
    
            // send mail with defined transport object
            let info = await transporter.sendMail({
                from: '"Thomas West 👻" <plowie22@live.dk>', // sender address
                to: `${req.body.email}`, // list of receivers
                subject: "Test", // Subject line
                text: `${req.body.message}`, // plain text body
                html: `${req.body.message}`, // html body
            });
    
            console.log("Message sent: %s", info.messageId);
    
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        }
    
        main().catch(console.error);
    
        res.send();
    });



export default router;