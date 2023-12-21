import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInUserDto } from './dto/signin-dto';
import { SignUpUserDto } from './dto/signup-user.dto';
import { Auth } from 'src/schemas/auth.schema';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/signUp')
  async signUp(
    @Body() signupDto: SignUpUserDto,
  ): Promise<{ token: string; name: string; email: String }> {
    return this.authService.signUp(signupDto);
  }
  @Post('/signIn')
  async signIn(
    @Body() signinDto: SignInUserDto,
  ): Promise<{ email: string; password: string }> {
    return this.authService.signIn(signinDto);
  }
}
