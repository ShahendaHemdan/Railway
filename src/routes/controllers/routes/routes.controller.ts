import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Put, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { RouteDTO } from 'src/TypeORM/DTOs/RouteDto';
import { Route } from 'src/TypeORM/entities/Route';
import { RoutesService } from 'src/routes/services/routes/routes.service';
import { Response } from 'express';


@Controller('routes')
export class RoutesController {


    constructor(private routeService:RoutesService){}

    @Get()
    async getAllRoutes(){
        const routes=await this.routeService.findAllRoutes();
        
        if(routes[0]){
             //Map Station Obj To Dto
             const routeDTOs = routes.map(route => RouteDTO.fromPlainObject(route));
            
            return routeDTOs;
        }else{
            throw new HttpException('There are no Routes',HttpStatus.NOT_FOUND);
        }
    }


  @Get(':id')
  async getRouteById(@Param('id',ParseIntPipe) id:number){
    const route=await this.routeService.findRouteById(id);
    if(route){
        //Map Station Obj To Dto
        const routeDTO = RouteDTO.fromPlainObject(route);
            
        return routeDTO;
    }else{
        throw new HttpException('Route Not Found',HttpStatus.NOT_FOUND);
    }
  }

    @Post()
    @UsePipes(ValidationPipe)
    addRouten(@Body() routeDetails:Route,@Res() res:Response){
        const route= this.routeService.createRoute(routeDetails);
        if(route){
            return res.status(200).send({msg:"Route Added Successfully"});
        }else{
            throw new HttpException('Route Not Saved',HttpStatus.BAD_REQUEST);
        }
    }

  @Put(':id')
  @UsePipes(ValidationPipe)
  async updateRoute(@Param('id',ParseIntPipe) id:number,@Body() routeDetails:Route,@Res() res:Response){
    const updatedRoute=await this.routeService.updateRoute(id,routeDetails);
    if(updatedRoute.affected){
        return res.status(200).send({msg:"'Route Updated successfly"});

    }else{
        throw new HttpException('Route Not Updated',HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async deletRoute(@Param('id',ParseIntPipe) id:number,@Res() res:Response){
    const deletedRoute=await this.routeService.deleteRoute(id);
    if(deletedRoute.affected){
        return res.status(200).send({msg:"Route Deleted successfly"});
    }else{
        throw new HttpException('There is no such Route',HttpStatus.NOT_FOUND);
    }
  }

}


