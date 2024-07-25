import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { PolicyListComponent } from '../policy-list/policy-list.component';
import { Observable } from 'rxjs';
import { PolicyDto } from '../../dtos/policy-dto';
import { PolicyService } from '../../services/policy.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {

}
