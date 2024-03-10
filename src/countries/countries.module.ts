import { Module } from '@nestjs/common';
import { SoapModule, SoapModuleOptionsFactoryType } from 'nestjs-soap';
import { CountriesResolver } from './countries.resolver';
import { CountriesService } from './countries.service';
import { FetchCountryService } from './fetch-country.service';
import {  ConfigService } from '@nestjs/config';

@Module({
  imports: [
    SoapModule.forRootAsync(
      { 
        clientName:'countrySOAP',
        inject: [ConfigService],
        useFactory: async (
          configService: ConfigService,
        ): Promise<SoapModuleOptionsFactoryType> => ({
          uri: configService.get('URL_COUNTRIES')
        }),        
      }
    ),

  ],
  controllers: [],
  providers: [
    CountriesResolver, 
    CountriesService,
    FetchCountryService
  ],
})
export class CountriesModule {}
