import { Body, Controller, Get, Post, UseGuards, Request, Query, Param, Patch, Delete, UseInterceptors, UploadedFiles, Put } from "@nestjs/common";
import { FileFieldsInterceptor } from '@nestjs/platform-express';

import { ObjectId } from "mongoose";
import { CreateMessageDto } from "./dto/create-message.dto";
import { UpdateMessageDto } from "./dto/update-message.dto";
import { MessageService } from "./message.service";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard"


type RecordFile = Record<"audio" | "image"| "voice", Express.Multer.File[]>

@Controller("/message")
export class MessageController {
  constructor(private readonly messageService: MessageService) { }
  
  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'image' },
      { name: 'audio' },
      { name: 'voice' },
    ]),
  )
  create(@Body() createMessageDto: CreateMessageDto, @Request() req, @UploadedFiles() files = {} as RecordFile) {
    const { image = [], audio = [], voice = [] } = files
    
    return this.messageService.create({user: req.user, message: createMessageDto}, {audio, image, voice} )
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'image' },
      { name: 'audio' },
      { name: 'voice' },
    ]),
  )
  update(@Body() updateMessageDto: UpdateMessageDto, @Request() req, @UploadedFiles() files: RecordFile = {} as RecordFile) {
    const { image, audio, voice } = files
    return this.messageService.update({user: req.user, message: updateMessageDto}, {image, audio, voice})
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  delete(@Query("id") id: ObjectId, @Request() req) {
    return this.messageService.delete(id, req.user)
  }
  @UseGuards(JwtAuthGuard)
  @Get()
  getAll(@Query("limit") limit: number,@Query("offset") offset: number,@Query("id") id: string, @Request() req) {
    return this.messageService.getAll({limit, offset,id }, req.user)
  }
  
}
