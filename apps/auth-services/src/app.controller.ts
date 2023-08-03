import { Controller, Get, Post, Res,Req } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/user')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/hello')
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/register')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async register(@Req() req:Request,@Res() res:Response) {
    return this.appService.register(req,res);
  }

  @Post('/login')
  async login(@Req() req:Request,@Res() res:Response) {
    return this.appService.login(req,res);
  }
}


