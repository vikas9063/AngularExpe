import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { ExpenseService } from 'src/app/services/expense.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-year-expense',
  templateUrl: './year-expense.component.html',
  styleUrls: ['./year-expense.component.css']
})
export class YearExpenseComponent implements OnInit {

  expensesData: any[] = [] as Array<any>;
  totalExpense:number=0;
  labelData: number[] = [];
  mainData: number[] = [];
  chart: any;
  year = new Date().getFullYear();
  typeY:string='bar'
  chartId:string='MyYearlyChart'
  constructor(private expService: ExpenseService, private userService: UserService) {
    Chart.register(...registerables);
  }
  ngOnInit(): void {
    this.getExpense(this.chartId);  

  }

  getExpense(chartId: string) {
    
    let userId = this.userService.getUserIdOriginal();
    this.expService.getExpenseYearly(this.year, userId).subscribe((data: any) => {
      if (data.status === 'success' && data.resultData.length > 0) {
        this.expensesData = data.resultData;
        this.totalExpense = data.yearlyTotal;
        console.log(this.expensesData);
        if (this.expensesData != null && this.expensesData.length > 0) {
          for (let i = 0; i < this.expensesData.length; i++) {
            this.labelData.push(this.expensesData[i].month);
            this.mainData.push(this.expensesData[i].price);
          }
        }
      }

      console.log(this.labelData);
      console.log(this.mainData);
      this.createChart(this.labelData,this.mainData,this.typeY,chartId);

    },
      (error) => {
        alert("Expense not Loaded...")
      })

  }
  createChart(labelData:any[],mainData:any[],type: any, id: string) {
    this.chart = new Chart(id, {
      type: type, //this denotes tha type of chart

      data: {// values on X-Axis
        labels: ['jan', 'feb', 'mar','apr',
         'may', 'jun', 'jul','aug', 'sep','oct','nov','dec' ], 
       // labels: labelData,
        datasets: [
          {
            label: "Expense",
            // data: ['467','576', '572', '79', '92',
            //		 '574', '573', '576'],
            data: mainData,
            backgroundColor: [
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
              'rgb(0,139,139)'
            ]
          },
          // {
          //   label: "Profit",
          //   data: ['542', '542', '536', '327', '17',
          // 				 '0.00', '538', '541'],
          //   backgroundColor: 'limegreen'
          // }  
        ]
      },
      options: {
        aspectRatio: 2.5
      }

    });
  }
  Onchange() {


    this.chart.config.type = this.typeY;
    this.chart.update();
  }

}
