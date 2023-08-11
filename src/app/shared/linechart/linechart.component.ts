import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ArcElement, Chart, PieController, registerables } from 'chart.js';
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
  constructor() {
    Chart.register(...registerables);
  }

  ngOnInit(): void {}
  ngAfterViewInit() {
    console.log(this.data);
    this.pieChart?.destroy();
    this.pieChart = new Chart(this.pieCanvas.nativeElement, {
      type: 'line',
      data: this.data.data,
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
  }
}
