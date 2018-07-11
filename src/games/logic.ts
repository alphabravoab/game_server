// import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator'
// import { Symbol } from './entities'

export const attacking = (attacker, defender) => {    
    defender.health = defender.health - attacker.attack
}
