import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'appFilter' })
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLocaleLowerCase();

    return items.filter((list) => {
      var name =String(list.firstname + list.lastname);
      //search for name
      console.log(name);
      if (name.toLowerCase().includes(searchText)) {
        console.log(list);
        return list;
      }
    });
  }
}
