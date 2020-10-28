import { Component } from "@angular/core";
import * as io from "socket.io-client";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})

export class AppComponent {
  vote: number;
  pollObj: any = {question: "",options: []};
  socket: SocketIOClient.Socket;
  constructor() {
    this.socket = io.connect();
  }

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  public barChartLabels = [];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [
    {data: [], label: 'Votes'}
  ];

  ngOnInit() {
    this.listen2Events();
  }

  listen2Events() {
    this.socket.on("poll", data => {
      this.pollObj = data;
      this.barChartLabels = this.pollObj.options.map(e => e.text);
      this.barChartData[0].data = this.pollObj.options.map(e => e.count);
    });
  }
  onSelectVote(value){
    this.socket.emit("vote", value)
    this.listen2Events();
  }
}
