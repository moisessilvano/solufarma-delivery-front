import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  decodeToken: any;

  constructor(
    private tokenService: TokenService,
    private router: Router
  ) { }

  ngOnInit() {
    this.decodeToken = this.tokenService.decokeToken();

    const { type } = this.decodeToken;

    if (type === 'admin') {
      this.router.navigate(['/deliveries']);
    }

    if (type === 'motoboy') {
      this.router.navigate(['/motoboy']);
    }
  }

}
