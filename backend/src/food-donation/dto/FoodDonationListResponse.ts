import { FoodDonation } from '../entities/food-donation.entity';
import { ApiProperty } from '@nestjs/swagger';

export class FoodDonationListResponse {
  @ApiProperty({ type: () => FoodDonation, isArray: true })
  past: FoodDonation[];

  @ApiProperty({ type: () => FoodDonation, isArray: true })
  @ApiProperty()
  upcoming: FoodDonation[];
}
