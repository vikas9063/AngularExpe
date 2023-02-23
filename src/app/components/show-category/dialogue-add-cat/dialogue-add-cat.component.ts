import { Component,OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ExpenseService } from 'src/app/services/expense.service';
import { UserService } from 'src/app/services/user.service';
import Category from 'src/app/types/Categoty';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dialogue-add-cat',
  templateUrl: './dialogue-add-cat.component.html',
  styleUrls: ['./dialogue-add-cat.component.css']
})
export class DialogueAddCatComponent implements OnInit{

category:Category={
  catName:'',
  catDesc:''
}

constructor(private expService:ExpenseService,private userService:UserService,private router:Router,
  private dialogue:MatDialog){}

ngOnInit(): void {
  
}

addCategory(){
  //alert("loading....")
  console.log(this.category);
  if(!this.category.catDesc && !this.category.catName){
    return;
  }
  let cat=[];
  cat.push(this.category);
  let userId=this.userService.getUserIdOriginal();
  this.expService.addCategoryToUser(userId,cat).subscribe((data:any)=>{
    if(data.status === 'success'){
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: data.message,
        showConfirmButton: false,
        timer: 1500
      })
      this.dialogue.closeAll();
      
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
  error=>{
   // alert("Not Inserted Category");
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: error.statusText,
      showConfirmButton: false,
      timer: 1500
    })
  })
}

}
