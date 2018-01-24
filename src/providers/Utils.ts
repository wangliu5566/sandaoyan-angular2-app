/**
 * Created
 */
import { Injectable } from "@angular/core";

/**
 * Utils类存放和业务无关的公共方法
 * @description
 */
@Injectable()
export class Utils {
  constructor() {}

  static isEmpty(value): boolean {
    return value == null || (typeof value === "string" && value.length === 0);
  }

  static isNotEmpty(value): boolean {
    return !Utils.isEmpty(value);
  }

  /**
   * 格式“是”or“否”
   * @param value
   * @returns {string|string}
   */
  static formatYesOrNo(value: number | string): string {
    return value == 1 ? "是" : value == "0" ? "否" : null;
  }

  /**
   * 日期对象转为日期字符串
   * @param date 需要格式化的日期对象
   * @param sFormat 输出格式,默认为yyyy-MM-dd                         年：y，月：M，日：d，时：h，分：m，秒：s
   * @example  dateFormat(new Date())                                "2017-02-28"
   * @example  dateFormat(new Date(),'yyyy-MM-dd')                   "2017-02-28"
   * @example  dateFormat(new Date(),'yyyy-MM-dd hh:mm:ss')         "2017-02-28 09:24:00"
   * @example  dateFormat(new Date(),'hh:mm')                       "09:24"
   * @example  dateFormat(new Date(),'yyyy-MM-ddThh:mm:ss+08:00')   "2017-02-28T09:24:00+08:00"
   * @returns {string}
   */
  static dateFormat(date: Date, sFormat: String = "yyyy-MM-dd"): string {
    let time = {
      Year: 0,
      TYear: "0",
      Month: 0,
      TMonth: "0",
      Day: 0,
      TDay: "0",
      Hour: 0,
      THour: "0",
      hour: 0,
      Thour: "0",
      Minute: 0,
      TMinute: "0",
      Second: 0,
      TSecond: "0",
      Millisecond: 0
    };
    time.Year = date.getFullYear();
    time.TYear = String(time.Year).substr(2);
    time.Month = date.getMonth() + 1;
    time.TMonth = time.Month < 10 ? "0" + time.Month : String(time.Month);
    time.Day = date.getDate();
    time.TDay = time.Day < 10 ? "0" + time.Day : String(time.Day);
    time.Hour = date.getHours();
    time.THour = time.Hour < 10 ? "0" + time.Hour : String(time.Hour);
    time.hour = time.Hour < 13 ? time.Hour : time.Hour - 12;
    time.Thour = time.hour < 10 ? "0" + time.hour : String(time.hour);
    time.Minute = date.getMinutes();
    time.TMinute = time.Minute < 10 ? "0" + time.Minute : String(time.Minute);
    time.Second = date.getSeconds();
    time.TSecond = time.Second < 10 ? "0" + time.Second : String(time.Second);
    time.Millisecond = date.getMilliseconds();

    return sFormat
      .replace(/yyyy/gi, String(time.Year))
      .replace(/yyy/gi, String(time.Year))
      .replace(/yy/gi, time.TYear)
      .replace(/y/gi, time.TYear)
      .replace(/MM/g, time.TMonth)
      .replace(/M/g, String(time.Month))
      .replace(/dd/gi, time.TDay)
      .replace(/d/gi, String(time.Day))
      .replace(/HH/g, time.THour)
      .replace(/H/g, String(time.Hour))
      .replace(/hh/g, time.Thour)
      .replace(/h/g, String(time.hour))
      .replace(/mm/g, time.TMinute)
      .replace(/m/g, String(time.Minute))
      .replace(/ss/gi, time.TSecond)
      .replace(/s/gi, String(time.Second))
      .replace(/fff/gi, String(time.Millisecond));
  }

  /**
   * 每次调用sequence加1
   * @type {()=>number}
   */
  getSequence = (function() {
    let sequence = 100;
    return function() {
      return ++sequence;
    };
  })();

  /**
   * 格式“是”or“否”
   * @param date
   * @returns 星期
   */
  static GetWeek(thisdata: Date): string {
    thisdata = new Date(thisdata);
    let thedata: any = {};
    let arrweek: Array<string> = [
      "星期日",
      "星期一",
      "星期二",
      "星期三",
      "星期四",
      "星期五",
      "星期六"
    ];
    let theweek: number = thisdata.getDay();
    thedata.cweek = arrweek[theweek];
    thedata.cweekhao = theweek;
    return thedata;
  }

  //sessionStorage
  static ssGetItem(key: string) {
    let jsonString = sessionStorage.getItem(key);
    if (jsonString) {
      return JSON.parse(jsonString);
    }
    return null;
  }
  static ssSetItem(key: string, value: any) {
    sessionStorage.setItem(key, JSON.stringify(value));
  }
  static ssRemove(key: string, value: any) {
    sessionStorage.remove(key);
  }
  static ssClear() {
    sessionStorage.clear();
  }
  //localStorage
  static lsGetItem(key: string) {
    let jsonString = localStorage.getItem(key);
    if (jsonString) {
      return JSON.parse(jsonString);
    }
    return null;
  }
  static lsSetItem(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }
  static lsRemove(key: string, value: any) {
    localStorage.remove(key);
  }
  static lsClear() {
    localStorage.clear();
  }
}
