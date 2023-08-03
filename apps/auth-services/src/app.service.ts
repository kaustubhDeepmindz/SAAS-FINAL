/* eslint-disable @typescript-eslint/no-unused-vars */
import { UserRepository } from '@app/repository/repositories/userRepository';
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import {User} from '../../../libs/repository/src/schemas/userSchema'
// import { signRefreshToken,signAccessToken } from '../token/jsonWT';
import * as bcrypt from 'bcrypt';

export interface TokenPayload {
  userId: string;
}

@Injectable()
export class AppService {
  constructor(private readonly usersRepository: UserRepository) {}

  getHello(): string {
    return 'Hello World!';
  }

  async register(req,res){
    try {
       const doesExist = await this.usersRepository.findOne({ email: req.email })

       if (doesExist)
       throw new UnprocessableEntityException('Email already exists.');
       const user = new User()
       const savedUser = await this.usersRepository.create(req)
      //  const accessToken = await signAccessToken(savedUser.email)
      //  const refreshToken = await signRefreshToken(savedUser.email)
       console.log(6)
      //  await UserCreated.sendUserCreated(user);
      //  return res.send({ accessToken, refreshToken })
      return true
    } catch (error) {
       console.log("ERROR WHILE SIGN UP")
    }
  }

  async login(req,res){
    try {
      const doesExist = await this.usersRepository.findOne({ email: req.body.email })

       if (!doesExist) throw new UnprocessableEntityException('Email does not exists.');


       if(doesExist.password == req.body.password){  
        // const accessToken = await signAccessToken(doesExist.email)
        // const refreshToken = await signRefreshToken(doesExist.email)
        // return res.send({ accessToken, refreshToken })
return true
       }else {
        throw new UnprocessableEntityException('Email/Password is Invalid')
       }
  
   } catch (err) {
    
    throw new UnprocessableEntityException('Unable to Process your Login Request')
   }
  }

  async validateUser(email: string, password: string) {
    const user = await this.usersRepository.findOne({ email });
    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
      throw new UnprocessableEntityException('Credentials are not valid.');
    }
    return user;
  }

  async getUser(getUserArgs: Partial<User>) {
    return this.usersRepository.findOne(getUserArgs);
  }
}
