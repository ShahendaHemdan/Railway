import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Station } from './Station';
@Entity()
export class Route{

    @PrimaryGeneratedColumn({type:'bigint'})
    id: number;

    @Column()
    name: string;


    @Column()
    distance:number;

    
        // Define the relationship with Station entity
        
        @OneToMany(() => Station, station => station.route, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
        stations: Station[];


    
}


