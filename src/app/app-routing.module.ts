import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/user/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AddexpenseComponent } from './pages/addexpense/addexpense.component';
import { ShowExpenseComponent } from './pages/show-expense/show-expense.component';
import { ShowExpenseDmyComponent } from './pages/show-expense-dmy/show-expense-dmy.component';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'add-expense', component: AddexpenseComponent },
  { path: 'show-expense', component: ShowExpenseComponent },
  { path: 'expenses-data/:expType/:date',
     component: ShowExpenseDmyComponent,
  },
  
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
