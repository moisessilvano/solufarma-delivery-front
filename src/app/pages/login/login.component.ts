import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../../app/api/services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isSubmitted: boolean;
  loading: boolean;

  form = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  constructor(
    private toastr: ToastrService,
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    if (this.form.invalid) {
      this.toastr.error('Revise seus dados e tente novamente!', 'Algo de errado aconteceu')
      return;
    }

    this.loading = true;

    this.isSubmitted = true;

    this.authService.login(this.form.value).subscribe(res => {
      this.loading = false;
    }, err => {
      this.toastr.error('Verifique seus dados', 'Não foi possível efetuar login');
    })
  }

}
