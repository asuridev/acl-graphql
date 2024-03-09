import { ArgsType, Field } from "@nestjs/graphql";
import {  IsString, Length } from "class-validator";

@ArgsType()
export class IsoCode {

    @Field(()=>String,{ nullable:false })
    @IsString()
    @Length(2, 2)
    code:string
}