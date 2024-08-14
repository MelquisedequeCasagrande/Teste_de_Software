import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NewsletterService } from '../newsletter.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subscribe-form',
  templateUrl: './subscribe-form.component.html',
  styleUrls: ['./subscribe-form.component.css']
})
export class SubscribeFormComponent {
  email: string = '';
  errorMessage: string = '';
  constructor(private newsletterService: NewsletterService, private router: Router) {}

  onSubmit() {
    this.newsletterService.subscribe(this.email).subscribe(
      response => {
        console.log('Inscrição realizada com sucesso!', response);
        this.router.navigate(['/confirmation']);
      },
      error => {
        console.error('Erro ao realizar inscrição', error);
        if (error.status === 400 && error.error.message === 'Este e-mail já está inscrito.') {
          this.errorMessage = 'Este e-mail já está cadastrado na nossa newsletter.';
        }
        else {
          this.errorMessage = 'Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.';
        }
      }
    );
  }
}