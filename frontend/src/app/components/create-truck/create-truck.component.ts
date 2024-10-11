import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
export class CreateTruckComponent implements OnInit{

  user = { name: '', email: '' };
  truck = { model: '', year: 0, capacity: 0 };
  userCreated = false;
  truckCreated = false;

  workers:any[] = [];
  trucks:any[] = [];
  editingUser: User | null = null;
  editingTruck: Truck | null = null;

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
  ngOnInit(): void {
    this.getWorkers();
    this.getTrucks();
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


  getWorkers() {
    this.userService.getWorkers().subscribe(
      (response) => {
        console.log(response);
        this.workers=response;
      }
    )
  }

  getTrucks() {
    this.truckService.getTruck().subscribe(
      (response) => {
        console.log(response);
        this.trucks = response;
      }
    )
  }


  editUser(user: User) {
    this.editingUser = user;
    this.userForm.patchValue(user);
  }

  updateUser() {
    if (this.userForm.valid && this.editingUser) {
      const updatedUser: User = { ...this.editingUser, ...this.userForm.value };
      console.log('Updating User')
      // this.userService.updateUser(updatedUser).subscribe(
      //   (response) => {
      //     console.log(response);
      //     this.getWorkers();
      //     this.resetUserForm();
      //   },
      //   (error) => {
      //     console.error('Error updating user', error);
      //   }
      // );
    }
  }

  deleteUser(userId: string) {
    console.log('Delte User')
    // this.userService.deleteUser(userId).subscribe(
    //   (response) => {
    //     console.log(response);
    //     this.getWorkers();
    //   },
    //   (error) => {
    //     console.error('Error deleting user', error);
    //   }
    // );
  }

  editTruck(truck: Truck) {
    this.editingTruck = truck;
    this.truckForm.patchValue(truck);
  }

  updateTruck() {
    if (this.truckForm.valid && this.editingTruck) {
      const updatedTruck: Truck = { ...this.editingTruck, ...this.truckForm.value };
      console.log('Update Truck')
      // this.truckService.updateTruck(updatedTruck).subscribe(
      //   (response) => {
      //     console.log(response);
      //     this.getTrucks();
      //     this.resetTruckForm();
      //   },
      //   (error) => {
      //     console.error('Error updating truck', error);
      //   }
      // );
    }
  }

  deleteTruck(truckId: string) {
    
    console.log('Delete Truck')
    // this.truckService.deleteTruck(truckId).subscribe(
    //   (response) => {
    //     console.log(response);
    //     this.getTrucks();
    //   },
    //   (error) => {
    //     console.error('Error deleting truck', error);
    //   }
    // );
  }

  resetUserForm() {
    this.userForm.reset({ role: 'WORKER' });
    this.editingUser = null;
  }

  resetTruckForm() {
    this.truckForm.reset();
    this.editingTruck = null;
  }
}



