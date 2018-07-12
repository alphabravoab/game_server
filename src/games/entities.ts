import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, Index, OneToMany, ManyToOne } from 'typeorm'
import User from '../users/entity'
import { IsString } from 'class-validator';

export type Symbol = 'x' | 'o'

type Status = 'pending' | 'started' | 'finished'


@Entity()
export class Game extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number


  @Column('char', {length:1, default: 'x'})
  turn: Symbol


  @IsString()
  @Column('text', {nullable:true})
  winner: String
  
  
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

  @Column()
  userId: number

  @Column('char', {length: 1})
  symbol: Symbol

  @Column('int',{default:100})
  health: number

  // @Column('int', {default:15})
  // attack: number
}
