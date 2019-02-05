import { Injectable } from '@angular/core';
import { AngularFireDatabaseModule, AngularFireList, AngularFireDatabase } from 'angularfire2/database';
declare var require: any;

let dateformat= require('dateformat');
@Injectable({
  providedIn: 'root'
})
export class TodoServicesService {
  toDoList: AngularFireList<any>;
  constructor(private firebasedb: AngularFireDatabase) { }
  getToDoList(){
    this.toDoList=this.firebasedb.list('title');
    return this.toDoList;
  }
  addTitle(title: string){
    let today: number = Date.now();
    let d= new Date();
    this.toDoList.push({
      title: title,
      date: dateformat(d, "dd, mm, yyyy, h:MM:ss TT "),
      isChecked: false
    });
  }

  checkOrUncheckTitle($key: string, flag: boolean){
    this.toDoList.update($key, {isChecked:flag})
  }
  removeTitle($key: string){
    this.toDoList.remove($key);
  }

  

}
