import { Component, OnInit,Input } from '@angular/core';
import {SharedService} from 'src/app/shared.service';

@Component({
  selector: 'app-add-edit-ped',
  templateUrl: './add-edit-ped.component.html',
  styleUrls: ['./add-edit-ped.component.css']
})
export class AddEditPedComponent implements OnInit {

  constructor(private service:SharedService) { }

  @Input() ped:any;
  PersonId:any;
  PersonName:any;
  PersonAddress:any;
  DateOfBirth:any;
  Sex:any;
  PhoneNumber:any;
  EmailAddress:any;
  PhotoFileName:any;
  PhotoFilePath:any;

  PersonList:any=[];

  ngOnInit(): void {
    this.loadPersonList();
  }

  loadPersonList(){
    this.service.getAllPersonalDetails().subscribe((data:any)=>{
      this.PersonList=data;

      this.PersonId=this.ped.PersonId;
      this.PersonName=this.ped.PersonName;
      this.PersonAddress=this.ped.PersonAddress;
      this.DateOfBirth=this.ped.DateOfBirth;
      this.Sex=this.ped.Sex;
      this.PhoneNumber=this.ped.PhoneNumber;
      this.EmailAddress=this.ped.EmailAddress;
      this.PhotoFileName=this.ped.PhotoFileName;
      this.PhotoFilePath=this.service.PhotoUrl+this.PhotoFileName;
    });
  }

  addPerson(){
    var val = {PersonId:this.PersonId,
      PersonName:this.PersonName,
      PersonAddress:this.PersonAddress,
      DateOfBirth:this.DateOfBirth,
      Sex:this.Sex,
      PhoneNumber:this.PhoneNumber,
      EmailAddress:this.EmailAddress,
            PhotoFileName:this.PhotoFileName};

    this.service.addPerson(val).subscribe(res=>{
      alert(res.toString());
    });
  }

  updatePerson(){
    var val = {PersonId:this.PersonId,
      PersonName:this.PersonName,
      PersonAddress:this.PersonAddress,
      DateOfBirth:this.DateOfBirth,
      Sex:this.Sex,
      PhoneNumber:this.PhoneNumber,
      EmailAddress:this.EmailAddress,
  PhotoFileName:this.PhotoFileName};

    this.service.updatePerson(val).subscribe(res=>{
    alert(res.toString());
    });
  }


  uploadPhoto(event:any){
    var file=event.target.files[0];
    const formData:FormData=new FormData();
    formData.append('uploadedFile',file,file.name);

    this.service.UploadPhoto(formData).subscribe((data:any)=>{
      this.PhotoFileName=data.toString();
      this.PhotoFilePath=this.service.PhotoUrl+this.PhotoFileName;
    })
  }

}
