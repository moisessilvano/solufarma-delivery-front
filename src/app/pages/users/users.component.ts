import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/api/services/user.service';
import { UserResponse } from 'src/app/api/models/response/user-response';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditUserModalComponent } from 'src/app/modals/edit-user-modal/edit-user-modal.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: UserResponse[] = [];

  loading: boolean;

  constructor(
    private userService: UserService,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.loading = true;
    this.userService.getAll({}).subscribe(res => {
      this.users = res
      this.loading = false;
    }, err => {
      this.loading = false;
    });
  }

  add() {
    const modalRef = this.modalService.open(EditUserModalComponent);
    modalRef.result.then(() => {
      this.getAll();
    });
  }

  edit(id: string) {
    const modalRef = this.modalService.open(EditUserModalComponent);
    modalRef.componentInstance.id = id;
    modalRef.result.then(() => {
      this.getAll();
    });
  }

  remove(id: string) {
    this.userService.delete(id).subscribe(res => {
      this.toastr.success('Removido com sucesso!');
      this.getAll()
    }, err => {
      this.toastr.error('Erro ao remover!');
    })
  }
}
