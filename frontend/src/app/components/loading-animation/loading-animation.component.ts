import { Component } from '@angular/core';
import { LoadingService } from '../../services/loading.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading-animation',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './loading-animation.component.html',
  styleUrl: './loading-animation.component.css'
})
export class LoadingAnimationComponent {

  constructor(public loadingService:LoadingService) {
    console.log('loading animation')
  }

}
