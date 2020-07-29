import { Component, OnInit } from '@angular/core';
//import { UserService } from '../_services/user.service';
import { ActivityService } from '../_services/activity.service';

import { FlashMessagesModule } from 'angular2-flash-messages';

@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.scss']
})
export class BoardUserComponent implements OnInit {

  // content: string;

  // constructor(private userService: UserService) { }

  // ngOnInit(): void {
  //   this.userService.getUserBoard().subscribe(
  //     data => {
  //       this.content = data;
  //     },
  //     err => {
  //       this.content = JSON.parse(err.error).message;
  //     }
  //   );
  // }

  @Input() activity: Activity;
  selected: number;
  votingEnded = false;

  constructor(private activityService: ActivityService, private flashMessagesService: FlashMessagesService) { }

  ngOnInit() {
    const now = new Date();

    if (new Date(this.activity.endDate).getTime() < now.getTime()) {
      this.votingEnded = true;
    }
  }

  vote() {
    this.activityService.vote(this.activity.id, this.selected).subscribe(success => {
      this.activity.voted = true;
      this.flashMessagesService.show('Vote submitted!', { cssClass: 'card-panel green lighten-4', timeout: 3000 });
    }, error => {
      console.log(error);
      this.flashMessagesService.show('You can\'t vote twice', { cssClass: 'card-panel red lighten-3', timeout: 3000 });
    });
  }

}
