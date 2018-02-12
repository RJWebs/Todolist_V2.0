import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class TaskserviceProvider {
 taskType : string = "All Lists";
  
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
