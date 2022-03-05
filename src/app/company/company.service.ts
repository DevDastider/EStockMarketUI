import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Company } from './Company';


@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http: HttpClient) { }

  private apiGetAllCompanies:string = 'http://localhost:8080/api/v1.0/market/company/getall'; //'http://ec2-3-87-198-48.compute-1.amazonaws.com:5000/api/v1.0/market/company/getall';
  private apiAddCompany:string = 'http://localhost:8080/api/v1.0/market/company/register';
  private apiDeleteCompany:string = 'http://localhost:8080/api/v1.0/market/company/delete';
  private apiFindCompany: string= 'http://localhost:8080/api/v1.0/market/company/info'; //'http://ec2-3-87-198-48.compute-1.amazonaws.com:5000/api/v1.0/market/company/info';
  private apiAddStockPrice: string= 'http://localhost:8080/api/v1.0/market/stock/add' ;
  private apiUpdateStockPrice: string= 'http://localhost:8080/api/v1.0/market/stock/put'; //'http://ec2-3-87-198-48.compute-1.amazonaws.com:5000/api/v1.0/market/stock/put'

  addCompany(company: Company): Observable<Company>{
    console.log(company);
    return this.http.post<Company>(this.apiAddCompany, company);
  }

  getAllCompanies():Observable<Map<string,string>>{
    return this.http.get<Map<string,string>>(this.apiGetAllCompanies);
  }

  deleteCompany(companyCode: number): Observable<Company>{
    return this.http.delete<Company>(`${this.apiDeleteCompany}/${companyCode}`);
  }

  findCompany(companyCode: number): Observable<Company>{
    return this.http.get<Company>(`${this.apiFindCompany}/${companyCode}`);
  }

  addStockPrice(companyCode:number, company: Company): Observable<Company>{
    return this.http.post<Company>(`${this.apiAddStockPrice}/${companyCode}`, company);
  }

  updateStockPrice(companyCode:number, company: Company): Observable<Company> {
    return this.http.put<Company>(`${this.apiUpdateStockPrice}/${companyCode}`, company);
  }
}
