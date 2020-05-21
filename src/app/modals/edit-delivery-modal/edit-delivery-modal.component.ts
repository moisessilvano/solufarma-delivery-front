import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DeliveryService } from 'src/app/api/services/delivery.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-delivery-modal',
  templateUrl: './edit-delivery-modal.component.html',
  styleUrls: ['./edit-delivery-modal.component.scss']
})
export class EditDeliveryModalComponent implements OnInit {
  @Input() id;

  form = new FormGroup({
    orderCode: new FormControl('', Validators.required),
    customerName: new FormControl('', Validators.required),
    fullAddress: new FormControl('', Validators.required),
    minTemperature: new FormControl(''),
    maxTemperature: new FormControl(''),
    minHumidity: new FormControl(''),
    maxHumidity: new FormControl(''),
    deliveredIn: new FormControl(''),
    deliveredUser: new FormControl(''),
  })

  constructor(public activeModal: NgbActiveModal, private deliveryService: DeliveryService, private toastr: ToastrService) { }

  ngOnInit() {
    if (this.id) {
      this.getDelivery();
    }
  }

  getDelivery() {
    this.deliveryService.getById(this.id).subscribe(res => this.form.patchValue(res));
  }

  onSubmit() {
    if (this.form.invalid) {
      this.toastr.error('Revise os dados e tente novamente!', 'Formulário inválido')
      return;
    }

    if (this.id) {
      this.deliveryService.update(this.id, this.form.value).subscribe(res => {
        this.toastr.success('Editado com sucesso');
      })
    } else {
      this.deliveryService.create(this.form.value).subscribe(res => {
        this.toastr.success('Cadastrado com sucesso');
      })
    }
  }

}
