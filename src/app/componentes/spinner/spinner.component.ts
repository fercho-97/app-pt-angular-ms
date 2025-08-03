import { Component} from '@angular/core';
import { LoaderService } from 'src/app/servicios/loader/loader.service';
@Component({
  selector: 'app-spinner',
  standalone: false,
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.css',

})
export class SpinnerComponent {
  isLoading$ = this.loaderService.loading$;
  constructor(private loaderService: LoaderService) { }

}
