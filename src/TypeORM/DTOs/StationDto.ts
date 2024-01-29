// import { RouteDTO } from './RouteDTO'; // Assuming you've already created RouteDTO
import { Station } from '../entities/Station';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { RouteDTO } from './RouteDto';

export class StationDTO {

    @IsNotEmpty()
    @IsNumber()
    id: number;

    @IsNotEmpty()
    @IsString()
    name: string;


    
    // trains: TrainDTO[]; // Using TrainDTO instead of direct Train entity
    route: RouteDTO; // Using RouteDTO instead of direct Route entity




constructor(station: Station) {
    this.id=station.id,
    this.name = station.name;
    // this.trains = station.trains ? station.trains.map(train => new TrainDTO(train)) : [];
}

// Static method to create StationDTO objects from plain station objects
static fromPlainObject(obj: { name: string,  trains?: any }): StationDTO {
    const stationDTO = new StationDTO({
         id: 0, // A temporary value or default value for id
        route: null, // A temporary value or default value for route
        name: obj.name,
    });

    return stationDTO;
}
    

}
