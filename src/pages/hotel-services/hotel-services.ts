import { Component,ViewChild,OnInit ,Input ,NgZone } from '@angular/core';
import {Content,IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';

import { HotelServicesPageModule,fuwuLength } from './hotel-services.module';
import { HttpService } from '../../providers/HttpService';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

/**
 * Generated class for the HotelServicesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-hotel-services',
  templateUrl: 'hotel-services.html',
})
export class HotelServices {
  hotelId:any;
  fuwuLength:any;
  HotelServicesPageModule:HotelServicesPageModule = new HotelServicesPageModule();
  constructor(public navCtrl: NavController, public navParams: NavParams,private httpService:HttpService) {
    this.hotelId=this.navParams.get("hotelId")
  }

  ionViewDidLoad() {
    this.getHotelDetails()
    // this.autoSize()
  }
  getHotelDetails(){
    this.httpService.get('hotel/detail?hotelId='+this.hotelId).map((res:Response)=>res.json())
    .subscribe(res=>{
      if(res.code==200){
        this.HotelServicesPageModule=res['data']
        this.fuwuLength=res['data']['serviceList']['length']

        console.log(this.HotelServicesPageModule)
      }
    },err=>{

    })
  }























  autoSize(){
    !(function(win, doc){
        function setFontSize() {
            // 获取window 宽度
            // zepto实现 $(window).width()就是这么干的
            var winWidth =  window.innerWidth;
            doc.documentElement.style.fontSize = (winWidth / 750) * 100 + 'px' ;

        }

        var evt = 'onorientationchange' in win ? 'orientationchange' : 'resize';

        var timer = null;

        win.addEventListener(evt, function () {
            clearTimeout(timer);

            timer = setTimeout(setFontSize, 300);
        }, false);

        win.addEventListener("pageshow", function(e) {
            if (e.persisted) {
                clearTimeout(timer);

                timer = setTimeout(setFontSize, 300);
            }
        }, false);

        //初始化
        setFontSize();

    }(window, document));
  }
}
