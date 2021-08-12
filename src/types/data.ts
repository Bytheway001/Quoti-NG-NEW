


export interface IPlanForCompare{
    name:string,
    quote_type:string
}

export type typeAheadOption={
    value:string,
    label:string
}

export type planBenefit={
    name:string,
    benefits:benefitType[]
}
export type benefitType={
    name:string,
    desc:string,
    category:string
}
export type benefitDesc={
    name:string,
    category:string
}
export type compareData={
    categories:string[],
    benefits:benefitDesc[],
    plans:planBenefit[]
}

/** QUote types  */

export interface IQuote{
    plans:Plan[],
    params?:{
        main_age?:number,
        plan_type?:number,
        country:string
    }
}

export type Plan={
    name:string,
    company:string,
    rates:Rate[],
    extra_params:{
        coverage:string
    }
}


type RateShape={
    [key:string]:number,
    yearly:number,
    biyearly:number
}

type ConfigShape={
    selected:boolean|number,
    avaliable:boolean|number
}

export type Rate = {
    deductible:number,
    deductible_out:number,
    main_price:RateShape,
    couple_price:RateShape|null,
    kids_price:RateShape|null
    riders:Rider[]
}

export type Rider ={
    name:string,
    price:number,
    config:ConfigShape
}

export type ComparePlan={
    coverage:string,
    company:string,
    name:string,
    rate:Rate,
    deductible:number
}

