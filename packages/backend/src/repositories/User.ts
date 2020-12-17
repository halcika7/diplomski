import User from '@model/User';
import { UserInterface } from '@model/User/User';
import { BaseRepository } from './Base';
import { Injectable } from '@decorator/class';
import {
  PersonalInfoBody,
  AnyDictionary,
  UserRole,
  BooleanStringDictionary,
} from '@job/common';

@Injectable()
export class UserRepository extends BaseRepository {
  constructor() {
    super();
  }

  createUser(data: Partial<UserInterface>): UserInterface {
    return super.createModelInstance<AnyDictionary, UserInterface>(User, data);
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

  getUsersByRole(role: UserRole | 'all') {
    const obj = role !== 'all' ? { role } : {};
    return User.find(obj).select(
      'name picture email facebookLink twitterLink role phone blocked'
    );
  }

  async update(info: BooleanStringDictionary | PersonalInfoBody, id: string) {
    return User.updateOne({ _id: id }, { ...info });
  }

  async getEmails(role: UserRole, id?: string): Promise<{ email: string }[]> {
    const match = { role, blocked: false } as BooleanStringDictionary;

    if (id) {
      match._id = id;
    }

    return User.aggregate([
      { $match: match },
      { $project: { _id: 0, email: 1 } },
    ]);
  }
}
