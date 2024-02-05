import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Put, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { Trip } from 'src/TypeORM/entities/Trip';
import { TripsService } from 'src/trips/services/trips/trips.service';
import { Response } from 'express';
import { TripDTO } from 'src/TypeORM/DTOs/TripDto';
import { OnEvent } from '@nestjs/event-emitter';


@Controller('trips')
export class TripsController {
    private delayAdded = false;    
    constructor(private tripService:TripsService,
        ){}

        @OnEvent('Delay Added')
        handleTrips() {
            this.delayAdded = true;
        }


    @Get()
    async getAllTrips(@Res() res: Response){
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');

    const sendEvent = (data: any) => {
      res.write(`data: ${JSON.stringify(data)}\n\n`);
    };
          

    
    
        // Send initial data
        const trips = await this.tripService.findAllTrips();
        if (trips[0]) {
        const tripDTO = trips.map((trip) => TripDTO.createFromEntity(trip));
        sendEvent({ Status: HttpStatus.OK, Data: tripDTO });
        } else {
        throw new HttpException('There are no Trips', HttpStatus.NOT_FOUND);
        }



        // Keep the connection open
            const intervalId = setInterval(async () => {
                if (this.delayAdded) {
                const updatedTrips = await this.tripService.findAllTrips();
                if (updatedTrips[0]) {
                    const updatedTripDTO = updatedTrips.map((trip) => TripDTO.createFromEntity(trip));
                    sendEvent({ Status: HttpStatus.OK, Data: updatedTripDTO, Updated: true });
                    this.delayAdded = false; // Reset the flag after sending the update
                }
                }
            }, 5000); // Update every 5 seconds

            
      // Handle client disconnect
    res.on('close', () => {
        clearInterval(intervalId);
      });

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





