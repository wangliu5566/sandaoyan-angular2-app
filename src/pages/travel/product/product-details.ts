import { Component,ViewChild, OnInit ,Input} from '@angular/core';
import { Content,NavController, NavParams} from 'ionic-angular';

import { Http, Response, Headers, RequestOptions } from '@angular/http';

// import {SubmitOrderPage} from '../../submit-order/submit-order';

import { MapPage } from '../../../pages/travel/map/map';
// import { Post } from '../../../model/post-model';
import { HttpService } from '../../../providers/HttpService';
import { ImgDetailsPage } from '../img-details/img-details';
import { UerPingjia} from '../../user-ping/user-ping';
import { Slides } from 'ionic-angular';

import { Prod_data,shop,userAppraise,toltalpage} from './product.model';
@Component({
  selector: 'pro-detail',
  templateUrl: 'product-details.html',
  providers:[HttpService]
})
export class ProductIonicPage implements OnInit {
  @ViewChild(Content) content: Content;
  @ViewChild(Slides) slides: Slides;

  id:string;
  itemId: string;
  promsgId:any;
  shopId:string;
  isShowTxt:any;
  bigImgUrl:any;
  prod_data: Prod_data=new Prod_data();
  shopmsg: shop=new shop();
  userAppraise: userAppraise=new userAppraise() ;
  toltalpage:toltalpage =new toltalpage();
  // autoPlay(){
  //   this.slides.startAutoplay();
  // }
  // ionViewDidEnter(){
  //     this.slides.autoplayDisableOnInteraction = false;
  // }

  constructor(public http: Http,
    private httpService:HttpService,public navCtrl: NavController, public navParams: NavParams) {
      this.itemId=navParams.get('itemId');
  }
  ngOnInit() {
      this.promsgId = document.getElementById('promsgId');
      this.isShowTxt=true
      this.Shopdec();
      // this.recoPro();
  }
  //
  getUserAppraise(){//获取网友评价 /shopEvaluation/pageByItemId
    this.httpService.get('/shopEvaluation/pageByShopId?shopId='+this.shopId+'&pageSize=2&pageNumber=1').map((res:Response)=>res.json())
    .subscribe(res=>{
      if(res.code==200){
        this.userAppraise=res['data']['datas']
        this.toltalpage=res['data']
        for(let i in this.toltalpage['datas']){
          this.toltalpage['datas'][i].isShowTxt=true
        }

      }
    },err=>{

    })

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
  jumpUserP(){
    this.navCtrl.push(UerPingjia, {
      shopId: this.shopId,
      type:"shop"
    });
  }
  showAllTxt(ev,item){
    ev.target.innerHTML=" "
    item.isShowTxt=false
  }
  Shopdec(){
        this.httpService.get('localItem/pageLocalItemDetail', { itemId: this.itemId}).map((res: Response) => res.json())
            .subscribe(res => {
                if(res.code==200){
                    this.prod_data = res['data']['datas'][0];
                    this.shopId=res['data']['datas'][0].shopId+""
                    this.shopmsg = this.prod_data.shop;//店铺信息
                    this.getUserAppraise();
                    console.log(this.prod_data)
                }
            }, err => {

            })
  }
  //获取商品列表
  // recoPro(){
  //   this.http.get(Base_url+'localItem/pageLocalItem?shopId=3')
  //   .subscribe(res=> {
  //     this.recoPros = res.json().data.datas;
  //   });
  // }
//地图
  GogoMap() {
      this.navCtrl.push(MapPage, {
          mapObj:JSON.stringify({
          name: this.shopmsg.name,
          longitude: this.shopmsg.longitude,
          latitude: this.shopmsg.latitude
      })
    });
  }

//立即购买
  buy() {
      // let itemobj = {
      //     itemId: Obj.itemId,//商品id
      // }
      // this.navCtrl.push(ProductIonicPage, {
      //     itemobj:JSON.stringify(itemobj)
      // })
      GotoApp('itemId'+this.itemId);
  }
  more(id) {
    this.navCtrl.push(ImgDetailsPage, {
      itemId: id
    });
  }
  //跳转详情
  gotoprodetail(id){
    this.navCtrl.push(ProductIonicPage,{
      // itemId:'1'
      itemId:id
    });
  }

  //拨打电话
  callshop(){
    GotoApp('callshop'+this.shopmsg.servicerMobile);
  }

  segmentChanged(elementId:string){
      let yOffset = document.getElementById(elementId).offsetTop-64;
      this.content.scrollTo(0, yOffset, 1000)
      // this.content;

  }
  scrollHandler(event) {
        // this.content;
        let contentPT=this.content.getContentDimensions();
        if(contentPT.scrollTop>this.promsgId.offsetTop){
        }else{
        }

        GotoApp('y:'+contentPT.scrollTop);

    }
}
