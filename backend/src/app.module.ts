import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FoodDonationModule } from './food-donation/food-donation.module';
import { BookingModule } from './booking/booking.module';
import { AssociationModule } from './association/association.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [FoodDonationModule, BookingModule, AssociationModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
