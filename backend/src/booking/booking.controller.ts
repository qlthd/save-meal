import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { Booking } from './entities/booking.entity';

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

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer une réservation' })
  @ApiOkResponse({
    description: 'Un booking',
    type: Booking,
  })
  findOne(@Param('id') id: string) {
    return this.bookingService.findOne(+id);
  }
}
