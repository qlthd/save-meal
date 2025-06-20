import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { FoodDonationListResponse } from '../food-donation/dto/FoodDonationListResponse';
import { User } from './entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Créer un utilisateur' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, description: 'Utilisateur créé.' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get('login')
  @ApiOperation({ summary: 'Authentifier un utilisateur' })
  @ApiOkResponse({
    description: 'Id of user',
    type: Number,
  })
  async findByEmailAndPassword(
    @Query('email') email: string,
    @Query('password') password: string,
  ) {
    if (!email || !password) {
      throw new BadRequestException('Email and password are required');
    }
    return this.userService.findByEmailAndPassword(email, password);
  }

  @Get(':email')
  @ApiOperation({ summary: 'Récupérer un utilisateur par email' })
  @ApiOkResponse({
    description: 'User',
    type: User,
  })
  findOne(@Param('email') email: string) {
    return this.userService.findByEmail(email);
  }
}
