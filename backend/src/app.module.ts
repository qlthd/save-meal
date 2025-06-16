import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FoodDonationModule } from './food-donation/food-donation.module';

@Module({
  imports: [FoodDonationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
