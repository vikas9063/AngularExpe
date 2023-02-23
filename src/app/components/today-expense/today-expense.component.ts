import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { ExpenseService } from 'src/app/services/expense.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-today-expense',
  templateUrl: './today-expense.component.html',
  styleUrls: ['./today-expense.component.css']
})
export class TodayExpenseComponent implements OnInit {

  chartType: any;
  chart: any;
  labelData: any[] = [];
  mainData: any[] = [];
  expensesData: any[] = [];
  totalExpense: number = 0;
  type: string = 'doughnut';
  chartId: string = 'MyDailyChart';
  userName:string='';
  backgroundColor:Array<string>= [
    'rgb(176,224,230)',
    'rgb(135,206,250)',
    'rgb(0,191,255)',
    'rgb(30,144,255)',
    'rgb(100,149,237)',
    'rgb(70,130,180)',
    'rgb(0,0,255)',
    'rgb(0,0,139)',
    'rgb(123,104,238)',
    'rgb(72,61,139)',
    'rgb(238,130,238)',
    'rgb(255,0,255)',
    'rgb(138,43,226)',
    'rgb(139,0,139)',
    'rgb(75,0,130)',
    'rgb(255,20,147)',
    'rgb(47,79,79)',
    'rgb(188,143,143)',
    'rgb(0,206,209)',
    'rgb(0,139,139)',
    'rgb(107,142,35)',
    'rgb(60,179,113)',
    'rgb(0,100,0)',
    'rgb(50,205,50)',
    'rgb(255,69,0)',
    'rgb(255,140,0)',
    'rgb(255,0,0)',
    'rgb(205,92,92)',
    'rgb(255,0,0)',
    'rgb(173,255,47)',
    'rgb(139,0,0)',
  ];
  

  constructor(private expenseService: ExpenseService, private userService:UserService) { }
  ngOnInit(): void {
    this.getTodayExpense();
    this.userName= this.userService.getUserId();
  }

  getTodayExpense() {
    let date=new Date();
    let fDate= `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
    let userId=this.userService.getUserIdOriginal();
    this.expenseService.getExpensesToday(userId,fDate).subscribe((data:any)=>{
      console.log(data);
      if (data.resultData != null && data.resultData.length > 0) {
        this.expensesData = data.resultData;
        this.totalExpense = data.dailyTotal;       
        for (let i = 0; i < data.resultData.length; i++) {
          this.mainData.push(data.resultData[i].price);
          this.labelData.push(data.resultData[i].expCategory);
        }
      }else{
        this.labelData = ['Not Expended any today'];
        this.mainData=[1];
        this.backgroundColor=['green'];
      }
      this.createChart(this.labelData, this.mainData, this.type, this.chartId);
      
    },error=>{
      alert("Not loaded Today expenses !!!");
    })
    
    
  }

  createChart(labelData: any[], mainData: any[], type: any, id: string) {
    this.chart = new Chart(id, {
      type: type, //this denotes tha type of chart

      data: {// values on X-Axis

        labels: labelData,
        datasets: [
          {
            label: "Expense",

            data: mainData,
            backgroundColor: this.backgroundColor
          },

        ]
      },
      options: {
        aspectRatio: 2.5,
        plugins: {
          legend: {
            display: false
          }
        }
      }

    });
  }

}
