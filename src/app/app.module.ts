import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CompanyComponent } from './company/company.component';
import { CompanyDetailsComponent } from './company-details/company-details.component';
import { AboutComponent } from './about/about.component';
import { PerformanceComponent } from './performance/performance.component';
import { AddStockDialogComponent } from './dialogs/add-stock-dialog/add-stock-dialog.component';
import { UpdateDialogComponent } from './dialogs/update-dialog/update-dialog.component';
import { ErrorDialogComponent } from './dialogs/error-dialog/error-dialog.component';
import { DeleteDialogComponent } from './dialogs/delete-dialog/delete-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatSortModule} from '@angular/material/sort';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    AppComponent,
    CompanyComponent,
    CompanyDetailsComponent,
    AboutComponent,
    UpdateDialogComponent,
    AddStockDialogComponent,
    ErrorDialogComponent,
    PerformanceComponent,
    DeleteDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatExpansionModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    AppRoutingModule,
    MatDialogModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSortModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  entryComponents: [UpdateDialogComponent, AddStockDialogComponent, ErrorDialogComponent, DeleteDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
