import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProcessService } from 'src/app/api/services/process.service';
import { ToastrService } from 'ngx-toastr';
import { DeliverySocket } from 'src/app/api/sockets/delivery.socket';

@Component({
  selector: 'app-upload-modal',
  templateUrl: './upload-modal.component.html',
  styleUrls: ['./upload-modal.component.scss']
})
export class UploadModalComponent implements OnInit {
  loading: boolean;

  file: any;

  constructor(
    public activeModal: NgbActiveModal,
    private processService: ProcessService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {

  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
    }
  }

  onSubmit() {
    if (!this.file) {
      this.toastr.error('Revise os dados e tente novamente!', 'Não foi possível enviar o arquivo')
      return;
    }

    this.loading = true;

    this.processService.importFile(this.file).subscribe(res => {
      this.toastr.success('Arquivo enviado com sucesso');
      this.loading = false;
      this.activeModal.close();
    }, err => {
      this.loading = false;
    })

  }

}
