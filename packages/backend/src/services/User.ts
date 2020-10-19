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
      console.log('UserService -> changePhoto -> err', err);
      return { error: err };
    }

    user!.picture = secure_url;
    await user!.save();

    return { secure_url };
  }

  async getUsersByRole(role: string) {
    return this.userRepository.getUsersByRole(role);
  }
}
