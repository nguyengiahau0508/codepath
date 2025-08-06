import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { config } from '@codepath/config'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: config.database.host,
      port: config.database.port,
      username: config.database.username,
      password: config.database.password,
      database: config.database.name,
      synchronize: true,
      autoLoadEntities: true
    })
  ]
})
export class DatabaseModule {
}
