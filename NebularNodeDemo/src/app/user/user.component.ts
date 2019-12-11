import { Component, OnInit } from '@angular/core';
import { MainService } from '../service/main.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor(private mainService: MainService) { }
  settings = {
    add: {
      addButtonContent: '<i class="fa fa-plus"></i>',
      createButtonContent: '<i class="fa fa-user-plus" aria-hidden="true"></i>',
      cancelButtonContent: '<i class="fa fa-times" aria-hidden="true"></i>',
      confirmCreate: true,
    },
    edit: {
      editButtonContent: '<i class="fa fa-edit"></i>',
      saveButtonContent: '<i class="fa fa-save"></i>',
      cancelButtonContent: '<i class="fa fa-times" aria-hidden="true"></i>',
      confirmSave: true,
    },
    delete: {
      deleteButtonContent: '<i class="fa fa-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      id: {
        title: 'ID',
        type: 'number',
        editable: false,
      },
      firstName: {
        title: 'First Name',
        type: 'string',
      },
      lastName: {
        title: 'Last Name',
        type: 'string',
      },
      username: {
        title: 'Username',
        type: 'string',
      },
      email: {
        title: 'E-mail',
        type: 'string',
      },
      age: {
        title: 'Age',
        type: 'number',
      },
    },
  };
  Users: any = [];
  ngOnInit() {
    this.mainService.getUsers().subscribe((data) => {
      this.Users = data;
    });
  }

  // Delete User
  onDeleteConfirm(event) {
    if (window.confirm('Are you sure you want to delete?')) {
      this.mainService.deleteUser(event.data.id).subscribe(data => {
        event.confirm.resolve();
      });
    } else {
      event.confirm.reject();
    }
  }

  // Add User
  onCreateConfirm(event) {
    this.mainService.createUser(event.newData).subscribe((data) => {
      if (data) {
        event.confirm.resolve();
        // tslint:disable-next-line: no-shadowed-variable
        this.mainService.getUsers().subscribe((data) => {
          this.Users = data;
        });
      } else {
        event.confirm.reject();
      }
    });
  }

  // Edit User
  onSaveConfirm(event) {
    this.mainService.updateUser(event.data._id, event.newData).subscribe(data => {
      if (data) {
        event.confirm.resolve();
      } else {
        event.confirm.reject();
      }
    });
  }
}
