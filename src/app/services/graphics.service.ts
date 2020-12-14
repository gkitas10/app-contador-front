import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Global } from "./Global";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GraphicsService {
   
  public url=Global.url;
  constructor(private _http:HttpClient) { }

  firstDataSetForGraphics(concept:string, month:string, year:number):Observable<any>{
    return this._http.get(`${this.url}graphics?concept=${concept}&month=${month}&year=${year}`)
  }

  secondDataSetForGraphics(concept:string, month:string, year:number):Observable<any>{
    return this._http.get(`${this.url}compare-graphics?concept=${concept}&month=${month}&year=${year}`)
  }

  combineData = (arr1:Array<any>, arr2:Array<any>) => {
    //Push 2nd array into the first and copy
      arr1[1].push(...arr2[1]);
      let combined = arr1[1].slice();
      
      const firstElement = new Date(combined[0]).getDate()   
  //Validation: if combined first element = isNaN, it means it's receiving a word like 'enero' and the date is not valid so getDate() returns NaN 
      if( isNaN(firstElement)){
          //order combined(copy of arr1[1])--This is a month array 
          this.monthLabelOrder(combined)
      }else{
          //order dates array 
          this.dateLabelsOrder(combined); 
      }
  //Eliminate duplicates from combined array ( array made out of the two label arrays )--(copy of arr1[1])
  //Here it's possible to have either a month array or date array
      combined = combined.filter((label,idx,arr)=>(
          arr.indexOf(label) === idx
        ));
  //In case of having a month array:
  //creates one obj with month labels as keys and amount as values for each of the original arrays (arr1 and arr2)
       if( isNaN(firstElement)){
          const [ labelAmountPairs, labelAmountPairs2 ] = this.createLabelAmountMonthObjs(arr1, arr2);
          //Creates 2 empty arrays with combined length as its size and fills it with 0s 
          //Search in objects created before (labelamountpairs, labelamountpairs2) each element of the big labels array(combined) and inserts
          // it(label) at the same position(index) in the corresponding empty array
         return this.fillDataArrays(combined, labelAmountPairs, labelAmountPairs2);
          //In case of having a date array:
          //creates one obj with mdate labels as keys and amount as values for each of the original arrays (arr1 and arr2)
       }else{
           //This function is adapted to dates, it slices the date numbers and compares them to the whole date('20202-10-10')
          const [ labelAmountPairs, labelAmountPairs2 ] = this.createLabelAmountDateObjs(arr1, arr2);
          return this.fillDataArrays(combined, labelAmountPairs, labelAmountPairs2)
       }
  }
  //Takes month array (combination of arr1 and arr2) and sorts it 
  monthLabelOrder = (combined:Array<any>) => {
      for(let i=0; i < combined.length; i++){
          switch (combined[i]) {
              case 'Enero':combined.splice(i,1,1)
                  break;
              case 'Febrero':combined.splice(i,1,2)
                  break;
              case 'Marzo':combined.splice(i,1,3)
                  break;
              case 'Abril':combined.splice(i,1,4)
                  break;
              case 'Mayo':combined.splice(i,1,5)
                  break;
              case 'Junio':combined.splice(i,1,6)
                  break;
              case 'Julio':combined.splice(i,1,7) 
                  break;
              case 'Agosto':combined.splice(i,1,8)
                  break;
              case 'Septiembre':combined.splice(i,1,9)
                  break;
              case 'Octubre':combined.splice(i,1,10)
                  break;
              case 'Noviembre':combined.splice(i,1,11)
                  break;
              case 'Diciembre':combined.splice(i,1,12)
                  break;
  
              default:
                  break;
          }
      }
  
      combined.sort((a,b)=>{
          return a-b;
      });
  
      for(let i=0; i < combined.length; i++){
          switch (combined[i]) {
              case 1:combined.splice(i,1,'Enero')
                  break;
              case 2:combined.splice(i,1,'Febrero')
                  break;
              case 3:combined.splice(i,1,'Marzo')
                  break;
              case 4:combined.splice(i,1,'Abril')
                  break;
              case 5:combined.splice(i,1,'Mayo')
                  break;
              case 6:combined.splice(i,1,'Junio')
                  break;
              case 7:combined.splice(i,1,'Julio') 
                  break;
              case 8:combined.splice(i,1,'Agosto')
                  break;
              case 9:combined.splice(i,1,'Septiembre')
                  break;
              case 10:combined.splice(i,1,'Octubre')
                  break;
              case 11:combined.splice(i,1,'Noviembre')
                  break;
              case 12:combined.splice(i,1,'Diciembre')
                  break;
  
              default:
                  break;
          }
      }
  }
  
  dateLabelsOrder = (combined:Array<any>) => {
      for(let i = 0; i < combined.length; i++){
          combined.splice(i, 1, combined[i].slice(8, 10))
      }
  
      combined.sort((a, b) => {
          return a - b
      })
      
  }
   //In case of having a date array:
  //creates one obj with mdate labels as keys and amount as values for each of the original arrays (arr1 and arr2)
 createLabelAmountDateObjs = (arr1:Array<any>, arr2:Array<any>) => {
      let labelAmountPairs = {};
      let labelAmountPairs2 = {};
      //Creates an object with labels as keys and amounts as values
    for(let i = 0;i < arr1[0].data.length;i++){
      labelAmountPairs = {
          ...labelAmountPairs,
          [arr1[1][i].slice(8,10)]:arr1[0].data[i]
      } 
   }
  //Creates an object with labels as keys and amounts as values
   for(let i = 0;i < arr2[0].data.length;i++){
       labelAmountPairs2 = {
           ...labelAmountPairs2,
           [arr2[1][i].slice(8,10)]:arr2[0].data[i]
       }
   }
   return [labelAmountPairs, labelAmountPairs2]
  }
  //In case of having a month array:
  //creates one obj with month labels as keys and amount as values for each of the original arrays (arr1 and arr2)
  createLabelAmountMonthObjs =  (arr1:Array<any>, arr2:Array<any>) => {
      let labelAmountPairs = {};
      let labelAmountPairs2 = {};
       //Creates an object with labels as keys and amounts as values
    for(let i = 0;i < arr1[0].data.length;i++){
      labelAmountPairs = {
          ...labelAmountPairs,
          [arr1[1][i]]:arr1[0].data[i]
      } 
   }
  //Creates an object with labels as keys and amounts as values
   for(let i = 0;i < arr2[0].data.length;i++){
       labelAmountPairs2 = {
           ...labelAmountPairs2,
           [arr2[1][i]]:arr2[0].data[i]
       }
   }
   return [labelAmountPairs, labelAmountPairs2]
  }
   //Creates 2 empty arrays with combined length as its size and fills it with 0s
       //Then fills each array with labelamountpairs correspondent values 
  fillDataArrays = (combined:Array<string>, labelAmountPairs:object, labelAmountPairs2:object) =>{
       let dataForGraph = new Array(combined.length).fill(0);
       let dataForGraph2 = new Array(combined.length).fill(0);
  
      for( let i = 0; i < combined.length; i++ ){
          if( labelAmountPairs[combined[i]] ){
              dataForGraph[i] = labelAmountPairs[combined[i]];
          }
   
          if( labelAmountPairs2[combined[i]] ) {
              dataForGraph2[i] = labelAmountPairs2[combined[i]]; 
          }
       }
       
       return [ combined, dataForGraph, dataForGraph2 ];
  }
  

  
}

 