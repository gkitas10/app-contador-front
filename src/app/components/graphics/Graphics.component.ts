import { Component, OnChanges } from "@angular/core";

@Component({
  selector: "app-income-statement",
  templateUrl: "./Graphics.component.html",
  styleUrls: ["./Graphics.component.css"],
})
export class GraphicsComponent implements OnChanges{
 public graphType = 'Líneas';

  constructor() {
    
  }

  ngOnChanges(){
    
  }
  //Change graph
  onChangeGraphType(event:string) {
    this.graphType = event;
  }
}
