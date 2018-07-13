import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, Index, OneToMany, ManyToOne } from 'typeorm'
import User from '../users/entity'

export type Symbol = 'x' | 'o' 
export type Number = number
export type Row = [ Number, Number, Number ]
//export type Row = [ Number | null , Number | null , Number | null  ]

export type Board = [ Row, Row, Row ]

type Status = 'pending' | 'started' | 'finished'

const attackRow1: Row = Array.apply(null, Array(3)).map(function() { return Math.floor(Math.random() * 50 % 50); })
const attackRow2: Row = Array.apply(null, Array(3)).map(function() { return Math.floor(Math.random() * 50 % 50); })
const attackRow3: Row = Array.apply(null, Array(3)).map(function() { return Math.floor(Math.random() * 50 % 50); })
const attackBoard: Board = [ attackRow1, attackRow2, attackRow3 ]

// const emptyRow: Row = [null, null, null]
// const emptyBoard: Board = [ emptyRow, emptyRow, emptyRow ]

@Entity()
export class Game extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @Column('json', {default: attackBoard})
  //@Column('json', {default: emptyBoard})
  board: Board

  @Column('char', {length:1, default: 'x'})
  turn: Symbol

  @Column('char', {length:1, nullable: true})
  winner: Symbol  
  
  @Column('text', {default: 'pending'})
  status: Status

  // this is a relation, read more about them here:
  // http://typeorm.io/#/many-to-one-one-to-many-relations
  @OneToMany(_ => Player, player => player.game, {eager:true})
  players: Player[]
}

@Entity()
@Index(['game', 'user', 'symbol'], {unique:true})
export class Player extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @ManyToOne(_ => User, user => user.players)
  user: User

  @ManyToOne(_ => Game, game => game.players)
  game: Game

  // @Column()
  // userId: number

  @Column('char', {length: 1})
  symbol: Symbol

  @Column('int',{default: 100})
  health: number

  @Column('int', {default: 0})
  attack: number
}
