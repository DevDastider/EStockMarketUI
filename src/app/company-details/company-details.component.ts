import { Component, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { delay } from 'rxjs';
import { Company } from '../company/Company';
import { CompanyService } from '../company/company.service';
import { Stock } from '../company/Stock';
import { ErrorDialogComponent } from '../dialogs/error-dialog/error-dialog.component';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.css']
})
export class CompanyDetailsComponent implements OnInit {

  searchCompanyModel: Company = new Company();
  flag: boolean | any;
  searchCode: string | any;
  startDate: string | any = '';
  endDate: string | any = '';
  stocksList: Array<Stock> = [];
  filteredTable: Array<Stock> = [];
  maxStockPrice: number = 0.0;
  minStockPrice: number = Number.MAX_VALUE;
  avgStockPrice: string | any;
  maxDate: Date = new Date();
  isLoading: boolean;

  constructor(private route: ActivatedRoute, private companyService: CompanyService, private dialog: MatDialog) {
    this.isLoading= true;
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(
      params => {
        this.searchCode = params.get('ccode');
        this.findCompany(this.searchCode);

        this.filteredTable = [];
        this.isLoading= true;
      }
    )
  }

  findCompany(companyCode: string) {
    this.companyService.findCompany(parseInt(companyCode)).subscribe(
      data => {
        this.isLoading= false;
        console.log(data);
        
        if (data == null) 
          this.flag = false;
        else
          this.flag = true;
        
        this.searchCompanyModel = Object.values(data)['0'];
        console.log(this.searchCompanyModel);
        this.stocksList = this.searchCompanyModel.stockList;
        console.log(this.stocksList);
      }
    )
  }

  addStartDate(event: MatDatepickerInputEvent<Date>) {
    this.startDate = event.value;
    console.log(this.startDate);
  }

  addEndDate(event: MatDatepickerInputEvent<Date>) {
    this.endDate = event.value;
    console.log(this.endDate);
  }

  filterSP() {
    this.filteredTable = [];
    this.maxStockPrice = 0.0;
    this.minStockPrice = Number.MAX_VALUE;

    if (this.startDate != '' && this.endDate != '') {
      if (this.startDate.valueOf() <= this.endDate.valueOf()) {
        let sum = 0;
        this.stocksList.forEach(stock => {
          let ts = stock.timeStamp.replace(/\s/, "T");
          console.log(ts);

          let stockTimestamp = new Date(ts);

          if (stockTimestamp.valueOf() >= this.startDate.valueOf() &&
            stockTimestamp.valueOf() <= (this.endDate.valueOf() + 8.64e+7)) {
            this.filteredTable.push(stock);

            let transactionSP = stock.stockPrice;

            if (this.maxStockPrice < transactionSP)
              this.maxStockPrice = transactionSP;

            if (this.minStockPrice > transactionSP)
              this.minStockPrice = transactionSP;

            sum += transactionSP;

          }
        });

        if (this.filteredTable.length == 0) {
          this.dialog.open(ErrorDialogComponent, { data: { errorBody: 'No Stock transactions found' } });
        }
        else {
          this.avgStockPrice = (sum / (this.filteredTable.length)).toFixed(3);
        }
      }
      else {
        this.dialog.open(ErrorDialogComponent, { data: { errorBody: 'End Date cannot be before start date' } });
      }
    }
    else {
      this.dialog.open(ErrorDialogComponent, { data: { errorBody: 'Date Fields can\'t be empty' } })
    }
  }
}
