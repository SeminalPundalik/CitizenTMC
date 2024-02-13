import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup;
  editProfile:boolean=false;
  Name:any;
  MobileNo:any;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.Name= localStorage.getItem('Name')
    this.MobileNo= localStorage.getItem('MobNo')
    this.profileForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.pattern('[A-Za-z ]*')]],
      middleName: [''],
      lastName: ['', [Validators.required, Validators.pattern('[A-Za-z ]*')]],
      gender: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      aadharId: ['', [Validators.pattern('^[0-9]*$'), Validators.maxLength(12)]],
      currentFlatHouseNo: [''],
      currentSocietyApartment: [''],
      currentAddress: [''],
      currentArea: [''],
      currentLandmark: [''],
      currentPincode: ['', [Validators.pattern('^[0-9]*$'), Validators.maxLength(6)]],
      currentCity: [''],
      currentState: [''],
      currentCountry: [''],
      
    });
  }

  onSubmit() {
    if (this.profileForm.valid) {
      console.log(this.profileForm.value);
      alert(JSON.stringify(this.profileForm.value, null, 2));
      // Perform actions with the form data (e.g., send to server)
    }
  }
  editprofileedit(){
    this.editProfile=true;
  }
  fillPermanantAddress() {
    
  }
}