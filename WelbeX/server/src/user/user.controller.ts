import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { Request } from "express";
import { JwtAuthGuard } from "src/auth/jwt.guard";
import { UserService } from "./user.service";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiBearerAuth()
@ApiTags("User")
@Controller("user")
export class UserController {
  constructor(private service: UserService) {}

  @Get("me")
  @ApiOperation({ summary: "Get my profile" })
  @UseGuards(JwtAuthGuard)
  async getMe(@Req() req: Request) {
    return await this.service.getUserById(req.user["id"]);
  }
}
