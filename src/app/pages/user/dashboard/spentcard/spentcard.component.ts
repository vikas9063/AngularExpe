import { Component,Input, OnInit } from '@angular/core';
import { CardType } from 'src/app/types/CardType';

@Component({
  selector: 'app-spentcard',
  templateUrl: './spentcard.component.html',
  styleUrls: ['./spentcard.component.css']
})
export class SpentcardComponent implements OnInit{

  
  @Input() data:any;
  
  constructor(){
    
  }
  ngOnInit(): void {
    
  }

}
