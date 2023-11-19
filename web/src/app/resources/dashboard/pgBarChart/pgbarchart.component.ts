import { Component, Input, OnInit } from '@angular/core';
import * as Chart from 'chart.js';
import ChartJSPluginDatalabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-pgbarchart',
  templateUrl: './pgbarchart.component.html',
  styleUrls: ['./pgbarchart.component.scss']
})
export class PgbarchartComponent implements OnInit {
  @Input() data: any;
  public barchart: any;
  public developingCount: number;
  public productionCount: number;
  public otherCount: number = 0;
  // public lineChartPlugins = [ChartDatalabels];
  public chartType = 'doughnut'
  constructor(

  ) { }

  ngOnInit(): void {
    // console.log(this.data);
    // this.getCountData();
    // register a chart
    Chart.Chart.register(...Chart.registerables,Chart.Title, Chart.BarElement,Chart.CategoryScale, Chart.Tooltip, Chart.LinearScale, Chart.Colors, Chart.Legend);
    // console.log(this.data);
    this.createChart();
  }
  createChart() {

    this.barchart = new Chart.Chart("pgbarChart", {
      type: 'bar',
      data: {
        labels: ['Reject', 'Pending', 'Selected'],
        datasets: [
          {
            label: 'The percentage of submission',
            data: [41, 20, 12],

            borderColor: [
              'rgba(145,189,195, 0.4)',
              'rgba(216,204,219, 0.4)',
              'rgba(235,176,152, 0.4)',
            ],
            borderWidth: 1,
            backgroundColor: [
              '#91BDC3',
              'rgb(216,204,219)',
              'rgb(235,176,152)',
            ],
            barPercentage: 0.2,
            categoryPercentage: 0.8,
            borderSkipped: false,
            borderRadius: 10

          }
        ],
      },
      options: {
        responsive: true,
        indexAxis: 'y',
        scales: {
          x: {
            // You can customize the appearance of the x-axis here
            title: {
              display: true,
              text: 'Percentage',
              color: 'red', // Change the color of the x-axis title
            },
            grid: {
              display: false,
              // drawBorder: false
            },
            // ticks: {
            //   display: false
            // },
            max: 100
            // ticks: {
            //   min: 0,
            //   max: 100,
            //   // callback: (value) => {
            //   //   return value + '%';
            //   // }
            // }
          },
          y: {
            // Customize the appearance of the y-axis here
            // title: {
            //   display: true,
            //   text: 'Number of Admission',
            // },

            grid: {
              display: false,
              // drawBorder: false
            },
            ticks: {
              display: false
            }
          },


        },
      }

    });
  }

  // To get count data
  getCountData(): void {
    let count: number = 0;
    this.data.projectStatus.statusCounts?.forEach((item) => {
      if (item.name === 'Developing') {
        this.developingCount = parseInt(item.count);
      } else if (item.name === 'Production') {
        this.productionCount = parseInt(item.count);
      } else {
        count += parseInt(item.count); // Accumulate count for other statuses
      }
    });

    this.otherCount = count; // Store the count for other statuses
    // console.log('Developing Count:', this.developingCount);
    // console.log('Production Count:', this.productionCount);
    // console.log('Other Count:', this.otherCount);
  }

}
