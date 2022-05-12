import { Module } from "@nestjs/common";
import { PostsService } from "./post.service";
import { PostsController } from "./post.controller";
import { PrismaService } from "src/prisma/prisma.service";

@Module({
  providers: [PostsService, PrismaService],
  controllers: [PostsController],
})
export class PostsModule {}
