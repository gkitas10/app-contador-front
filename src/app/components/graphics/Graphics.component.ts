import { Component, OnChanges } from "@angular/core";
import { GraphService } from '../../services/graph.service';



@Component({
  selector: "app-income-statement",
  templateUrl: "./Graphics.component.html",
  styleUrls: ["./Graphics.component.css"],
})
export class GraphicsComponent implements OnChanges{
 public graphType = 'Líneas';

  constructor(private _graphService:GraphService) {
    
  }

  ngOnChanges(){
    
  }
  //Change graph
  onChangeGraphType(event:string) {
    this.graphType = event;
    console.log('En graphics', event)
  }
}
