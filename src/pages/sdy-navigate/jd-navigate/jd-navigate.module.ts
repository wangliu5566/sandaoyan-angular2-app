
export class JdNavigatePageModule {
  id:number;
  updateDate:string;
  createDate:string;
  townId:number;
  name:string;
  sceneryType:number;
  address:string;
  introduction:string;
  star:number;
  longitude:number;
  latitude:number;
  price:number;
  imageUrl:string;
  sortNumber:number;
  content:string;
  isBuy:number;
  introduceVoice:string;
  pictures: Array<pics>;
}
class pics{
  dimgUrl:string;
  type:string;
}
