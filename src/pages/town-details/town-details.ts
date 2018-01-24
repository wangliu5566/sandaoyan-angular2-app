import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Base_url } from '../../providers/Constants';
import { details } from './town.model';
import { GlobalData } from '../../providers/GlobalData';
import { HttpService } from '../../providers/HttpService';
import { Post } from '../../model/post-model';


@Component({
  selector: 'page-town-details',
  templateUrl: 'town-details.html'
})
export class TownDetailsPage {
  details:details = new details();
  selectedItem: any;
  globalData: GlobalData;

  id:number;
  constructor(public navCtrl: NavController, public navParams: NavParams,public http: Http,private httpService:HttpService) {
    //this.globalData.token = userInfo.token;
    //console.log(this.navParams.data);
    this.id = navParams.get('id');
    console.log(this.id);
    this.getInfo(this.id);
  }
  getInfo(id){
    let options ={"id":id};
    this.httpService.get('town/detail', options).map((res: Response) => res.json())
      .subscribe(res => {
        if(res.code==200){
          this.details = res['data'];


        }
      }, err => {

      })
  }
}
