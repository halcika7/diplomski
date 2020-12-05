import { UserRepository } from '@repository/User';
import { CloudinaryService } from '@service/Cloudinary';
import { Injectable } from '@decorator/class';
import { v2 as cloudinary } from 'cloudinary';
import { Configuration } from '@env';
import { BaseService } from './Base';

cloudinary.config({
  cloud_name: Configuration.appConfig.cloudinary.CLOUDINARY_CLOUD,
  api_key: Configuration.appConfig.cloudinary.CLOUDINARY_KEY,
  api_secret: Configuration.appConfig.cloudinary.CLOUDINARY_SECRET,
});

const facebookRegex = new RegExp('http(?:s)://(?:www.)facebook.com/');
const twitterRegex = new RegExp('http(?:s)://twitter.com/');
const phoneRegex = new RegExp(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\\./0-9]*$/);

@Injectable()
export class UserService extends BaseService {
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
    } catch {
      return 'Image is required';
    }
  }

  async changePhoto(file: Express.Multer.File, userId: string) {
    const { buffer } = file;
    const error = this.validatePhoto(file);
    if (error) {
      return { error };
    }
    const user = await this.userRepository.findById(userId);

    let secure_url: string;

    try {
      secure_url = await this.cloudinaryService.uploadProfilePhoto(
        buffer,
        userId
      );
    } catch (err) {
      return { error: err };
    }

    user!.picture = secure_url;
    await user!.save();

    return { secure_url };
  }

  private validateInfo(info: any) {
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

  async updatePersonalInfo(info: any, id: string) {
    const errors = this.validateInfo(info);

    if (Object.keys(errors).length > 0) {
      return this.returnResponse(400, { errors });
    }

    const updated = await this.userRepository.update(info, id);

    if (!updated.nModified) {
      return this.returnResponse(400, { message: 'Profile  was not updated' });
    }

    return this.returnResponse(200, { message: 'Profile updated' });
  }

  async getUsersByRole(role: string) {
    return this.userRepository.getUsersByRole(role);
  }

  async getUserToEdit(id: string) {
    return this.userRepository.findUserToEdit(id);
  }

  async updateUserRole(role: string, id: string) {
    const updated = await this.userRepository.update({ role }, id);

    if (!updated.nModified) {
      return this.returnResponse(400, { message: 'User role not updated' });
    }

    return this.returnResponse(200, { message: 'User role updated' });
  }

  async updateUserBlockedStatus(blocked: boolean, id: string) {
    const updated = await this.userRepository.update({ blocked }, id);

    if (!updated.nModified) {
      return this.returnResponse(400, {
        message: 'User Blocked status not changed',
      });
    }

    return this.returnResponse(200, { message: 'User Blocked status changed' });
  }
}
