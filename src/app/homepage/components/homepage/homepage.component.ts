import { Component } from '@angular/core';
import { CoreModule } from '../../../core/core.module';

@Component({
  selector: 'app-homepage',
  imports: [
    CoreModule
  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent {

}
