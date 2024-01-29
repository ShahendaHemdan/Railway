import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseIntPipe, Patch, Post, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { ServicesService } from '../services/services.service';
import { UserDTO } from 'src/TypeORM/DTOs/UserDto';
import { Response } from 'express';

@Controller('users')
export class ControllersController {

    constructor(private userService: ServicesService) { }
    @Get()
    async getAllUsers() {
        const users = await this.userService.findAllUsers();

        // Map users to UserDTO objects

        const usersDTO: UserDTO[] = users.map(user => UserDTO.fromUser(user));
        if (usersDTO.length > 0) {
            return usersDTO;
        } else {
            throw new HttpException('There are no users', HttpStatus.NOT_FOUND);
        }
    }


    @Get(':id')
    async getUserById(@Param('id', ParseIntPipe) id: number) {
        const user = await this.userService.findUserById(id);
        const usersDTO: UserDTO[] = user.map(user => UserDTO.fromUser(user));
        if (usersDTO.length > 0) {
            return usersDTO;
        } else {
            throw new HttpException('There is no such user', HttpStatus.NOT_FOUND);
        }

    }

    @Post()
    @UsePipes(ValidationPipe)
    addUser(@Body() userDto: UserDTO, @Res() res: Response) {
        const user = this.userService.createUser(userDto);
        if (user) {
            res.status(200).send({ msg: 'User added successfully' });

        } else {
            throw new HttpException('User Not Saved', HttpStatus.BAD_REQUEST);
        }
    }

    @Patch(':id')
    @UsePipes(ValidationPipe)
    async updateUser(@Param('id', ParseIntPipe) id: number, @Body() userDto: UserDTO, @Res() res: Response) {
        const user = await this.userService.findUserById(id);
        if (user[0]) {
            const updatedUser = await this.userService.updateUser(id, userDto);
            if (updatedUser.affected) {
                res.status(200).send({ msg: 'User Updated successfully' });
            } else {
                throw new HttpException('User Not Updated', HttpStatus.BAD_REQUEST);
            }
        } else {
            res.status(404).send({ msg: "User Not Found" })
        }

    }

    @Delete(':id')
    async deletUser(@Param('id', ParseIntPipe) id: number) {
        const deletedUser = await this.userService.deleteUser(id);
        if (deletedUser.affected) {
            return 'User Deleted successfly';
        } else {
            throw new HttpException('There are no such user', HttpStatus.NOT_FOUND);
        }
    }
}
