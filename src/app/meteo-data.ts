export interface Msg1 {
  id: number;
  package: MeteoMsg;
}

export interface MeteoMsg {
  tb1: MeteoTb1;
  tb2: MeteoTb2;
  errstate: MeteoErr;
}

export interface MeteoTb1 {
  r139: number;
  r140: number;
  r142: number;
  r143: number;
  r144: number;
  r147: number;
  r148: number;
}
export interface MeteoTb2 {
  r19: number;
  r23: number;
  r29: number;
  r31: number;
  r37: number;
  r39: number;
  r45: number;
  r49: number;
  r53: number;
  r54: number;
  r55: number;
  r59: number;
  r60: number;
  r61: string;
  r62: number;
}

export interface MeteoErr {
  errBlockMeteo1: string;
  errBlockMeteo2: string;
}

export interface MeteoDataTable {
  num: number;
  regname: string;
  name: string;
  value: string;
  //descr: string;
  measure: string;
}
export interface ReqMeteo {
  meteo: MeteoDataTable[];
  err: string;
}
//---------
// export interface MeteoTableSource {
//   num: number;
//   descr:string;
//   value: (string|number);
//   measure:string;
// }

export interface MeteoValue {
  readonly regN: string;
  value: (string|number);
  descr:string;
  measure:string;
}
export interface MeteoValueArray {
  [id: number]: MeteoValue,
  Value:string|number,
}
const MeteoOrder1 = ["r139","r140","r142","r143","r144","r147","r148"];
const MeteoOrder2 = ["r19","r23","r29","r31","r37","r39","r45","r49"
                    ,"r53","r54","r55","r59","r60","r61","r62"];
export class MeteoStamp {
  private meteo={
     r19:{measure:"грд.",descr:"Температура воздуха",isInit:0,val:""}
    ,r23:{measure:"грд.",descr:"Температура точки росы",isInit:0,val:""}
    ,r29:{measure:"%",descr:"Относительная влажность",isInit:0,val:""}
    ,r31:{measure:"%",descr:"Абсолютная влажность",isInit:0,val:""}
    ,r37:{measure:"мм рт.ст.",descr:"Абсолютное атм. давление",isInit:0,val:""}
    ,r39:{measure:"мм рт.ст.",descr:"Относительное давление воздуха",isInit:0,val:""}
    ,r45:{measure:"м/с",descr:"Скорость ветра",isInit:0,val:""}
    ,r49:{measure:"км/ч",descr:"Скорость ветра",isInit:0,val:""}
    ,r53:{measure:"",descr:"Направление ветра",isInit:0,val:""}
    ,r54:{measure:"",descr:"Направление ветра (компас)",isInit:0,val:""}
    ,r55:{measure:"",descr:"Направление компаса",isInit:0,val:""}
    ,r59:{measure:"мм",descr:"Осадки",isInit:0,val:""}
    ,r60:{measure:"мм",descr:"Дифференц. кол-во осадков",isInit:0,val:""}
    ,r61:{measure:"",descr:"Тип осадков",isInit:0,val:""}
    ,r62:{measure:"мм/ч",descr:"Интенсивность осадков",isInit:0,val:""}
    ,r63:{measure:"мм/мин",descr:"Интенсивность осадков",isInit:0,val:""}
    ,r68:{measure:"Вт/м2",descr:"Глобальное излучение",isInit:0,val:""}
    ,r70:{measure:"грд.",descr:"Положение солнца Азимут",isInit:0,val:""}
    ,r71:{measure:"грд.",descr:"Высота положения солнца",isInit:0,val:""}
    ,r74:{measure:"",descr:"Ультрафиолетовый индекс",isInit:0,val:""}
    ,r75:{measure:"кЛюкс",descr:"Яркость",isInit:0,val:""}
    ,r76:{measure:"кЛюкс",descr:"Сумерки",isInit:0,val:""}
    
    ,r139:{measure:"В",descr:"Напряжение питания",isInit:0,val:""}
    ,r140:{measure:"с",descr:"Время эксплуатации",isInit:0,val:""}
    ,r142:{measure:"грд.",descr:"Долгота позиции",isInit:0,val:""}
    ,r143:{measure:"грд.",descr:"Широта позиции",isInit:0,val:""}
    ,r144:{measure:"м",descr:"Высота",isInit:0,val:""}
    ,r147:{measure:"",descr:"Спутники GPS",isInit:0,val:""}
    ,r148:{measure:"",descr:"Позиция GPS обнаружена",isInit:0,val:""}
    
  }
  private MeteoOrder = ["r19","r23","r29","r31","r37","r39","r45","r49"
                      ,"r53","r54","r55","r59","r60","r61","r62","r63"
                      ,"r68","r70","r71","r74","r75","r76"
                    
                      ,"r139","r140","r142","r143","r144","r147","r148"
                  ];

  getMeteoArr(){
    return this.MeteoOrder.map((v,i)=>{
      
      return {num:i+1, regname:v
              ,value:this.meteo[v].val
              ,name:this.meteo[v].descr
              ,measure:this.meteo[v].measure}
    });
  }
  setValue(regN:string,val:string|number){
    if (this.meteo[regN]){
      this.meteo[regN].val = val;
      this.meteo[regN].isInit = 1;
    }
  }
  getMeteoDataTable():MeteoDataTable[]{
    const res:MeteoDataTable[] = [];
    let indx = 0;
    this.MeteoOrder.forEach((regN,indxM)=>{
      if (this.meteo[regN]){ // здесь можно добавить провекру isInit==1
        const elm = this.meteo[regN];
        res.push({num:++indx, regname:regN
          ,value:elm.val
          ,name:elm.descr
          ,measure:elm.measure})
      }
    });
    return res;
  }
  
}
                    
// export const MeteoDic: MeteoValueArray = [ 
//   {
//     regN:"r139",
//     value:"0",
//     descr:"Напряжение",
//     measure:"В",
//   },
//   {
//     regN:"r140",
//     value:"0",
//     descr:"Время",
//     measure:"ч",
//   },
// ]

// class Example implements MeteoValueArray {
//   private _name: string = "Bob";
//   m1: MeteoTb1;
//   constructor(){
//     this.m1.r139 
//   }
//   id=[
//     {
//           regN:"r139",
//           value:"0",
//           descr:"Напряжение",
//           measure:"В",
//         },
//   ]
//   public get Value() {
//       return this._name;
//   }

//   public set Value(value) {
//       this._name = value;
//   }
// }
