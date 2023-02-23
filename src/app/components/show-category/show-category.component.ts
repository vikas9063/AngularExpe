import { Component, OnInit } from '@angular/core';
import { ExpenseService } from 'src/app/services/expense.service';
import { UserService } from 'src/app/services/user.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogueAddCatComponent } from './dialogue-add-cat/dialogue-add-cat.component';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-category',
  templateUrl: './show-category.component.html',
  styleUrls: ['./show-category.component.css']
})
export class ShowCategoryComponent implements OnInit {

  category: Array<any> = [];



  constructor(private expenseSer: ExpenseService, private userService: UserService, public dialog: MatDialog,
    private router:Router) { }
  ngOnInit(): void {
    this.getCategoryList();
    this.expenseSer.expenseStatusSubject.asObservable().subscribe((data) => {
      console.log("<< Emmited >>");
      this.getCategoryList();
    })
  }
  getCategoryList() {
    let userId = this.userService.getUserIdOriginal();
    this.expenseSer.getCategoryForUser(userId).subscribe((data: any) => {
      if (data.length > 0) {
        console.log(data);
        for (let i in data) {
          this.category.push(data[i]);
        }

      }

    }, (error) => {
      alert("Category not loading....")
    });
  }
openDialog(){
  this.dialog.open(DialogueAddCatComponent,{
    width:'600px',    
  })
}
deleteCat(catName:string){
  console.log(catName);
  let userId=this.userService.getUserIdOriginal();
  this.expenseSer.deleteUserCategory(userId,catName).subscribe(
    (data:any)=>{
      if(data.status==='success'){
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: data.message,
          showConfirmButton: false,
          timer: 1500
        })
        this.expenseSer.expenseStatusSubject.next(true);
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
    },
    (error)=>{
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: error.statusText,
        showConfirmButton: false,
        timer: 1500
      })
    }
  )
  
}

  
}


