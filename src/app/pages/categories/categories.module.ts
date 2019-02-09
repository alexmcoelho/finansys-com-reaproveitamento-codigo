import { NgModule } from '@angular/core';
import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryFormComponent } from './category-form/category-form.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [CategoryListComponent, CategoryFormComponent],
  imports: [
    SharedModule,
    CommonModule,
    CategoriesRoutingModule 
  ]
})
export class CategoriesModule { }
