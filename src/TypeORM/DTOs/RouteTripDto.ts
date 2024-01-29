
export class RouteTripDTO {
    id:number;
    name: string;

    constructor(routeData: { id: number,name: string}) {
        this.id = routeData.id;
        this.name = routeData.name;
    
    }

    static fromPlainObject(obj: {  id: number,name: string, }): RouteTripDTO {
        const routeTripDTO = new RouteTripDTO({
            id: obj.id,
            name: obj.name,
    
                });

        return routeTripDTO;
    }
}
