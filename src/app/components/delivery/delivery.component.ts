import { Component, OnInit, Input } from '@angular/core';
import { DeliveryResponse } from 'src/app/api/models/response/delivery-response';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditDeliveryModalComponent } from 'src/app/modals/edit-delivery-modal/edit-delivery-modal.component';
import * as moment from 'moment';
import { DeliveryService } from 'src/app/api/services/delivery.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss']
})
export class DeliveryComponent implements OnInit {

  @Input() delivery: DeliveryResponse;
  @Input() index: number;

  constructor(private modalService: NgbModal, private deliveryService: DeliveryService, private toastr: ToastrService) { }

  ngOnInit() {

  }

  edit(id: string) {
    const modalRef = this.modalService.open(EditDeliveryModalComponent);
    modalRef.componentInstance.id = id;
  }

  release(id: string) {
    this.deliveryService.releaseDelivery(id).subscribe(() => {
    }, err => {
      this.toastr.error('Erro ao liberar!');
    })
  }

  formatDate(date) {
    return moment(date).format("DD/MM/YYYY");
  }

}
