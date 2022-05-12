import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateUserDTO } from "./user.dto";
import * as bcrypt from "bcrypt";
import { User } from "@prisma/client";

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(dto: CreateUserDTO): Promise<User> {
    const exists = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (exists) {
      throw new BadRequestException(`User with this email already exists`);
    }

    const hashedPassword = await bcrypt.hash(dto.password, bcrypt.genSaltSync());
    const user = await this.prisma.user.create({
      data: { ...dto, password: hashedPassword },
    });
    delete user.password;
    return user;
  }

  async getUserByEmail(email: string): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new NotFoundException("User with this email does not exist");
    }
    return user;
  }

  async getUserById(id: number): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    delete user.password;
    return user;
  }
}
