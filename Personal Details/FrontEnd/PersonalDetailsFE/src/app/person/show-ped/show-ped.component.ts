import { Component, OnInit } from '@angular/core';
import {SharedService} from 'src/app/shared.service';

@Component({
  selector: 'app-show-ped',
  templateUrl: './show-ped.component.html',
  styleUrls: ['./show-ped.component.css']
})
export class ShowPedComponent implements OnInit {

  constructor(private service:SharedService) { }

  PersonList:any=[];

  ModalTitle:any;
  ActivateAddEditPedComp:boolean=false;
  ped:any;

  ngOnInit(): void {
    this.refreshPedList();
  }

  addClick(){
    this.ped={
      PersonId:0,
      PersonName:"",
      PersonAddress:"",
      DateOfBirth:"",
      Sex:"",
      PhoneNumber:"",
      EmailAddress:"",
      PhotoFileName:"anonymous.png"
    }
    this.ModalTitle="Add Person";
    this.ActivateAddEditPedComp=true;

  }

  editClick(item:any){
    console.log(item);
    this.ped=item;
    this.ModalTitle="Edit Person";
    this.ActivateAddEditPedComp=true;
  }

  deleteClick(item:any){
    if(confirm('Are you sure??')){
      this.service.deletePerson(item.PersonId).subscribe(data=>{
        alert(data.toString());
        this.refreshPedList();
      })
    }
  }

  closeClick(){
    this.ActivateAddEditPedComp=false;
    this.refreshPedList();
  }


  refreshPedList(){
    this.service.getPedList().subscribe(data=>{
      this.PersonList=data;
    });
  }

}

