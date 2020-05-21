import { Component, OnInit } from '@angular/core';
import { DeliveryResponse } from 'src/app/api/models/response/delivery-response';
import { DeliveryService } from 'src/app/api/services/delivery.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditDeliveryModalComponent } from 'src/app/modals/edit-delivery-modal/edit-delivery-modal.component';
import * as moment from 'moment';
@Component({
  selector: 'app-deliveries',
  templateUrl: './deliveries.component.html',
  styleUrls: ['./deliveries.component.scss']
})
export class DeliveriesComponent implements OnInit {

  deliveryList: DeliveryResponse[] = [];

  searchForm = new FormGroup({
    initialDate: new FormControl('', Validators.required),
    finalDate: new FormControl(''),
  })

  initialDate: string;
  finalDate: string;

  constructor(
    private deliveryService: DeliveryService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.getDeliveries();

    const currentDate = moment();

    this.initialDate = currentDate.format("YYYY-MM-DD");

    this.searchForm.patchValue({
      initialDate: this.initialDate,
      finalDate: '',
    })

    this.add();
  }

  get f() { return this.searchForm.controls; }

  getDeliveries() {
    const { initialDate, finalDate } = this.searchForm.value;
    this.initialDate = initialDate;
    this.finalDate = finalDate;

    this.deliveryService.getByDate(this.searchForm.value).subscribe(res => {
      this.deliveryList = res;
    })
  }

  add() {
    const modalRef = this.modalService.open(EditDeliveryModalComponent);
    modalRef.result.then(() => {
      this.getDeliveries();
    });
  }

  formatDate(date) {
    return moment(date).format("DD-MM-YYYY");
  }

}
