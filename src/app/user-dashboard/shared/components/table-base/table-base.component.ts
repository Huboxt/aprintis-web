import { Injectable, ViewChild } from '@angular/core';
import { MatLegacyPaginator as MatPaginator } from '@angular/material/legacy-paginator';
import { MatSort } from '@angular/material/sort';
import { MatLegacyTableDataSource as MatTableDataSource } from '@angular/material/legacy-table';
import { ph81 } from '_models';

export const lowerCaseDataAccessor = (
  data: any,
  sortHeaderId: string
): string => {
  if (typeof data[sortHeaderId] === 'string') {
    return data[sortHeaderId].toLocaleLowerCase();
  }
  return data[sortHeaderId];
};

@Injectable()
export abstract class TableBaseComponent {
  dataSource: MatTableDataSource<any>;
  defaultImg = ph81;
  loading = true;

  @ViewChild('paginator', { static: false })
  set paginator(value: MatPaginator) {
    if (this.dataSource) {
      this.dataSource.paginator = value;
    }
  }

  @ViewChild('TableSort', { static: false })
  set sort(value: MatSort) {
    if (this.dataSource) {
      this.dataSource.sortingDataAccessor = lowerCaseDataAccessor;
      this.dataSource.sort = value;
    }
  }
}
