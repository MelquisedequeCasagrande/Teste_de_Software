import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubscribeFormComponent } from './subscribe-form/subscribe-form.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { UnsubscribeFormComponent } from './unsubscribe-form/unsubscribe-form.component';

const routes: Routes = [
  { path: '', component: SubscribeFormComponent },
  { path: 'unsubscribe', component: UnsubscribeFormComponent },
  { path: 'confirmation', component: ConfirmationComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' } // Rota coringa para redirecionar qualquer caminho desconhecido
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
