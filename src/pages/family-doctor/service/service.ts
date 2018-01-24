
import { Component,ViewChild } from '@angular/core';
import {Content,IonicPage, NavController, NavParams,AlertController } from 'ionic-angular'
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Slides } from 'ionic-angular';
import { Base_url } from '../../../providers/Constants';
import { HttpService } from '../../../providers/HttpService';
import { Post } from '../../../model/post-model';
import { GlobalData } from '../../../providers/GlobalData';
import { UserInfo } from '../../../model/UserInfo';
import {Storage} from '@ionic/storage';
import { typeList } from './service.model';

@Component({
  selector: 'page-service',
  templateUrl: 'service.html'
})
export class ServicePage {
  @ViewChild(Content) content: Content;
  @ViewChild(Slides) slides: Slides;
  accountNo: string;
  token:string;
  selectedItem: any;
  name:string;
  age:string;
  card:string;
  gender:string;
  phone:string;
  signedType:string;
  flag1:boolean=false;
  flag2:boolean=false;
  userInfo: UserInfo;
  xb:string;
  lb:string;
  townId:string;
  typeList:typeList = new typeList();
  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController,public http: Http,
              private httpService:HttpService,private globalData: GlobalData,private storage: Storage) {
    //this.globalData.token='4c774751-9d97-488c-a7af-b0589441f191';
    this.token=this.navParams.get('token');
    console.log(this.token)

    this.townId=this.navParams.get('townId')
    //this.token=navParams.get('token');
    if(this.token){
      this.globalData.token= this.token;
      this.sign();
      this.storage.get('UserInfo').then((userInfo: UserInfo) => {
        if(userInfo){
          this.globalData.token= this.token;
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
            text: '确定',
            handler: () => {
              console.log('Buy clicked');
            }
          }
        ]
      });
      alertPwdError.present();
    }
  }
  ionViewDidLoad() {
    this.getTypeList()
  }
  getTypeList(){
    this.httpService.get('/medicalSigned/listAllType').map((res: Response) => res.json())
      .subscribe(res => {
        if(res.code==200){
          this.typeList=res['data']
          console.log(this.typeList)
        }
      }, err => {

      })

  }

  //性别
  sex() {
    let alert = this.alertCtrl.create();
    alert.setTitle('请选择性别');

    alert.addInput({
      type: 'radio',
      label: '男',
      value: 'male',
      checked: true
    });
    alert.addInput({
      type: 'radio',
      label: '女',
      value: 'female',
      checked: false
    });
    alert.addButton('取消');
    alert.addButton({
      text: '确定',
      handler: data => {
        //this.testRadioOpen = false;
        //this.testRadioResult = data;
        if(data == "male"){
          this.xb = "男";
        }else if(data == "female"){
          this.xb = "女";
        }
        document.getElementById("sex").innerHTML = this.xb + " ";
        this.gender = data;
        this.flag1 = true;
        this.yz();
      }
    });
    alert.present();
  }
  //类别
  category(){
    let alert = this.alertCtrl.create();
    alert.setTitle('类别');
    for(let x in this.typeList){
      if(x=="0"){
        let oldObj={
          type:'radio',
          label:this.typeList[x].msg,
          value:this.typeList[x].value,
          checked:true
        }
        alert.addInput(oldObj)
      }else{
        let oldObj={
          type:'radio',
          label:this.typeList[x].msg,
          value:this.typeList[x].value,
          checked:false
        }
        alert.addInput(oldObj)

      }

    }
    alert.addButton('取消');
    alert.addButton({
      text: '确定',
      handler: data => {
        //this.testRadioOpen = false;
        //this.testRadioResult = data;
        for(let x in this.typeList){
          if(data==this.typeList[x].value){
            this.lb=this.typeList[x].msg
          }
        }
        document.getElementById("category").innerHTML = this.lb + " ";
        this.flag2 = true;
        this.signedType = data;
        this.yz();
      }
    });
    alert.present();
  }
  //调到底部
  scrollToTop() {
    this.content.scrollToTop();
  }
  goBottom(){
    let top = document.getElementById("message").offsetTop;
    this.content.scrollTo(0, top-44, 800);
  }
  //同意按钮
  yz(){
    var btn = document.getElementById("agree-btn");
    var id = /^[1-9]{1}[0-9]{14}$|^[1-9]{1}[0-9]{16}([0-9]|[xX])$/;
    var num = /^([1-9]\d*|0)(\.\d*[1-9])?$/;
    var tel = /^1[34578]\d{9}$/;
    btn.classList.remove("click");
    if(this.name == ''){
      return false;
    }
    if(this.age == "" || !num.test(this.age)){
      return false;
    }
    if(this.card == "" || !id.test(this.card)){
      return false;
    }
    if(this.phone == "" || !tel.test(this.phone)){
      return false;
    }
    if(this.flag1 != true){
      return false;
    }
    if(this.flag2 != true){
      return false;
    }
    btn.removeAttribute("disabled");
    btn.classList.add("click");
  }
  submit(){
    //debugger;
    let options ={"name":this.name,"gender":this.gender,"age":this.age,"idCard":this.card,"cellphone":this.phone,"signedType":this.signedType,"townId":this.townId};
    this.httpService.newPost('/private/medicalSigned/add', options).map((res: Response) => res.json())
      .subscribe(res => {
        if(res.code==200){
          this.tip();
          var agree = document.getElementById("agree-btn");
          agree.classList.remove("click");
          //agree.setAttribute('disabled');
        }
      }, err => {
        //console.log(1);
      })
  }
  tip() {
    this.alertCtrl.create({
      title: '提示',
      message: '签订成功！',
      buttons: [
        {
          text: '确定',
          handler: () => {
            GotoApp('SuccessFU');
            //this.login();
          }
        }
      ]
    }).present();

  }
  sign(){
    this.httpService.get('private/medicalSigned/get?townId='+this.townId,).map((res: Response) => res.json())
      .subscribe(res => {
        if(res.code==200){
          //debugger;
          document.getElementById("message").style.display = "none";
          document.getElementById("agree-btn").style.display = "none";
        }
      }, err => {

      })
  }

}
