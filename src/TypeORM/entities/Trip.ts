import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne } from 'typeorm';
import { Route } from './Route';
import { Train } from './Train';
@Entity()
export class Trip {

    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @Column()
    name: string;


    @Column()
    arrTime: number;


    @Column()
    deptTime: number;

    @Column()
    date: Date;

    @Column()
    duration: number;

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
    



}





