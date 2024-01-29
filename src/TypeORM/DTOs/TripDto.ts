import { Trip } from '../entities/Trip';
import { RouteTripDTO } from './RouteTripDto';
import { TrainTripDTO } from './TrainTripDto';


export class TripDTO {
    id: number;
    name: string;
    arrTime: number;
    deptTime: number;
    date: Date;
    duration: number;
    origin: string;
    destination: string;
    route: RouteTripDTO;
    train: TrainTripDTO;

    constructor(data: TripDTO) {
        this.id = data.id;
        this.name = data.name;
        this.arrTime = data.arrTime;
        this.deptTime = data.deptTime;
        this.date = data.date;
        this.duration = data.duration;
        this.origin = data.origin;
        this.destination = data.destination;
        this.route = data.route;
        this.train = data.train;
    }

    static createFromEntity(entity: Trip): TripDTO {
        const tripDTO = new TripDTO({
            id: entity.id,
            name: entity.name,
            arrTime: entity.arrTime,
            deptTime: entity.deptTime,
            date: entity.date,
            duration: entity.duration,
            origin: entity.origin,
            destination: entity.destination,
            route: RouteTripDTO.fromPlainObject(entity.Route),
            train: TrainTripDTO.fromPlainObject(entity.Train),
           
        });

        return tripDTO;
    }
}
