import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from "@nestjs/common";
import { Request } from "express";
import { JwtAuthGuard } from "src/auth/jwt.guard";
import { CreatePostDTO } from "./post.dto";
import { PostsService } from "./post.service";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiBearerAuth()
@ApiTags("Posts")
@Controller("posts")
export class PostsController {
  constructor(private service: PostsService) {}

  @Post("create")
  @ApiOperation({ summary: "Create new blog post" })
  @UseGuards(JwtAuthGuard)
  async createPost(@Body() dto: CreatePostDTO, @Req() req: Request) {
    return await this.service.createPost({ ...dto, authorId: req.user["id"] });
  }

  @Put("edit/:id")
  @ApiOperation({ summary: "Edit one of my blog posts" })
  @UseGuards(JwtAuthGuard)
  async editPost(@Body() dto: CreatePostDTO, @Req() req: Request, @Param() params: { id: string }) {
    if (dto.authorId !== req.user["id"]) {
      throw new BadRequestException("This blog post doesn't belong to you");
    }
    return await this.service.editPost({ ...dto, id: parseInt(params.id) });
  }

  @Delete("delete/:id")
  @ApiOperation({ summary: "Delete one of my blog posts" })
  @UseGuards(JwtAuthGuard)
  async deletePost(
    @Body() dto: CreatePostDTO,
    @Req() req: Request,
    @Param() params: { id: string }
  ) {
    await this.service.deletePost(parseInt(params.id), req.user["id"]);
    return { success: true };
  }

  @Get("all")
  @ApiOperation({ summary: "Get all the posts" })
  async getAllPosts() {
    return await this.service.getAllPosts();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get post by id" })
  async getPostById(@Param() params: { id: string }) {
    return await this.service.getPostById(parseInt(params.id));
  }
}
