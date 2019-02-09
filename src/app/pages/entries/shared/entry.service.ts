import { Injectable, Injector } from '@angular/core';
import { Entry } from './entry.model';
import { CategoryService } from '../../categories/shared/category.service';
import { BaseResourceService } from 'src/app/shared/services/base-resource.service';
import { Observable, throwError } from 'rxjs';
import { map, catchError, flatMap } from 'rxjs/operators'
import * as moment from 'moment'

@Injectable({
  providedIn: 'root'
})
export class EntryService extends BaseResourceService<Entry>{

  constructor(
    protected injector: Injector, 
    private categoryService: CategoryService
  ) { 
    super("api/entries", injector, Entry.fromJson)
  }

  update(entry: Entry): Observable<Entry> {
    return this.setCategoryAndToServer(entry, super.update.bind(this))
  } 

  create(entry: Entry): Observable<Entry> {
    return this.setCategoryAndToServer(entry, super.create.bind(this))
  }

  private setCategoryAndToServer(entry: Entry, sendFn): Observable<Entry> {
    return this.categoryService.getById(entry.categoryId).pipe(
      flatMap(category => {
        entry.category = category

        /*Início - Se a categoria já viesse no post precisaria apenas colocar o que está abaixo*/
        return sendFn(entry)
        /*Fim - Do que realmente precisaria */

      }),
      catchError(this.hadleError)
    )
    
  }

  public getByMonthAndYear(month: number, year: number): Observable<Entry[]> {
    return this.getAll().pipe(
      map(entries => this.filterByMonthAndYear(entries, month, year))
    );
  }

  private filterByMonthAndYear(entries: Entry[], month: number, year: number) {
    return entries.filter(entry => {
      const entryDate = moment(entry.date, 'DD/MM/YYYY');

      const monthMoment: number = entryDate.month() + 1;
      const monthMatches = monthMoment == month;
      const yearMatches = entryDate.year() == year;

      if (monthMatches && yearMatches) {
         return entries;
      }
    });
  }

}
