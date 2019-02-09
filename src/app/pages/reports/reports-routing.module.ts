import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportsComponent } from './reports/reports.component';

const routes: Routes = [
  { path: '', component: ReportsComponent },
  { path: 'new', component: ReportsComponent },
  { path: ':id/edit', component: ReportsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
