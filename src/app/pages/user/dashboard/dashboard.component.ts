import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto'
import { ExpenseService } from 'src/app/services/expense.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  yearlyData: any = {};
  monthlyData: any = {};
  dailyData: any = {};
  yearlyTotal: number = 0;
  monthlyTotal: number = 0;

  public chart: any;
  public chartYear: any;
  labels: Array<string> = [];
  labelsMonthly: Array<string> = [];
  backgroundColor: Array<string> = [
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
  mainDataMonthly: Array<number> = [];
  mainData: Array<number> = [];

  userInfo: any = {};
  formDate: any = new Date();
  date: number = this.formDate.getDate();
  month: number = this.formDate.getMonth() + 1;
  year: number = this.formDate.getFullYear();
  constructor(private userService: UserService, private expService: ExpenseService) { }
  ngOnInit(): void {
    this.getUserInfo();
    this.getCardDetails(this.year, this.month, this.date, 'init');

  }
  getUserInfo() {
    this.userService.getUserInformation().subscribe(data => {
      this.userInfo = data;
    }, error => {
      alert("error in fetching user details !!")
    })

  }
  OnSubmit() {
    let d = new Date(this.formDate);
    this.date = d.getDate();
    this.month = d.getMonth() + 1;
    this.year = d.getFullYear();
    let fullDate = `${this.year}-${this.month}-${this.date}`;
    console.log(fullDate);
    this.getCardDetails(this.year, this.month, this.date, 'submit');
  }

  getCardDetails(year: number, month: number, date: number, root: string) {
    let fullDate = `${year}-${month}-${date}`;
    //let fullDate = '2022-02-22';
    let userId = this.userService.getUserIdOriginal();
    this.labelsMonthly = [];
    this.labels = [];
    this.mainData = [];
    this.mainDataMonthly = [];

    this.expService.getExpenseYearly(year, userId).subscribe(
      (data: any) => {
        if (data.status === 'success') {
          this.yearlyTotal = data.yearlyTotal;
          this.yearlyData = data;
          this.yearlyData.operation = 'yearly';
          console.log(this.yearlyTotal);
          
          if (data.resultData.length > 0) {
            for (let i = 0; i < data.resultData.length; i++) {
              this.mainData.push(data.resultData[i].price)
              this.labels.push(data.resultData[i].month)
            }
          } else {
            this.mainData.push(100);
            this.labels.push("No Expenses Available")
          }
          console.log(this.labels);
          
        } if (root === 'init') {
          this.createYearChart(this.labels, this.mainData, 'MyYearChartDash');
        } else {
          console.log(this.mainData);
          
          this.chartYear.config.data.datasets[0].data = this.mainData;
          this.chartYear.config.data.labels = this.labels;
          this.chartYear.update();
        }
      },
      (error) => {
        console.log("not loaded expenses yearly...");
      }
    )
    this.expService.getExpensesMonthly(year, userId, month).subscribe(
      (data: any) => {
        if (data.status === 'success') {
          this.monthlyTotal = data.monthlyTotal;
          this.monthlyData = data;
          this.monthlyData.operation = 'monthly';
          if (data.monthlyTotal>0) {
            for (let i = 0; i < data.resultData.length; i++) {
              this.mainDataMonthly.push(data.resultData[i].price)
              this.labelsMonthly.push(data.resultData[i].date)
            }
          } else {
            this.mainDataMonthly.push(100);
            this.labelsMonthly.push("No Expenses Available")
          }
        }
        if (root === 'init') {
          this.createChart(this.labelsMonthly, this.mainDataMonthly, 'MyMonthChartDash');
        } else {
          this.chart.config.data.datasets[0].data = this.mainDataMonthly;
          this.chart.config.data.labels = this.labelsMonthly;
          this.chart.update();
        }


      },
      (error) => {
        console.log("not loaded expenses monthly...");
      }
    )
    this.expService.getExpensesToday(userId, fullDate).subscribe(
      (data: any) => {
        if (data.status === 'success') {
          this.dailyData = data;
          this.dailyData.operation = 'daily';
        }
      },
      (error) => {
        console.log("not loaded expenses daily...");
      }
    )
  }


  createChart(labels: Array<string>, data: Array<number>, chartId: string) {

    this.chart = new Chart(chartId, {
      type: 'doughnut', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: labels,
        datasets: [
          {
            label: "Expense",
            data: data,
            backgroundColor: this.backgroundColor,
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
  createYearChart(labels: Array<string>, data: Array<number>, chartId: string) {

    this.chartYear = new Chart(chartId, {
      type: 'doughnut', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: labels,
        datasets: [
          {
            label: "Expense",
            data: data,
            backgroundColor: this.backgroundColor,
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
