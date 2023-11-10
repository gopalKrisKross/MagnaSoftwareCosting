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
@Pipe({
  name: 'FilterPipe',
})
export class FilterPipe implements PipeTransform {
  transform(list: any,text:string): any {
    try {
      if(text ){
        return list.filter((ele:any)=>ele.name.toLowerCase().includes(text.toLowerCase()))

      }else{
        return list
      }
    } catch (error) {
      console.error(error);
    }
  }
}
