import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UserModule } from "src/user/user.module";
import { TokenModule } from "src/token/token.module";
import { TokenService } from "src/token/token.service";
import { UserService } from "src/user/user.service";
import { SharedModule } from "src/shared/shared.module";
import { PrismaService } from "src/prisma/prisma.service";

@Module({
  imports: [UserModule, TokenModule, SharedModule],
  providers: [AuthService, TokenService, UserService, PrismaService],
  controllers: [AuthController],
})
export class AuthModule {}
