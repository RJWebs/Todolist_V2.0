
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class SetbackgroundProvider {

  BACKGROUND_KEY = 'image_url';
  BCOLOR_KEY = 'bcolor';

  constructor(public storage :Storage) {}
  
  setBackground(imageurl) {
    this.storage.set(this.BACKGROUND_KEY, imageurl);
  }

  getBackground() {
    return this.storage.get(this.BACKGROUND_KEY).then((val) => {
      return val;
    });   
  }

  setBackgroundColor(bcolor) {
    this.storage.set(this.BCOLOR_KEY, bcolor);
  }

  getBackgroundColor() {
    return this.storage.get(this.BCOLOR_KEY).then((val) => {
      return val;
    }); 
  }

}
