import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { DeliveryService } from 'src/app/api/services/delivery.service';
import { ToastrService } from 'ngx-toastr';
import { DeliveryResponse } from 'src/app/api/models/response/delivery-response';
import * as moment from 'moment';
import { TokenService } from 'src/app/services/token.service';
import { AuthService } from 'src/app/api/services/auth.service';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-motoboy',
  templateUrl: './motoboy.component.html',
  styleUrls: ['./motoboy.component.scss']
})
export class MotoboyComponent implements OnInit {

  form = new FormGroup({
    orderCode: new FormControl('', [Validators.required])
  });

  delivery: DeliveryResponse;

  loading: boolean;

  decodeToken: any;

  receivedBy: string;

  completeForm = new FormGroup({
    amountReceivable: new FormControl(''),
    paymentMethod: new FormControl(''),
    receivedBy: new FormControl(''),
  })

  deliveryList: DeliveryResponse[] = [];

  constructor(
    private deliveryService: DeliveryService,
    private toastr: ToastrService,
    private tokenService: TokenService,
    private authService: AuthService,
    private decimalPipe: DecimalPipe
  ) { }

  ngOnInit() {
    this.decodeToken = this.tokenService.decokeToken();
    this.getDeliveriesByMotoboy();
  }

  get f() { return this.form.controls; }

  logout() {
    this.loading = true;
    this.authService.logout();
  }

  getDeliveriesByMotoboy() {
    this.deliveryService.getByMotoboy(this.decodeToken._id).subscribe(res => {
      this.deliveryList = res;
    })
  }

  getById(id) {
    this.deliveryService.getById(id).subscribe(res => {
      this.delivery = res;
      this.loading = false;
    }, err => {
      this.toastr.error('Não foi possível localizar a entrega');
      this.loading = false;
    })
  }


  searchRomaneio() {
    if (this.form.invalid) {
      this.toastr.error('Digite um número válido')
    }

    this.loading = true;

    const { orderCode } = this.form.value;

    this.deliveryService.getByOrder(orderCode).subscribe(res => {
      this.delivery = res;
      this.loading = false;
    }, err => {
      this.toastr.error('Não foi possível localizar a entrega');
      this.loading = false;
    })
  }

  completeDelivery() {
    if (this.completeForm.invalid) {
      this.toastr.error('Digite um número válido');
      return;
    }

    const { amountReceivable, paymentMethod } = this.completeForm.value;
    if (amountReceivable > 0) {
      if (!paymentMethod) {
        this.toastr.error('Selecione a forma de pagamento');
        return;
      }
    }

    this.loading = true;
    this.deliveryService.completeDelivery(this.delivery._id, this.completeForm.value).subscribe(res => {
      this.toastr.success('Entrega concluída com sucesso!');
      this.goToSearch();
      this.loading = false;

      this.completeForm.reset();
      this.getDeliveriesByMotoboy();

    }, err => {
      this.toastr.error('Não foi possível concluir a entrega');
      this.loading = false;
    })
  }

  goToSearch() {
    this.delivery = null;
    this.form.patchValue({
      orderCode: ''
    })
  }

  formatDate(date) {
    return moment(date).format("DD/MM/YYYY");
  }

  onBlur(event) {
    if (event.target.value !== '')
      event.target.value = parseFloat(event.target.value).toFixed(2)
  }

  release(id: string) {
    this.loading = true;

    this.deliveryService.releaseDelivery(id, this.decodeToken._id).subscribe(() => {
      this.toastr.success('Entrega liberada com sucesso!');
      this.goToSearch();
      this.loading = false;

      this.completeForm.reset();
      this.getDeliveriesByMotoboy();
    }, err => {
      this.loading = false;
      this.toastr.error('Erro ao liberar!');
    })
  }
}
