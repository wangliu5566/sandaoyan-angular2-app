import { Injectable } from '@angular/core';
import { HttpService } from '../../providers/HttpService';
import { Base_url } from '../../providers/Constants';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class GraphicService{
  constructor(private httpService: HttpService,public http: Http) {}
  //getInfo(){
  //  return new Promise((resolve, reject) => {
  //    this.http.get(Base_url+'content/contentDetail?contentId=1')
  //    .map(res=>res.json())
  //      .subscribe(data => {
  //        resolve(data);
  //      }, err => {
  //        reject(err);
  //      })
  //  })
  //}
}
