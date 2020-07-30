import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../_services/user.service';
import { ActivityService } from '../_services/activity.service';

import { FlashMessagesService } from 'angular2-flash-messages';

import { Activity } from '../_model/Activity';

@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.scss']
})
export class BoardUserComponent implements OnInit {

  content: string;
  @Input() activity: Activity;
  selected: number;
  votingEnded = false;

  constructor(private userService: UserService, private activityService: ActivityService, private flashMessagesService: FlashMessagesService) { }

  ngOnInit() {
    this.userService.getUserBoard().subscribe(
      data => {
        this.content = data;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
    const now = new Date();

    if (new Date(this.activity.finish_on).getTime() < now.getTime()) {
      this.votingEnded = true;
    }
  }

  vote() {
    this.activityService.vote(this.activity.id, this.selected).subscribe(success => {
      this.activity.lock_on = true;
      this.flashMessagesService.show('Vote submitted!', { cssClass: 'card-panel green lighten-4', timeout: 3000 });
    }, error => {
      console.log(error);
      this.flashMessagesService.show('You can\'t vote twice', { cssClass: 'card-panel red lighten-3', timeout: 3000 });
    });
  }

}
