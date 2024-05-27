import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "customsort"
})
export class ArraySortPipe implements PipeTransform {
  transform(array: Array<string>, args: string): Array<string> {debugger
    array.sort((a: any, b: any) => {
      if (a['sort'] < b['sort']) {
        return -1;
      } else if (a['sort'] > b['sort']) {
        return 1;
      } else {
        return 0;
      }
    });
    return array;
  }
}