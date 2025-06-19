import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FoodDonationService } from './food-donation.service';
import { UpdateFoodDonationDto } from './dto/update-food-donation.dto';
import { Prisma } from 'generated/prisma';
import {
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiOkResponse,
} from '@nestjs/swagger';
import { CreateFoodDonationDto } from './dto/create-food-donation.dto';
import { FoodDonation } from './entities/food-donation.entity';
import { FoodDonationListResponse } from './dto/FoodDonationListResponse';

@Controller('food-donation')
export class FoodDonationController {
  constructor(private readonly foodDonationService: FoodDonationService) {}

  @Post()
  @ApiOperation({ summary: 'Créer une collecte' })
  @ApiBody({ type: CreateFoodDonationDto })
  @ApiResponse({ status: 201, description: 'Collecte créé.' })
  create(@Body() createFoodDonationDto: Prisma.FoodDonationCreateInput) {
    return this.foodDonationService.create(createFoodDonationDto);
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer toutes les collectes' })
  @ApiOkResponse({
    description: 'Past and upcoming food donations',
    type: FoodDonationListResponse,
  })
  async findAll(): FoodDonationListResponse {
    const collectes = await this.foodDonationService.findAll();
    const response: FoodDonationListResponse = {
      past: collectes.filter((c) => c.availableTo < new Date()),
      upcoming: collectes.filter((c) => c.availableTo >= new Date()),
    };
    return response;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.foodDonationService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFoodDonationDto: UpdateFoodDonationDto,
  ) {
    return this.foodDonationService.update(+id, updateFoodDonationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.foodDonationService.remove(+id);
  }
}
