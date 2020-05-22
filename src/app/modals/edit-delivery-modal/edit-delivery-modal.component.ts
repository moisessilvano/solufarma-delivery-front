import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DeliveryService } from 'src/app/api/services/delivery.service';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';

@Component({
  selector: 'app-edit-delivery-modal',
  templateUrl: './edit-delivery-modal.component.html',
  styleUrls: ['./edit-delivery-modal.component.scss']
})
export class EditDeliveryModalComponent implements OnInit {
  @Input() id;

  form = new FormGroup({
    deliveryDate: new FormControl('', Validators.required),
    orderCode: new FormControl('', Validators.required),
    requestCode: new FormControl('', Validators.required),
    customerName: new FormControl('', Validators.required),
    fullAddress: new FormControl('', Validators.required),
    departureDateTime: new FormControl(''),
    departureTemperature: new FormControl(''),
    arrivalDateTime: new FormControl(''),
    arrivalTemperature: new FormControl(''),
    status: new FormControl('pending'),
    amountReceivable: new FormControl(''),
    paymentMethod: new FormControl(''),
    receivedBy: new FormControl(''),
  })

  loading: boolean;

  constructor(public activeModal: NgbActiveModal, private deliveryService: DeliveryService, private toastr: ToastrService) { }

  ngOnInit() {
    if (this.id) {
      this.getDelivery();
    }
  }

  get f() { return this.form.controls; }

  getDelivery() {
    this.loading = true;

    this.deliveryService.getById(this.id).subscribe(res => {
      let departure, arrival;

      if (res.departureDateTime) {
        departure = {
          departureDateTime: this.formatDateTime(res.departureDateTime),
        }
      }

      if (res.arrivalDateTime) {
        arrival = {
          arrivalDateTime: this.formatDateTime(res.arrivalDateTime),
        }
      }

      this.form.patchValue({
        ...res,
        deliveryDate: this.formatDate(res.deliveryDate),
        ...departure,
        ...arrival
      });
      this.loading = false;
    }, err => {
      this.loading = false;
    });
  }

  formatDateTime(date) {
    return moment(date).format("YYYY-MM-DDTHH:mm")
  }

  formatDate(date) {
    return moment(date).format("YYYY-MM-DD")
  }

  onSubmit() {
    if (this.form.invalid) {
      this.toastr.error('Revise os dados e tente novamente!', 'Formulário inválido')
      return;
    }

    this.loading = true;

    if (this.id) {
      this.deliveryService.update(this.id, this.form.value).subscribe(res => {
        this.toastr.success('Editado com sucesso');
        this.loading = false;
        this.activeModal.close();
      }, err => {
        this.loading = false;
      })
    } else {
      this.deliveryService.create(this.form.value).subscribe(res => {
        this.toastr.success('Cadastrado com sucesso');
        this.loading = false;
        this.activeModal.close();
      }, err => {
        this.loading = false;
      })
    }
  }

}
