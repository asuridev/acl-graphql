import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Client } from 'nestjs-soap';
import { Country, CountryResponse } from './entities/country.entity';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';

@Injectable()
export class FetchCountryService {
  constructor(
    @Inject('countrySOAP') private readonly countrySoapClient: Client,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  async fetchCountryInfo(code: string):Promise<Country> {
    const responseRedis = await this.cacheManager.get<Country>(code);
    if (responseRedis) return responseRedis;
    try {
      const responseSoapService = await this.fetchSoapServiceCountryInfo(code);
      this.cacheManager.set(code, responseSoapService);
      return responseSoapService;
    } catch (error) {
      throw new NotFoundException();
    }
  }

  private async fetchSoapServiceCountryInfo(code: string):Promise<Country> {
    return new Promise((resolve, reject) => {
      this.countrySoapClient.FullCountryInfo(
        { sCountryISOCode: code },
        (err: CountryResponse, res: CountryResponse) => {
          if (err !== null) reject(err);
          else resolve(res.FullCountryInfoResult);
        },
      );
    });
  }

}
