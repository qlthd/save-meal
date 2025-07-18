import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { Booking } from './entities/booking.entity';
@Injectable()
export class BookingService {
  constructor(private prisma: PrismaService) {}

  create(createBookingDto: CreateBookingDto) {
    return this.prisma.booking.create({
      data: createBookingDto,
    });
  }

  async findAll(): Promise<Booking[]> {
    return this.prisma.booking.findMany();
  }

  async findByAssociation(id: number): Promise<Booking[] | null> {
    return this.prisma.booking.findMany({
      where: { associationId: id },
      include: {
        foodDonation: true,
      },
    });
  }
}
