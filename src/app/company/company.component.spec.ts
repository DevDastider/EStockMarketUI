import { Overlay } from '@angular/cdk/overlay';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddStockDialogComponent } from '../dialogs/add-stock-dialog/add-stock-dialog.component';
import { DeleteDialogComponent } from '../dialogs/delete-dialog/delete-dialog.component';
import { ErrorDialogComponent } from '../dialogs/error-dialog/error-dialog.component';
import { UpdateDialogComponent } from '../dialogs/update-dialog/update-dialog.component';

import { CompanyComponent } from './company.component';

describe('CompanyComponent', () => {
  let component: CompanyComponent;
  let fixture: ComponentFixture<CompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatDialogModule, FormsModule],
      declarations: [ CompanyComponent, AddStockDialogComponent, ErrorDialogComponent, DeleteDialogComponent, UpdateDialogComponent],
      providers: [Overlay,MatDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('is checking the sorting compare fuction for ascending', ()=> {
    expect(component.compare(201, 202, true)).toEqual(-1);
    expect(component.compare(400, 399, true)).toEqual(1);
  });

  it('is checking the sorting compare fuction for descending', ()=> {
    expect(component.compare(201, 202, false)).toEqual(1);
    expect(component.compare(400, 399, false)).toEqual(-1);
  });
});
