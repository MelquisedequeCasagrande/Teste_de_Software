import { Component } from '@angular/core';
import { NewsletterService } from '../newsletter.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { emailPrefixValidator } from '../validators/email-prefix.validator';

@Component({
  selector: 'app-subscribe-form',
  templateUrl: './subscribe-form.component.html',
  styleUrls: ['./subscribe-form.component.css']
})

export class SubscribeFormComponent {
  errorMessage: string = '';
  subscribeForm: FormGroup;

  constructor(private newsletterService: NewsletterService, private router: Router, private fb: FormBuilder) {
    this.subscribeForm = this.fb.group({
      email: ['', [Validators.required, Validators.email, emailPrefixValidator()]] 
    });
  }

  get email() {
    return this.subscribeForm.get('email');
  }

  onSubmit() {
    if (this.subscribeForm.valid) {
      const emailValue = this.email?.value; 
      if (emailValue) {
        this.newsletterService.subscribe(emailValue).subscribe(
          response => {
            console.log('Inscrição realizada com sucesso!', response);
            this.router.navigate(['/confirmation']);
          },
          error => {
            console.error('Erro ao realizar inscrição', error);
            if (error.status === 400 && error.error.message === 'Este e-mail já está inscrito.') {
              this.errorMessage = 'Este e-mail já está cadastrado na nossa newsletter.';
            } else {
              this.errorMessage = 'Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.';
            }
          }
        );
      }
    } else {
      this.errorMessage = 'Por favor, insira um e-mail válido.';
    }
  }
}