import { UserRepository } from '@repository/User';
import { CloudinaryService } from '@service/Cloudinary';
import { Injectable } from '@decorator/class';
import { BaseService } from './Base';
import { UserInterface } from '@model/User/User';
import {
  isEmpty,
  AddUserBody,
  PersonalInfoBody,
  UserRole,
  HTTPCodes,
} from '@job/common';
import { LoggerFactory } from '@logger';

const facebookRegex = new RegExp('http(?:s)://(?:www.)facebook.com/');
const twitterRegex = new RegExp('http(?:s)://twitter.com/');
const phoneRegex = new RegExp(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\\./0-9]*$/);

@Injectable()
export class UserService extends BaseService {
  private readonly logger = LoggerFactory.getLogger('UserService');

  constructor(
    private readonly cloudinaryService: CloudinaryService,
    private readonly userRepository: UserRepository
  ) {
    super();
  }

  async getUserData(id: string) {
    return this.userRepository.getUserData(id);
  }

  private validatePhoto(file: Express.Multer.File) {
    let error;
    try {
      if (
        file.mimetype !== 'image/png' &&
        file.mimetype !== 'image/jpg' &&
        file.mimetype !== 'image/jpeg'
      ) {
        error =
          'File is not supported. Only JPG, PNG and GIF files are supported';
      }
      return error;
    } catch (error) {
      this.logger.error(error, 'validatePhoto');
      return 'Image is required';
    }
  }

  async changePhoto(file: Express.Multer.File, userId: string) {
    const error = this.validatePhoto(file);

    if (error) return { error };

    const user = await this.userRepository.findById(userId);

    let secure_url: string;

    try {
      const { buffer } = file;
      secure_url = await this.cloudinaryService.uploadProfilePhoto(
        buffer,
        userId
      );
    } catch (err) {
      this.logger.error(err, 'changePhoto');
      return { error: err };
    }

    user!.picture = secure_url;
    await user!.save();

    return { secure_url };
  }

  private validateInfo(info: PersonalInfoBody) {
    const errors = {} as Record<string, string>;

    Object.entries(info).forEach(([key, value]) => {
      let isValid = true;
      let message = '';

      if (key === 'facebookLink') {
        isValid = facebookRegex.test(value as string);
        message = 'Facebook link is not valid.';
      }

      if (key === 'twitterLink') {
        isValid = twitterRegex.test(value as string);
        message = 'Twitter link is not valid.';
      }

      if (key === 'phone') {
        isValid = phoneRegex.test(value as string);
        message = 'Phone number is not valid.';
      }

      if (!isValid) {
        errors[`${key}`] = message;
      }
    });

    return errors;
  }

  async updatePersonalInfo(info: PersonalInfoBody, id: string) {
    const errors = this.validateInfo(info);

    if (Object.keys(errors).length > 0) {
      return this.returnResponse(HTTPCodes.BAD_REQUEST, { errors });
    }

    const updated = await this.userRepository.update(info, id);

    if (!updated.nModified) {
      return this.returnResponse(HTTPCodes.BAD_REQUEST, {
        message: 'Profile  was not updated',
      });
    }

    return this.returnResponse(HTTPCodes.OK, { message: 'Profile updated' });
  }

  async getUsersByRole(role: UserRole) {
    return this.userRepository.getUsersByRole(role);
  }

  async getUserToEdit(id: string) {
    return this.userRepository.findUserToEdit(id);
  }

  async updateUserRole(role: UserRole, id: string) {
    const updated = await this.userRepository.update({ role }, id);

    if (!updated.nModified) {
      return this.returnResponse(HTTPCodes.BAD_REQUEST, {
        message: 'User role not updated',
      });
    }

    return this.returnResponse(HTTPCodes.OK, { message: 'User role updated' });
  }

  async updateUserBlockedStatus(blocked: boolean, id: string) {
    const updated = await this.userRepository.update({ blocked }, id);

    if (!updated.nModified) {
      return this.returnResponse(HTTPCodes.BAD_REQUEST, {
        message: 'User Blocked status not changed',
      });
    }

    return this.returnResponse(HTTPCodes.OK, {
      message: 'User Blocked status changed',
    });
  }

  private validateUser(
    { email, role }: AddUserBody,
    user: UserInterface | null
  ) {
    const validRoles = ['admin', 'worker', 'administration', 'professor'];
    const errors = {} as Record<string, string>;

    if (user) {
      errors.email = 'User wih provided email already exists';
    } else if (!email) {
      errors.email = 'Email is required';
    }

    if (!role) {
      errors.role = 'Role is required';
    } else if (!validRoles.includes(role)) {
      errors.role = 'Role is not valid';
    }

    return { isValid: isEmpty(errors), errors };
  }

  async addUser(data: AddUserBody) {
    const found = await this.userRepository.getByEmail(data.email);

    const { isValid, errors } = this.validateUser(data, found);

    if (!isValid) {
      return this.returnResponse(HTTPCodes.BAD_REQUEST, { errors });
    }

    await this.userRepository
      .createUser({ ...data, googleID: 'google', name: 'name' })
      .save();

    return this.returnResponse(HTTPCodes.OK, { message: 'User added' });
  }
}
