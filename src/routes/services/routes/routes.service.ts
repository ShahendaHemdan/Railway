import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Route } from 'src/TypeORM/entities/Route';

@Injectable()
export class RoutesService {

    constructor(@InjectRepository(Route) private routeRepository:Repository<Route>){

    }
    findAllRoutes(){
        return this.routeRepository.find({relations:["stations"]});

    }


    findRouteById(id:number){
        return this.routeRepository.findOne({ where: { id }, relations: ['stations'] });
    }

    createRoute(routeDetails:Route){
        const newRoute=this.routeRepository.create(routeDetails);
        return this.routeRepository.save(newRoute);
    }

    updateRoute(id:number,routeDetails:Route){
        return this.routeRepository.update({ id },routeDetails)
    }

    deleteRoute(id:number){
        return this.routeRepository.delete({id});
    }
}




