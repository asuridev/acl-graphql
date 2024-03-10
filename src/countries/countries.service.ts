import { IsoCode } from './dtos/args/iso-code.args';
import { Country } from './entities/country.entity';
import { FetchCountryService } from './fetch-country.service';
import { Injectable } from '@nestjs/common';


@Injectable()
export class CountriesService {

  constructor(private readonly fetchCountryService: FetchCountryService) {}

  async findContryByCode(isoCode: IsoCode):Promise<Country> {
    const { code } = isoCode;
    const codeUpperCase = code.toUpperCase();
    return await this.fetchCountryService.fetchCountryInfo(codeUpperCase);
  }

}
