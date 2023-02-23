import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ExpenseService } from 'src/app/services/expense.service';
import { UserService } from 'src/app/services/user.service';
import { Expense } from 'src/app/types/Expense';
import Swal from 'sweetalert2';
import {
  MatSnackBar,
  
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-addexpense',
  templateUrl: './addexpense.component.html',
  styleUrls: ['./addexpense.component.css']
})
export class AddexpenseComponent {
  disableSelect = new FormControl(false);

  categories:any=[];
  expenseData:Expense={
    id:'',
    expId:'',
    expTitle:'',
    expCategory:'',
    expOn:'',
    expOnYear:0,
    expOnMonth:0,
    expOnDate:0,
    userId:'',
    expDesc:'',
    price:0
  }

  expenses:Expense[]=[];


  constructor(private expService:ExpenseService, private userService:UserService,
      private router:Router,private snackBar: MatSnackBar
    ){
    this.getCategory();
    this.getRecentlyAdded();
  }
  getCategory(){
    let userId= this.userService.getUserIdOriginal();
    this.expService.getCategoryForUser(userId).subscribe(data=>{
      this.categories=data;
    });

  }

  getRecentlyAdded(){
    let userId = this.userService.getUserIdOriginal();
    this.expService.getRecentlyAddedExpense(userId).subscribe((data:any)=>{
        this.expenses=data;
        console.log(this.expenses);
        
    },
    error=>{
      alert('not fetched recently added expenses!!!')
    })
  }

  OnSubmit(){
    
    console.log(this.expenseData);    
      // validating 
      if(this.expenseData.expTitle == '' || this.expenseData.expTitle == null || this.expenseData.expTitle==undefined
        || this.expenseData.price == 0 || this.expenseData.price == null || this.expenseData.price == undefined
      ){

        this.snackBar.open('Please fill all the required details', 'Ok',{
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        })
        return;
      }
    this.expenseData.userId=this.userService.getUserIdOriginal();
    this.expService.addExpense(this.expenseData).subscribe((data:any)=>{
      // when failed to add expense
      if(data.status == 'failed'){
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Expense not added !!!',
          showConfirmButton: false,
          timer: 1500
        })
        return;
      }
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Expense added successfully !!!',
        showConfirmButton: false,
        timer: 1500
      })

      this.router.navigate(["dashboard"])
    })
    
  }

}
