import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap'
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild('area') area: any;
  @ViewChild('model', { static: true }) model!:  TemplateRef<HTMLElement>;
  modelRef!: NgbModalRef;
  input='';
  constructor(private modalService: NgbModal,
    private service:ServicesService) { }

  ngOnInit(): void {
    // const du=document.getElementById('div')
    // console.log(du)
    // du!.style.height=String(screen.availHeight);
    // console.log(screen.height)
    // console.log(this.area)
    // console.log(this.model)
  }

  ngAfterViewInit(){
    // console.log(this.area)
    // console.log(this.model)
    if(this.service.store.at(-1)){
      console.log(this.service.store.at(-1))
      this.area.nativeElement.value=this.service.store.at(-1)
    }
  }

  addNumber(number:number){
    if(this.area.nativeElement.value==''&& number==0){
      return
    }
    this.input+=number;
    this.area.nativeElement.value=this.input;
  }

  addOpperator(op:any){
    if(this.area.nativeElement.value==''){
      return;
    }
    this.input+=op;
    this.area.nativeElement.value=this.input;
  }

  execute(){
    if(this.area.nativeElement.value==''){
      return;
    }
    if(this.area.nativeElement.value.indexOf('\n')>-1){
      const pos=this.area.nativeElement.value.indexOf('\n')
      this.area.nativeElement.value=this.area.nativeElement.value.substr(0,pos)
    }
    this.area.nativeElement.value=this.area.nativeElement.value+'\n'+eval(this.area.nativeElement.value);
    // console.log(this.area.nativeElement.value)
    this.input=String(eval(this.area.nativeElement.value));
    this.service.store.push(this.area.nativeElement.value)
  }

  percentage(){
    if(!this.area.nativeElement.value){
      return;
    }
    if(this.area.nativeElement.value.indexOf('\n')>-1){
      const pos=this.area.nativeElement.value.indexOf('\n')
      this.area.nativeElement.value=this.area.nativeElement.value.substr(0,pos)
    }
    this.area.nativeElement.value=this.area.nativeElement.value+'\n'+eval(this.area.nativeElement.value)/100;
    //console.log(String(eval(this.area.nativeElement.value)))  //suspecious thing happend
    this.input=String(eval(this.area.nativeElement.value));
    const pos=this.area.nativeElement.value.indexOf('\n')
    const temp=this.area.nativeElement.value.substring(0,pos)+'/100'+this.area.nativeElement.value.substring(pos,this.area.nativeElement.value.length);
    this.service.store.push(temp);
  }

  dot(s:any){
    if(this.area.nativeElement.value==''){
      this.area.nativeElement.value='0.'
      this.input='0.'
    }else{
      this.input+=s;
      this.area.nativeElement.value=this.input;
    }
  }

  sign(){
    if(this.area.nativeElement.value[0]=='-'){
      this.area.nativeElement.value=this.area.nativeElement.value.replace('-', '');
    }else{
      this.area.nativeElement.value='-'+this.area.nativeElement.value
    }
    this.input=this.area.nativeElement.value;
  }
  
  back(){
    if(!this.area.nativeElement.value){
      return;
    } 
    const pos=this.area.nativeElement.value.length
    this.input=this.input.substring(0,pos-1)
    this.area.nativeElement.value=this.area.nativeElement.value.substr(0,pos-1);
  }

  clearAll(){
    const self=this;
    self.modelRef = self.modalService.open(self.model,{animation:true,container:'.row'});
    this.modelRef.result.then(res=>{
      console.log(res)
      if(res){
        this.area.nativeElement.value='';
        this.input='';
      }
    },dis=>{})
  }

  // modal(template: any, options?: NgbModalOptions): NgbModalRef {
  //   const self = this;
  //   if (!options) {
  //     options = {
  //       centered: true,
  //       beforeDismiss: () => false,
  //     };
  //   } else {
  //     if (!options.beforeDismiss) {
  //       options.beforeDismiss = () => false;
  //     }
  //     if (!options.centered) {
  //       options.centered = true;
  //     }
  //   }
  //   return self.modalService.open(template, options);
  // }
}

