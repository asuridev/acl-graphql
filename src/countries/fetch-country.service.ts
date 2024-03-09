import { Inject, Injectable } from '@nestjs/common';
import { Client } from 'nestjs-soap';
import { CountryResponse } from './entities/country.entity';

@Injectable()
export class FetchCountryService {

  constructor(@Inject('countrySOAP') private readonly countrySOAP: Client) {}
    
  async FullCountryInfoAsync(code: string) {
    return new Promise((resolve, reject) => {
      this.countrySOAP.FullCountryInfo(
        { sCountryISOCode: code },
        (err: CountryResponse, res: CountryResponse) => {
          if (err !== null) reject(err);
          else resolve(res.FullCountryInfoResult);
        },
      );
    });
  }

}
