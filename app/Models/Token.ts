/* eslint-disable */
import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Token extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public user_id: Number

  @column()
  public name: string

  @column()
  public token: string

  @column()
  public type: string

  @column.dateTime()
  public expires_at: DateTime

  @column.dateTime({ autoCreate: true })
  public created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updated_at: DateTime

}
