import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreatePostDTO, PostDTO } from "./post.dto";

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async createPost(dto: CreatePostDTO) {
    return await this.prisma.post.create({
      data: {
        content: dto.content,
        title: dto.title,
        author: {
          connect: { id: dto.authorId },
        },
      },
      include: { author: { select: { nickname: true, id: true } } },
    });
  }

  async editPost(dto: PostDTO) {
    return await this.prisma.post.update({
      where: { id: dto.id },
      data: dto,
      include: { author: { select: { nickname: true, id: true } } },
    });
  }

  async deletePost(id: number, userId: number) {
    const post = await this.prisma.post.findUnique({ where: { id } });
    if (post.authorId !== userId) {
      throw new BadRequestException("This blog post does not belong to you");
    }
    await this.prisma.post.delete({ where: { id } });
  }

  async getAllPosts() {
    return await this.prisma.post.findMany({
      include: { author: { select: { nickname: true, id: true } } },
      orderBy: { createdAt: "desc" },
    });
  }

  async getPostById(id: number) {
    const post = await this.prisma.post.findUnique({
      where: { id },
      include: { author: { select: { nickname: true, id: true } } },
    });

    if (!post) {
      throw new NotFoundException(`Blog post with ID: ${id} does not exist`);
    }

    return post;
  }
}
