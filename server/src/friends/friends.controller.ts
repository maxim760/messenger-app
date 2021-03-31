import { Controller, Get, Post, UseGuards, Request, Query, Delete } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { FriendsService } from "./friends.service";

@Controller("/friends")
export class FriendsController {
  constructor(private readonly friendsService: FriendsService) { }
  @UseGuards(JwtAuthGuard)
  @Get()
  getAll(@Query("id") id: string) {
    return this.friendsService.getAll(id)
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  addFriend(@Query("id") id: string, @Request() req) {
    return this.friendsService.addFriend(id, req.user)
  }
  @UseGuards(JwtAuthGuard)
  @Delete()
  deleteFriend(@Query("id") id: string,@Request() req) {
    return this.friendsService.deleteFriend(id, req.user)
  }

  @UseGuards(JwtAuthGuard)
  @Get("/send")
  getAllSend(@Query("id") id: string) {
    return this.friendsService.getAllSend(id)
  }

  @UseGuards(JwtAuthGuard)
  @Post("/send")
  addSendRequest(@Query("id") id: string,@Request() req) {
    return this.friendsService.addSendRequest(id, req.user)
  }

  @UseGuards(JwtAuthGuard)
  @Delete("/send")
  deleteSendRequest(@Query("id") id : string, @Query("mode") mode : string = "one",@Request() req) {
    return this.friendsService.deleteSendRequest(id, mode, req.user)
  }

  @UseGuards(JwtAuthGuard)
  @Get("/incoming")
  getIncomingRequest(@Query("id") id: string) {
    return this.friendsService.getIncomingRequest(id)
  }




  

  
}
