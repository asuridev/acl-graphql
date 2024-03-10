import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CountriesModule } from './countries/countries.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';


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
    CacheModule.registerAsync({
      isGlobal:true,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        store: await redisStore({
          ttl:configService.get('CACHE_TTL'),
          socket:{
            host:configService.get('REDIS_URL'),
            port:configService.get('REDIS_PORT')
          }
        }),
      }),
    }),
    CountriesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule  {}
