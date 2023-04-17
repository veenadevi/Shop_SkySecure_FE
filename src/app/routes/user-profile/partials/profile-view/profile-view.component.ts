import { Component } from '@angular/core';

@Component({
  selector: 'profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.css']
})
export class ProfileViewComponent {
  onSubmit(formValue) {
    console.log(formValue);
  }
}
