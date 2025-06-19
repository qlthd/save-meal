import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { AssociationService } from './association.service';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { Association } from './entities/association.entity';
import { CreateAssociationDto } from './dto/create-association.dto';

@Controller('association')
export class AssociationController {
  constructor(private readonly associationService: AssociationService) {}

  @Post()
  @ApiOperation({ summary: 'Créer une association' })
  @ApiBody({ type: CreateAssociationDto })
  @ApiResponse({ status: 201, description: 'Association créé.' })
  create(@Body() createAssociationDto: CreateAssociationDto) {
    return this.associationService.create(createAssociationDto);
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer toutes les assos' })
  @ApiOkResponse({
    description: 'Les associations',
    type: Association,
    isArray: true,
  })
  findAll() {
    return this.associationService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer une asso' })
  @ApiOkResponse({
    description: 'Une association',
    type: Association,
  })
  findOne(@Param('id') id: string) {
    return this.associationService.findOne(+id);
  }
}
