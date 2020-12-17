import sgMail from '@sendgrid/mail';
import { Configuration } from '@env';
import pug from 'pug';
import { join } from 'path';
import { Injectable } from '@decorator/class';
import { OrderType, OrderFor } from '@job/common';

const { sendgrid, url: URL } = Configuration.appConfig;

sgMail.setApiKey(sendgrid);

interface Email {
  emails: string[];
  orderId: string;
  type: OrderType | OrderFor;
  rejected?: string;
}

@Injectable()
export class EmailService {
  async sendEmail({ emails, orderId, type, rejected }: Email) {
    const filePath = join(__dirname, `../public/emails/html.pug`);

    let subject = `Your Order with ID - ${orderId}`;
    let text = 'Your Order is finished, please visit our shop!!';

    if (type === 'Personal') {
      subject = `New Order received with ID - ${orderId}`;
      text = 'New Order pending. Please finish it as soon as possible !';
    } else if (type === 'University') {
      subject = `Please approve Order with ID - ${orderId}`;
      text =
        'New Order received for University purposes. Please approve it as soon as possible!!';
    } else if (type === 'approved') {
      subject = `New Order received with ID - ${orderId}`;
      text = 'New Order pending. Please finish it as soon as possible !';
    } else if (type === 'rejected') {
      const byShop = rejected === 'worker';
      subject = `Order rejected with ID - ${orderId}`;
      text = `Order was rejected by ${byShop ? 'Shop' : 'Administration'} !`;
    }

    const msg = {
      to: emails,
      from: 'test@example.com',
      subject,
      html: pug.renderFile(filePath, { orderId, URL, text }),
    };

    return sgMail.send(msg);
  }
}
