import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { showSerch, list } from './yuyue-guahao.module';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { HttpService } from '../../providers/HttpService';
import { DoctorList } from '../doctor-list/doctor-list'

/**
 * Generated class for the YuyueGuahaoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-yuyue-guahao',
  templateUrl: 'yuyue-guahao.html',
})
export class YuyueGuehao {
  showSerch:any;
  list:any;
  hospitalId:any;
  token:any;
  serchtext:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, private httpService: HttpService) {
    this.hospitalId = this.navParams.get("hospitalId")
    this.token = this.navParams.get("token")

    
  }

  ionViewDidLoad() {
    this.serchtext="请输入科室名称"
    this.showSerch=true
    this.getList()    
  }
  inpClick(){
    this.serchtext=""
    this.showSerch=false
    var inp = document.getElementById("serInp")
    inp.style.cssText = 'width:100%;text-align:center'
  }
  getList(){
    this.httpService.get('/hospitalDept/listByHospitalId?hospitalId=' + this.hospitalId).map((res: Response) => res.json())
      .subscribe(res => {
        if (res.code == 200) {
          for(let x in res['data']){
            res['data'][x].isChoosed=false
          }
          this.list = res['data']
          console.log(res);

        }

      }, err => {

      })
  }
  goDocList(id){
    this.navCtrl.push(DoctorList, {
        deptId:id,
        token: this.token
      })
  }
  
  serchName(ev){//搜索项修改样式
    let key=ev.target.value
    for(let x in this.list){      
      if(this.list[x].name.indexOf(key)!=-1){
        this.list[x].isChoosed=true
      }else{
        this.list[x].isChoosed = false
      }
    }
  }
}
