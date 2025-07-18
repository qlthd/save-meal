import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Request,
  ForbiddenException,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { Booking } from './entities/booking.entity';
import { JwtAuthGuard } from '../guards/jwt-auth.gard';
import { AuthRequest } from 'src/auth/types/AuthRequest';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  @ApiOperation({ summary: 'Créer une réservation' })
  @ApiBody({ type: CreateBookingDto })
  @ApiResponse({ status: 201, description: 'Réservation crée' })
  create(@Body() createBookingDto: CreateBookingDto) {
    return this.bookingService.create(createBookingDto);
  }

  @Get()
  @ApiOkResponse({
    description: 'Une liste de réservation',
    type: Booking,
    isArray: true,
  })
  async findAll(): Promise<Booking[]> {
    return this.bookingService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOperation({ summary: "Récupérer les réservations d'une association" })
  @ApiOkResponse({
    description: 'Une liste de réservations',
    type: Booking,
    isArray: true,
  })
  findByAssociation(@Param('id') id: string, @Request() req: AuthRequest) {
    const userId = req.user.userId;
    if (userId !== id) {
      throw new ForbiddenException('You can only access your own data');
    }
    return this.bookingService.findByAssociation(+id);
  }
}
