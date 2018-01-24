import { Component,ViewChild, OnInit ,Input} from '@angular/core';
import { Content,NavController, NavParams} from 'ionic-angular';

import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { MapPage } from '../../../pages/travel/map/map';
import { HttpService } from '../../../providers/HttpService';
import { ImgDetailsPage } from '../img-details/img-details';

import { Slides } from 'ionic-angular';

import { Prod_data,shop,ShopTraceDetail_data} from './product.model';
@Component({
  selector: 'pro-detail',
  templateUrl: 'orderproduct-details.html',
  providers:[HttpService]
})
export class orderProductIonicPage implements OnInit {
  @ViewChild(Content) content: Content;
  @ViewChild(Slides) slides: Slides;

  id:string;
  itemId: string;
  shoptosoure:boolean;
  promsgId:any;
  prod_data: Prod_data=new Prod_data();
  shoptosoure_data: ShopTraceDetail_data=new ShopTraceDetail_data();
  shopmsg: shop=new shop();

  constructor(public http: Http,
    private httpService:HttpService,public navCtrl: NavController, public navParams: NavParams) {
      this.itemId=navParams.get('itemId');
  }
  ngOnInit() {
      this.promsgId = document.getElementById('promsgId');
      this.Shopdec();
      this.ShopTosoure();
  }
  //
  Shopdec(){
        this.httpService.get('localItem/pageLocalItemDetail', { itemId: this.itemId}).map((res: Response) => res.json())
            .subscribe(res => {
                if(res.code==200){
                    this.prod_data = res['data']['datas'][0];
                    this.shopmsg = this.prod_data.shop;//店铺信息
                }
            }, err => {

            })
  }
  //溯源信息
  ShopTosoure(){
        this.httpService.get('traceEntity/detailByItemId', { itemId: this.itemId}).map((res: Response) => res.json())
            .subscribe(res => {
                if(res.code==200){
                    this.shoptosoure_data = res['data']['datas'][0];
                    debugger;
                }
            }, err => {

            })
  }
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
      let buyObj = {
          itemId: this.itemId,
          type: this.prod_data.type
      }
      GotoApp('itemId+type'+JSON.stringify(buyObj));
  }
  more(id) {
    this.navCtrl.push(ImgDetailsPage, {
      itemId: id
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
