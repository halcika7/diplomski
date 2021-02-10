import File from '@model/File';
import UserModel from '@model/User';
import { Types } from 'mongoose';

export const file = async () => {
  const user = await UserModel.findOne({ role: 'professor' });
  await new File({
    orderedBy: new Types.ObjectId(user?._id),
    name: 'some-name',
    path:
      'https://storage.googleapis.com/printshop-files/1607466284292Cheat-Sheet-Data-Volumes.pdf.gz',
  }).save();
};
