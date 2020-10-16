import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  constructor() { }

  getImage(id: number): void {
    console.log('get image');
  }
}
