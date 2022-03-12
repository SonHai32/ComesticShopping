import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'displayListWithProperty',
})
export class DisplayListWithPropertyPipe implements PipeTransform {
  transform(listData: any[], propertyName: string): string {
    return listData.map((val: any) => val[propertyName]).join(' , ');
  }
}
