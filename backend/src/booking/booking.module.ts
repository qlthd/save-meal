import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { FoodDonationService } from '../food-donation/food-donation.service';

@Module({
  imports: [PrismaModule],
  controllers: [BookingController],
  providers: [BookingService, FoodDonationService],
})
export class BookingModule {}
