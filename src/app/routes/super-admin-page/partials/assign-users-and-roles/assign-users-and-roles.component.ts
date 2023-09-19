import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'assign-users-and-roles',
  templateUrl: './assign-users-and-roles.component.html',
  styleUrls: ['./assign-users-and-roles.component.css']
})
export class AssignUsersAndRolesComponent implements OnInit{


    public users: any[] = [];
    public selectedUsers: any[] = [];

    public roles: any[] = [];
    public selectedRoles: any[] = [];

  ngOnInit(): void {
    this.setUsersData();
    this.setRoldesData();
  }

  public setUsersData(){
      this.users = [
        {
            id: 1,
            name: "Vitara Brezza"
        },
        {
            id: 2,
            name: "Audi R8"
        },
        {
            id: 3,
            name: "Swift Dezire"
        },
        {
            id: 4,
            name: "Baleno"
        },
        {
            id: 5,
            name: "Ertiga"
        },
        {
            id: 6,
            name: "Seltos"
        },
    ];
  }

  public setRoldesData(){
    this.roles = [
      {
          id: 1,
          name: "Sales Admin"
      },
      {
          id: 2,
          name: "Account Manager"
      },
      {
          id: 3,
          name: "Channel Partner Admin"
      },
      {
          id: 4,
          name: "General"
      }
  ];
}
}
