import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CountriesModule } from './countries/countries.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      //playground: false,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql')
    }),
    CountriesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
