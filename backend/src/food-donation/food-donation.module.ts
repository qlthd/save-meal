import { Module } from '@nestjs/common';
import { FoodDonationService } from './food-donation.service';
import { FoodDonationController } from './food-donation.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { BookingService } from '../booking/booking.service';

@Module({
  imports: [PrismaModule],
  controllers: [FoodDonationController],
  providers: [FoodDonationService, BookingService],
})
export class FoodDonationModule {}
