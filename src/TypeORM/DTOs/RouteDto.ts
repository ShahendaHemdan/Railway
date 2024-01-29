import { Station } from '../entities/Station';

export class RouteDTO {
    id:number;
    name: string;
    distance: number;
    stations: Station[];

    constructor(routeData: { id: number,name: string, distance: number, stations: Station[] }) {
        this.id = routeData.id;
        this.name = routeData.name;
        this.distance = routeData.distance;
        this.stations = routeData.stations;    
    }

    static fromPlainObject(obj: {  id: number,name: string, distance: number, stations:any }): RouteDTO {
        const routeDTO = new RouteDTO({
            id: obj.id,
            name: obj.name,
            distance: obj.distance,
            stations: obj.stations,
                });

        return routeDTO;
    }
}
