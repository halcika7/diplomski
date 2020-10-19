import { Injectable } from '@decorator/class';
import { v2 as cloudinary } from 'cloudinary';
import { Configuration } from '@env';

cloudinary.config({
  cloud_name: Configuration.appConfig.cloudinary.CLOUDINARY_CLOUD,
  api_key: Configuration.appConfig.cloudinary.CLOUDINARY_KEY,
  api_secret: Configuration.appConfig.cloudinary.CLOUDINARY_SECRET,
});

@Injectable()
export class CloudinaryService {
  uploadProfilePhoto(buffer: Buffer, id: string) {
    return new Promise((resolve: (val: string) => void, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            public_id: `user-${id}`,
            width: 100,
            height: 100,
            gravity: 'face',
            crop: 'thumb',
          },
          (error, result) => {
            if (result) return resolve(result.secure_url);

            return reject(error!.message);
          }
        )
        .end(buffer);
    });
  }
}
