import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { CompanyDetailsComponent } from './company-details/company-details.component';
import { CompanyComponent } from './company/company.component';
import { PerformanceComponent } from './performance/performance.component';

const routes: Routes = [
  {
    path: '', 
    component: CompanyComponent
  },
  {
    path: 'company/:ccode', 
    component: CompanyDetailsComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'performance',
    component: PerformanceComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
