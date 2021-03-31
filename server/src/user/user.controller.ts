import { Body, Controller, Get, Post, UseGuards, Request, Query, Param } from "@nestjs/common";
import { ObjectId } from "mongoose";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserService } from "./user.service";

@Controller("/user")
export class UserController {
  constructor(private readonly userService: UserService) { }
  
  @Post("/registration")
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto)
  }

  @Get("/:id")
  getById(@Param("id") id: ObjectId) {
    return this.userService.getById(id)
  }
  
  @Get()
  getAll() {
    return this.userService.getAll()
  }

  
}
