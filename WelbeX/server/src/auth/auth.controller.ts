import {
  Body,
  Controller,
  Post,
  Res,
  Req,
  UseInterceptors,
  UploadedFile,
  Get,
  UseGuards,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { Request, Response } from "express";
import { CreateUserDTO } from "src/user/user.dto";
import { LoginUserDTO } from "./auth.dto";
import { AuthService } from "./auth.service";
import { JwtAuthGuard } from "./jwt.guard";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiBearerAuth()
@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private service: AuthService) {}

  @Post("register")
  @ApiOperation({ summary: "Get my access token and create new user" })
  async register(@Body() dto: CreateUserDTO, @Res({ passthrough: true }) res: Response) {
    const tokens = await this.service.register(dto);
    res.cookie("refreshToken", tokens.refreshToken, { maxAge: 1000 * 60 * 60 * 24 * 30 });
    return { accessToken: tokens.accessToken };
  }

  @Post("login")
  @ApiOperation({ summary: "Get my access token" })
  async login(@Body() dto: LoginUserDTO, @Res({ passthrough: true }) res: Response) {
    const tokens = await this.service.login(dto);
    res.cookie("refreshToken", tokens.refreshToken, { maxAge: 1000 * 60 * 60 * 24 * 30 });
    return { accessToken: tokens.accessToken };
  }

  @Post("logout")
  @UseGuards(JwtAuthGuard)
  async logout(@Req() req: Request) {
    await this.service.logout(req.user["id"]);
    return { success: true };
  }

  @Get("refresh")
  @ApiOperation({ summary: "Refresh my access token" })
  async refresh(@Res({ passthrough: true }) res: Response, @Req() req: Request) {
    const tokens = await this.service.refresh(req.cookies["refreshToken"]);
    res.cookie("refreshToken", tokens.refreshToken, { maxAge: 1000 * 60 * 60 * 24 * 30 });
    return { accessToken: tokens.accessToken };
  }
}
