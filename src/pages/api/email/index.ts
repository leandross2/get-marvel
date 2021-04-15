import { NextApiRequest, NextApiResponse } from 'next'
import nodemailer from 'nodemailer'
import multer from 'multer'

import uploadConfig from '../../../config/upload'

import { apiMarvel, credentials } from '../../../services/apiMarvel'
import { ComicProps } from '../../../@types/apiMarvel'

interface Request extends NextApiRequest {
  body: {
    comics: ComicProps[]
  }
}
const upload = multer(uploadConfig)

export default async (request: Request, response: NextApiResponse) => {
  if (request.method !== 'POST') {
    return response.status(401)
  }
  const { comics } = request.body

  nodemailer.createTestAccount((err, account) => {
    if (err) {
      console.error('Failed to create a testing account. ' + err.message);
      return process.exit(1);
    }

    console.log('Credentials obtained, sending message...');

    // Create a SMTP transporter object
    let transporter = nodemailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
        user: account.user,
        pass: account.pass
      }
    });
    let contentMessage = ''
    comics.map(comic => {
      contentMessage += `<p>
        <img src="${comic.thumbnail.path}" />
        <b>Title: </b> ${comic.title}
      </p>`
    })

    // Message object
    let message = {
      from: 'Sender Name <eumesmo@example.com>',
      to: 'Recipient <vocemesmo@example.com>',
      subject: 'Your HQs ✔',
      text: 'Your HQs ✔',
      html: contentMessage
    };

    transporter.sendMail(message, (err, info) => {
      if (err) {
        console.log('Error occurred. ' + err.message);
        return process.exit(1);
      }

      console.log('Message sent: %s', info.messageId);
      // Preview only available when sending through an Ethereal account
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

      response.send({ sucess: true, preview: nodemailer.getTestMessageUrl(info) })
    });
  });

}
