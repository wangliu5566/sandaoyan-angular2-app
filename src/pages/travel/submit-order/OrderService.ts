import { Injectable } from '@angular/core';
import { HttpService } from '../../../providers/HttpService';
import { Base_url } from '../../../providers/Constants';


@Injectable()
export class OrderService{
  constructor(private httpService: HttpService) { }


}
