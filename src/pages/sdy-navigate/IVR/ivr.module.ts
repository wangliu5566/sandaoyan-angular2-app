
export class IvrPageModule {
  sceneryList:  Array<sceneryList>;
}
export class sceneryList{
  name:  string;
  sceneryType:  string;
  introduction:  string;
  star:  number;
  longitude:  string;
  latitude:  string;
  address:  string;
  imageUrl:  string;
  price:  number;
  isBuy:  number;
  id: number;
  townId: number;
  sortNumber: number;
}
export class townScenery{
  sortNumber:number;
  name:  string;
  address:  string;
  introduction:  string;
  star:  string;
  longitude:  string;
  latitude:  string;
  price:  number;
  imageUrl:  string;
  content:  string;
  isBuy:  string;
  sceneryType:  string;
  townId: number;
  introduceVoice:string;
}
