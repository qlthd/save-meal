import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Request,
  ForbiddenException,
  HttpCode,
  NotFoundException,
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
import { FoodDonationService } from '../food-donation/food-donation.service';

@Controller('booking')
export class BookingController {
  constructor(
    private readonly bookingService: BookingService,
    private readonly foodDonationService: FoodDonationService,
  ) {}

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

  @UseGuards(JwtAuthGuard)
  @Get(':id/cancel')
  @ApiOperation({ summary: 'Annuler une réservation' })
  @ApiResponse({ status: 204, description: 'Réservation annulée avec succès' })
  @HttpCode(204)
  async cancelBooking(@Param('id') id: string, @Request() req: AuthRequest) {
    const userId = req.user.userId;
    const booking = await this.bookingService.findOne(+id);
    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    if (booking.associationId !== Number(userId)) {
      throw new ForbiddenException(
        'You are not allowed to cancel this booking',
      );
    }
    const cancelledBooking = await this.bookingService.cancelBooking(+id);
    if (cancelledBooking) {
      await this.foodDonationService.updateStatus(
        cancelledBooking.foodDonationId,
        'pending',
      );
    }
  }
}
