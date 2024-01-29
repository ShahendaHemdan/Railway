import { Module } from '@nestjs/common';
import { RoutesController } from './controllers/routes/routes.controller';
import { RoutesService } from './services/routes/routes.service';
import { Route } from 'src/TypeORM/entities/Route';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Route])],
  controllers: [RoutesController],
  providers: [RoutesService]
})
export class RoutesModule {}
