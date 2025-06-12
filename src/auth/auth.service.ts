// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    pass: string,
  ): Promise<{ email: string; _id: string; [key: string]: any } | null> {
    const user = await this.usersService.findByEmail(email);
    if (user && user.password && (await bcrypt.compare(pass, user.password))) {
      const result: { email: string; _id: string; [key: string]: any } =
        user.toObject
          ? (user.toObject() as {
              email: string;
              _id: string;
              [key: string]: any;
            })
          : (user as {
              email: string;
              _id: string;
              [key: string]: any;
            });
      delete result.password;
      return result;
    }
    return null;
  }

  login(user: { email: string; _id: string }) {
    const payload = { email: user.email, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(email: string, password: string) {
    const existingUser = await this.usersService.findByEmail(email);
    if (existingUser) throw new UnauthorizedException('User already exists');
    const user = await this.usersService.create(email, password);
    return this.login({ email: user.email, _id: user._id as string });
  }
}
