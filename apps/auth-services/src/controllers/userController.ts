import { Controller, Post, Body, HttpCode, HttpStatus, BadRequestException, ConflictException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { RegisterUserDto } from '../dtos/index';
import { LoginUserDto } from '../dtos/index';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user.model';
import { UserCreated } from 'src/message-bus/send/user_added';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService, private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() dtos: RegisterUserDto) {
    try {
      const doesExist = await this.userService.findByEmail(dtos);
      if (doesExist) {
        throw new ConflictException(`${dtos.email} is already exists`);
      }

      const savedUser = await this.userService.createUser(dtos);
      const accessToken = await this.authService.signAccessToken(savedUser.email);
      const refreshToken = await this.authService.signRefreshToken(savedUser.email);

      await UserCreated.sendUserCreated(savedUser);

      return { accessToken, refreshToken };
    } catch (error) {
      if (error.name === 'ValidationError') {
        throw new BadRequestException(error.message);
      }
      throw error;
    }
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginUserDto: LoginUserDto) {
    const user = await this.userService.findByEmail(loginUserDto.email);
    if (!user) {
      throw new NotFoundException('User not registered');
    }

    const isMatch = await user.isValidPassword(loginUserDto.password);
    if (!isMatch) {
      throw new UnauthorizedException('Username/password not valid');
    }

    const accessToken = await this.authService.signAccessToken(user.email);
    const refreshToken = await this.authService.signRefreshToken(user.email);

    return { accessToken, refreshToken };
  }
}
