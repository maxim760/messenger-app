import { Body, Controller, Get, Post, UseGuards, Request, Query, Param, Patch, Delete, UseInterceptors, UploadedFiles, Put } from "@nestjs/common";
import { FileFieldsInterceptor } from '@nestjs/platform-express';

import { ObjectId } from "mongoose";
import { CreateMessageDto } from "./dto/create-message.dto";
import { UpdateMessageDto } from "./dto/update-message.dto";
import { MessageService } from "./message.service";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard"


@Controller("/message")
export class MessageController {
  constructor(private readonly messageService: MessageService) { }
  
  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'image' },
      { name: 'audio' },
    ]),
  )
  create(@Body() createMessageDto: CreateMessageDto, @Request() req, @UploadedFiles() files) {
    const {image, audio} = files
    return this.messageService.create({user: req.user, message: createMessageDto}, {audio, image} )
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'image' },
      { name: 'audio' },
    ]),
  )
  update(@Body() updateMessageDto: UpdateMessageDto, @Request() req, @UploadedFiles() files) {
    const {image, audio} = files
    return this.messageService.update({user: req.user, message: updateMessageDto}, {image, audio})
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  getById(@Query("id") id: ObjectId, @Request() req) {
    return this.messageService.delete(id, req.user)
  }
  
}
