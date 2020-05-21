import { Component, OnInit } from '@angular/core';
import { DeliveryResponse } from 'src/app/api/models/response/delivery-response';
import { DeliveryService } from 'src/app/api/services/delivery.service';
import { FormGroup, FormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditDeliveryModalComponent } from 'src/app/modals/edit-delivery-modal/edit-delivery-modal.component';

@Component({
  selector: 'app-deliveries',
  templateUrl: './deliveries.component.html',
  styleUrls: ['./deliveries.component.scss']
})
export class DeliveriesComponent implements OnInit {

  deliveryList: DeliveryResponse[] = [];

  searchForm = new FormGroup({
    orderCode: new FormControl(''),
    customerName: new FormControl(''),
    deliveryDate: new FormControl(''),
  })

  constructor(
    private deliveryService: DeliveryService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.getDeliveries();
  }

  getDeliveries() {
    this.deliveryService.getByDate('2020-03-02').subscribe(res => {
      this.deliveryList = res;
    })
  }

  searchDeliveries() {

  }

  add(id: string) {
    const modalRef = this.modalService.open(EditDeliveryModalComponent);
  }

}
