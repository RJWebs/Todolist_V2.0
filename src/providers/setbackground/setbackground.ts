
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class SetbackgroundProvider {

  imageurl: string;
  BACKGROUND_KEY = 'image_url';

  constructor(public storage :Storage) {}
  
  setBackground(imageurl) {
    this.storage.set(this.BACKGROUND_KEY, imageurl);
  }

  getBackground() {
    return this.storage.get(this.BACKGROUND_KEY).then((val) => {
      // this.imageurl = val;
      return val;
    });   
  }

}
