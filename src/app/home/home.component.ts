import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { DataService } from '../data.service';
import { takeUntil,tap } from 'rxjs/operators';
 import { Subject, fromEvent, merge, of, Observable, Subscription } from 'rxjs';
 import { HttpResponse } from '@angular/common/http';
 import { MeteoDataTable,Msg1,MeteoStamp } from '../meteo-data'; //MeteoTableSource
 //import  'dayjs/locale/es' // load on demand
  import dayjs from 'dayjs';
  import locale_ru from  'dayjs/locale/ru'

import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTable } from '@angular/material/table';
import { DtTable1DataSource } from './meteo-table-datasource';
//import { MeteoDataService } from '../tmp-meteo-service2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {
  isLoadingData :Boolean; //= of(true);
  myLoadingSubscr:Subscription;
  products: MeteoDataTable[] = [];
  destroy$: Subject<boolean> = new Subject<boolean>();
  dateNow1 = dayjs.locale('ru')
/** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
displayedColumns = ['num','name','value','measure']; //, 'regname'

@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
@ViewChild(MatSort, { static: true }) sort: MatSort;
@ViewChild(MatTable) table: MatTable<MeteoDataTable>;

 // dataSource: DtTable1DataSource;
//dataSource : MeteoDataTable[]=[];
  currentDate_time;
  currentDate_date;
  
  constructor(//private dataSource:MeteoDataService,
              public dataSource2:DtTable1DataSource) { //private dataService: DataService
      const dt1 = dayjs().locale(locale_ru);
    this.currentDate_time = dt1.format('HH:mm:ss');
    this.currentDate_date = dt1.format(' D MMMM YYYY');
    
    
    
    debugger;
      // Индикатор загрузки
      ///this.isLoadingData = this.dataSource2.loadingSubject.value;
    

  }
  ngOnDestroy(): void {
    // this.destroy$.next(true);
    // // Unsubscribe from the subject
    // this.destroy$.unsubscribe();
    debugger;
    this.myLoadingSubscr.unsubscribe();
    ///this.dataSource2.loading$.unsubscribe();
    //this.dataSource2.disconnect();
    //this.dataSource2.loadingSubject.unsubscribe(); - так, ошибка при 
    // повторной попытке подписки!
  }

  ngOnInit() {
    //this.dataSource = new MeteoDataService(); //new DtTable1DataSource();
    //this.isLoadingData = this.dataSource2.loading$; 
    
    // this.dataSource2.loadingSubject.subscribe(async data => {
    //   // Индикатор загрузки
    //   this.isLoadingData = await data;
    // });
    debugger;
    
    // this.dataSource2.loadingSubject.next(false);
  }

  ngAfterViewInit() {
    debugger;
    const flowService1 = true;
    if (flowService1){
      this.dataSource2.sort = this.sort;
      this.dataSource2.paginator = this.paginator;
      this.table.dataSource = this.dataSource2;  
      //this.isLoadingData = this.dataSource2.loading$;
      this.myLoadingSubscr = this.dataSource2.loading$.subscribe(async data => {
        // Индикатор загрузки
        debugger;
        this.isLoadingData = await data;
      }); 
     

        // this.dataSource2.data;
      //this.dataSource = new LessonsDataSource(this.coursesService);
        
    }
    //this.dataSource.sort = this.sort;
    //this.dataSource.paginator = this.paginator;
    //this.table.dataSource = this.dataSource;
debugger;

    // setTimeout(() => {
    //  // this.dataSource2.getMeteoData();
    //  debugger;
    //  this.dataSource2.loadLessons(1);
    // }, 5000);

    // вариант 1. Использование MeteoDataService()
    // if (flowService1){
    //     this.dataSource.sendGetRequest()
    //       .pipe(takeUntil(this.destroy$)
    //         ,tap()
    //       )
    //       .subscribe(
    //         (data: MeteoDataTable[])=>{
    //           console.log(data);
    //           debugger;
    //           this.table.dataSource = data;
    //         }
    //       );

    //       this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    //       merge(this.sort.sortChange, this.paginator.page)
    //         .pipe(
    //             tap((x)=>{
    //               debugger;
    //               return x;
    //             }
    //               //() => this.loadLessonsPage()
    //         )
    //       )
    //       .subscribe();
    //   }
  }
  //--------------
  // ngAfterViewInit_old(): void {
  //   this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

        
  //       merge(this.sort.sortChange, this.paginator.page)
  //       .pipe(
  //           tap(() => this.loadLessonsPage())
  //       )
  //       .subscribe();
  // }
  
  // ngOnDestroy_old(): void {
  //   this.destroy$.next(true);
  //   // Unsubscribe from the subject
  //   this.destroy$.unsubscribe();
  // }
  
  // ngOnInit_old(): void {
  //   this.dataService.sendGetRequest()
  //   .pipe(takeUntil(this.destroy$)
  //     ,tap()
  //   )
  //   .subscribe(
  //   //  (data: any[])=>{console.log(data);this.products = data;}
  //   (res: HttpResponse<string>)=>{ //Msg1[]
  //       console.log(res);
  //       // debugger;
  //       // ??
  //       const mt = new MeteoStamp();
  //       const res1 = res.body;
  //       ["Meteo1","Meteo2"].forEach((meteoProp,indxM)=>{
  //         let meteo1 = res1?.[meteoProp];
  //         if (meteo1){
  //           Object.keys(meteo1).forEach((key,indx)=>{
  //             mt.setValue(key,meteo1[key]);  
  //           });
  //         }
  //       });
  //       // let meteo1 = res1?.["Meteo1"];
  //       // if (meteo1){
  //       //   Object.keys(meteo1).forEach((key,indx)=>{
  //       //     mt.setValue(key,meteo1[key]);  
  //       //   });
  //       // }
  //       // meteo1 = res1?.["Meteo2"];
  //       // if (meteo1){
  //       //   Object.keys(meteo1).forEach((key,indx)=>{
  //       //     mt.setValue(key,meteo1[key]);  
  //       //   });
  //       // }
  //       const w1 = mt.getMeteoArr();

  //       // this.products = res.body;
  //       this.products = w1;
  //       // [
  //       //    {num:1,name:"r139",value:"726",descr:"Давление,мм.рт.ст."}
  //       //   ,{num:2,name:"r140",value:"70331",descr:"Время эксплуатации"}
  //       // ]
  //     }
  //   )
    
  // }
  //-----------------------

  

}
