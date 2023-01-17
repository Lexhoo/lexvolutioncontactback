const express = require('express')
const nodemailer = require('nodemailer');
const app = express()
const port = 5000

// Fonction pour envoyer le message
function sendEmail() {
    // Configuration du transporteur de mail

    return new Promise((resolve, reject) => {


        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'djlexvolution@gmail.com',
                pass: 'pznqzbmjdeefzaar'
            }
        });

        // Préparer les options de l'email
        const mail_configs = {
            from: 'myemail',
            to: 'djlexvolution@gmail.com',
            subject: `New message from Lexvolution`,
            text: "Helllo Ceci Est un test nodemailer Je t'aime bae grincheuze"
        };
        transporter.sendMail(mail_configs, function(error, info) {
            if (error) {
                return reject({ mesage: `An error has occured` })
            }
            return resolve({ message: "Email sent succesfuly" })
        })
    })
}

app.get('/', (req, res) => {

    sendEmail()
        .then(response => res.send(response.message))
        .catch(error => res.status(500).send(error.message))
})


app.listen(port, () => {
    console.log(`nodemailer is lkistening at http://localhost:${port}`)
})