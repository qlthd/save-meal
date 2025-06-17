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
import { ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { CreateFoodDonationDto } from './dto/create-food-donation.dto';

@Controller('food-donation')
export class FoodDonationController {
  constructor(private readonly foodDonationService: FoodDonationService) {}

  @Post()
  @ApiOperation({ summary: 'Créer une collecte' })
  @ApiBody({ type: CreateFoodDonationDto })
  @ApiResponse({ status: 201, description: 'Collecte créé.' })
  create(@Body() createFoodDonationDto: Prisma.FoodDonationCreateInput) {
    console.log(createFoodDonationDto);
    return this.foodDonationService.create(createFoodDonationDto);
  }

  @Get()
  findAll() {
    return this.foodDonationService.findAll();
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
