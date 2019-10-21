import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PeriodicelementTableComponent} from "./periodicelement-table/periodicelement-table.component";

const routes: Routes = [
  {path: '', component: PeriodicelementTableComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
