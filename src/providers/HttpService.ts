/**
 * Created
 */
import { Injectable } from '@angular/core';
import {
    Http, Response, Headers, RequestOptions, URLSearchParams, RequestOptionsArgs, RequestMethod
} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from "rxjs";
import { Utils } from "./Utils";
import { GlobalData } from "./GlobalData";
import { NativeService } from "./NativeService";
import { AlertController } from "ionic-angular";
import { Storage } from "@ionic/storage";

import { Base_url } from "./Constants";
import { UserInfo } from "../model/UserInfo";

@Injectable()
export class HttpService {
    userInfo:UserInfo;
    alartisOpen:boolean=true;
    requestNum:number=1;
    constructor(public http: Http,
        private globalData: GlobalData,
        private nativeService: NativeService,
        private storage: Storage,
        private alertCtrl: AlertController) {
    }

    public request(url: string, options: RequestOptionsArgs): Observable<Response> {
        // accessToken:this.token
        url = HttpService.replaceUrl(url);
        let token=this.globalData.token;
        var Num=++this.requestNum;
        if(token){
            if (options.headers) {
                options.headers.append('accessToken', token);
            } else {
                options.headers = new Headers({
                    'accessToken': token
                });
            }
        }
        if(options.params){
            options.params['requestNum']=Num;
        }
        return Observable.create((observer) => {
            this.nativeService.showLoading();
            console.log('%c 请求前 %c', 'color:blue', '', 'url', url, 'options', options);
            this.http.request(url, options).subscribe(res => {
                if(options.params && options.params['requestNum']==this.requestNum){
                    this.nativeService.hideLoading();
                }else{
                    this.nativeService.hideLoading();
                }

                console.log('%c 请求成功 %c', 'color:green', '', 'url', url, 'options', options, 'res', res);
                observer.next(res);
            }, err => {
                this.requestFailed(url, options, err);//处理请求失败
                observer.error(err);
            });
        });
    }


    public get(url: string, paramMap: any = null): Observable<Response> {
        let token=this.globalData.token;
        if(token){
            if(paramMap){
                paramMap.accessToken=token;
            }else{
                paramMap={"accessToken":token};
            }

        }
        return this.request(url, new RequestOptions({
            method: RequestMethod.Get,
            search: HttpService.buildURLSearchParams(paramMap)
        }));
    }

    public post(url: string, body: any = null): Observable<Response> {
        let token=this.globalData.token;
        if(token){
            if(body){
                body.accessToken=token;
            }else{
                body={"accessToken":token};
            }

        }
        return this.request(url, new RequestOptions({
            method: RequestMethod.Post,
            // body: body,
            search: HttpService.buildURLSearchParams(body),
            headers: new Headers({
                'Content-Type': 'application/json; charset=UTF-8'
            })
        }));
    }


  public newPost(url: string, body: any = null): Observable<Response> {
    let token=this.globalData.token;
    if(token){
      if(body){
        body.accessToken=token;
      }else{
        body={"accessToken":token};
      }

    }

    return this.request(url, new RequestOptions({
      method: RequestMethod.Post,
        body: body,
    //   body: JSON.stringify(body),
      headers: new Headers({
        'Content-Type': 'application/json; charset=UTF-8'
      })
    }));
  }


    public postFormData(url: string, paramMap: any = null): Observable<Response> {
        let token=this.globalData.token;
        if(token){
          if(paramMap){
            paramMap.accessToken=token;
          }else{
            paramMap={"accessToken":token};
          }
        }
        return this.request(url, new RequestOptions({
            method: RequestMethod.Post,
            body: paramMap,
            //search: HttpService.buildURLSearchParams(paramMap).toString(),
            headers: new Headers({
              'Content-Type': 'application/json; charset=UTF-8'
                //'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            })
        }));
    }

    public put(url: string, body: any = null): Observable<Response> {
        return this.request(url, new RequestOptions({
            method: RequestMethod.Put,
            body: body
        }));
    }

    public delete(url: string, paramMap: any = null): Observable<Response> {
        return this.request(url, new RequestOptions({
            method: RequestMethod.Delete,
            search: HttpService.buildURLSearchParams(paramMap).toString()
        }));
    }


    /**
     * 将对象转为查询参数
     * @param paramMap
     * @returns {URLSearchParams}
     */
    private static buildURLSearchParams(paramMap): URLSearchParams {
        let params = new URLSearchParams();
        if (!paramMap) {
            return params;
        }
        for (let key in paramMap) {
            let val = paramMap[key];
            if (val instanceof Date) {
                val = Utils.dateFormat(val, 'yyyy-MM-dd hh:mm:ss')
            }
            params.set(key, val);
        }
        return params;
    }

    /**
     * 处理请求失败事件
     * @param url
     * @param options
     * @param err
     */
    private requestFailed(url: string, options: RequestOptionsArgs, err) {
        if(options.params && options.params['requestNum']==this.requestNum){
            this.nativeService.hideLoading();
        }else{
            this.nativeService.hideLoading();
        }

        console.log('%c 请求失败 %c', 'color:red', '', 'url', url, 'options', options, 'err', err);
        let msg = '请求发生异常', status = err.status;
        // if (!this.nativeService.isConnecting()) {
        // if (false) {
        //   msg = '请求失败，请连接网络';
        // } else {
        //   if (status === 0) {
        //     msg = '请求失败，请求响应出错';
        //   } else if (status === 404) {
        //     msg = '请求失败，未找到请求地址';
        //   } else if (status === 500) {
        //     msg = '请求失败，服务器出错，请稍后再试';
        //   }
        // }
        if (status === 0) {
            msg = '请求失败，请求响应出错';
        } else if (status === 401) {
            msg = '登录超时请重新登录！';
        } else if (status === 404) {
            msg = '请求失败，未找到请求地址';
        } else if (status === 500) {
            msg = '请求失败，服务器出错，请稍后再试';
        }
        if(this.alartisOpen){
            this.alartisOpen=false;
            this.alertCtrl.create({
            title: msg,
            subTitle: status,
            buttons: [{ text: '确定' ,
                handler: () => {
                    if(status === 401){
                        this.alartisOpen=true;
                        GotoApp('LoginTimeOut');
                    }
                }}]
        }).present();
        }
    }
    //一个方法在30秒内只能调用一次
    throttle (func, duration) {
        debugger;
        // duration 以秒计
        let last;
        return function () {
            let now = Date.now();
            if (last && (now - last) < duration * 1e3) return;
            last = now;
            func.apply(this, arguments);
        }
    }
    // private sleepTime(numberMillis) {
    //     var now = new Date();
    //     var exitTime = now.getTime() + numberMillis;
    //     while (true) {
    //         var now = new Date();
    //         if (now.getTime() > exitTime)
    //             return;
    //     }
    // }

    /**
     * url中如果有双斜杠替换为单斜杠
     * 如:http://88.128.18.144:8080//api//demo.替换后http://88.128.18.144:8080/api/demo
     * @param url
     * @returns {string}
     */
    private static replaceUrl(url) {
        if (url.indexOf('http://') == -1) {
            url = Base_url + url;
        }
        return 'http://' + url.substring(7).replace(/\/\//g, '/');
    }

    //获取用户信息
    public GetcustomerF(userInfo:UserInfo) {
        this.get('/private/customer/detail').map((res: Response) => res.json())
            .subscribe(res => {
                this.storage.set('UserInfo', res.data);
                userInfo=res.data;
            }, err => {

            })
    }

    alertLoginTimeOut(){
        this.alertCtrl.create({
            title: '登录超时请重新登录！',
            subTitle: status,
            buttons: [{
                text: '确 定',
                handler: () => {
                    GotoApp('LoginTimeOut');
                }
            }]
        }).present();
    }

}
