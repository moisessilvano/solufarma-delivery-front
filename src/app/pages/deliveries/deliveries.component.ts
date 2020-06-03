import { Component, OnInit } from '@angular/core';
import { DeliveryResponse } from 'src/app/api/models/response/delivery-response';
import { DeliveryService } from 'src/app/api/services/delivery.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditDeliveryModalComponent } from 'src/app/modals/edit-delivery-modal/edit-delivery-modal.component';
import * as moment from 'moment';
import { UploadModalComponent } from 'src/app/modals/upload-modal/upload-modal.component';
import { DeliverySocket } from 'src/app/api/sockets/delivery.socket';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { UserService } from 'src/app/api/services/user.service';
import { UserResponse } from 'src/app/api/models/response/user-response';

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

  loading: boolean;

  uploadInfo = {
    status: null,
    qntAdded: 0,
    qntUpdated: 0,
    qntRemaining: 0,
    count: 0,
    qntNotUpdated: 0,
    qntNotAdded: 0
  };

  isImcompleteData: boolean;

  motoboyList: UserResponse[] = [];

  constructor(
    private deliveryService: DeliveryService,
    private modalService: NgbModal,
    private deliverySocket: DeliverySocket,
    private toastr: ToastrService,
    private userService: UserService
  ) { }

  ngOnInit() {
    const currentDate = moment();

    this.initialDate = currentDate.format("YYYY-MM-DD");

    this.searchForm.patchValue({
      initialDate: this.initialDate,
      finalDate: '',
    });

    this.getMotoboys();
    this.getDeliveries();

    this.deliverySocket.getData('upload').subscribe(res => {
      this.uploadInfo = res;

      if (this.uploadInfo.qntRemaining == 0) {
        this.getDeliveries();
      }
    });

    this.deliverySocket.getData('deliveries').subscribe(delivery => {

      if (delivery.status == 'delivered') {
        this.toastr.info('Foi entregue por ' + delivery.deliveredUser.name, 'Romaneio ' + delivery.orderCode);
      }

      if (moment(delivery) >= moment(this.initialDate)) {
        this.deliveryList = this.deliveryList.map(d => {
          if (d._id == delivery._id) {
            return delivery;
          }
          return d;
        })
      }
    })
  }

  get f() { return this.searchForm.controls; }

  getMotoboys() {
    this.userService.getByType('motoboy').subscribe(res => this.motoboyList = res);
  }

  getDeliveries() {
    this.loading = true;
    this.isImcompleteData = false;
    const { initialDate, finalDate } = this.searchForm.value;
    this.initialDate = initialDate;
    this.finalDate = finalDate;

    this.deliveryService.getByDate(this.searchForm.value).subscribe(res => {
      this.deliveryList = res;
      this.loading = false;

      this.deliveryList.map(d => {
        if (!d.arrivalDateTime || !d.arrivalTemperature || !d.departureDateTime || !d.departureTemperature) {
          this.isImcompleteData = true;
        }
      })

    }, err => {
      this.loading = false;
    })
  }

  add() {
    const modalRef = this.modalService.open(EditDeliveryModalComponent);
    modalRef.result.then(() => {
      this.getDeliveries();
    });
  }

  upload() {
    const modalRef = this.modalService.open(UploadModalComponent);
    modalRef.result.then(() => {
      this.getDeliveries();
    });
  }

  formatDate(date) {
    return moment(date).format("DD-MM-YYYY");
  }

  download() {
    const { initialDate, finalDate } = this.searchForm.value;

    if (initialDate && !finalDate) {
      window.open(environment.apiUrl + '/api/deliveries/getByDate?initialDate=' + initialDate + '&finalDate=&exportFile=true')
    }

    if (initialDate && finalDate) {
      window.open(environment.apiUrl + '/api/deliveries/getByDate?initialDate=' + initialDate + '&finalDate=' + finalDate + '&exportFile=true')
    }
  }
}
