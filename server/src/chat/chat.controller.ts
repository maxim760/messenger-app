import { Body, Controller, Get, Post, UseGuards, Req, Query, Param, Patch, Delete, UseInterceptors, UploadedFiles } from "@nestjs/common";
import { ObjectId } from "mongoose";
import { CreateChatDto } from "./dto/create-Chat.dto";
import { ChatService } from "./chat.service";
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { Request } from "express";


@Controller("/chat")
export class ChatController {
  constructor(private readonly ChatService: ChatService) { }
  
  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'image', maxCount: 1 },
    ]),
  )
  findOrCreate(@Body() createChatDto: CreateChatDto, @Req() req, @UploadedFiles() files = {} as {image: File}) {
    const {image = []} = files
    return this.ChatService.create(createChatDto, req.user, image[0])
  }
  
  @UseGuards(JwtAuthGuard)
  @Get("/user")
  getByUser(@Query("userId") userId: string,  @Req() req) {
    return this.ChatService.getByUser(userId, req.user)
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  get(@Query("chat") chat: string, @Query("offset") offset: number = 0, @Query("limit") limit: number = 15, @Req() req: Request) {
    return this.ChatService.getAll({id: chat,limit, offset }, req.user)
  }
  
}
