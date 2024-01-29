import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Put, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { StationsService } from 'src/stations/services/stations/stations.service';
import { Response } from 'express';
import { StationDTO } from 'src/TypeORM/DTOs/StationDto';
import { Station } from 'src/TypeORM/entities/Station';

@Controller('stations')
export class StationsController {

    constructor(private stationService: StationsService) { }

    @Get()
    async getAllStations() {
        const stations = await this.stationService.findAllStations();


        if (stations[0]) {
            return stations;
        } else {
            throw new HttpException('There are no Stations', HttpStatus.NOT_FOUND);
        }
    }


    @Get(':id')
    async getStationById(@Param('id', ParseIntPipe) id: number) {
        const station = await this.stationService.findStationById(id);
        if (station[0]) {
            return station;
        } else {
            throw new HttpException('Station Not Found', HttpStatus.NOT_FOUND);
        }
    }

    @Post()
    @UsePipes(ValidationPipe)
    addStation(@Body() stationDetails: StationDTO, @Res() res: Response) {
        const station = this.stationService.createStation(stationDetails);
        if (station) {
            return res.status(200).send({ msg: "Station Added successfully" });
        } else {
            throw new HttpException('Station Not Saved', HttpStatus.BAD_REQUEST);
        }
    }

    @Put(':id')
    @UsePipes(ValidationPipe)
    async updateStation(@Param('id', ParseIntPipe) id: number, @Body() stationDetails: Station) {
        //Get Station By Id
        const station = await this.stationService.findStationById(id);
        //Check if the  Station Exists
        if (station[0]) {
            //Update Station
            const updatedStation = await this.stationService.updateStation(id, stationDetails);
            //Check if the  Station Updated Or Not
            if (updatedStation.affected) {
                return 'Station Updated successfly ';
            } else {
                throw new HttpException('Station Not Updated', HttpStatus.BAD_REQUEST);
            }
        } else {
            throw new HttpException('Station Not Found', HttpStatus.NOT_FOUND);
        }
    }

    @Delete(':id')
    async deletStation(@Param('id', ParseIntPipe) id: number) {
        const deletedStation = await this.stationService.deleteStation(id);
        if (deletedStation.affected) {
            return 'Station Deleted successfly';
        } else {
            throw new HttpException('There is no such Station', HttpStatus.NOT_FOUND);
        }
    }

}


