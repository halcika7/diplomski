import { Get } from '@decorator/method';
import { Req, Res } from '@decorator/param';
import { Response, Request } from 'express';
import { Controller } from '@decorator/class';

@Controller('/')
export class CSRFController {
  @Get('get_csrf')
  async getCsrf(@Req() req: Request, @Res() res: Response) {
    // console.log('usloooo');
    // res.cookie('_csrf', req.csrfToken(), { sameSite: true });
    // console.log(os.hostname());
    // console.log(os.platform());
    // console.log(os.arch());
    // console.log(os.userInfo());
    // console.log(req.connection.address());
    // console.log(req.connection.localAddress);
    // console.log(req.connection.remoteAddress);
    // console.log(req.connection.remoteFamily);
    // console.log(req.connection.remotePort);
    // console.log(req.headers['x-forwarded-for']);
    // console.log(req.ip);
    // console.log(req.headers);
    // console.log(req.url);
    // console.log(req.originalUrl);
    // console.log(req.baseUrl);
    return res.json({ message: 'csrf_token' });
  }
}
