import { LoginUserDto, RegisterUserDto } from './../dtos/index';
import { UserSchema } from '../../../../libs/sample/src/schemas/userSchema';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

export interface TokenPayload {
  userId: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

//   async login(email: LoginUserDto, response: Response) {
    
//     const tokenPayload: TokenPayload = {
//       userId: emai._id.toHexString(),
//     };

//     const expires = new Date();
//     expires.setSeconds(
//       expires.getSeconds() + this.configService.get('JWT_EXPIRATION'),
//     );

//     const token = this.jwtService.sign(tokenPayload);

//     response.cookie('Authentication', token, {
//       httpOnly: true,
//       expires,
//     });
//   }

  logout(response: Response) {
    response.cookie('Authentication', '', {
      httpOnly: true,
      expires: new Date(),
    });
  }
}