import { Controller, Post, UseGuards, Body, Request, Put, Delete, Query } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { CreateStatusDto } from "./dto/create-status.dto";
import { UpdateStatusDto } from "./dto/update-status.dto";
import { UserStatusService } from "./userStatus.service";

@Controller("/userStatus")
export class UserStatusController {
  constructor(private readonly userStatusService: UserStatusService) { }
  @UseGuards(JwtAuthGuard)
  @Post()
  setStatus(@Body() createStatusDto: CreateStatusDto, @Request() req) {
    return this.userStatusService.setStatus(createStatusDto, req.user)
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  updateStatus(@Body() updateStatusDto: UpdateStatusDto, @Request() req) {
    return this.userStatusService.updateStatus(updateStatusDto, req.user)
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  removeStatus(@Request() req) {
    return this.userStatusService.removeStatus(req.user)
  }

}
