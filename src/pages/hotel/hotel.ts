import { Component,ViewChild,OnInit ,Input ,NgZone } from '@angular/core';
import {Content,IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';

import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Post } from '../../model/post-model';

import { Slides } from 'ionic-angular';

import { MapPage } from '../../pages/travel/map/map';
import { ProductIonicPage } from '../../pages/travel/product/product-details';
import { UerPingjia } from '../user-ping/user-ping'
import { HotelServices } from '../hotel-services/hotel-services'
import { GlobalData } from '../../providers/GlobalData';
import { HttpService } from '../../providers/HttpService';
import { hotelPageModule,fuwuArray,userAppraise,toltalpage,roomList,howmany } from './hotel.module';
import { HotelDetails } from '../../pages/hotel-deatils/hotel-deatils'
/**
 * Generated class for the HotelPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-hotel',
  templateUrl: 'hotel.html',
})
export class Hotel {
  @ViewChild(Content) content: Content;
  @ViewChild(Slides) slides: Slides;
  hotelPageModule:hotelPageModule = new hotelPageModule();
  hotelId:any;
  offertitleoffsetTop:number;
  isPreferentialPay:boolean=false;
  sop:string='specialoffers';
  public scrollAmount = 0;
  isSpecial:number=1;
  offertitle:any;
  offertitletwo:any;
  id: string;
  isShowTxt:any;
  isShowImg:any;
  fuwuLength:any;
  userAppraise:userAppraise= new userAppraise();
  fuwuArray:fuwuArray = new Array();
  roomList:roomList =new Array();
  startDay:string;
  endDay:string;
  howmany:number;
  constructor(public navCtrl: NavController, public navParams: NavParams,public http: Http,private httpService:HttpService) {
    this.hotelId=this.navParams.get("hotelId")
    this.startDay=this.navParams.get("startDay")
    this.endDay=this.navParams.get("endDay")


  }
  ngOnInit() {
      this.isShowTxt=true
      this.isShowImg=false
      var that=this;
          that.offertitle = document.getElementById('offertitleo');
          this.offertitletwo = document.getElementById('offertitlet');
    setTimeout(function() {
          that.offertitleoffsetTop=that.offertitle.offsetTop;
    }, 200);
  }
  ionViewDidLoad() {
    this.getHotelDetails()
    this.getUserAppraise()
    this.getRoomList()
    this.gethowmany()
  }
  jumpUserP(){
    this.navCtrl.push(UerPingjia,{
      shopId:this.hotelId,
      type:"hotel"
      }
    )
  }
  showAllTxt(ev, item) {
    ev.target.innerHTML = " "
    item.isShowTxt = false
  }
  gethowmany(){//计算相隔多少天
    // console.log(new Date(this.startDay).getDay());
    
    let startDayLongTime=(new Date(this.startDay).getTime())/1000
    let endDayLongTime=(new Date(this.endDay).getTime())/1000
    endDayLongTime>startDayLongTime?this.howmany=(endDayLongTime-startDayLongTime)/3600/24:this.howmany=0
  }
  getHotelDetails(){
    this.httpService.get('hotel/detail?hotelId='+this.hotelId).map((res:Response)=>res.json())
    .subscribe(res=>{
      if(res.code==200){
        this.hotelPageModule=res['data']
        this.fuwuArray=res['data']['serviceList']
        this.fuwuLength=res['data']['serviceList']['length']
        // console.log(this.fuwuArray,res['data']['serviceList']['length'])

        if(this.fuwuArray['length']>4){
          this.fuwuArray['splice'](0,4)
        }
      }
    },err=>{

    })
  }
  intime(ev){
    this.startDay=ev.target.value
    this.gethowmany()
    this.howmany===0?alert("日期选择错误"):this.getRoomList()
  }
  outtime(ev){
    this.endDay=ev.target.value
    this.gethowmany()
    this.howmany===0?alert("日期选择错误"):this.getRoomList()

  }
  getRoomList(){//获取房型列表
    let date = new Date();
    let startDay=this.startDay
    //date.getFullYear()+"-"+(date.getMonth()+1)+"-"+(date.getDate()+2)//默认今天
    let endDay=this.endDay
    //date.getFullYear()+"-"+(date.getMonth()+1)+"-"+(date.getDate()+3)//默认明天
    this.httpService.get("/hotelRoomTemplate/pageQueryUsable?startDay="+startDay+"&endDay="+endDay+"&hotelId="+this.hotelId).map((res:Response)=>res.json())
    .subscribe(res=>{
      if(res.code==200){
        this.roomList=res['data']['datas']
        console.log(this.roomList)
      }
    },err=>{

    })
  }
  gotoHotelDetail(roomId,isHave){
    if(Number(this.howmany)<16){
      console.log(roomId, isHave)
      if (isHave) {
        this.navCtrl.push(HotelDetails, {
          roomId: roomId,
          startDay: this.startDay,
          endDay: this.endDay,
          hotelId: this.hotelId,
          howmany: this.howmany
        })
      } else {
        console.log("no in");
      }
    }else{
      alert("最多预定15天")
    }

  }
  // morenIntime(){
  //     var mydateInput = document.getElementById("in");
  //     var date = new Date();
  //     var dateString = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
  //     mydateInput['value']=dateString;
  //     console.log(mydateInput,dateString)
  // }
  getUserAppraise(){//获取网友评价
    this.httpService.get('/hotelEvaluation/pageByHotelId?hotelId='+this.hotelId+'&pageSize=2&pageNumber=1').map((res:Response)=>res.json())
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
  }
  goFuwu(){
    this.navCtrl.push(HotelServices,{
      hotelId:this.hotelId
    })
  }
  callshop(mobile){
    GotoApp('callshop'+mobile);
  }
  //跳转到原生点评
  jumpDianping(){
    let appObj={
      'hotelId':this.hotelId,
      'hotelName':this.hotelPageModule.name
    }
    GotoApp('hotelDetails'+JSON.stringify(appObj))
  }
  segmentChanged(elementId:string){
      let yOffset = document.getElementById(elementId).offsetTop;
      this.content.scrollTo(0, yOffset, 1000)
  }
  scrollHandler(event) {
        let contentPT=this.content.getContentDimensions();
        if(contentPT.scrollTop>this.offertitleoffsetTop){
            this.offertitletwo.setAttribute('style', 'opacity:1');
        }else{
            this.offertitletwo.setAttribute('style', 'opacity:0');
        }
        GotoApp('y:'+contentPT.scrollTop);

    }
}
