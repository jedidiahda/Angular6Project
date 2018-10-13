import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListEmployeeComponent } from '../employee/list-employee/list-employee.component';
import { CreateEmployeeComponent } from '../employee/create-employee/create-employee.component';

const appRouters: Routes = [
  { path: 'list' , component: ListEmployeeComponent },
  { path: 'create' , component: CreateEmployeeComponent },
  { path: '' , redirectTo:'/list', pathMatch: 'full'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRouters),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
