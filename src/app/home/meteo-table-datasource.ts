import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MeteoValue,MeteoDataTable } from '../meteo-data';
import { Observable, of as observableOf, merge, BehaviorSubject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { MeteoDataService } from '../tmp-meteo-service2';
import { Injectable } from "@angular/core";
/**
 * Data source for the DtTable1 view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
@Injectable({ providedIn: "root" })
export class DtTable1DataSource extends DataSource<MeteoDataTable> {
  data: MeteoDataTable[] =[];
  paginator: MatPaginator;
  sort: MatSort;
  //private REST_API_SERVER = "https://my-json-server.typicode.com/butrov/dashBrd/";
  //private REST_API_SERVER = "http://doprtr.intech.ru:5050/httpproxy/192.168.8.137:4125/MeteoSrv/Service1.asmx/getMeteoData";
  
  // private lessonsSubject = new BehaviorSubject<MeteoDataTable[]>([]);
  private lessonsSubject = new BehaviorSubject<MeteoDataTable[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private loadingErr = new BehaviorSubject<string>("");
  public loading$ = this.loadingSubject.asObservable();

  //private cachedFacts = Array.from<MeteoDataService>({ length: 0 });
  //private dataStream = new BehaviorSubject<MeteoDataService[]>(this.cachedFacts);
  //private subscription = new Subscription();

  constructor(private dataService: MeteoDataService) {
    super();
    const data1 = [
      //this.data = [
        {num: 2,regname:"string2",name:"string2",value: "string22",measure:"str" }
    ];  
    this.lessonsSubject.next(data1);
    
  }

  loadingOn(){
    this.loadingSubject.next(true);
  }
  loadingOff(){
    this.loadingSubject.next(false);
  }

  // getMeteoData():void{return ;}

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(collectionViewer: CollectionViewer): Observable<MeteoDataTable[]> {
    debugger;
    // init
    //this.lessonsSubject.next([]); // - так, не загружет таблицу, при 
    // переключении вкладок !?!. Поэтому создаем новый экземпляр:
    //this.lessonsSubject = new BehaviorSubject<MeteoDataTable[]>([]);
    
    //this.loadingSubject.next(true);
    
    // this.data =[
    //   {num: 101,regname:"101",name:"no data 101",value: "101",measure:"__" }
    // ] 
    this.lessonsSubject.next(this.data);
    this.loadingErr.next("");

    // true && setTimeout(() => {
    //   this.loadMeteoData(1);
    // }, 5000);

    // true && setTimeout(() => {
    //   this.loadMeteoData(3);
    // }, 10000);

    true && setTimeout(() => {
      this.loadMeteoData("");
    }, 100);
    
    true && setTimeout(() => {
      this.loadMeteoData("");
    }, 10000);

    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      //observableOf(this.data),
      this.lessonsSubject, //.asObservable()
      this.paginator.page,
      this.sort.sortChange
    ];
    
    return merge(...dataMutations).pipe(map((x) => {
      // Здесь x может быть данными одного из потоков dataMutations[]
      const res = this.getPagedData(this.getSortedData([...this.data]));
      return res;
    }));
  }

  loadMeteoData(n){
    //true && setTimeout(() => {
      //this.loadingSubject.next(true);
      this.loadingOn();
      debugger;
          this.dataService.sendGetRequest_Text(n).subscribe( 
              lessons =>{ 
                
                this.data = lessons.meteo
                // Установим количество строк в пагинаторе:
                this.paginator.length = this.data.length;
                debugger;
                this.lessonsSubject.next(this.data);
                //this.loadingSubject.next(false);
                this.loadingOff();
              }
          );
     //}, 5000);
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {
    console.log('здесь нужно прибрать за DtTable1DataSource()');
    //this.lessonsSubject.complete();
   // this.loadingSubject.complete();
  }

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: MeteoDataTable[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: MeteoDataTable[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'num': return compare(+a.num, +b.num, isAsc);
        case 'measure': return compare(+a.measure, +b.measure, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}