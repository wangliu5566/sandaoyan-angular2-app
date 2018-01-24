import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { HttpService } from '../../providers/HttpService';
import { list, howMany} from './doctor-list.module';
import { DocterPar } from '../doc-particulars/doc-particulars'
/**
 * Generated class for the DoctorListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-doctor-list',
  templateUrl: 'doctor-list.html',
})
export class DoctorList {
  deptId:any;
  list:list = new list();
  token:any;
  howMany:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, private httpService: HttpService) {
    this.deptId = this.navParams.get("deptId")
    this.token = this.navParams.get("token")   
  }

  ionViewDidLoad() {
    this.getDocterList()
    this.howMany=[]
  }
  getDocterList(){
    this.httpService.get('/hospitalDoctor/listByDeptId?deptId=' + this.deptId).map((res: Response) => res.json())
      .subscribe(res => {
        this.list = res
        if(res.code==200){
          for(let i in this.list['data']){
            let amNo;
            let amMax; 
            let pmMax; 
            let pmNo;
            if (!this.list['data'][i].amSchedue) {
              amNo=0
              amMax=0
            }else{
              amNo = this.list['data'][i].amSchedue.registerCount
              amMax = this.list['data'][i].maxSchedueAMCount
            }
            if (!this.list['data'][i].pmSchedue){
              pmNo=0
              pmMax=0
            }else{
              pmNo=this.list['data'][i].pmSchedue.registerCount
              pmMax = this.list['data'][i].maxScheduePMCount
            }
            var defult = (amMax + pmMax) - pmNo - amNo
            this.list['data'][i]['dd']= defult
          }
          console.log(this.list);
            
        }
        
      }, err => {

      })
  }
  gotoDoctor(item){
    this.navCtrl.push(DocterPar, {
      docId: item.id,
      token:this.token
    })
  }
}
