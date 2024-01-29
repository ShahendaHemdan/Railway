import { Entity, Column, PrimaryGeneratedColumn,ManyToOne } from 'typeorm';
import { Route } from './Route';

@Entity()
export class Station{

    @PrimaryGeneratedColumn({type:'bigint'})
    id: number;

    @Column()
    name: string;


    

    // Define the relationship with Train entity
    // @OneToMany(() => Train, train => train.station, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    // trains: Train[];


    // Define the relationship with Route entity
    @ManyToOne(() => Route, route => route.stations)
    route: Route;


}


