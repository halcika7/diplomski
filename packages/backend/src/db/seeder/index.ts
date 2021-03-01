import 'reflect-metadata';
import Order from '@model/Order';
import Cart from '@model/Cart';
import User from '@model/User';
import { Types } from 'mongoose';
import { CartDocument } from '@model/Cart/Cart';
import { connect } from '../db-connect';
import { Configuration } from '@env';

const fn = async () => {
  try {
    const url = Configuration.appConfig.db.MONGO_URL;
    await connect(url);

    const user = await User.findOne({ role: 'professor' });
    const userId = new Types.ObjectId(user?._id);

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({
        userId,
        documents: [],
        totalCost: 0,
      });

      await cart.save();
    }

    const doc = {
      path:
        'https://printshop-files.storage.googleapis.com/1614616867775halc.pdf.gz',
      pages: 2,
      copies: 1,
      price: 1.6,
      print: 'Color',
      paper: 'A1',
      binding: '',
      name: 'halc.pdf',
    };

    cart!.documents.push(doc as CartDocument);
    cart!.totalCost = 1.87;

    await cart.save();

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const day = currentDate.getDay();

    const orders = [];

    const validStatus = ['completed', 'rejected', 'finished'];
    const orderedFor = ['Personal', 'University'];
    const min = 1.5;
    const max = 45.6;

    loop: for (let y = 2019; y <= year; y += 1) {
      for (let m = 0; m <= 11; m += 1) {
        const currentMonthDays = new Date(y, m, 0).getDate();
        for (let d = 1; d <= currentMonthDays; d += 1) {
          if (y === year && m === month && d > day) break loop;
          const date = new Date(y, m, d, 15, 54);

          const randomNumberOfOrdersForDay = Math.floor(Math.random() * 3);

          for (let o = 0; o < randomNumberOfOrdersForDay; o += 1) {
            const total = Math.random() * (max - min) + min;
            const totalCost = Number(
              `${Math.round(total + (('e+2' as unknown) as number))}e-2`
            );
            const index = Math.floor(Math.random() * 3);
            const indexOrder = Math.floor(Math.random() * 2);
            const order = new Order({
              documents: cart.documents,
              totalCost,
              orderedBy: userId,
              orderedFor: orderedFor[indexOrder],
              status: validStatus[index],
              createdAt: date,
              updatedAt: date,
            });
            orders.push(order.save());
          }
        }
      }
    }

    await Promise.all(orders);

    setTimeout(() => {
      process.exit();
    }, 2000);
  } catch (error) {
    console.log('🚀 ~ file: index.ts ~ line 99 ~ fn ~ error', error);
    setTimeout(() => {
      process.exit();
    }, 2000);
  }
};

fn();
