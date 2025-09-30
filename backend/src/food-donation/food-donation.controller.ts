import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  ForbiddenException,
  UseGuards,
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
import { FoodDonationListResponse } from './dto/FoodDonationListResponse';
import { BookingService } from '../booking/booking.service';
import { AuthRequest } from '../auth/types/AuthRequest';
import { UpdateStatusRequest } from './requests/update-status.request';
import { JwtAuthGuard } from '../guards/jwt-auth.gard';
import { FoodDonation } from './entities/food-donation.entity';

@Controller('food-donation')
export class FoodDonationController {
  constructor(
    private readonly foodDonationService: FoodDonationService,
    private readonly bookingService: BookingService,
  ) {}

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
  async findAll(): Promise<FoodDonationListResponse> {
    const collectes = await this.foodDonationService.findAll();
    const response: FoodDonationListResponse = {
      past: collectes.filter((c) => c.availableTo < new Date().toISOString()),
      upcoming: collectes.filter(
        (c) => c.availableTo >= new Date().toISOString(),
      ),
    };
    return response;
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Specific food donation',
    type: FoodDonation || null,
  })
  async findOne(@Param('id') id: string): Promise<FoodDonation | null> {
    return await this.foodDonationService.findOne(+id);
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

  @UseGuards(JwtAuthGuard)
  @Patch(':id/status')
  @ApiOperation({
    summary: "Mettre à jour le statut d'une collecte à collecté",
  })
  @ApiResponse({
    status: 200,
    description: 'Collecte mis à jour.',
  })
  async markCollected(@Param('id') id: string, @Request() req: AuthRequest) {
    const userId = req.user.userId;
    const booking = await this.bookingService.findByFoodDonation(+id);
    if (!booking || booking.associationId !== +userId) {
      throw new ForbiddenException('');
    }
    return this.foodDonationService.updateStatus(+id, 'collected');
  }
}
