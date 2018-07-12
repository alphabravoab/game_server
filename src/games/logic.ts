//import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator'
//import { Symbol } from './entities'

export const switchToken=(game, player)=>{
  game.turn = player.symbol === 'x' ? 'o' : 'x'
 }


export const attack=(attack,defender)=>{
  return defender.health= defender.health-attack
 }



