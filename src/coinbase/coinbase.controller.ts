import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CoinbaseAuthService } from './coinbase-auth.service';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { UserResponse } from 'src/users/dto/response/user-response.dto';
import { CoinbaseService } from './coinbase.service';

@Controller('coinbase')
export class CoinbaseController {
  constructor(
    private readonly coinBaseAuthService: CoinbaseAuthService,
    private readonly coinbaseService: CoinbaseService,
  ) {}

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

  @Get()
  @UseGuards(JwtAuthGuard)
  getCoinbaseData(@CurrentUser() user: UserResponse): Promise<any> {
    return this.coinbaseService.getPrimaryAccountTransactions(user._id);
  }
}
