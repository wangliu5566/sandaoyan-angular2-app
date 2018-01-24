import { Component,OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController} from 'ionic-angular';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Storage} from '@ionic/storage';

import { GlobalData } from '../../../providers/GlobalData';

import { Refund_data} from './refund.module';
import { UserInfo } from '../../../model/UserInfo';
import { OrderIonicPage } from '../orders/orders-detail';
import { HttpService } from '../../../providers/HttpService';

@Component({
  selector: 'page-refund',
  templateUrl: 'refund.html',
  providers:[HttpService]
})
export class RefundPage implements OnInit {
  orderObj: any;
//   orderNo: string;
  token:string;
  userInfo: UserInfo;
  refund_data: Refund_data=new Refund_data();

  constructor(public http: Http,
    private httpService:HttpService,public navCtrl: NavController, public navParams: NavParams,
    public alertCtrl: AlertController,private storage: Storage,private globalData: GlobalData) {
    //   this.orderNo=navParams.get('orderNo');
      this.orderObj = JSON.parse(navParams.get('orderObj'));
    //   this.refundbtn(this.orderObj.orderNo);
      this.token = this.orderObj.token;
      if(this.token){
            this.globalData.token =this.token;
        }
  }
   ngOnInit() {}
    // RefundInfo(orderNo: string){
    // this.httpService.get('private/pay/refund', {orderNo: orderNo}).map((res: Response) => res.json())
    //     .subscribe(res => {
    //         if(res.code==200){
    //             this.refund_data = res['data'];
    //             //deubgger;
    //         }
    //     }, err => {
            
    //     })
    // }
    refundbtn(){
      let options ={"orderNo":this.orderObj.orderNo,"accessToken":this.token};
      this.httpService.get('private/pay/refund', options).map((res: Response) => res.json())
        .subscribe(res => {
            if(res.code==200){
                 this.navCtrl.push(OrderIonicPage,{
                   orderNo: this.orderObj.orderNo,
                   accessToken: this.token
                 });
            }
        }, err => {
            
        })
    }
}
