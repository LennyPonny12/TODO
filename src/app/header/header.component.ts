import { Component } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  password: string = '1234';
  login: string = 'miko';

  passwordInout: string;
  loginInput: string;

  constructor(private appService: AppService) {}

  resetInputs() {
    this.passwordInout = '';
    this.loginInput = '';
  }

  onLogin() {
    if (this.passwordInout !== '1234' || this.loginInput !== 'miko') {
      this.resetInputs();
    }
    this.appService.isLogged = true;
    this.appService.fetchData();
    this.resetInputs();
  }
}
