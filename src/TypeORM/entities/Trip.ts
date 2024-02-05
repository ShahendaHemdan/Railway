import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, OneToMany } from 'typeorm';
import { Route } from './Route';
import { Train } from './Train';
import { Delay } from './Delay';
@Entity()
export class Trip {

    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @Column()
    name: string;


    @Column()
    arrTime: Date;


    @Column()
    deptTime: Date;

    @Column()
    origin: string;

    @Column()
    destination: string;

    @OneToOne(() => Route, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn()
    Route: Route



    @OneToOne(() => Train, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn()
    Train: Train
    
    // Define the relationship with Delay entity
    @OneToMany(() => Delay, delay => delay.Trip, { cascade: true })
    delays: Delay[];


}





