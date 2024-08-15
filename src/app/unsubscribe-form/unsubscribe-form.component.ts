import { Component } from '@angular/core';
import { NewsletterService } from '../newsletter.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { emailPrefixValidator } from '../validators/email-prefix.validator';

@Component({
  selector: 'app-unsubscribe-form',
  templateUrl: './unsubscribe-form.component.html',
  styleUrls: ['./unsubscribe-form.component.css'],
})
export class UnsubscribeFormComponent {
  message: string = ''; 
  isUnsubscribed: boolean = false;
  unSubscribeForm: FormGroup;

  constructor(private newsletterService: NewsletterService, private router: Router, private fb: FormBuilder) {
    this.unSubscribeForm = this.fb.group({
      email: ['', [Validators.required, Validators.email, emailPrefixValidator()]]
    });
  }

  get email() {
    return this.unSubscribeForm.get('email');
  }

  onUnsubscribe() {
    if (this.unSubscribeForm.valid) {
      const emailValue = this.email?.value; 
      if (emailValue) {
        this.newsletterService.unsubscribe(emailValue).subscribe(
          (response: any) => {
            this.isUnsubscribed = true;
            this.message = '';
          },
          (error: any) => {
            this.isUnsubscribed = false;
            if (error.status === 404) {
              this.message = 'E-mail não encontrado.';
            } else {
              this.message = 'Ocorreu um erro. Por favor, tente novamente.';
            }
          }
        );
      }
    }     
  }
  onButtonClick() {
    this.router.navigate(['/']);
  }
}
