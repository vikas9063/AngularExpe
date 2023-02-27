import { Component ,OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ExpenseService } from 'src/app/services/expense.service';
import { UserService } from 'src/app/services/user.service';
import { Expense } from 'src/app/types/Expense';
import Swal from 'sweetalert2';
import { UpdateExpenseComponent } from './update-expense/update-expense.component';


export interface expData{
  data:Expense;
}

@Component({
  selector: 'app-show-expense-dmy',
  templateUrl: './show-expense-dmy.component.html',
  styleUrls: ['./show-expense-dmy.component.css']
})
export class ShowExpenseDmyComponent implements OnInit{

  expenseType:any='';
  titleLine:string='';
  date:any='';
  month:number=1;
  day:number=1;
  year:number=1;
  pageNo=0;
  prevDisabled:string='disabled'
  nextDisabled:string='';
  activeEnabled:string='';

  resultData:Array<any>=[];
  rawData:any={};
  pages:Array<number>=[];

  formDate:any;

  constructor(private route:ActivatedRoute,private userService:UserService,
    private expenseSer:ExpenseService,private dialog:MatDialog,
    private router:Router
    ){}
  ngOnInit(): void {
    this.expenseType = this.route.snapshot.paramMap.get('expType');
    this.date=this.route.snapshot.paramMap.get('date');    
    if(this.expenseType === 'daily'){
      //console.log('Daily ...');
      this.titleLine='On this Date'
      let dayArr = this.date.split("-");
      this.day=dayArr[2];
      this.month=dayArr[1];
      this.year=dayArr[0];
      this.getData(this.expenseType,this.day,this.month,this.year)
    }else if(this.expenseType === 'monthly'){
      //console.log('Monthly ...');
      this.titleLine='On this Month'
      let dayArr = this.date.split("-");
      this.day=1;
      this.month=dayArr[1];
      this.year=dayArr[0];
      this.getData(this.expenseType,this.day,this.month,this.year)
    }else if(this.expenseType === 'yearly'){
      //console.log('Yearly ...');
      this.titleLine='On this Year'
      let dayArr = this.date.split("-");
      this.day=1;
      this.month=1;
      this.year=dayArr[0];
      this.getData(this.expenseType,this.day,this.month,this.year)
    }else{
      alert ('Error ...');
    }
   
  }
  getData(expType:string,date:number,month:number,year:number){
    let userId=this.userService.getUserIdOriginal();
    let dateToSubmit=`${year}-${month}-${date}`
    console.log(expType);
    this.pages=[];
    this.expenseSer.getExpenseUserPaginated(userId,dateToSubmit,expType,this.pageNo).subscribe(
      (data:any)=>{
        console.log(data);
        if(data.status =='success'){
          this.resultData=data.resultData;
          this.rawData=data;
          for(let i=1; i<=data.totalPages;i++){
            this.pages.push(i)
          }
          this.prevDisabled = data.isFirst ? 'disabled':''
          this.nextDisabled = data.isLast ? 'disabled':''
          console.log(this.pages);
          
        }
      },
      (error)=>{
        alert("not loaded user expense paginated")
      }
    );

  }

  OnChange(cpage:number){
    //alert("clicked"+cpage);
    this.pageNo=cpage;
    this.getData(this.expenseType,this.day,this.month,this.year)
  }

  OnSubmit(){
    if(this.formDate && this.expenseType){
      let date = new Date(this.formDate);
      this.day=date.getDate();
      this.month=date.getMonth()+1;
      this.year=date.getFullYear()
      console.log(this.day+"-"+this.month+"-"+this.year);
      
      this.getData(this.expenseType,this.day,this.month,this.year)   

    }else{
      alert('date required')
    }
  }

  OpenDialog(data:any){
    this.dialog.open(UpdateExpenseComponent,{
      width:'550px',  
      data:data      
    })
  }
  deleteExp(data:any){
    console.log(data);
    let user=this.userService.getUserIdOriginal();
    this.expenseSer.deleteExpense(user,data).subscribe(
      (data:any)=>{
        if(data.status==='success'){
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: data.message,
            showConfirmButton: false,
            timer: 1500
          })
          this.router.navigate(["dashboard"]);
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
          alert("not deleted !!!")
      }
    );
    
  }
 
}
