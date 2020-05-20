import { Pipe, PipeTransform } from '@angular/core';
import { Dice } from '../components/dice/dice';

@Pipe({
  name: 'dice'
})
export class DicePipe implements PipeTransform {

  transform(dice: Dice, args?: any): string {
    return dice.makeString;
  }

}
