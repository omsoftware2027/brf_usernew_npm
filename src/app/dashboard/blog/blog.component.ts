import { Component } from '@angular/core';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent {
  recentpos:boolean=true;
  recentarchiv:boolean=false;
 recentpost(){
  this.recentpos=true;
  this.recentarchiv=false;
 }
 recentarchives(){
  this.recentpos=false;
  this.recentarchiv=true;
 }
}
