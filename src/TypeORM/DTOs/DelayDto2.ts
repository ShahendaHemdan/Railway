import { Delay } from "../entities/Delay";

export class DelayDTO {
    id: number;
    duration: number;
    tripId: number;
    trainId: number;
    stationId: number;

    constructor(data: DelayDTO) {
        this.id = data.id ;
        this.duration = data.duration;
        this.tripId = data.tripId;
        this.trainId = data.trainId;
        this.stationId = data.stationId;

    }

    static createFromEntity(delay: Delay): DelayDTO {
        const delayDTO = new DelayDTO({
            id: delay.id,
            duration: delay.duration,
            tripId: delay.Trip ? delay.Trip.id : null,
            trainId: delay.Train ? delay.Train.id : null,

            stationId: delay.Train ? delay.Station.id : null,
        });

        return delayDTO;
    }
}
