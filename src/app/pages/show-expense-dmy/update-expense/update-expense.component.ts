import { Component ,Input,Inject} from '@angular/core';
import { MatDialog,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ExpenseService } from 'src/app/services/expense.service';
import { UserService } from 'src/app/services/user.service';
import { Expense } from 'src/app/types/Expense';
import Swal from 'sweetalert2';
import { expData } from '../show-expense-dmy.component';

@Component({
  selector: 'app-update-expense',
  templateUrl: './update-expense.component.html',
  styleUrls: ['./update-expense.component.css']
})
export class UpdateExpenseComponent {

  
  expense:Expense={
    id:'',
    expId:'',
    expTitle:'',
    expCategory:'',
    expOn:'',
    expOnYear:1,
    expOnMonth:1,
    expOnDate:1,
    userId:'',
    expDesc:'',
    price:0
  }

  formDate:string='';
  constructor(private dialog:MatDialog,@Inject(MAT_DIALOG_DATA) public data:Expense,private expService:ExpenseService,
  private userService:UserService,
  private router:Router
  ){
    this.expense=data;
    console.log(this.expense);
    
  }

  closeDialog(){
    this.dialog.closeAll();
  }
  UpdateExp(){

    if(this.formDate){
      let date = new Date(this.formDate);
    console.log(date);
    this.expense.expOnDate = date.getDate();
    this.expense.expOnMonth=date.getMonth()+1;
    this.expense.expOnYear = date.getFullYear();
    //console.log(this.expense);
    }
    let user=this.userService.getUserIdOriginal();
    console.log(this.expense);    
    this.expService.updateExpense(user,this.expense.expId,this.expense).subscribe(
      (data:any)=>{
          if(data.status ==='success'){

            Swal.fire({
              position: 'center',
              icon: 'success',
              title: data.message,
              showConfirmButton: false,
              timer: 1500
            })
            this.dialog.closeAll();
            this.router.navigate(["dashboard"])

          }else{
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: data.message,
              showConfirmButton: false,
              timer: 1500
            })
          }
      },(error)=>{
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: error.statusText,
          showConfirmButton: false,
          timer: 1500
        })
      }
    );
    

  }

}
