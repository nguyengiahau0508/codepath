import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Language } from "./entities/languages.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Language])
  ]
})
export class ReferenceModule { }
