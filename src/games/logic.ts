//import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator'
//import { Board, Number } from './entities'

export const attack = (attacker,defender) => {
  return defender.health= defender.health-attacker.attack
}
