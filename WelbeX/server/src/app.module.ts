import { Module } from "@nestjs/common";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join, resolve } from "path";
import { AuthModule } from "./auth/auth.module";
import { PostsModule } from "./post/post.module";
import { SharedModule } from "./shared/shared.module";
import { TokenModule } from "./token/token.module";
import { UserModule } from "./user/user.module";

@Module({
  imports: [
    UserModule,
    AuthModule,
    SharedModule,
    TokenModule,
    PostsModule,
    ServeStaticModule.forRoot({
      rootPath: resolve("../client/dist"),
    }),
  ],
})
export class AppModule {}
