const functions = require('firebase-functions');
const nodemailer = require('nodemailer');

const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.pass;

const mailTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: gmailEmail,
        pass: gmailPassword,
    },
});

exports.onFormCompleted = functions.database
    .ref('/youth/acampform/{personId}')
    .onCreate((snap, context) => {
        const personId = context.params.personId;
        console.log(`Sending email to ${personId}`);

        const personData = snap.val();

        const emailBody =   '<div style="margin: 0 auto;">' +
                            '   <img style="width: 100%" src="cid:bg_gmail" alt="gmail" />' +
                            '   <img style="width: 100%" src="cid:bg_gmail_2" alt="levar" />' +
                            '</div>';

        const mailOptions = {
            from: '"Temporada 2019" <temporada.sobcontrole@gmail.com>',
            to: personData.email,
            subject: 'Inscrição Temporada Sob Controle',
            attachments: [
                {
                    filename: 'bg_email.png',
                    path: __dirname + '/static/bg_gmail.png',
                    cid: 'bg_gmail'
                },
                {
                    filename: 'bg_email_2.png',
                    path: __dirname + '/static/bg_gmail_2.png',
                    cid: 'bg_gmail_2'
                }
            ],
            html: emailBody
        };

        try {
            mailTransport.sendMail(mailOptions);
            console.log(`Email sent to ${personData.email}`);
        } catch(error) {
            console.error('There was an error while sending the email:', error);
        }
        return null;
    });

