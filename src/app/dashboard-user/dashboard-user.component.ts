import { Component, Input, OnInit } from '@angular/core';
import { Activity } from "../_models/Activity";
import { FlashMessagesService } from "angular2-flash-messages";
import { OptionService } from "../_services/option.service";
import { UserService } from "../_services/user.service";


@Component({
  selector: 'app-dashboard-user',
  templateUrl: './dashboard-user.component.html',
  styleUrls: [ './dashboard-user.component.scss' ]
})
export class DashboardUserComponent implements OnInit {
  @Input() activity: Activity;
  content: string;
  selected: number;
  votingEnded: boolean = false;

  constructor(private userService: UserService,
              private optionService: OptionService,
              private flashMessagesService: FlashMessagesService) { }

  ngOnInit(): void {
    this.votingEnded = new Date(this.activity.lockedOn).getTime() < new Date().getTime();
  }

  vote() {
    this.optionService.vote(this.selected).subscribe(success => {
      this.activity.lockedOn = new Date();
      this.flashMessagesService.show("Vote submitted!", {
        cssClass: 'card-panel green lighten-4',
        timeout: 3000
      });
    }, error => {
      console.log(error);
      this.flashMessagesService.show("You can't vote twice", {
        cssClass: 'card-panel red lighten-3',
        timeout: 3000
      });
    });
  }
}
