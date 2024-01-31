import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './TypeORM/entities/User';
import { TrainsModule } from './trains/trains.module';
import { Train } from './TypeORM/entities/Train';
import { Station } from './TypeORM/entities/Station';
import { StationsModule } from './stations/stations.module';
import { Route } from './TypeORM/entities/Route';
import { RoutesModule } from './routes/routes.module';
import { Trip } from './TypeORM/entities/Trip';
import { TripsModule } from './trips/trips.module';
import { TicketsModule } from './tickets/tickets.module';
import { Ticket } from './TypeORM/entities/Tickets';
import { Delay } from './TypeORM/entities/Delay';
import { DelaysModule } from './delays/delays.module';
import { ScheduleModule } from '@nestjs/schedule';
// import { DelaysService } from './delays/services/delays/delays.service';
// import { YourCronJobService } from 'src/delays/services/delays';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'test',
      entities: [User,Train,Station,Route,Trip,Ticket,Delay],
      synchronize: true,
    }),
    UsersModule,
    TrainsModule,
    StationsModule,
    RoutesModule,
    TripsModule,
    TicketsModule,
    DelaysModule,
    ScheduleModule.forRoot()
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
