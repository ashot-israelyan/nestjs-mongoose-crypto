import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CoinbaseAuthService } from './coinbase-auth.service';

@Controller('coinbase')
export class CoinbaseController {
  constructor(private readonly coinBaseAuthService: CoinbaseAuthService) {}

  @Get('auth')
  @UseGuards(JwtAuthGuard)
  authorize(@Res() response: Response): void {
    this.coinBaseAuthService.authorize(response);
  }

  @Get('auth/callback')
  @UseGuards(JwtAuthGuard)
  handleCallback(@Req() request: Request, @Res() response: Response): void {
    this.coinBaseAuthService.handleCallback(request, response);
  }
}
