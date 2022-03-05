import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { CompanyService } from './company.service';
import { DATA } from '../test/testDataGetAll';
import { DATA_COMPANY } from '../test/testDataFindCompany';
import { Company } from './Company';
import { DATA_COMPANY_MODEL } from '../test/testCompanyModel';
import { HttpErrorResponse } from '@angular/common/http';

describe('CompanyService', () => {
  let companyService: CompanyService, httpTestingController: HttpTestingController;

  const partialCompanyModel: Partial<Company> = {
    companyCode: 200,
    companyName: 'Company',
    companyWebsite: 'www.company.com',
    companyTurnover: 823791823981274000,
    stockExchange: 'NSE',
    "stockPrice": 11.4
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CompanyService]
    });

    companyService = TestBed.get(CompanyService);
    httpTestingController = TestBed.get(HttpTestingController);

  });

  it('should fetch company details', () => {
    companyService.getAllCompanies().subscribe(
      data => {
        //console.log(data);
        let response = Object.values(data)['0'];
        let companyArr = response['0'];

        expect(data).toBeTruthy('No companies found');  //will be executed if no data found or return type is undefined

        //console.log(response);

        expect(response['1']).toEqual('Succesfully retrieved the data');

        expect(response['2']).toBe(200, 'wrong http response code');

        expect(companyArr.length).toBe(4, 'incorrect data');

        expect(companyArr[0].companyCode).toBe(103, 'incorrect company code');

        expect(companyArr[1].companyTurnover).toBe(918723821638916200, 'incorrect turnover fetched');

      });

    const req = httpTestingController.expectOne('http://localhost:8080/api/v1.0/market/company/getall');
    expect(req.request.method).toEqual("GET");

    req.flush({ data: Object.values(DATA) });
  });

  it('should find a company', () => {
    let companyCode = 102;
    companyService.findCompany(companyCode).subscribe(
      data => {
        //console.log(data);
        let response = Object.values(data)['0'];
        let foundCompany = response['0'];
        //console.log(foundCompany);

        expect(foundCompany.companyCode).toBe(102, 'wrong company fetched');
        expect(foundCompany.companyName).toEqual("Company 2");
      }
    );

    const req = httpTestingController.expectOne('http://localhost:8080/api/v1.0/market/company/info/' + `${companyCode}`);
    expect(req.request.method).toEqual("GET");

    req.flush({ data: Object.values(DATA_COMPANY) });
  });

  it('should register Company entity', () => {

    companyService.addCompany(partialCompanyModel as Company).subscribe(
      data => {
        let response = Object.values(data)['0'];
        let company = response['0'];

        expect(company.companyCode).toBe(partialCompanyModel.companyCode, 'wrong company code added');
        expect(company.companyName).toBe(partialCompanyModel.companyName, 'wrong company name added');
        expect(company.companyWebsite).toBe(partialCompanyModel.companyWebsite, 'wrong website added');
        expect(company.companyTurnover).toBe(partialCompanyModel.companyTurnover, 'wrong company turnover added');
        expect(company.stockExchange).toBe(partialCompanyModel.stockExchange, 'wrong stock exchange added');
      }
    );
    const req = httpTestingController.expectOne('http://localhost:8080/api/v1.0/market/company/register');
    expect(req.request.method).toEqual("POST");

    req.flush({ data: Object.values(DATA_COMPANY_MODEL) });
  });

  it('should not register company', ()=> {
    companyService.addCompany(partialCompanyModel as Company).subscribe(
      ()=> fail('the register company function should fail'),
      
      (error: HttpErrorResponse) => {
        expect(error.status).toBe(500);
      }
    );

    const req = httpTestingController.expectOne('http://localhost:8080/api/v1.0/market/company/register');
    expect(req.request.method).toEqual("POST");

    req.flush('Company code already exists', {status:500,
      statusText:'Internal Server Error'});
  })

  it('should add stock price', () => {
    let companyCode = 200;

    partialCompanyModel.stockPrice = 11.4;
    companyService.addStockPrice(companyCode, partialCompanyModel as Company).subscribe(
      data => {
        let response = Object.values(data)['0'];
        let company = response['0'];

        expect(company.companyCode).toBe(companyCode, 'wrong company\'s stock price added');

        expect(company.stockPrice).toBe(partialCompanyModel.stockPrice, 'Wrong stock price added');
      }
    );
    const req = httpTestingController.expectOne('http://localhost:8080/api/v1.0/market/stock/add/' + `${companyCode}`);
    expect(req.request.method).toEqual("POST");

    req.flush({ data: Object.values(DATA_COMPANY_MODEL) });
  });

  it('should update stock price', () => {
    let companyCode = 200;
    partialCompanyModel.stockPrice = 11.4;

    companyService.updateStockPrice(companyCode, partialCompanyModel as Company).subscribe(
      data => {
        let response = Object.values(data)['0'];
        let company = response['0'];

        expect(company.companyCode).toBe(companyCode, 'wrong company code for updation');
        expect(company.stockPrice).toBe(partialCompanyModel.stockPrice, 'wrong stock price updated');
      }
    );
    const req = httpTestingController.expectOne('http://localhost:8080/api/v1.0/market/stock/put/' + `${companyCode}`);
    expect(req.request.method).toEqual("PUT");

    req.flush({ data: Object.values(DATA_COMPANY_MODEL) });
  });

  // it('should delete the company', () => {
  //   let companyCode = 104;
  //   companyService.deleteCompany(companyCode).subscribe(
  //     data => {
  //       expect(data).toBeNull();
  //     },
  //   )
  // });
});
