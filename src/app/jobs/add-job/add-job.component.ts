import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-job',
  templateUrl: './add-job.component.html',
  styleUrls: ['./add-job.component.scss']
})
export class AddJobComponent implements OnInit {

    project: {
      id: number;
      name: string;
      amount_money: number;
    };
    submitted = false;

  constructor() { }

  ngOnInit(): void {
  }

}
