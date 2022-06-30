import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [
  ]
})
export class SearchComponent  {

  @ViewChild('txtsrch') txtsrch!: ElementRef<HTMLInputElement>;
  constructor
  (
    private _gifService : GifsService
  ){}

  search(){
    let value = this.txtsrch.nativeElement.value;
    if( value.length === 0 ) return;
    this._gifService.searchGifs( this.txtsrch.nativeElement.value );
    this.txtsrch.nativeElement.value = '';
  }

}
