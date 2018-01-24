import { Component,ViewChild, OnInit ,Input} from '@angular/core';
import { Content,NavController, NavParams,AlertController} from 'ionic-angular';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Storage} from '@ionic/storage';

import { Post } from '../../model/post-model';

import { GlobalData } from '../../providers/GlobalData';

//商品详情
import { ProductIonicPage } from '../travel/product/product-details';
//店铺详情
import { ShopIonicPage } from '../travel/shop/shop-details';



import { Order_data,shop,item} from '../me/orders/order.model';
import { UserInfo } from '../../model/UserInfo';
import { HttpService } from '../../providers/HttpService';
import { listDatas } from './reserve-deatils.module'

@Component({
  selector: 'reserve-deatils',
  templateUrl: 'reserve-deatils.html',
  providers:[HttpService]
})
export class ReserveDeatilsPage implements OnInit {

  orderNo: string;
  token:string;
  userInfo: UserInfo;
  order_data: Order_data=new Order_data();
  shopinfo: shop = new shop();
  itemdetail: item = new item();
  salePrice:number;
  imgsrc:string;
  shopId:string;
  itemId:string;
  listDatas: listDatas = new listDatas();
  itemList:any;
  constructor(public http: Http,
    private httpService:HttpService,public navCtrl: NavController, public navParams: NavParams,
    public alertCtrl: AlertController,private storage: Storage,private globalData: GlobalData) {
      // this.globalData.token='e2d24b91-4ed8-4d23-b005-83c84435c36f';
      this.orderNo=navParams.get('orderNo');
      this.token=navParams.get('token');
        if(this.token){
            this.globalData.token =this.token;
        }
    }
  ngOnInit() {
      this.OrderInfo();
      this.getOderDetails()
  }
  OrderInfo(){
    // this.http.get(Base_url+'/private/localOrder/detail?orderId=1')
    // let options = <Post>{"orderId":1};
        this.httpService.get('private/localReserveOrder/selectByOrderNo', { orderNo: this.orderNo}).map((res: Response) => res.json())
            .subscribe(res => {
                if(res.code==200){
                    if(res['data'].status=="used"){
                      res['data'].status="已验证"
                    }
                    if(res['data'].status=="canUse"){
                      res['data'].status="待验证"
                    }
                    this.order_data = res['data'];

                    this.itemId=this.order_data.itemId+""
                    this.shopinfo = this.order_data.shop;//商家信息
                    this.itemdetail = this.order_data.item;//副标题
                    this.shopId=this.order_data.shopId+""
                    console.log(this.order_data)
                    this.httpService.get('/shop/shopDetail',{shopId:this.shopId}).map((res:Response)=>res.json())
                        .subscribe(res=>{
                          if(res.code==200){
                            res['data']['datas'][0].servicerMobile='tel:'+res['data']['datas'][0].servicerMobile
                            this.listDatas=res['data']['datas'][0]
                            console.log(this.listDatas.servicerMobile)
                          }
                        },err=>{

                        })
                    this.httpService.get('/localItem/pageLocalItemDetail',{itemId:this.itemId}).map((res:Response)=>res.json())
                            .subscribe(res=>{
                              if(res.code==200){
                                this.itemList=res['data']['datas'][0].localItemDetails[0].title
                                console.log(this.itemList)
                              }
                            },err=>{

                            })

                }
            }, err => {

            })


  }
  getOderDetails(){

  }
  payment(){
      let payorderObj = {
          orderNo: this.orderNo,
          itemName: this.order_data.itemName,
          itemSubTitle: this.order_data.itemSubTitle || '暂无信息',
          type: this.order_data.type,
          actualAmount: this.order_data.actualAmount
      }
     GotoApp('payment'+JSON.stringify(payorderObj));
  }
  //拨打电话
  // callshop(){
  //   GotoApp('callshop'+this.shopinfo.servicerMobile);
  // }
  gotoprodec(id){
    this.navCtrl.push(ProductIonicPage,{
      itemId:id
    });
  }
  gotoshopdec(id){
    this.navCtrl.push(ShopIonicPage,{
      shopId:id
    });
  }

  opencode(OBJ){
    this.imgsrc=OBJ.useQrCode;
  }

}
