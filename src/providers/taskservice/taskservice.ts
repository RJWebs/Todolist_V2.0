// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

/*
  Generated class for the TaskserviceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TaskserviceProvider {
 taskType : string = "All Lists";
  // todolist : any[] = [];

  // STORAGE_KEY = 'todo_item';

  constructor(public storage :Storage) {}

  setTaskType(taskType : any)
  {
    this.taskType = taskType;
  }

  getTaskType()
  {
    return this.taskType;
  }
}
