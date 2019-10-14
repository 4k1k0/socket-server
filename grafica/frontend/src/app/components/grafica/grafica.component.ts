import { Component, OnInit } from '@angular/core';
import { ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { WebsocketService } from '../../services/websocket.service';

@Component({
  selector: 'app-grafica',
  templateUrl: './grafica.component.html',
  styleUrls: ['./grafica.component.scss']
})
export class GraficaComponent implements OnInit {

  public lineChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81], label: 'Ventas' }
  ];
  public lineChartLabels: Label[] = ['January', 'February', 'March', 'April'];

  constructor(
    private http: HttpClient,
    public wsService: WebsocketService
  ) { }

  ngOnInit() {
    this.getData();
    this.escucharSocket();
  }

  getData () {
    this.http.get(`${environment.wsUrl}/grafica`).subscribe((resp: any) => {
      this.lineChartData = resp;
    }, error => {
      console.error(error)
    });
  }

  escucharSocket() {
    this.wsService.listen('cambio-grafica').subscribe((data: any) => {
      console.log('socket', data);
      this.lineChartData = data;
    });
  }

}
