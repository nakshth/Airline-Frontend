import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Star Airline';
  
  constructor(
    private titleService: Title,
    private metaService: Meta,
    ){
    }
  ngOnInit(): void {
    this.titleService.setTitle( "Star Airlines" );

    this.metaService.addTags([
      {name: 'keywords', content: 'Star Airlines'},
      {name: 'description', content: 'Star Airlines'},
    ]);
    
    
    AOS.init(); 

  }
}
