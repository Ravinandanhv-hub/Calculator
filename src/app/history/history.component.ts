import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  constructor(public service:ServicesService, public location:Location) { }
  arr:any=this.service.store;
  ngOnInit(): void {
    const du=document.getElementById('list')
    const height=screen.availHeight-114;
    du!.style.height=String(height+'px');
    this.arr=this.arr.map((e: string)=>{
      console.log(e.replace('\n',' = '))
      return e.replace('\n',' = ')
    })
    this.arr.reverse();
  }
}
