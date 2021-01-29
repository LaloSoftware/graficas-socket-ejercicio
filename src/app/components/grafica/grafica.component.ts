import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-grafica',
  templateUrl: './grafica.component.html',
  styleUrls: ['./grafica.component.sass']
})
export class GraficaComponent implements OnInit {
  public lineChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81], label: 'Ventas' }
  ];
  public lineChartLabels: Label[] = ['January', 'February', 'March', 'April'];

  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
        },
        {
          id: 'y-axis-1',
          position: 'right',
          gridLines: {
            color: 'rgba(255,0,0,0.3)',
          },
          ticks: {
            fontColor: 'red',
          }
        }
      ]
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'March',
          borderColor: 'orange',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: 'LineAnno'
          }
        },
      ],
    },
  };
  public lineChartColors: Color[] = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend = true;
  /**
   * 
   */
  constructor(private _http: HttpClient,
              public _wsS: WebsocketService) { }

  ngOnInit(): void {
    this.getData();
    this.escucharSocket();
  }

  escucharSocket() {
    this._wsS.listen('cambio-en-datos').subscribe(
      (data: any) => {
        this.lineChartData = data
      }, err => {
        console.log(err);
      }
    );
  }

  getData() {
     this._http.get<any>('http://localhost:5000/grafica').subscribe(
       data => {
         this.lineChartData = data;
       }, err => {
         console.log(err);
       }
     );
  }
}
