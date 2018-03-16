// import { NavParams } from "ionic-angular";
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { DatePipe } from '@angular/common';

@Injectable()
export class TaskserviceProvider {
  taskType : string = "All Lists";
  sortDate : any = "";
  sortDateLable :  any;
  todolist: any[] = [];
  finishedtaskList: any[] = [];
  taskindex;
  finishedtask;
  FINISHED_KEY = 'completed_item';
  STORAGE_KEY = 'todo_item';
  
  constructor(public storage :Storage,private datePipe: DatePipe) {}

  setTaskType(taskType : any)
  {
    this.taskType = taskType;
  }

  getTaskType()
  {
    return this.taskType;
  }

  //Remove finished items from storage and put into another storage
  finishTask(i) {
    this.taskindex = i; 
    console.log("in");
    //  this.storage.get(this.STORAGE_KEY).then(result => {
    //     result.forEach(element => {
    //       if(result.indexOf(element)===this.taskindex) {            
    //         this.finishedtask = element;
    //         console.log("finishtask "+ this.finishedtask.taskname+" "+ this.finishedtask.description);
    //       }
    //       else {
    //         this.todolist.push(element);
    //       }
    //     });
    //     console.log("todolist :"+ this.todolist);
    //     this.storage.set(this.STORAGE_KEY, this.todolist);
    // });

    // this.storage.get(this.FINISHED_KEY).then(result => {
    //   if(result) {
    //     result.forEach(element => {
    //       this.finishedtaskList.push(element);
    //     });
    //     this.finishedtaskList.push(this.finishedtask);
    //   } 
    //   else {
    //     this.finishedtaskList.push(this.finishedtask);
    //   }
    //   console.log("finishtask :"+ this.finishedtask);
    //   this.storage.set(this.FINISHED_KEY, this.finishedtaskList);
    // });

    // this.navCtrl.popToRoot();
  }
  
  setSortDate(date : any)
  {
    this.sortDate = date;
    this.storage.set("sortdate",this.sortDate);
  }
  getSortDate()
  {
    return this.sortDate;
  }
  setSortDateAll()
  {
    this.sortDate = "";
  }
  getSortDateLable()
  {
    console.log(this.sortDate + "ss");
    if(this.sortDate == "")
    {
      this.sortDateLable = "All Dates"
    }
    else if(this.sortDate == this.datePipe.transform(new Date, 'yyyy-MM-dd'))
    {
      this.sortDateLable = "Today";
    }
    else
    {
      this.sortDateLable = this.sortDate;
    }

    return this.sortDateLable;
    
  }
}
