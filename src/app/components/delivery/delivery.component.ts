import { Component, OnInit, Input } from '@angular/core';
import { DeliveryResponse } from 'src/app/api/models/response/delivery-response';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditDeliveryModalComponent } from 'src/app/modals/edit-delivery-modal/edit-delivery-modal.component';
import * as moment from 'moment';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss']
})
export class DeliveryComponent implements OnInit {

  @Input() delivery: DeliveryResponse;
  @Input() index: number;

  constructor(private modalService: NgbModal) { }

  ngOnInit() {

  }

  edit(id: string) {
    const modalRef = this.modalService.open(EditDeliveryModalComponent);
    modalRef.componentInstance.id = id;
  }

  cancel(id: string) {

  }

  enable(id: string) {

  }

  formatDate(date) {
    return moment(date).format("DD/MM/YYYY");
  }

}
