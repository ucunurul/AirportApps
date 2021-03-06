import { HomePage } from './../home/home';
import { AuthServiceProvider } from './../../providers/auth-service/auth-service';
import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, MenuController } from 'ionic-angular';
import { RegisterPage } from '../register/register';

@Component({
    selector: 'page-login',
    templateUrl: 'login.html'
})
export class LoginPage {
    public loader= this.load.create();
    registerCredentials = { username: '', password: '' };

    constructor(public nav: NavController, private auth: AuthServiceProvider, private alertCtrl: AlertController,public load : LoadingController, public menu: MenuController) { 
    this.menu.enable(false);
    }

    public createAccount() {
        this.nav.push(RegisterPage);
    }

    public login() {
         let loader = this.load.create({
            content: 'Please wait...'
        });
        loader.present();
        this.auth.login(this.registerCredentials).subscribe(allowed => {           
            if (allowed) {                     
                    this.nav.setRoot(HomePage);
                    this.menu.enable(true); 
                    loader.dismiss();        
            } else {
                this.showError("Username and password not yet registered");
                loader.dismiss();
            }
        },
            error => {
                this.showError(error);
            });
    }

    showError(text) {
        let alert = this.alertCtrl.create({
            title: 'Failed Login!',
            subTitle: text,
            buttons: ['OK']
        });
        alert.present(prompt);
    }
}