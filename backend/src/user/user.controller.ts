import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  Patch,
  BadRequestException,
  UseGuards,
  ForbiddenException,
  Request,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { JwtAuthGuard } from 'src/guards/jwt-auth.gard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Créer un utilisateur' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, description: 'Utilisateur créé.' })
  create(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto);
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

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour un utilisateur' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 200, description: 'Utilisateur mis à jour.' })
  updateUser(
    @Param('id') id: number,
    @Body() updateData: Partial<CreateUserDto>,
    @Request() req: any,
  ) {
    console.log('req.user', req.user);
    const jwtUserId = req.user.userId;
    if (jwtUserId !== id) {
      throw new ForbiddenException('You can only access your own data');
    }
    if (!updateData) {
      throw new BadRequestException('Id and update data are required');
    }
    return this.userService.updateUser(id, updateData);
  }
}
