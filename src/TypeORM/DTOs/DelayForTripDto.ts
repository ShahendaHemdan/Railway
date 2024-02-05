import { Delay } from "../entities/Delay";

export class DelayForTripDTO {
    duration: number;
    stationName: string;
    timestamp: Date;

    constructor(data: DelayForTripDTO) {
        this.duration = data.duration;
        this.stationName = data.stationName;
        this.timestamp = data.timestamp

    }

    static createFromEntity(delay: Delay): DelayForTripDTO {
        const delayDTO = new DelayForTripDTO({
            duration: delay.duration,
            stationName: delay.Station ? delay.Station.name : null, 
            timestamp: delay.timestamp ,
        });

        return delayDTO;
    }
}
