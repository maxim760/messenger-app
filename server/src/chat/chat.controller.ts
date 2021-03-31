import { Body, Controller, Get, Post, UseGuards, Request, Query, Param, Patch, Delete } from "@nestjs/common";
import { ObjectId } from "mongoose";
import { CreateChatDto } from "./dto/create-Chat.dto";
import { ChatService } from "./chat.service";
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';


@Controller("/chat")
export class ChatController {
  constructor(private readonly ChatService: ChatService) { }
  
  // @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createChatDto: CreateChatDto, @Request() req) {
    console.log(1111)
    return this.ChatService.create(createChatDto, req.user)
  }
  
  @UseGuards(JwtAuthGuard)
  @Get()
  get(@Query("sel") sel: ObjectId,@Query("offset") offset: number = 0,@Query("limit") limit: number = 15,  @Request() req) {
    return this.ChatService.getAll({id: sel,limit, offset }, req.user)
  }
  
}
