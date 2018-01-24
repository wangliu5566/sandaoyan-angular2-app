import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Base_url } from '../../../providers/Constants';
import { HttpService } from '../../../providers/HttpService';
import { Post } from '../../../model/post-model';
import { GlobalData } from '../../../providers/GlobalData';
import { UserInfo } from '../../../model/UserInfo';
import {Storage} from '@ionic/storage';


@Component({
  selector: 'page-appoint',
  templateUrl: 'appoint.html'
})
export class AppointPage {
  accountNo: string;
  token:string;
  selectedItem: any;
  appoints:any=[];
  listAllWait:any=[];
  appointBtn1:string='立即预约';
  appointBtn2:string='立即预约';
  appointBtn3:string='立即预约';
  appointBtn4:string='立即预约';
  appointBtncolor:string='';
  userInfo: UserInfo;
  townId:string;
  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController,
              public http: Http,private httpService:HttpService,private globalData: GlobalData,private storage: Storage) {
    this.token=this.navParams.get('token');
    //this.globalData.token='8075dad3-135c-4980-8558-937de80e0949';
    this.accountNo=navParams.get('accountNo');
    this.townId=this.navParams.get('townId')
    //this.token=navParams.get('token');
    if(this.token){
      this.globalData.token= this.token;
      this.unfinished();
      this.storage.get('UserInfo').then((userInfo: UserInfo) => {
        if(userInfo){
          this.userInfo = userInfo;
        }else{
          //httpService.GetcustomerF(userInfo);//获取用户信息
        }
      });
    }else{
      let alertPwdError = this.alertCtrl.create({
        title: '提示',
        message: '登录超时请重新登录！',
        buttons: [
          {
            text: '确 定',
            handler: () => {
              console.log('Buy clicked');
              //this.login();
            }
          }
        ]
      });
      alertPwdError.present();
    }
  }
  //login(){
  //  let options = <Post>{"account":"13881828520","password":"11111a"};
  //  this.httpService.get('private/wrist/bindAccount',options).map((res: Response) => res.json())
  //    .subscribe(res => {
  //      if(res.code==200){
  //        alert(1);
  //      }
  //    }, err => {
  //
  //    })
  //}
  //getInfo(){
  //  let options = <Post>{};
  //    this.httpService.get('medicalReserve/listAllType',options).map((res: Response) => res.json())
  //      .subscribe(res => {
  //        if(res.code==200){
  //          this.appoints = res['data'];
  //          console.log(res['data']);
  //        }
  //      }, err => {
  //
  //      })
  //}
  //立即预约
  appoint(type,num) {
    
    let options = {"reserveType":type,"townId":this.townId};
    this.httpService.newPost('private/medicalReserve/reserve',options).map((res: Response) => res.json())
      .subscribe(res => {
        console.log(res);
        
        if(res.code==200){
          if(num=="1"){
            this.appointBtn1 = "已预约";
          }else if(num=="2"){
            this.appointBtn2 = "已预约";
          }else if(num=="3"){
            this.appointBtn3 = "已预约";
          }else if(num=="4"){
            this.appointBtn4 = "已预约";
          }
        }
      }, err => {

      })
  }
  unfinished(){
    this.httpService.get('private/medicalReserve/listAllWait?townId='+this.townId).map((res: Response) => res.json())
      .subscribe(res => {
        if(res.code==200){
          var datas=res['data'];
          for(var i=0;i < datas.length ; i++){
            if(datas[i].status=="wait"){
              if(datas[i].type=="basic"){
                this.appointBtn1 = "已预约";
              }else if(datas[i].type=="older"){
                this.appointBtn2 = "已预约";
              }else if(datas[i].type=="hypertension"){
                this.appointBtn3 = "已预约";
              }else if(datas[i].type=="diabetes"){
                this.appointBtn4 = "已预约";
              }
            }
          }
        }
      }, err => {

      })
  }
  //appointAlert(type){
  //  let confirm = this.alertCtrl.create({
  //    title: '提示',
  //    message: '预约成功，请等待医生与您联系',
  //    buttons: [
  //      {
  //        text: '确定',
  //        handler: () => {
  //          console.log('确定 clicked');
  //          this.appoint(type);
  //        }
  //      },
  //      {
  //        text: '取消',
  //        handler: () => {
  //          console.log('取消 clicked');
  //        }
  //      }
  //    ]
  //  });
  //  confirm.present();
  //}




  //show(){
  //  var obj = document.getElementById("text");
  //  var open = document.getElementById("open");
  //  if(obj.style.height < "45"){
  //    open.style.display = "none"
  //  }
  //}
  //点击展开/收缩
  //open(){
  //  var obj = document.getElementById("text").style;
  //  var icon = document.getElementById("open-icon");
  //  var text = document.getElementById("open-text");
  //  if(obj.height == "auto"){
  //    obj.height="45px";
  //    obj.overflow="hidden";
  //    text.innerHTML = "展开更多内容";
  //    icon.classList.remove("up");
  //  }else{
  //    obj.height="auto";
  //    obj.overflow="";
  //    text.innerHTML = "收起更多内容";
  //    icon.classList.add("up")
  //  }
  //}
}
