import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-show-expense',
  templateUrl: './show-expense.component.html',
  styleUrls: ['./show-expense.component.css']
})
export class ShowExpenseComponent implements OnInit {

  userName:string='';


  constructor(private userService:UserService) {  
  }
  ngOnInit(): void {
    this.userName= this.userService.getUserId();
    

  }

  


}
