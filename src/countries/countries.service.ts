import { IsoCode } from './dtos/args/iso-code.args';
import { FetchCountryService } from './fetch-country.service';
import { Injectable, NotFoundException } from '@nestjs/common';


@Injectable()
export class CountriesService {
  constructor(private readonly fetchCountryService:FetchCountryService) {}

  async findContryByCode( isoCode :IsoCode) {
    const { code } = isoCode;
    try {
      return await this.fetchCountryService.FullCountryInfoAsync(code.toUpperCase());
    } catch (error) {
      throw new NotFoundException();
    }
  }
}
