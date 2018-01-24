import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,AlertController} from 'ionic-angular';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { HttpService } from '../../providers/HttpService';
import { docObj, yuyueObj, isshow, ishave, shebaoCard, pmNo,amNo } from './doc-particulars.module'
import { GlobalData } from '../../providers/GlobalData';
import { UserInfo } from '../../model/UserInfo';
import {Storage} from '@ionic/storage';
/**
 * Generated class for the DocParticularsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-doc-particulars',
  templateUrl: 'doc-particulars.html',
})
export class DocterPar {
  docId:any;
  docObj: docObj = new docObj();
  token:any;
  userInfo:any;
  alertCtrl:any;
  gerenxinxi:any;
  name:any;
  idCard:any;
  yuyueObj:any;
  shebaoCard:any;
  isshow:any;
  ishave:any;
  schedueId:any;
  orderNo:any;
  amNo:any;
  pmNo:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, private httpService: HttpService, private globalData: GlobalData
  ,private storage: Storage,alertCtrl: AlertController) {
    this.docId = this.navParams.get("docId")
    this.token = this.navParams.get("token")
    if(this.token){
      this.globalData.token= this.token;
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
    this.name=""
    this.idCard=""
    this.shebaoCard=""
    this.getDoc()
    this.detailByCustomerId()
    this.isshow=false
  }
  getDoc(){
    this.httpService.get('/hospitalDoctor/detail?id=' + this.docId).map((res: Response) => res.json())
      .subscribe(res => {
        if (res.code == 200) {
          this.docObj = res['data']
          console.log(this.docObj);
          let amNo;
          if (this.docObj.amSchedue){
            amNo = (this.docObj.maxSchedueAMCount) - (this.docObj.amSchedue.registerCount)  
          }else{
            amNo=0
          }
          let pmNo;
          if (this.docObj.pmSchedue) {
            pmNo = (this.docObj.maxScheduePMCount) - (this.docObj.pmSchedue.registerCount)
          }else{
            pmNo=0
          }

          this.pmNo=pmNo
          this.amNo=amNo
       }
      }, err => {

      })
  }
  detailByCustomerId(){
     this.httpService.get('/private/hospitalPatientInfo/detailByCustomerId').map((res: Response) => res.json())
       .subscribe(res => {
         console.log(res);
         if (res.code == 200) {
           this.idCard=res['data'].idCard
           this.name=res['data'].name
           this.saveOrUpdate()
           this.ishave=true
         }else{
           this.ishave=false
         }
       }, err => {
          this.ishave=false
       })
   }
   noBTN(){
     if(this.ishave){
       GotoApp("goGuahao")
     }else{
       console.log("ishave:false")
       this.isshow=false
     }
   }
   yseBTN(){
    if(this.name==""||this.idCard==""){
      alert("缺少必要信息未填写")
    }else{
      if (this.ishave) {
        console.log(this.schedueId)
        this.httpService.newPost('/private/hospitalRegisterOrder/create', {
          "schedueId": this.schedueId,
        }).map((res: Response) => res.json())
          .subscribe(res => {
            if (res.code == 200) {
              console.log(res)
              this.orderNo = res.data
              GotoApp("guahaoNo" + this.orderNo)
            }
          }, err => {
            console.log("no IN")
          })
      } else {
        console.log(this.name, this.idCard, this.shebaoCard)
        this.saveOrUpdate()
        this.httpService.newPost('/private/hospitalRegisterOrder/create', {
          "schedueId": this.schedueId,
        }).map((res: Response) => res.json())
          .subscribe(res => {
            if (res.code == 200) {
              console.log(res)
              this.orderNo = res.data
              GotoApp("guahaoNo" + this.orderNo)
            }
          }, err => {
            console.log("no IN")
          })
      }
    }


   }
   closeTC(){
     this.isshow=false
   }
   saveOrUpdate(){
      this.httpService.newPost('/private/hospitalPatientInfo/saveOrUpdate',{
        "name":this.name,
        "idCard":this.idCard,
        "medicalInsurance":this.shebaoCard
      }).map((res: Response) => res.json())
        .subscribe(res => {
          if (res.code == 200) {
            this.yuyueObj=res['data']
            console.log(this.yuyueObj)
          }
        }, err => {
          console.log("no IN")
        })
    }
    GoYuyue(type){
      if(type=="amSchedue"){
        this.schedueId=this.docObj.amSchedue.id
        console.log(this.schedueId)
      }else{
        this.schedueId=this.docObj.pmSchedue.id
        console.log(this.schedueId)
      }
      this.isshow=true
    }
}
