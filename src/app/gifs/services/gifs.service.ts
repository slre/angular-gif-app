import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGIFResponse, Gif } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  constructor(private _http: HttpClient) {
    // if( localStorage.getItem('history') ){
    //   this._history = JSON.parse( localStorage.getItem('history')! ) // The '!' is telling typescript not complain about the type ov returned value
    // }
    this._history = JSON.parse(localStorage.getItem('history')!) || [];
    this.results = JSON.parse(localStorage.getItem('results')!) || [];
  }

  private apiKey: string = 'P5VPdZHLbzrwHQbNn9ckeE7CVNtE6dZ3';
  private urlSrvc : string = 'https://api.giphy.com/v1/gifs';

  private _history: string[] = [];
  public results: Gif[] = [];

  get history() {
    return [...this._history];
  }

  searchGifs(query: string) {
    query = query.trim().toLocaleLowerCase();
    if (!this._history.includes(query)) {
      this._history.unshift(query);
      this._history = this._history.splice(0, 10);
      localStorage.setItem('history', JSON.stringify(this._history));
    }

    const params = new HttpParams()
                        .set('api_key', this.apiKey)
                        .set('limit','10')
                        .set('q',query);
    this._http
      .get<SearchGIFResponse>(
        `${this.urlSrvc}/search`,{ params }
      )
      .subscribe((res: any) => {
        this.results = res.data;
        localStorage.setItem('results', JSON.stringify(this.results));
      });
  }
}
