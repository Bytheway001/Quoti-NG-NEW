/** Component Types */
export type IComparador ={

}

export type CompareTable={

}

export type Sidebar = {
    selectedPlans:any[]
}
/** Context and Data */
export type IContext = {
    planNames:any,
    compareActions:any,
    comparativo:ICompare|null,
    loading:boolean
}

export type ICompare = {
    benefits:IBenefitName[]
    categories:ICategory[],
    plans:IPlan[]
}

export type ICategory ={
    id:number,
    category_name:string
}

export type IPlan={
    name:string
    benefits:IBenefit[]
}

type IBenefitName={
    id:number,
    name:string,
    category_id:number
}

export type IBenefit = {
    name:string,
    category_id:number,
    description:string
}


