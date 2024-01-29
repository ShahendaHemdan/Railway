import { IsNotEmpty, IsString, IsNumber } from 'class-validator';



export class TrainTripDTO {
    @IsNotEmpty()
    @IsNumber()
    id:number

    @IsNotEmpty()
    @IsString()
    name: string;




    constructor(train: TrainTripDTO) {
        this.id = train.id;
        this.name = train.name;
    }


    // Static method to create StationDTO objects from plain station objects
    static fromPlainObject(train: { id:number,name: string }): TrainTripDTO {
        const trainTripDTO = new TrainTripDTO({
            id: train.id,
            name: train.name,
    
          
           
        });

        return trainTripDTO;
    }
}