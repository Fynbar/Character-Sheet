import { ActionElement } from '../../../../models/monsters/final-monster/monster.model';
import { RESTType, PurpleType, Trait } from 'src/models/monsters/api-monster/apiMonster.model';
export function toRechargeString(action: ActionElement | Trait) {
    let s: string | string[];
    let r = '';
    if (action.usage) {
        if (action.usage.type === PurpleType.RechargeAfterREST) {
            s = [
                action.usage.restTypes.indexOf(RESTType.Long) >= 0 ? 'Long' : '',
                action.usage.restTypes.length > 1 ? 'or' : '',
                action.usage.restTypes.indexOf(RESTType.Short) >= 0 ? 'Short' : ''
            ].filter(f => f.length > 0);
            r = ` (Recharge after ${s.join(' ')} Rest)`;
        } else if (action.usage.type === PurpleType.RechargeOnRoll) {
            s = action.usage.dice.diceType !== action.usage.minValue ? `${action.usage.minValue}-` : '';
            r = ` (Recharge ${s}${action.usage.dice.diceType})`;
        } else if (action.usage.type === PurpleType.PerDay) {
            r = ` (${action.usage.times}/day)`;
        }
    }
    return r;
}
