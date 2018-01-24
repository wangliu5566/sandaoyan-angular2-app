import { Component,OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Base_url } from '../../providers/Constants';
import { toltalpage,userAppraise } from './user-ping.module';
import { GlobalData } from '../../providers/GlobalData';
import { HttpService } from '../../providers/HttpService';
import { Post } from '../../model/post-model';
/**
 * Generated class for the UserPingPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-user-ping',
  templateUrl: 'user-ping.html',
})
export class UerPingjia {
  shopId:string;
  bigImgUrl:any;
  toltalpage:toltalpage = new toltalpage();
  userAppraise:userAppraise = new userAppraise();
  type:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public http: Http,private httpService:HttpService) {
    this.shopId=this.navParams.get("shopId")
    this.type=this.navParams.get("type")
  }
  ngOnInit(){
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
  getUserAppraise(){//获取网友评价 /shopEvaluation/pageByItemId
    if(this.type=="shop"){
      this.httpService.get('/shopEvaluation/pageByShopId?shopId='+this.shopId).map((res:Response)=>res.json())
      .subscribe(res=>{
        if(res.code==200){
          this.userAppraise=res['data']['datas']
          this.toltalpage=res['data']
          for(let i in this.toltalpage['datas']){
            this.toltalpage['datas'][i].isShowTxt=true
          }
          console.log(this.toltalpage)
        }
      },err=>{

      })
    }
    if (this.type =="hotel"){
      this.httpService.get('/hotelEvaluation/pageByHotelId?hotelId='+this.shopId).map((res:Response)=>res.json())
      .subscribe(res=>{
        if(res.code==200){
          this.userAppraise=res['data']['datas']
          this.toltalpage=res['data']
          for(let i in this.toltalpage['datas']){
            this.toltalpage['datas'][i].isShowTxt=true
          }
          console.log(this.toltalpage)
        }
      },err=>{

      })
    }
    if (this.type == "hotelDetail") {
      this.httpService.get('/hotelEvaluation/pageByRoomTempId?roomTempId=' + this.shopId).map((res: Response) => res.json())
        .subscribe(res => {
          if (res.code == 200) {
            this.userAppraise = res['data']['datas']
            this.toltalpage = res['data']
            for (let i in this.toltalpage['datas']) {
              this.toltalpage['datas'][i].isShowTxt = true
            }
            console.log(this.toltalpage)
          }
        }, err => {

        })
    }
  }


}
