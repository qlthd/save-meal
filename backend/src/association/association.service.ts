import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAssociationDto } from './dto/create-association.dto';

@Injectable()
export class AssociationService {
  constructor(private prisma: PrismaService) {}

  create(createAssociationDto: CreateAssociationDto) {
    return this.prisma.association.create({ data: createAssociationDto });
  }

  findAll() {
    return this.prisma.association.findMany();
  }

  findOne(id: number) {
    return this.prisma.association.findUnique({ where: { id } });
  }
}
