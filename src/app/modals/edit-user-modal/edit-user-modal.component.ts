import { Component, OnInit, Input } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/api/services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-user-modal',
  templateUrl: './edit-user-modal.component.html',
  styleUrls: ['./edit-user-modal.component.scss']
})
export class EditUserModalComponent implements OnInit {

  @Input() id;

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    username: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9!@#$%^&*()]+$/)]),
    password: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
  })

  constructor(
    public activeModal: NgbActiveModal,
    private userService: UserService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    if (this.id) {
      this.getDelivery();
    }
  }

  get f() { return this.form.controls; }

  getDelivery() {
    this.userService.getById(this.id).subscribe(res => this.form.patchValue(res));
  }

  onSubmit() {
    console.log(this.form.value)
    if (this.form.invalid) {
      this.toastr.error('Revise os dados e tente novamente!', 'Formulário inválido')
      return;
    }

    if (this.id) {
      this.userService.update(this.id, this.form.value).subscribe(res => {
        this.toastr.success('Editado com sucesso');
        this.activeModal.close();
      })
    } else {
      this.userService.create(this.form.value).subscribe(res => {
        this.toastr.success('Cadastrado com sucesso');
        this.activeModal.close();
      })
    }
  }


}
