import { Stock } from "./Stock";

export class Company{
    companyCode: number | any;
    companyName: string | any;
    companyCeo: string | any;
    companyTurnover: number | any;
    companyWebsite: string | any;
    stockExchange: string | any;
    stockPrice: number | any;
    timeStamp: string | any;
    stockList: Array<Stock> | any;
}