import { Component } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-reportes',
  standalone: false,
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.css'
})
export class ReportesComponent {
  selectedTabIndex = 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        const url = this.router.url;
        if (url.includes('reporte-procesos-teminados')) this.selectedTabIndex = 0;
        else if (url.includes('reporte-tutorias-clasificadas')) this.selectedTabIndex = 1;
        else if (url.includes('reporte-procesos-clasificadas')) this.selectedTabIndex = 2;
        else if (url.includes('reporte-top-revisores')) this.selectedTabIndex = 3;
        else if (url.includes('reporte-general')) this.selectedTabIndex = 4;
      });
  }

  onTabChange(event: any) {
    switch (event.index) {
      case 0:
        this.router.navigate(['reporte-procesos-teminados'], { relativeTo: this.route });
        break;
      case 1:
        this.router.navigate(['reporte-tutorias-clasificadas'], { relativeTo: this.route });
        break;
      case 2:
        this.router.navigate(['reporte-procesos-clasificados'], { relativeTo: this.route });
        break;
      case 3:
        this.router.navigate(['reporte-top-revisores'], { relativeTo: this.route });
        break;
      case 4:
        this.router.navigate(['reporte-general'], { relativeTo: this.route });
        break;
    }
  }

}
