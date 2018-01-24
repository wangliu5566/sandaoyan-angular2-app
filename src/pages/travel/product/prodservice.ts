import { Component, OnInit,Injectable } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular'

import { Http, Response, Headers, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Prod_data } from './product.model';
import { HttpService } from '../../../providers/HttpService';

import { Post } from '../../../model/post-model';

@Injectable()
export class ShopService {
    prod_data: Prod_data=new Prod_data();
    // shopsettings: shopSettings=new shopSettings();
    datas:any={};
    shopPicdds:any=[];
    ProListdatas:any=[];
    localItemlist:any=[];
    shopRec:any=[];
    isPreferentialPay:any = false;
    isBuy: any = false;
    isWifi: any = false;
    isStop: any = false;
    isPayCard: any = false;
    shopSet:any = {};
    constructor(public httpService: HttpService,public http: Http) { 

    };

     prodecinfo(){
        let options = <Post>{"itemId":1};
        this.httpService.get('localItem/pageLocalItemDetail', options).map((res: Response) => res.json())
            .subscribe(res => {
                if(res.code==200){
                    this.prod_data=res['data']['datas'][0];
                }
            }, err => {
                
            })
     }
    handleError(){
		console.error(arguments);
	}
}