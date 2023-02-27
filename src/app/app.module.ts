import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavheaderComponent } from './components/navheader/navheader.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule, MatDialogContent,MatDialogActions} from '@angular/material/dialog';
import {MatMenuModule} from '@angular/material/menu';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component'
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './pages/user/dashboard/dashboard.component';
import { AuthInterceptorProviders } from './interceptor/Auth.interceptor';
import { UserNavComponent } from './components/user-nav/user-nav.component';
import { AddexpenseComponent } from './pages/addexpense/addexpense.component';
import {MatSelectModule} from '@angular/material/select';
import {MatChipsModule} from '@angular/material/chips';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { ShowExpenseComponent } from './pages/show-expense/show-expense.component';
import { YearExpenseComponent } from './components/year-expense/year-expense.component';
import { MonthExpenseChartComponent } from './components/month-expense-chart/month-expense-chart.component'
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import { TodayExpenseComponent } from './components/today-expense/today-expense.component';
import { ShowCategoryComponent } from './components/show-category/show-category.component';
import { DialogueAddCatComponent } from './components/show-category/dialogue-add-cat/dialogue-add-cat.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { SpentcardComponent } from './pages/user/dashboard/spentcard/spentcard.component';
import { ShowExpenseDmyComponent } from './pages/show-expense-dmy/show-expense-dmy.component';
import { UpdateExpenseComponent } from './pages/show-expense-dmy/update-expense/update-expense.component';
import { NgxUiLoaderHttpModule, NgxUiLoaderModule } from "ngx-ui-loader";







@NgModule({
  declarations: [
    AppComponent,
    NavheaderComponent,
    FooterComponent,
    RegisterComponent,
    LoginComponent,
    DashboardComponent,
    UserNavComponent,
    AddexpenseComponent,
    ShowExpenseComponent,
    YearExpenseComponent,
    MonthExpenseChartComponent,
    TodayExpenseComponent,
    ShowCategoryComponent,
    DialogueAddCatComponent,
    SpentcardComponent,
    ShowExpenseDmyComponent,
    UpdateExpenseComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatMenuModule,
    MatCardModule,
    MatInputModule,
    FormsModule,
    HttpClientModule,
    MatSelectModule,
    MatChipsModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxUiLoaderModule,
    NgxUiLoaderHttpModule.forRoot({
      showForeground:true
    }),

    

    
  ],

  providers: [AuthInterceptorProviders],
  bootstrap: [AppComponent],
 
  
})
export class AppModule { }
