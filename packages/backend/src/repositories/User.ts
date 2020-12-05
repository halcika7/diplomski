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

  createUser(data: UserInterface): UserInterface {
    return super.createModelInstance<Dictionary, UserInterface>(User, data);
  }

  async findById(id: string) {
    return User.findById(id);
  }

  async findUserToEdit(id: string) {
    return User.findById(id).select(
      'name picture email facebookLink twitterLink role phone blocked googleID'
    );
  }

  async getUserData(id: string) {
    return User.findById(id).select(
      '-_id name email facebookLink twitterLink phone picture'
    );
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
