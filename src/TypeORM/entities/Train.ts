/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { TrainType } from '../Enums/TrainType.Enum';
import { TrainClass } from '../Enums/TrainClass.Enum';
// import { Delay } from './Delay';

@Entity()
export class Train{

    @PrimaryGeneratedColumn({type:'bigint'})
    id: number;

    @Column()
    name: string;

    @Column()
    capacity: number;



    @Column({
        type: 'enum',
        enum: TrainType,
        default: TrainType.Express, // Set a default role if needed
        })
        type: TrainType;


        @Column({
            type: 'enum',
            enum: TrainClass,
            default: TrainClass.FirstClass, // Set a default role if needed
            })
            class: TrainClass;

}


