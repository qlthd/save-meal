import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FoodDonationModule } from './food-donation/food-donation.module';
import { BookingModule } from './booking/booking.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [FoodDonationModule, BookingModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
