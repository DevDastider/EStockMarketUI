import { Component, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { Company } from '../company/Company';
import { CompanyService } from '../company/company.service';
import { ErrorDialogComponent } from '../dialogs/error-dialog/error-dialog.component';

@Component({
  selector: 'app-performance',
  templateUrl: './performance.component.html',
  styleUrls: ['./performance.component.css']
})
export class PerformanceComponent implements OnInit {

  constructor(private companyService: CompanyService, private dialog: MatDialog) { }

  companyArr: Array<Company> = [];
  max: Company = new Company();
  min: Company = new Company();
  startDate: string | any = '';
  endDate: string | any = '';
  filteredTable: Array<Company> = [];
  maxDate: Date= new Date();
  isLoading: boolean= true;

  ngOnInit(): void {
    this.companyService.getAllCompanies().subscribe(
      data => {
        this.isLoading=false;
        console.log('inside perfo');

        let companyMap = Object.values(data);
        this.companyArr = companyMap['0'];

        //Calculating max & min
        this.min.stockPrice= Number.MAX_VALUE;
        this.max.stockPrice= Number.MIN_VALUE;
        
        for (let i = 0; i < this.companyArr.length; i++) {
          let company= this.companyArr[i];

          if(this.max.stockPrice < company.stockPrice)
            this.max= company;
          
          if(company.stockPrice!=0.0 && this.min.stockPrice > company.stockPrice)
            this.min= company;
        }

      },
      error => {
        this.isLoading=false;
        this.dialog.open(ErrorDialogComponent, { data: { errorBody: 'Server Down. Please try after sometime' } });
      }
    );

  }

  addStartDate(event: MatDatepickerInputEvent<Date>) {
    //console.log(`${event.value}`);
    this.startDate = event.value;
    console.log(this.startDate);
  }

  addEndDate(event: MatDatepickerInputEvent<Date>) {
    //console.log(`${event.value}`);
    this.endDate = event.value;
    console.log(this.endDate);
  }

  filter() {
    this.filteredTable = [];
    if (this.startDate != '' && this.endDate != '') {
      if (this.startDate.valueOf() <= this.endDate.valueOf()) {
        let sum=0;

        this.companyArr.forEach(element => {
          //Convert yyyy-MM-dd HH:mm:ss to yyyy-MM-ddTHH:mm:ss for typescript to convert into date object
          let ts = element.timeStamp.replace(/\s/, "T");
          console.log(ts);

          //Storing timestamp in Date object format
          let companyCreatedTimestamp = new Date(ts);
          //console.log(companyCreatedTimestamp.getTime());

          //Feeding filtered Table array
          if (companyCreatedTimestamp.valueOf() >= this.startDate.valueOf() &&
            companyCreatedTimestamp.valueOf() <= (this.endDate.valueOf()+ 8.64e+7)) {
            this.filteredTable.push(element);
          }
        });

        if (this.filteredTable.length == 0) {
          this.dialog.open(ErrorDialogComponent, { data: { errorBody: 'No Companies found' } });
        }

        console.log(this.filteredTable);
      }
      else {
        this.dialog.open(ErrorDialogComponent, { data: { errorBody: 'End Date cannot be before start date' } });
      }
    }else{
      this.dialog.open(ErrorDialogComponent, {data: {errorBody: 'Date Fields can\'t be empty'}})
    }
  }
}
