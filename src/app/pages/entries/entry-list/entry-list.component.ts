import { Component, OnInit } from '@angular/core';
import { EntryService } from '../shared/entry.service';
import { Entry } from '../shared/entry.model';
import { element } from '@angular/core/src/render3';
import { BaseResourceListComponent } from 'src/app/shared/components/base-resource-list/base-resource-list.component';

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.css']
})
export class EntryListComponent extends BaseResourceListComponent<Entry>{

  constructor(
    private entryService: EntryService
  ) {
    super(entryService)
   }


}
