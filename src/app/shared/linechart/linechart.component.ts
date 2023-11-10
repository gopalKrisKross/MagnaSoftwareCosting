import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { ArcElement, Chart, PieController, registerables } from 'chart.js';
import { PubsubService } from 'src/app/services/pubsub/pubsub.service';
Chart.register(PieController, ArcElement);
@Component({
  selector: 'app-linechart',
  templateUrl: './linechart.component.html',
  styleUrls: ['./linechart.component.scss'],
})
export class LinechartComponent implements OnInit {
  @ViewChild('pieCanvas', { static: false }) private pieCanvas:
    | ElementRef
    | any;
  pieChart: any;
  @Input()
  data: any;
  @Input()
  departmentList: any;
  @Input()
  costData: any;
  @Input()
  type: any;
  selectedDepartmentId: string | number = '0';
  department = new FormControl('0');
  chartShowOptions = new FormControl('number');
  calculateActualUsageData: any;
  selectedshowOptions: any = 'number';
  constructor(private cd: ChangeDetectorRef, private pubsub: PubsubService) {
    Chart.register(...registerables);
    this.department.valueChanges.subscribe((res: any) => {
      this.selectedDepartmentId = res;
      this.updatePieChart();
    });
    this.chartShowOptions.valueChanges.subscribe((res: any) => {
      this.selectedshowOptions = res;
      this.updatePieChart();
    });
  }

  ngOnInit(): void {}
  ngAfterViewInit() {
    this.updatePieChart();
  }
  async updatePieChart() {
    let data;
    if (this.type == 'cost') {
      data = await this.generateCostLineChart();
    } else {
      data = await this.generateLineChart();
    }

    if (data) {
      this.pieChart?.destroy();
      this.pieChart = new Chart(this.pieCanvas.nativeElement, {
        type: 'line',
        data: data.data,
        options: {
          plugins: {
            legend: {
              labels: {
                color: 'black',
                font: {
                  size: 14,
                  weight: '500',
                },
              },
            },
          },
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              ticks: {
                color: 'black',
                font: {
                  size: 14,
                  weight: '500',
                },
              },
            },
            x: {
              ticks: {
                color: 'black',
                font: {
                  size: 14,
                  weight: '500',
                },
              },
            },
          },
        },
      });
      this.cd.detectChanges();
    }
  }
  /**
   * @author Sandesh
   * @description this function is used  for set line chart data
   */
  generateLineChart() {
    try {
      let data: any;
      if (this.selectedshowOptions == 'number') {
        data = {
          data: {
            labels: [
              'January',
              'February',
              'March',
              'April',
              'May',
              'June',
              'July',
              'August',
              'September',
              'October',
              'November',
              'December',
            ],
            datasets: [
              {
                label: 'Actual Usage ', // Name the series
                data: this.getCalculateData(this.departmentList, true), // Specify the data values array
                fill: false,
                borderColor: 'purple', // Add custom color border (Line)
                backgroundColor: 'purple', // Add custom color background (Points and Fill)
                borderWidth: 2, // Specify bar border width
              },
              {
                label: 'Estimation', // Name the series
                data: this.getCalculateData(this.data, true), // Specify the data values array
                fill: false,
                borderColor: 'green', // Add custom color border (Line)
                backgroundColor: 'green', // Add custom color background (Points and Fill)
                borderWidth: 2, // Specify bar border width
              },
            ],
          },
        };
      } else {
        data = {
          data: {
            labels: [
              'January',
              'February',
              'March',
              'April',
              'May',
              'June',
              'July',
              'August',
              'September',
              'October',
              'November',
              'December',
            ],
            datasets: [
              {
                label: 'Licence Cost', // Name the series
                data: this.getCalculateData(this.data, true), // Specify the data values array
                fill: false,
                borderColor: 'green', // Add custom color border (Line)
                backgroundColor: 'green', // Add custom color background (Points and Fill)
                borderWidth: 2, // Specify bar border width
              },
            ],
          },
        };
      }

      return data;
    } catch (error) {}
  }
  generateCostLineChart() {
    let data = {
      data: {
        labels: [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December',
        ],
        datasets: [
          {
            label: 'Cost', // Name the series
            data: this.getCalculateData(this.costData, false), // Specify the data values array
            fill: false,
            borderColor: 'purple', // Add custom color border (Line)
            backgroundColor: 'purple', // Add custom color background (Points and Fill)
            borderWidth: 2, // Specify bar border width
          },
        ],
      },
    };
    return data;
  }

  getCalculateData(list: any, chk: boolean) {
    try {
      let dataSet: any = [];
      if (chk && this.selectedDepartmentId != '0') {
        list = list.filter(
          (ele: any) => ele.departmentId == this.selectedDepartmentId
        );
      }

      this.calculateActualUsageData = list.reduce((a: any, b: any) =>
        Object.fromEntries(Object.entries(a).map(([k, v]) => [k, v + b[k]]))
      );
      if (this.selectedshowOptions == 'number') {
        for (let month of this.pubsub.monthList) {
          let count = this.calculateActualUsageData[month.name.toLowerCase()];
          dataSet.push(count);
        }
      } else {
        for (let month of this.pubsub.monthList) {
          let count =
            this.calculateActualUsageData[`Cost_${month.name.toLowerCase()}`];
          dataSet.push(count);
        }
      }

      return dataSet;
    } catch (error) {}
  }
}
