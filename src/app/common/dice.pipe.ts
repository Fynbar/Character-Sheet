import { Pipe, PipeTransform } from '@angular/core';
import { Die } from '../components/dice/dice';

@Pipe({
  name: 'dice'
})
export class DicePipe implements PipeTransform {

  transform(dice: Die, args?: any): string {
    return dice.makeString;
  }

}
