/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne } from 'typeorm';
import { Train } from './Train';
import { Station } from './Station';
import { Trip } from './Trip';


@Entity()
export class Delay {

    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;


    @Column()
    duration: number;


    // Define the relationship with Train entity
    @OneToOne(() => Train, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn()
    Train: Train;



    // Define the relationship with Station entity
    @OneToOne(() => Station, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn()
    Station: Station;


    // Define the relationship with Station entity
    @OneToOne(() => Trip, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn()
    Trip: Trip;

}
