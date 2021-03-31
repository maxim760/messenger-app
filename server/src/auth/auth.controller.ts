import { Controller, Req, Post, UseGuards, Get, Query, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Request, Response } from "express"


@Controller("/auth")
export class AuthController {

  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Req() req, @Res({ passthrough: true }) response: Response) {
    return this.authService.login(req.user, response);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  getProfile(@Req() req) {
    return this.authService.getProfile(req.user)
  }
}