const express = require("express");
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const app = express();
const cors = require('cors');
app.use(cors({
    origin: 'http://localhost:4200'
}));
app.use(cors({
    methods: ['POST']
}));
// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const route = express.Router();

const port = process.env.PORT || 5000;

app.use('/v1', route);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});


const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
        user: 'djlexvolution@gmail.com',
        pass: 'pznqzbmjdeefzaar',
    },
    secure: true, // upgrades later with STARTTLS -- change this based on the PORT
});

route.post('/text-mail', cors(), (req, res) => {
    const { from, nom, email, text } = req.body;
    console.log("from ", from);
    console.log("nom ", nom);
    console.log("text ", text);
    const mailData = {
        from: 'djlexvolution@gmail.com',
        to: 'djlexvolution@gmail.com',
        subject: 'Mail Ateliers cosmétiques',
        text: text,
        html: '<b>Hey there! </b><br>' + text + '<br/>',
    };

    transporter.sendMail(mailData, (error, info) => {
        if (error) {
            return console.log(error);
        }
        res.status(200).send({ message: "Mail send", message_id: info.messageId });
    });
});



route.post('/attachments-mail', (req, res) => {
    const { to, subject, text } = req.body;
    const mailData = {
        from: 'talcosmetiques@gmail.com',
        to: to,
        subject: subject,
        text: text,
        html: '<b>Hey there! </b><br> This is our first message sent with Nodemailer<br/>',
        attachments: [{ // file on disk as an attachment
                filename: 'nodemailer.png',
                path: 'nodemailer.png'
            },
            { // file on disk as an attachment
                filename: 'text_file.txt',
                path: 'text_file.txt'
            }
        ]
    };

    transporter.sendMail(mailData, (error, info) => {
        if (error) {
            return console.log(error);
        }
        res.status(200).send({ message: "Mail send", message_id: info.messageId });
    });
});