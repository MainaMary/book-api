import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { InjectModel } from '@nestjs/mongoose';
import { Auth } from 'src/schemas/auth.schema';
import { Model } from 'mongoose';
import { AuthDocument } from 'src/schemas/auth.schema';
import { JwtService } from '@nestjs/jwt';
import { SignUpUserDto } from './dto/signup-user.dto';
import { SignInUserDto } from './dto/signin-dto';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Auth.name)
    private readonly authModel: Model<AuthDocument>,
    private jwtService: JwtService,
  ) {}
  async signUp(signUpDto: SignUpUserDto) {
    const { name, email, password } = signUpDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.authModel.create({
      name,
      password: hashedPassword,
      email,
    });
    const token = this.jwtService.sign({ id: user._id });
    const obj = {
      token,
      name: user.name,
      email: user.email,
    };
    return obj;
  }
  async signIn(signInDto: SignInUserDto) {
    const { email, password } = signInDto;
    const user = await this.authModel.findOne({ email, password });
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}

//refer to the partner website
//shopify generates the link
//app extension
//check the app extension
//the product already exist
//return an en error if a product already exists
