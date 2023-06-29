import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeSpace',
})
export class removeSpace implements PipeTransform {
  transform(value: string): string {
    return value.replace(/\s/g, '');
  }
}
@Pipe({
  name: 'currancyFormat',
})
export class currancyFormat implements PipeTransform {
  transform(value: any): any {
    try {
      return value.toLocaleString('en-IN', {
        maximumFractionDigits: 2,
        style: 'currency',
        currency: 'CAD',
      });
    } catch (error) {
      console.error(error);
    }
  }
}
