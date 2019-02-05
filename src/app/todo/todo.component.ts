import { Component, OnInit } from '@angular/core';
import {TodoServicesService} from './services/todo-services.service'

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  providers: [TodoServicesService]

})
export class TodoComponent implements OnInit {
  toDoListArray: any[];
  is_checked=false;
  constructor( private TodoService: TodoServicesService ) { }

  changebuttonType(){
    this.is_checked=!this.is_checked;
  }
  ngOnInit() {
    this.TodoService.getToDoList().snapshotChanges().
    subscribe(item=>{
      this.toDoListArray=[];
      item.forEach(element=>{
        var x =element.payload.toJSON();
        x["$key"]=element.key;
        this.toDoListArray.push(x);
      })
      // console.log(this.toDoListArray);

      this.toDoListArray.sort((a,b)=>{
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      })
     
    });
  }

  onAdd(itemTitle){
    this.checkRecord(itemTitle);
    this.TodoService.addTitle(itemTitle.value);
    itemTitle.value=null;
  }

  alterCheck($key:string, isChecked){
    this.TodoService.checkOrUncheckTitle($key, !isChecked);
  }

  onDelete($key:string){
    this.TodoService.removeTitle($key);
  }

  checkRecord($key){
    console.log(this.toDoListArray.length);
    console.log($key.value);
    // this.toDoListArray.forEach((key : any, val: any) => {
    //   console.log(key);
    //   console.log($key.value);
    //   console.log(key.indexOf($key.value));
      
      // if (key.title==$key.value){
      //   console.log("value found in db");
      // }else{
      //   console.log("it was else part");
      // }

  // })

    


   
   
  }


}
