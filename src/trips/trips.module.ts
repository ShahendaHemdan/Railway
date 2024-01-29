import { Module } from '@nestjs/common';
import { TripsService } from './services/trips/trips.service';
import { TripsController } from './controllers/trips/trips.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trip } from 'src/TypeORM/entities/Trip';
import { TrainsService } from 'src/trains/services/trains/trains.service';
import { RoutesService } from 'src/routes/services/routes/routes.service';
import { TrainsController } from 'src/trains/controllers/trains/trains.controller';
import { RoutesController } from 'src/routes/controllers/routes/routes.controller';
import { Train } from 'src/TypeORM/entities/Train';
import { Route } from 'src/TypeORM/entities/Route';

@Module({
  imports: [TypeOrmModule.forFeature([Trip,Train,Route])],
  providers: [TripsService,TrainsService,RoutesService],
  controllers: [TripsController,TrainsController,RoutesController]
})
export class TripsModule {}
