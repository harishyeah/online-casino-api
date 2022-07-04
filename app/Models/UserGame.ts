import { DateTime } from 'luxon'

import { column, BaseModel } from '@ioc:Adonis/Lucid/Orm'

export default class UserGame extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public user_id: number

  @column()
  public winning: number

  @column()
  public reward: number

  @column()
  public remaining_credits: number

  @column()
  public slot: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
