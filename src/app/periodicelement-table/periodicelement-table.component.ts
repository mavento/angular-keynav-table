import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material";
import {PeriodicElement} from "../model/periodic-element";
import {PeriodicElementService} from "../service/periodic-element.service";
import {SelectionModel} from "@angular/cdk/collections";

@Component({
  selector: 'app-periodicelement-table',
  templateUrl: './periodicelement-table.component.html',
  styleUrls: ['./periodicelement-table.component.scss']
})
export class PeriodicelementTableComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<PeriodicElement>();
  selection = new SelectionModel<PeriodicElement>(false, []);

  @ViewChild('table', {static: true, read: ElementRef}) table: ElementRef;
  private rows: NodeListOf<HTMLElement>;

  constructor(private periodicElementService: PeriodicElementService) {
  }

  ngOnInit() {
    this.getPeriodicElements();
  }

  ngAfterViewInit(): void {
    this.getTableRows();
  }

  selectPrevious(row: PeriodicElement) {
    const currentIndex = this.getCurrentIndex(row);
    if (currentIndex > 0) {
      let previousRow = this.rows[currentIndex - 1];
      this.selection.toggle(this.dataSource.data[currentIndex - 1]);
      previousRow.focus();
    }
  }

  selectNext(row: PeriodicElement) {
    const currentIndex = this.getCurrentIndex(row);
    if (currentIndex < this.dataSource.data.length - 1) {
      let nextRow = this.rows[currentIndex + 1];
      this.selection.toggle(this.dataSource.data[currentIndex + 1]);
      nextRow.focus();
    }
  }

  edit() {
    console.log('edit', this.selection.selected[0]);
  }

  private getCurrentIndex(row) {
    return this.dataSource.data.findIndex(r => r === row)
  }

  private getPeriodicElements() {
    this.dataSource.data = this.periodicElementService.list;
  }

  private getTableRows() {
    let el = this.table.nativeElement;
    this.rows = el.querySelectorAll('mat-row, tr[mat-row]');
  }
}
