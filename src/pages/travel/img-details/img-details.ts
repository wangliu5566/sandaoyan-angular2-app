import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Base_url } from '../../../providers/Constants';
import { details } from './details.model';
import { GlobalData } from '../../../providers/GlobalData';
import { HttpService } from '../../../providers/HttpService';
import { Post } from '../../../model/post-model';


@Component({
  selector: 'page-img-details',
  templateUrl: 'img-details.html'
})
export class ImgDetailsPage {
  details:details = new details();
  localItemPictures:any=[];
  selectedItem: any;
  globalData: GlobalData;

  id:number;
  constructor(public navCtrl: NavController, public navParams: NavParams,public http: Http,private httpService:HttpService) {
    //this.globalData.token = userInfo.token;
    //console.log(this.navParams.data);
    this.id = navParams.get('itemId');
    console.log(this.id);
    this.getInfo(this.id);
  }
  getInfo(id){
    let options ={"itemId":id};

    this.httpService.get('localItem/itemContentDetail', options).map((res: Response) => res.json())
      .subscribe(res => {
        if(res.code==200){
          this.details = res['data']['datas'][0];
        }
      }, err => {

      })
  }
}
