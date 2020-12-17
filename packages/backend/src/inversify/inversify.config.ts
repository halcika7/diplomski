import { Container } from 'inversify';

import { PaperRepository } from '@repository/Paper';
import { UserRepository } from '@repository/User';
import { BindingRepository } from '@repository/Binding';
import { CartRepository } from '@repository/Cart';
import { OrderRepository } from '@repository/Order';
import { FilesRepository } from '@repository/File';

import { AuthService } from '@service/Auth';
import { PassportService } from '@service/Passport';
import { StorageService } from '@service/Storage';
import { DocumentService } from '@service/Document';
import { CartService } from '@service/Cart';
import { UploadService } from '@service/Upload';
import { FileService } from '@service/File';
import { OrderService } from '@service/Order';
import { PricingService } from '@service/Pricing';
import { CloudinaryService } from '@service/Cloudinary';
import { UserService } from '@service/User';
import { PaperService } from '@service/Paper';
import { BindingService } from '@service/Binding';
import { EmailService } from '@service/Email';
import { DashboardService } from '@service/Dashboard';

import { BindingInterface } from '@model/Binding/Binding';

const container = new Container();

container.bind<AuthService>(AuthService).toSelf().inSingletonScope();
container.bind<PassportService>(PassportService).toSelf().inSingletonScope();
container.bind<StorageService>(StorageService).toSelf().inSingletonScope();
container.bind<DocumentService>(DocumentService).toSelf().inSingletonScope();
container.bind<CartService>(CartService).toSelf().inSingletonScope();
container.bind<UploadService>(UploadService).toSelf().inSingletonScope();
container.bind<FileService>(FileService).toSelf().inSingletonScope();
container.bind<OrderService>(OrderService).toSelf().inSingletonScope();
container.bind<PricingService>(PricingService).toSelf().inSingletonScope();
container
  .bind<CloudinaryService>(CloudinaryService)
  .toSelf()
  .inSingletonScope();
container.bind<UserService>(UserService).toSelf().inSingletonScope();
container.bind<PaperService>(PaperService).toSelf().inSingletonScope();
container.bind<BindingService>(BindingService).toSelf().inSingletonScope();
container.bind<EmailService>(EmailService).toSelf().inSingletonScope();
container.bind<DashboardService>(DashboardService).toSelf().inSingletonScope();

container.bind<UserRepository>(UserRepository).toSelf().inSingletonScope();
container
  .bind<BindingRepository>(BindingRepository)
  .toSelf()
  .inSingletonScope();
container.bind<PaperRepository>(PaperRepository).toSelf().inSingletonScope();
container.bind<CartRepository>(CartRepository).toSelf().inSingletonScope();
container.bind<OrderRepository>(OrderRepository).toSelf().inSingletonScope();
container.bind<FilesRepository>(FilesRepository).toSelf().inSingletonScope();

export default container;
