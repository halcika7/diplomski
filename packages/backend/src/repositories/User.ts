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
}
