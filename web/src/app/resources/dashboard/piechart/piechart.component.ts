import { Component, Input, OnInit } from '@angular/core';
import * as Chart from 'chart.js';
import ChartJSPluginDatalabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-piechart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.scss']
})
export class PiechartComponent implements OnInit {
  @Input() data: any;
  public chart: any;
  public developingCount: number;
  public productionCount: number;
  public otherCount: number = 0;
  // public lineChartPlugins = [ChartDatalabels];
  public chartType = 'doughnut'
  constructor(

  ) { }

  ngOnInit(): void {
    // console.log(this.data);
    this.getCountData();
    // register a chart
    Chart.Chart.register(...Chart.registerables, Chart.Tooltip, ChartJSPluginDatalabels, Chart.Legend, Chart.ArcElement);
    // console.log(this.data);
    this.createChart();
  }
  createChart() {

    this.chart = new Chart.Chart("MyChart", {
      type: 'doughnut',
      data: {
        labels: ['Other', 'Developing', 'Production'],
        datasets: [
          {
            // borderColor: ['#FBA265', '#63B3F8'],
            borderWidth: 1,
            backgroundColor: ['#FFCEFE', '#AAE3E2', '#AED6F1'],
            data: [this.otherCount, this.developingCount, this.productionCount],

          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          tooltip: {
            enabled: true
          },
          legend: {
            display: true,
            position: 'bottom',
            labels: {
              boxWidth: 40,
              boxHeight: 40,
              padding: 25,
              usePointStyle: true,
              pointStyle: 'circle'
            },
          },
          title: {
            display: true,
            text: 'The percentage of project base on status',
            font: {
              size: 14
            }
          },
          datalabels: {
            display: true,
            formatter: (value, ctx) => {
              let sum = 0;
              // console.log(ctx);

              let dataArr = ctx.chart.data.datasets[0].data;

              dataArr.forEach(data => {
                if (typeof data === 'number') {
                  sum += data;
                } else if (Array.isArray(data)) {
                  // Assuming data is [number, number]
                  sum += data[0];  // Assuming you want to add the first number
                } else if (typeof data === 'object' && 'x' in data && 'y' in data) {
                  // Assuming data is a Point
                  sum += data.y;  // Assuming you want to add the 'y' property
                }
              });

              let percentage = (value * 100 / sum).toFixed(2) + "%";
              return percentage;

            },
            color: ['#2E4053'],
            labels: {
              title: {
                font: {
                  size: 11,
                  weight: 'bold'
                }
              },
            }
          }

        }


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
