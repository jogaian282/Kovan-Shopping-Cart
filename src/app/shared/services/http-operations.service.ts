import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class HttpOperationsService {

  constructor(private httpClient: HttpClient) { }

  /**
   * @description - GET Request.
  */
  public getList(url: string) {
    return this.httpClient.get(url);
  }

}
