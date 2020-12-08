import { Get } from '@decorator/method';
import { Res } from '@decorator/param';
import { Response } from 'express';
import { Controller } from '@decorator/class';

@Controller('/')
export class CSRFController {
  @Get('get_csrf')
  async getCsrf(@Res() res: Response) {
    return res.json({ message: 'csrf_token' });
  }
}
