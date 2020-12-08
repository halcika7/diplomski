import User from '@model/User';
import { UserInterface } from '@model/User/User';
import { BaseRepository } from './Base';
import { Injectable } from '@decorator/class';
import { Dictionary } from '../utils/genericTypes';

@Injectable()
export class UserRepository extends BaseRepository {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
  }

  createUser(data: Partial<UserInterface>): UserInterface {
    return super.createModelInstance<Dictionary, UserInterface>(User, data);
  }

  findById(id: string) {
    return User.findById(id);
  }

  findUserToEdit(id: string) {
    return this.findById(id).select(
      'name picture email facebookLink twitterLink role phone blocked googleID'
    );
  }

  getUserData(id: string) {
    return this.findById(id).select(
      '-_id name email facebookLink twitterLink phone picture'
    );
  }

  getByEmail(email: string) {
    return User.findOne({ email });
  }

  getUsersByRole(role: string) {
    const obj = role !== 'all' ? { role } : {};
    return User.find(obj).select(
      'name picture email facebookLink twitterLink role phone blocked'
    );
  }

  async update(info: any, id: string) {
    return User.updateOne({ _id: id }, { ...info });
  }

  async getEmails(role: string, id?: string) {
    const match = { role, blocked: false } as Record<string, boolean | string>;

    if (id) {
      match._id = id;
    }

    return User.aggregate([
      { $match: match },
      { $project: { _id: 0, email: 1 } },
    ]);
  }
}
