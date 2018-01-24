import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular'
import { Response } from '@angular/http';

import { TraceEntityAllDetail_data } from '../model/tosource.model';
import { ImgDetailsPage } from '../../../pages/travel/img-details/img-details';//商品图文详情
import { HttpService } from '../../../providers/HttpService';

// @IonicPage({
//   name: 'tosource',
//   segment: 'tosource/:id'
// })
@IonicPage()
@Component({
    selector: 'tsdetail',
    templateUrl: 'tsdetail.component.html'
})

export class TsDetailComponent {
    allDetail: TraceEntityAllDetail_data=new TraceEntityAllDetail_data();
    sourceId:string;
    // public post: Post = new Post();
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private httpService: HttpService
    ) {
        this.sourceId=navParams.get('Id');
        this.GetTraceEntityDetail(this.sourceId);
       // //deubgger;
    }
    //内容详情
    GetTraceEntityDetail(id) {
        let options = {"traceEntityId":id};
        this.httpService.get('/traceEntity/traceEntityAllDetail', options).map((res: Response) => res.json())
            .subscribe(res => {
                if(res.code==200){
                    this.allDetail=res['data']['datas'][0];
                }
            }, err => {
                
            })
    }
}

