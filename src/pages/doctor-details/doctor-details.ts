import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Base_url } from '../../providers/Constants';
import { GlobalData } from '../../providers/GlobalData';
import { HttpService } from '../../providers/HttpService';
import { Post } from '../../model/post-model';

import { dataList,doctorList } from './doctor-details.module';

/**
 * Generated class for the DoctorDetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-doctor-details',
  templateUrl: 'doctor-details.html',
})
export class DocterDetails {
  townId:any;
  doctorId:any;
  dataList:dataList = new dataList();
  doctorList:doctorList = new doctorList();
  constructor(public navCtrl: NavController, public navParams: NavParams,public http: Http,private httpService:HttpService) {
    this.townId=this.navParams.get("townId")
  }

  ionViewDidLoad() {

  }
  ngOnInit(){
    this.getDocterList()
  }
  getDocterList(){
    this.httpService.get('/doctorInfo/pageByTownId',{'townId':this.townId}).map((res:Response)=>res.json())
    .subscribe(res=>{
      if(res.code==200){
          this.dataList=res['data']['datas']
          this.doctorId=res['data']['datas'][0].id
          this.getDocterContent()
      }
    },err=>{

    })
  }
  getDocterContent(){
    console.log(this.doctorId)
    this.httpService.get('/doctorInfo/detail',{'id':this.doctorId}).map((res:Response)=>res.json())
    .subscribe(res=>{
      if(res.code==200){
          this.doctorList=res['data']
          console.log(this.doctorList)
      }
    },err=>{

    })
  }
}
