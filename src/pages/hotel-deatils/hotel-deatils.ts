import { Component,ViewChild, OnInit ,Input} from '@angular/core';
import { Content,NavController, NavParams} from 'ionic-angular';

import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { MapPage } from '../../pages/travel/map/map';
import { HttpService } from '../../providers/HttpService';
import { Slides } from 'ionic-angular';
import { prod_data,shengyu,roomList,userAppraise,easyHotel } from './hotel-deatils.module'
import { UerPingjia } from '../user-ping/user-ping'
/**
 * Generated class for the HotelDeatilsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-hotel-deatils',
  templateUrl: 'hotel-deatils.html',
  providers:[HttpService]
})
export class HotelDetails {
  @ViewChild(Content) content: Content;
  @ViewChild(Slides) slides: Slides;
  promsgId:any;
  prod_data: prod_data=new prod_data();
  roomTempId:any;
  shengyu: shengyu= new shengyu();
  startDay:any;
  endDay:any;
  hotelId:any;
  howmany:any;
  price:any;
  roomList:roomList = new roomList();
  easyHotel:easyHotel = new easyHotel();
  userAppraise:userAppraise=new userAppraise();
  constructor(private httpService:HttpService,public navCtrl: NavController, public navParams: NavParams) {
    this.roomTempId=navParams.get('roomId');
    this.startDay=navParams.get('startDay');
    this.endDay=navParams.get('endDay');
    this.hotelId=navParams.get('hotelId');
    this.howmany=navParams.get('howmany');

  }

  ionViewDidLoad() {
    this.hotelDec();
    this.shengyuFangjian()
    this.getRoomList()
    this.getUserAppraise()
    this.getEasyHotel()
  }
  hotelDec(){
        this.httpService.get('/hotelRoomTemplate/detail?roomTempId='+this.roomTempId).map((res: Response) => res.json())
            .subscribe(res => {
                if(res.code==200){
                    this.prod_data = res['data'];
                    this.price=res['data'].price
                    console.log(this.prod_data)

                }
            }, err => {

            })
  }
  shengyuFangjian(){//该房型剩余多少
    this.httpService.get("/hotelRoomTemplate/getUsableCount?startDay="+this.startDay+"&endDay="+this.endDay+"&roomTempId="+this.roomTempId).map((res: Response) => res.json())
        .subscribe(res => {
            if(res.code==200){
                this.shengyu=res['data']
                console.log(this.shengyu)
            }
        }, err => {

        })
  }
  getUserAppraise(){//获取网友评价
    this.httpService.get('/hotelEvaluation/pageByRoomTempId?roomTempId='+this.roomTempId+'&pageSize=2&pageNumber=1').map((res:Response)=>res.json())
    .subscribe(res=>{
      if(res.code==200){

        this.userAppraise=res['data']
        for (let i in this.userAppraise['datas']) {
          this.userAppraise['datas'][i].isShowTxt = true
        }
        console.log(this.userAppraise)
      }
    },err=>{

    })

  }
  getWinodowSize(item,url){
    let obj={
      'urlArray':item
    }
    GotoApp("urlArray"+JSON.stringify(obj))
    console.log(obj)
  }
  callshop(mobile){
    GotoApp('callshop'+mobile);
  }
  getEasyHotel(){//获取酒店概况
    this.httpService.get('/hotel/simpleDetail?hotelId='+this.hotelId).map((res:Response)=>res.json())
    .subscribe(res=>{
      if(res.code==200){
          this.easyHotel=res['data']
          console.log(this.easyHotel)
      }
    },err=>{

    })

  }
  //跳转到其他房型
  jumpOtherRoom(item){
    location.hash="#/hotelDetails/"+item.id+"/"+this.startDay+"/"+this.endDay+"/"+item.hotelId+"/"+this.howmany
    // console.log(location)
    // console.log(item.id,item.hotelId)
    // this.roomTempId=item.id
    // this.hotelId=item.hotelId
    // this.hotelDec();
    // this.shengyuFangjian()
    // this.getRoomList()
    // this.getUserAppraise()

  }
  //立即购买
    buy() {
        let obj={
          hotelId:this.hotelId,
          roomId:this.roomTempId,
          howmany:this.howmany,
          startDay:this.startDay,
          endDay:this.endDay,
          price:this.price,
          templateName:this.prod_data.templateName,
          canBookRoomCount:this.shengyu.canBookRoomCount
        }
        GotoApp('roomDetail'+JSON.stringify(obj));
    }
    showAllTxt(ev, item) {
      ev.target.innerHTML = " "
      item.isShowTxt = false
    }
  getRoomList(){//获取房型列表
    let date = new Date();
    let startDay=this.startDay
    let endDay=this.endDay
    this.httpService.get("/hotelRoomTemplate/pageQueryUsable?startDay="+startDay+"&endDay="+endDay+"&hotelId="+this.hotelId).map((res:Response)=>res.json())
    .subscribe(res=>{
      if(res.code==200){
        this.roomList=res['data']
        console.log(this.roomList)
      }
    },err=>{

    })
  }
  scrollHandler(event) {
        // this.content;
        // let contentPT=this.content.getContentDimensions();
        // if(contentPT.scrollTop>this.promsgId.offsetTop){
        // }else{
        // }
        //
        // GotoApp('y:'+contentPT.scrollTop);

    }
  jumpUserP(){
    this.navCtrl.push(UerPingjia, {
      shopId: this.roomTempId,
      type: "hotelDetail"
    })
  }

}
