import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'ok';
  tasks = [];
  showSingleInfo = {};
  show_individ = false;
  seeAll = false;
  constructor(private _httpService: HttpService) {
    console.log(_httpService);
  }

  ngOnInit() {
    // this.getTasks();
  }

  getTasks() {
    let observable = this._httpService.getTasks();
    observable.subscribe(data => {
      console.log("THIS IS MY DATA", data['data']);
      this.tasks = data['data'];
      this.seeAll = true;
    });
  }
  viewTask(id: Number) {
    let observable = this._httpService.viewTask(id);
    observable.subscribe(data => {
      this.showSingleInfo = data['data'];
      this.show_individ = true;
    });
  }
  
}
