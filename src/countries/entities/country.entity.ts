import { Field, ObjectType } from '@nestjs/graphql';

export class CountryResponse {
  FullCountryInfoResult: Country;
}

@ObjectType()
export class Languages {
  @Field(() => [TLanguage])
  tLanguage: TLanguage[];
}

@ObjectType()
export class TLanguage {
  @Field(() => String)
  sISOCode: string;

  @Field(() => String)
  sName: string;
}

@ObjectType()
export class Country {
  @Field(() => String)
  sISOCode: string;

  @Field(() => String)
  sName: string;

  @Field(() => String)
  sCapitalCity: string;

  @Field(() => String)
  sPhoneCode: string;

  @Field(() => String)
  sContinentCode: string;

  @Field(() => String)
  sCurrencyISOCode: string;

  @Field(() => String)
  sCountryFlag: string;

  @Field(() => Languages)
  Languages: Languages;
}
