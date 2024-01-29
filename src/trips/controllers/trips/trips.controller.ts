import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Put, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { Trip } from 'src/TypeORM/entities/Trip';
import { TripsService } from 'src/trips/services/trips/trips.service';
import {  Response } from "express"
import { TripDTO } from 'src/TypeORM/DTOs/TripDto';

@Controller('trips')
export class TripsController {

    
    constructor(private tripService:TripsService){}

    @Get()
    async getAllTrips(@Res()res:Response){
        const trips=await this.tripService.findAllTrips();
        
        if(trips[0]){
            //Map Station Obj To Dto
            const tripDTO = trips.map(trip => TripDTO.createFromEntity(trip));
            return res.json({Status:HttpStatus.OK,Data:tripDTO}) ;
        }else{
            throw new HttpException('There are no Trips',HttpStatus.NOT_FOUND);
        }
    }


  @Get(':id')
  async getTripById(@Param('id',ParseIntPipe) id:number,@Res()res:Response){
    const trip=await this.tripService.findTripById(id);
    if(trip){
        //Map Station Obj To Dto
        const tripDTO = TripDTO.createFromEntity(trip);
        return res.json({Status:HttpStatus.OK,Data:tripDTO}) ;
    }else{
        throw new HttpException('Trip Not Found',HttpStatus.NOT_FOUND);
    }
  }

    // @Post()
    // addTrip( @Body() tripDetails:Trip,@Res() res:Response){
    //     const trip= this.tripService.createTrip(tripDetails);
    //     if(trip){
    //         return res.json({Status:HttpStatus.OK,Data:"Trip Saved Successflly"}) ;

    //     }else{
    //         throw new HttpException('Trip Not Saved',HttpStatus.BAD_REQUEST);
    //     }
    // }
    @Post('create')
    @UsePipes(ValidationPipe)
    async createTrip(@Body() tripData: any,@Res() res:Response) {
        const { routeId, trainId, ...tripDetails } = tripData;
        const trip= this.tripService.createTripWithDetails(routeId, trainId, tripDetails);
        if(trip){
                    return res.json({Status:HttpStatus.CREATED,Data:"Trip Saved Successflly"}) ;
        
                }else{
                    throw new HttpException('Trip Not Saved',HttpStatus.BAD_REQUEST);
                }
    }


  @Put(':id')
  @UsePipes(ValidationPipe)
  async updateTrip(@Param('id',ParseIntPipe) id:number,
                    @Body() tripDetails:Trip,
                    @Res() res:Response){

    const updatedTrip=await this.tripService.updateTrip(id,tripDetails);

    if(updatedTrip.affected){
        return res.json({Status:HttpStatus.CREATED,Data:"Trip Updated Successflly"}) ;
    }else{
        throw new HttpException('Trip Not Updated',HttpStatus.BAD_REQUEST);
    }
    }

    @Delete(':id')
    async deletTrip(@Param('id',ParseIntPipe) id:number,@Res() res:Response){
        const deletedTrip=await this.tripService.deleteTrip(id);
        if(deletedTrip.affected){
        return res.json({Status:HttpStatus.OK,Data:"Trip Deleted Successflly"}) ;
        }else{
            throw new HttpException('There is no such Trip',HttpStatus.NOT_FOUND);
        }
    }

}



