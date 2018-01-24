import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Base_url } from '../../../providers/Constants';
/**
 * Generated class for the SubmitOrderPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
//@IonicPage()
@Component({
  selector: 'page-submit-order',
  templateUrl: 'submit-order.html',
})
export class SubmitOrderPage {
  count:number;
  price:number;
  phone:number;
  id:number;
  marketPrice:number;
  //name:any={};
  //detail:any={};
  datas:any={};
  mobiles:any={};
  mobile:number;
  localOrderItemList:any={};
  constructor(public navCtrl: NavController, public navParams: NavParams,public http: Http) {
    console.log(this.navParams.data);
    this.id = navParams.get('itemId');
    console.log(this.id);
    this.getInfo();
  }

  change(num){
    //num = num.substring(0,3) + '****' + num.substr(7);
  }
  //增加
  add(){
    this.count = this.count + 1;
  }
  //减少
  reduce(){
    if(this.count > 1){
      this.count = this.count - 1;
    }else{
      this.count = 1;
    }
  }

  getInfo(){
    this.http.get(Base_url+'private/localOrder/detail?itemId=' + this.id).subscribe(res=> {
      this.mobiles = res.json().data;
      this.localOrderItemList = this.mobiles.localOrderItemList[0];
      console.log(this.datas);
      this.count = this.mobiles.number;
      this.price = this.localOrderItemList.salePrice;
      this.marketPrice = this.localOrderItemList.marketPrice;
      this.phone = this.mobiles.mobile;
      //this.name = this.mobiles.itemName;
      //this.detail = this.mobiles.item.detail;
    })
  }
}
