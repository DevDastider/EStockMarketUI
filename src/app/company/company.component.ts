import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Sort } from '@angular/material/sort';
import { AddStockDialogComponent } from '../dialogs/add-stock-dialog/add-stock-dialog.component';
import { DeleteDialogComponent } from '../dialogs/delete-dialog/delete-dialog.component';
import { ErrorDialogComponent } from '../dialogs/error-dialog/error-dialog.component';
import { UpdateDialogComponent } from '../dialogs/update-dialog/update-dialog.component';
import { Company } from './Company';
import { CompanyService } from './company.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css'],
})
export class CompanyComponent implements OnInit {

  companyModel= new Company();
  companyArr: Array<Company> =[];
  response: any;
  closePanelFlag= false;
  isLoading: boolean;

  constructor(private http: HttpClient, private companyService: CompanyService, private dialog: MatDialog) { 
      this.isLoading=true 
  }

  ngOnInit(): void {
    this.getCompanies();
    console.log('get called');
  }

  registerCompany(registerForm: NgForm){
    //const copyCompany: Company= Object.assign({}, this.companyModel);
    this.companyService.addCompany(this.companyModel).subscribe(
      data=> {
        const companyData= Object.values(data)['0'];
        this.companyArr.push(companyData);
      },
      error=>{
        console.log(error);
        const e= error['error'];
        console.log(e['message']);
        //window.alert(e['message']);
        this.dialog.open(ErrorDialogComponent, {data: {errorBody: e['message']}});
      }
    );
    registerForm.reset();
    //this.companyModel= new Company();
    //this.getCompanies();
  }

  getCompanies(){
    this.companyService.getAllCompanies().subscribe(
      data=> {
        this.isLoading=false;
        console.log(data);
        this.response= Object.values(data);
        console.log(this.response);
        this.companyArr= this.response['0'];
        console.log(this.companyArr);
      },
      error=> {
        this.dialog.open(ErrorDialogComponent, {data: {errorBody: 'Server Down. Please try after sometime'}});
      }
    )
  }

  deleteCompany(company: Company){
    let dialogRef= this.dialog.open(DeleteDialogComponent, {data: {compName: company.companyName}})

    dialogRef.afterClosed().subscribe(
      result=> {
        if(result=='true'){
          this.isLoading= true;
          this.companyService.deleteCompany(company.companyCode).subscribe(
            data => {
              this.isLoading= false;
              console.log("Record is deleted", data);
              let companyIndex = this.companyArr.findIndex((c: { companyCode: number; }) => c.companyCode == company.companyCode)
              console.log(companyIndex);
              this.companyArr.splice(companyIndex, 1);
              //this.getCompanies();
            }
          )
        }
      }
    )
  }

  addStockDialog(companyCode:number, companyName: string){
    let dialogRef= this.dialog.open(AddStockDialogComponent, {data: {compName: companyName}});

    dialogRef.afterClosed().subscribe(
      result=> {
        if(result!=undefined && result!=='false'){
          this.addPrice(companyCode, result)
        }
      }
    )
  }

  addPrice(companyCode: number, stockPrice: number){
    let obj= new Company();
    obj.stockPrice= stockPrice;
    //console.log(obj);
    this.isLoading= true;
    this.companyService.addStockPrice(companyCode, obj).subscribe(
      data=> {
        console.log(data);
        this.getCompanies();
      },
      error=> {
        console.log(error);
        this.dialog.open(ErrorDialogComponent, {data: { errorBody:'INTERNAL_SERVER_ERROR<br>Please try after sometime'}} );
      }
    );
  }

  updateDialog(companyCode:number, companyName: string, stkPrc: number){
    let dialogRef= this.dialog.open(UpdateDialogComponent, { data: {compCode: companyCode,
      compName: companyName, stockPrice: stkPrc}});

    dialogRef.afterClosed().subscribe(
      result=> {
        console.log("input from dialog:" +result);
        if(result!= undefined && (result!=='false')){
        
          console.log('inside update')
          this.updatePrice(companyCode, result)
        }
      }
    )
  }

  updatePrice(companyCode: number, stockPrice: number){
    let obj = new Company();
    obj.stockPrice= stockPrice;
    this.isLoading= true;
    this.companyService.updateStockPrice(companyCode, obj).subscribe(
      data=>{
        console.log(data);
        this.getCompanies();
        this.isLoading= true;
      },
      error=> {
        console.log(error);  
        this.dialog.open(ErrorDialogComponent, {data: {errorBody: 'INTERNAL_SERVER_ERROR'}})
      }
    );
  }

  sortData(sort: Sort){
    //when there is no sort applied
    if (!sort.active || sort.direction === '') {
      return;
    }

    this.companyArr= this.companyArr.sort((a,b)=> {
      const isAsc= sort.direction === 'asc';

      switch(sort.active){
        case 'companycode': return this.compare(a.companyCode, b.companyCode, isAsc);
        case 'companyname': return this.compare(a.companyName, b.companyName, isAsc);
        case 'stockprice': return this.compare(a.stockPrice, b.stockPrice, isAsc);

        default: return 0;
      }
    })
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
}
