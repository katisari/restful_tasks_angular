import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private _http: HttpClient) {
  }
  
  getTasks() {
    return this._http.get('/tasks');
  }

  viewTask(id: Number) {
    return this._http.get(`/tasks/${id}`);
  }
}
