import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubscribeFormComponent } from './subscribe-form/subscribe-form.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';

const routes: Routes = [
  { path: '', component: SubscribeFormComponent },
  { path: 'confirmation', component: ConfirmationComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' } // Rota coringa para redirecionar qualquer caminho desconhecido
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
