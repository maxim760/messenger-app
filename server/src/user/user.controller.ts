import { UploadedFiles } from "@nestjs/common";
import { Body, Controller, Get, Post, UseGuards, Query, Param, Req, UseInterceptors } from "@nestjs/common";
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { Request } from "express";
import { ObjectId } from "mongoose";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserService } from "./user.service";

@Controller("/user")
export class UserController {
  constructor(private readonly userService: UserService) { }
  
  @Post("/registration")
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'image' },
    ]),
  )
  create(@Body() createUserDto: CreateUserDto, @Req() req: Request,@UploadedFiles() files = {} as { image: Express.Multer.File[] }) {
    const { image = [] } = files
    const avatar = Array.isArray(image) ? image[0] : image 
    return this.userService.create(createUserDto, avatar )
  }

  @UseGuards(JwtAuthGuard)
  @Post("/online")
  setOnlineStatus(@Req() req: Request) {
    return this.userService.setOnlineStatus((req.user as any)?._id )
  }

  @UseGuards(JwtAuthGuard)
  @Post("/offline")
  setOfflineStatus(@Req() req: Request) {
    return this.userService.setOfflineStatus((req.user as any)?._id)
  }
  
  @UseGuards(JwtAuthGuard)
  @Get("/chates")
  getAllChates(@Req() req) {
    return this.userService.getAllChates(req.user)
  }

  @Get("/:id")
  getById(@Param("id") id: ObjectId) {
    return this.userService.getById(id)
  }
  
  @Get()
  getAll(@Query("query") query: string) {
    return this.userService.getAll(query)
  }


  
}
