import { Injectable } from '@angular/core';
import { NativeDateAdapter } from '@angular/material/core';

const monthNames = [
  'JAN',
  'FEB',
  'MAR',
  'APR',
  'MAY',
  'JUN',
  'JUL',
  'AUG',
  'SEP',
  'OCT',
  'NOV',
  'DEC'
];

@Injectable({
  providedIn: 'root'
})
export class AppDateAdapter extends NativeDateAdapter {
  // eslint-disable-next-line max-statements
  parse(value: any): Date | null {
    if (typeof value === 'string') {
      if (value.includes('/')) {
        const str = value.split('/');
        const year = Number(str[2]);
        const month = Number(str[1]) - 1;
        const date = Number(str[0]);
        return new Date(year, month, date);
      } else if (value.includes('-')) {
        const str = value.split('-');
        const year = Number(str[2]);
        const month = Number(str[1]) - 1;
        const date = Number(str[0]);
        return new Date(year, month, date);
        // eslint-disable-next-line no-else-return
      } else {
        const date = Number(value.slice(0, 2));
        const month = Number(value.slice(2, 4)) - 1;
        const year = Number(value.slice(4, 8));
        return new Date(year, month, date);
      }
    }
    const timestamp = typeof value === 'number' ? value : Date.parse(value);
    return isNaN(timestamp) ? null : new Date(timestamp);
  }

  format(date: Date, displayFormat: string): string {
    if (displayFormat === 'input') {
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      return `${this._to2digit(day)}-${this._to2digit(month)}-${year}`;
    } else if (displayFormat === 'inputMonth') {
      const month = date.getMonth();
      const year = date.getFullYear();

      return `${this._toMonth(month)} ${year}`;
    }

    return date.toDateString();
  }

  private _to2digit(num: number) {
    return `00${num}`.slice(-2);
  }

  private _toMonth(num: number) {
    return monthNames[num];
  }
}

export const APP_DATE_FORMATS = {
  parse: {
    dateInput: 'input'
  },
  display: {
    dateInput: 'input',
    monthYearLabel: 'inputMonth',
    dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
    monthYearA11yLabel: { year: 'numeric', month: 'long' }
  }
};
