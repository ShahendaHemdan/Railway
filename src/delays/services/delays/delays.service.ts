import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Delay } from 'src/TypeORM/entities/Delay';
import { DelayDTO } from 'src/TypeORM/DTOs/DelayDto2';


@Injectable()
export class DelaysService {
    tripRepository: any;
    constructor(@InjectRepository(Delay) private delayRepository: Repository<Delay>,
       
    ) {


    }
    findAllDelays() {
        return this.delayRepository.find({ relations: ["Trip", "Train", "Station"] });
    }


    findDelayById(id: number) {
        return this.delayRepository.findOne({ where: { id }, relations: ["Trip", "Train", "Station"] });

    }



    async createDelaytWithDetails( delayDetails: DelayDTO): Promise<Delay> {

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
}

