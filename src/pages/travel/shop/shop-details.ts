// import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import { Component,ViewChild,OnInit ,Input ,NgZone } from '@angular/core';
import {Content,IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';

import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Post } from '../../../model/post-model';

import { Slides } from 'ionic-angular';

import { MapPage } from '../../../pages/travel/map/map';
import { ProductIonicPage } from '../../../pages/travel/product/product-details';
import { UerPingjia } from '../../user-ping/user-ping'
import { GlobalData } from '../../../providers/GlobalData';
import { HttpService } from '../../../providers/HttpService';
import { Shop_data, shopSettings,userAppraise,toltalpage,isShowTxt} from './Shop.model';
import { orderProductIonicPage } from '../product/orderproduct-details';
// import { Base_url } from '../../../providers/Constants';

declare let cordova: any;
@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'shop-details.html',
  providers:[HttpService]
})
@Injectable()

export class ShopIonicPage implements OnInit{
  @ViewChild(Content) content: Content;
  @ViewChild(Slides) slides: Slides;

// autoPlay(){
//     this.slides.startAutoplay();
// }
// ionViewDidEnter(){
//     this.slides.autoplayDisableOnInteraction = false;
// }
  id: string;
  shopId: string;
  isShowTxt:any;
  isShowImg:any;
  shop_data: Shop_data=new Shop_data();
  shopsettings: shopSettings=new shopSettings();
  toltalpage:toltalpage = new toltalpage();
  userAppraise:userAppraise = new userAppraise();
  public scrollAmount = 0;
//   isFix:boolean=false;
  isSpecial:number=1;
  offertitle:any;
  offertitletwo:any;
  type:any;
  bigImgUrl:any;
  offertitleoffsetTop:number;
  isPreferentialPay:boolean=false;
  sop:string='specialoffers';
  // public xxx: Observable<Array<string>>;
  constructor(
    public http: Http,
    public zone: NgZone,
    public navCtrl: NavController,
    public navParams: NavParams,
    private httpService:HttpService,
    // private shopService:ShopService,
    private alertCtrl: AlertController
    ){
      this.shopId=navParams.get('shopId');
      // this.servicerMobile=navParams.get('servicerMobile');
    }
//   ionViewDidEnter()
    ngOnInit() {
        this.isShowTxt=true
        this.isShowImg=false
        var that=this;
            that.offertitle = document.getElementById('offertitleo');
            this.offertitletwo = document.getElementById('offertitlet');
      setTimeout(function() {
            that.offertitleoffsetTop=that.offertitle.offsetTop;
      }, 200);
      this.Shopdec();
      this.getUserAppraise()
    }
  closeImgBox(){
    let bigImgBox=document.getElementById("pingjiaImgBig")
    bigImgBox.style.display="none"
  }
  getWinodowSize(item,url){
   let obj={
     'urlArray':item
   }
   GotoApp("urlArray"+JSON.stringify(obj))
   console.log(obj)
  }

  showAllTxt(ev,item){
    ev.target.innerHTML=" "
    item.isShowTxt=false
  }
  jumpUserP(){
    this.navCtrl.push(UerPingjia,{
      shopId:this.shopId,
      type:"shop"
      }
    )
  }
  Shopdec(){
      // let options = <Post>{"shopId":3};
        this.httpService.get('shop/shopDetail',  { shopId: this.shopId }).map((res: Response) => res.json())
            .subscribe(res => {
                if(res.code==200){
                    this.shop_data=res['data']['datas'][0];
                    this.shopsettings = this.shop_data.shopSettings;//优惠买单
                    console.log(res['data']);
                    
                }
            }, err => {

            })

  }

  getUserAppraise(){//获取网友评价 /shopEvaluation/pageByItemId
    this.httpService.get('/shopEvaluation/pageByShopId?shopId='+this.shopId+'&pageSize=2&pageNumber=1').map((res:Response)=>res.json())
    .subscribe(res=>{
      if(res.code==200){

        this.userAppraise=res['data']['datas']

        this.toltalpage=res['data']
        for(let i in this.toltalpage['datas']){
          this.toltalpage['datas'][i].isShowTxt=true
        }
        console.log(this.userAppraise)
      }
    },err=>{

    })

  }
  getShopName(){
    //  GotoApp(JSON.stringify({'xxx':'bbb','zzz':'bbbb'}));
    GotoApp('shopId'+this.shopId);
  }
   //地图
  GogoMap() {
      this.navCtrl.push(MapPage, {
          mapObj:JSON.stringify({
          name: this.shop_data.name,
          longitude: this.shop_data.longitude,
          latitude: this.shop_data.latitude
      })
    });
  }
  //跳转到原生点评
  jumpDianping(){
    let appObj={
      'shopId':this.shopId,
      'shopName':this.shop_data.name
    }
    GotoApp('shopDetails'+JSON.stringify(appObj))
  }
   //跳转详情
  gotoprodetail(id,type){
      if(type!='food'){
        this.navCtrl.push(orderProductIonicPage,{
            itemId: id
        });
      }else{
          this.navCtrl.push(ProductIonicPage,{
            itemId: id
        });
      }
  }
  //拨打电话
  callshop(){
    GotoApp('callshop'+this.shop_data.servicerMobile);
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
