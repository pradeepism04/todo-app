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
  is_checked=true;
  error_mes="";
  error_message=false;
  constructor( private TodoService: TodoServicesService ) { }

  changebuttonType(){
    this.is_checked=!this.is_checked;
  }
  ngOnInit() {
    this.error_message=false;
    this.error_mes="";
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
    if (itemTitle.value.trim()!==''){
    let check_status=this.checkRecord(itemTitle.value.trim());
    // console.log(check_status);
    if(check_status!==""){
      this.error_message=true;
      this.error_mes="Record found in DB";
      setTimeout(()=>{
        this.error_message=false;
    },(2000));
      this.TodoService.checkOrUncheckTitle(check_status, false);
      itemTitle.value=null;
    }else{
      this.TodoService.addTitle(itemTitle.value);
      itemTitle.value=null;
    }
    // this.TodoService.addTitle(itemTitle.value);
    // itemTitle.value=null;

    }else{
      this.error_message=true;
      setTimeout(()=>{
        this.error_message=false;
    },(2000));
      this.error_mes="Please enter some Input";

    }
  }

  alterCheck($key:string, isChecked){
    this.TodoService.checkOrUncheckTitle($key, !isChecked);
  }

  onDelete($key:string){
    this.TodoService.removeTitle($key);
  }

  checkRecord(item){
    let check_found="";
    this.toDoListArray.forEach((key : any, val: any) => {
      console.log(key.$key);
      if ( key.title!== undefined && key.title.toLowerCase()===item.toLowerCase()){
        check_found= key.$key;
      }

  });
  return check_found;
}

}
