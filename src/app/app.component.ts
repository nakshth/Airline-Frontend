import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'airline-frontend';
  
  constructor(
    private titleService: Title,
    private metaService: Meta,
    ){
    }
  ngOnInit(): void {
    this.titleService.setTitle( "XYZ Airlines" );

    this.metaService.addTags([
      {name: 'keywords', content: 'XYZ Airlines'},
      {name: 'description', content: 'XYZ Airlines'},
    ]);
    
    
    AOS.init(); 

  }
}
