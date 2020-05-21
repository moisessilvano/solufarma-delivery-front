import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { DeliveryService } from 'src/app/api/services/delivery.service';
import { ToastrService } from 'ngx-toastr';
import { DeliveryResponse } from 'src/app/api/models/response/delivery-response';
import * as moment from 'moment';

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

  constructor(
    private deliveryService: DeliveryService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
  }

  get f() { return this.form.controls; }


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
    this.loading = true;
    this.deliveryService.completeDelivery(this.delivery._id).subscribe(res => {
      this.toastr.success('Entrega concluída com sucesso!');
      this.goToSearch();
      this.loading = false;
    }, err => {
      this.toastr.error('Não foi possível concluir a entrega');
      this.loading = false;
    })
  }

  goToSearch() {
    this.delivery = null;
  }

  formatDate(date) {
    return moment(date).format("DD/MM/YYYY");
  }
}
