import { Component, OnInit,Injectable } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular'

import { Http, Response, Headers, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Shop_data,shopSettings } from './Shop.model';
import { HttpService } from '../../../providers/HttpService';

import { Post } from '../../../model/post-model';

@Injectable()
export class ShopService {
    shop_data: Shop_data=new Shop_data();
    shopsettings: shopSettings=new shopSettings();
    public mobiles: Shop_data;
    public ProListdata: Shop_data;
  // mobiles: any;
  // ProListdata: any;
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

     Shopdecinfo(){
        let options = <Post>{"shopId":3};
        this.httpService.get('shop/shopDetail', options).map((res: Response) => res.json())
            .subscribe(res => {
                if(res.code==200){
                    this.shop_data=res['data']['datas'][0];
                    this.shopsettings = this.shop_data.shopSettings;//优惠买单
                    // this.shopPicdds = this.shop_data.shopPictures;//轮播广告
                    // this.shopSet = this.shop_data.shopSettings;//优惠买单
                    // this.shopRec = this.shop_data.shopRecommend;//本地推荐
                    // this.localItemlist = this.shop_data.localItem;//商品
                }
            }, err => {
                
            })
     }
    handleError(){
		console.error(arguments);
	}
}