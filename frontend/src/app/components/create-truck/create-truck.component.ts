import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../models/user.model';
import { UserserviceService } from '../../services/userservice.service';
import { Truck } from '../../models/truck.model';
import { TruckService } from '../../services/truck.service';

@Component({
  selector: 'app-create-truck',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './create-truck.component.html',
  styleUrl: './create-truck.component.css'
})
export class CreateTruckComponent {

  user = { name: '', email: '' };
  truck = { model: '', year: 0, capacity: 0 };
  userCreated = false;
  truckCreated = false;

  userId = '';

  userForm: FormGroup;
  truckForm: FormGroup;

  constructor(private fb:FormBuilder , private userService:UserserviceService , private truckService:TruckService) {
    this.userForm = this.fb.group({
      username : '',
      email : '',
      password : '',
      firstName : '',
      lastName : '',
      phoneNumber : '',
      location : '',
      role : 'WORKER'
    })

    this.truckForm = this.fb.group({
      truckNumber : '',
      pickupCapacity : 0,
      currentLocation : '',
      startLatitude : 0,
      startLongitude : 0,
      endLatitude : 0,
      endLongitude : 0
    })

  }

  createUser() {
    this.userCreated = true;
    if(this.userForm.valid){
      const user:User = this.userForm.value;

      this.userService.createUser(user).subscribe(
        (response) => {
          console.log(response)
          this.userCreated = true;
          this.userId = response.userid;
        },
        (error) => {
            console.error('Error registering user', error);
        }
    );
  }
  }

  createTruck() {

    if(this.truckForm.valid) {
      const truck:Truck = this.truckForm.value;
      truck.userId = this.userId
      console.log(truck)

      this.truckService.addTruck(truck).subscribe(
        (response) => { 
          console.log(response);
          this.truckCreated=true; 
        },
        (error) => {
          console.error('Error in registering trucks' , error)
        }
      );

    }

  }

}
