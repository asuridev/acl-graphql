import { Args, Query, Resolver } from '@nestjs/graphql';
import { Country } from './entities/country.entity';
import { CountriesService } from './countries.service';
import { IsoCode } from './dtos/args/iso-code.args';

@Resolver()
export class CountriesResolver {
  constructor(private readonly countriesService: CountriesService) {}

  @Query(() => Country, { name: 'country' })
  infoCountries(@Args() isoCode:IsoCode) {
    return this.countriesService.findContryByCode(isoCode);
  }
  
}
