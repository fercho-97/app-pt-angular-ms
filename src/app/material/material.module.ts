import { NgModule } from '@angular/core';

import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { LuxonDateAdapter, MAT_LUXON_DATE_FORMATS } from '@angular/material-luxon-adapter';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher, MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatSliderModule } from '@angular/material/slider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorModule, MatPaginatorIntl } from '@angular/material/paginator';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatStepperModule } from '@angular/material/stepper';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { MatTreeModule } from '@angular/material/tree';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
@NgModule({
  declarations: [ ],
  imports: [
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatSliderModule,
    MatBadgeModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatRadioModule,
    MatGridListModule,
    MatDialogModule,
    MatExpansionModule,
    MatStepperModule,
    DragDropModule,
    MatTooltipModule,
    MatAutocompleteModule,
    MatTableModule,
    MatPaginatorModule,
    MatTabsModule,
    MatDatepickerModule, 
    MatNativeDateModule,
    MatMenuModule,
    MatTreeModule,
    MatProgressSpinnerModule,
    MatSortModule
  ],
  exports: [
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatSliderModule,
    MatBadgeModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatRadioModule,
    MatGridListModule,
    MatDialogModule,
    MatExpansionModule,
    MatStepperModule,
    DragDropModule,
    MatTooltipModule,
    MatAutocompleteModule,
    MatTableModule,
    MatPaginatorModule,
    MatDatepickerModule, 
    MatNativeDateModule,
    MatTabsModule,
    MatMenuModule,
    MatTreeModule,
    MatProgressSpinnerModule,
    MatSortModule
  ],
  providers: [
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher },
    { provide: DateAdapter, useClass: LuxonDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_LUXON_DATE_FORMATS },
    { provide: MAT_DATE_LOCALE, useValue: 'es' },
  ]
})
export class MaterialModule { }
