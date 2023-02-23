import { Component, OnInit } from '@angular/core';
import { ExpenseService } from 'src/app/services/expense.service';
import { Chart, registerables } from 'chart.js';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-month-expense-chart',
  templateUrl: './month-expense-chart.component.html',
  styleUrls: ['./month-expense-chart.component.css']
})
export class MonthExpenseChartComponent implements OnInit {
  chartType: any;
  chart: any;
  year: number = new Date().getFullYear();
  month: number = new Date().getMonth() + 1;
  labelData: any[] = [];
  mainData: any[] = [];
  expensesData: any[] = [];
  totalExpense: number = 0;
  type: string = 'line';
  chartId: string = 'MyBarChart';


  constructor(private expenseService: ExpenseService, private userService: UserService) {
    Chart.register(...registerables);
  }
  ngOnInit(): void {
    this.getExpenseMonthly(this.year, this.month, this.chartId);
  }

  getExpenseMonthly(year: number, month: number, chartId: string) {
    let userId = this.userService.getUserIdOriginal();
    console.log(month + "<<<>>>" + year);
    this.expenseService.getExpensesMonthly(year, userId, month).subscribe(
      (data: any) => {
        if (data.resultData != null && data.resultData.length > 0) {
          this.expensesData = data.resultData;
          this.totalExpense = data.monthlyTotal;
          for (let i = 0; i < data.resultData.length; i++) {
            this.mainData.push(data.resultData[i].price);
            this.labelData.push(data.resultData[i].date);
          }
        }
        this.createChart(this.labelData, this.mainData, this.type, chartId);
      },
      (error) => {
        alert("not loading monthly expenses ...")
      }
    )
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
            backgroundColor: [
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
            ]
          },

        ]
      },
      options: {
        aspectRatio: 2.5
      }

    });
  }

  Onchange() {
    this.chart.config.type = this.type;
    this.chart.update();
  }

}
