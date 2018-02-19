// import { NavParams } from "ionic-angular";
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class TaskserviceProvider {
  taskType : string = "All Lists";

  todolist: any[] = [];
  finishedtaskList: any[] = [];
  taskindex;
  finishedtask;
  FINISHED_KEY = 'completed_item';
  STORAGE_KEY = 'todo_item';
  
  constructor(public storage :Storage) {}

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

}
