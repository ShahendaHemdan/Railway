import { Entity, Column, PrimaryGeneratedColumn,ManyToOne, OneToMany } from 'typeorm';
import { Route } from './Route';
import { Delay } from './Delay';

@Entity()
export class Station{

    @PrimaryGeneratedColumn({type:'bigint'})
    id: number;

    @Column()
    name: string;


    



    // Define the relationship with Route entity
    @ManyToOne(() => Route, route => route.stations)
    route: Route;


    // Define the relationship with Delay entity
    @OneToMany(() => Delay, delay => delay.Station, { cascade: true })
    delays: Delay[];

}


