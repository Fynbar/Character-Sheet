import { Component, OnInit } from '@angular/core';
import { PythonService } from 'src/app/services/python.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public service: PythonService) { }

  ngOnInit() {
    this.service.sayHi().subscribe(d =>
      console.log(d)
    );
  }

}
