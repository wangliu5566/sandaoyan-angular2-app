import { Component, ViewChild, OnInit, Input } from '@angular/core';
import { Content, NavController, NavParams, AlertController } from 'ionic-angular';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Storage } from '@ionic/storage';

import { Post } from '../../model/post-model';
import { HttpService } from '../../providers/HttpService';

import { GlobalData } from '../../providers/GlobalData';
import { order_data, smallData, length} from './hotel-order.module';
import { Hotel} from '../hotel/hotel';
import { HotelDetails } from '../hotel-deatils/hotel-deatils';
/**
 * Generated class for the HotelOrderPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-hotel-order',
  templateUrl: 'hotel-order.html',
})
export class HotelOrderPage {
  token:any;
  orderNo:any;
  order_data: order_data = new order_data();
  smallData: smallData = new smallData();
  hotelId:any;
  howmany:any;
  rule:any;
  length:any;
  constructor(public http: Http,
    private httpService: HttpService, public navCtrl: NavController, public navParams: NavParams,
    public alertCtrl: AlertController, private storage: Storage, private globalData: GlobalData) {
    // this.globalData.token='e2d24b91-4ed8-4d23-b005-83c84435c36f';
    this.orderNo = navParams.get('orderNo');
    this.token = navParams.get('token');
    if (this.token) {
      this.globalData.token = this.token;
    }
  }

  ionViewDidLoad() {
    this.getOBJ()
    
  }
  getOBJ(){
    this.httpService.get('/private/hotelOrder/detail?orderNo=' + this.orderNo).map((res: Response) => res.json())
      .subscribe(res => {
        if (res.code == 200) {
          this.order_data = res['data']
          this.smallData = res['data']['hotel']
          this.hotelId = res['data']['hotelId']
          this.rule = res['data']['roomTemplate']['rule']
          this.length=this.rule.length
        }
      }, err => {

      })
  }
  goHt(){
    let inTime=document.getElementById("inTime").innerText
    let outTime = document.getElementById("outTime").innerText    
    this.navCtrl.push(Hotel,{
      hotelId:this.hotelId,
      startDay:inTime,
      endDay:outTime
   }) 
  }
  goRm(){
    let inTime = document.getElementById("inTime").innerText
    let outTime = document.getElementById("outTime").innerText   
    this.gethowmany(this.order_data.checkInTime,this.order_data.checkOutTime)
    this.navCtrl.push(HotelDetails,{
      roomId: this.order_data.roomTempId,
      startDay: inTime,
      endDay: outTime,
      hotelId:this.hotelId,
      howmany:this.howmany
    })
    // hotelDetails /:roomId /:startDay /:endDay /:hotelId /:howmany'
  }
  gethowmany(startDay, endDay) {//计算相隔多少天
    let startDayLongTime = (new Date(startDay).getTime()) / 1000
    let endDayLongTime = (new Date(endDay).getTime()) / 1000
    endDayLongTime > startDayLongTime ? this.howmany = (endDayLongTime - startDayLongTime) / 3600 / 24 : this.howmany = 0
  }
  callshop(mobile) {
    GotoApp('callshop' + mobile);
  }
}
