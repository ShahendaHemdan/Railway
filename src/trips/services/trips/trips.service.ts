import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {   Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Trip } from 'src/TypeORM/entities/Trip';
import { Route } from 'src/TypeORM/entities/Route';
import { Train } from 'src/TypeORM/entities/Train';


@Injectable()
export class TripsService {


    constructor(@InjectRepository(Trip) private tripRepository:Repository<Trip>,
    @InjectRepository(Route) private routeRepository: Repository<Route>,
    @InjectRepository(Train) private trainRepository: Repository<Train>,
    ){
    
    }
    findAllTrips(){
        return this.tripRepository.find({relations:["Route","Train"]});
    }


    findTripById(id:number){
        return this.tripRepository.findOne({ where: { id }, relations: ["Route","Train"] });

    }



    async createTripWithDetails(routeId: number, trainId: number, tripDetails: Partial<Trip>): Promise<Trip> {
        const route = await this.routeRepository.findOne({ where: { id: routeId } });
        const train = await this.trainRepository.findOne({ where: { id: trainId } });

        if (!route || !train) {
            throw new HttpException('Route or Train not found', HttpStatus.NOT_FOUND);
        }

        const newTrip = this.tripRepository.create({
            ...tripDetails,
            arrTime: tripDetails.arrTime || new Date(),
            Route: route,
            Train: train,
        });

        return this.tripRepository.save(newTrip);
    }

    updateTrip(id:number,tripDetails:Trip){
        return this.tripRepository.update({ id },tripDetails)
    }

    deleteTrip(id:number){
        return this.tripRepository.delete({id});
    }



}
