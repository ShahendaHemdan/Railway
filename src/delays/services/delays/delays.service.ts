import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Delay } from 'src/TypeORM/entities/Delay';
import { DelayDTO } from 'src/TypeORM/DTOs/DelayDto2';
import { Trip } from 'src/TypeORM/entities/Trip';
import { TripsService } from 'src/trips/services/trips/trips.service';
import { Cron, CronExpression } from '@nestjs/schedule';



@Injectable()
export class DelaysService {
    constructor(
        @InjectRepository(Delay) private delayRepository: Repository<Delay>,
        @InjectRepository(Trip) private tripRepository: Repository<Trip>,
        private tripsService: TripsService,
    ) {
        console.log('DelaysService instantiated');
    }


    findAllDelays() {
        return this.delayRepository.find({ relations: ["Trip", "Train", "Station"] });
    }


    findDelayById(id: number) {
        return this.delayRepository.findOne({ where: { id }, relations: ["Trip", "Train", "Station"] });

    }



    async createDelaytWithDetails(delayDetails: DelayDTO): Promise<Delay> {

        const newDelay = this.delayRepository.create(delayDetails);
        return this.delayRepository.save(newDelay);


    }



    async updateDelay(id: number, delayDetails: Delay): Promise<Delay> {

        // Update the delay record
        await this.delayRepository.update({ id }, delayDetails);

        // Retrieve the updated delay entity
        const updatedDelay = await this.findDelayById(id);

        return updatedDelay;

    }

    deleteDelay(id: number) {
        return this.delayRepository.delete({ id });
    }


    @Cron(CronExpression.EVERY_10_SECONDS) // Adjust the cron expression as needed
    async processDelaysAutomatically() {


        const delays = await this.delayRepository.find({ relations: ['Trip'], where: { processed: false } });

        for (const delay of delays) {
            const trip = await this.tripsService.findTripById(delay.Trip.id);

            if (trip) {
                // Get the current arrival time and add delay duration
                const newArrTime = new Date(trip.arrTime.getTime() + delay.duration * 60000); // Convert minutes to milliseconds

                // Update the trip's arrival time
                trip.arrTime = newArrTime;

                // Save the updated trip
                await this.tripRepository.save(trip);


                // Mark the delay as processed
                delay.processed = true;
                // Save the updated delay
                await this.delayRepository.save(delay);
            }
        }
    }


}


