


export type Unit = string;
export type NotateKey = string;
export type ConvertorData = {
    abbreviation: Record<Unit, string>;
    button_name: Record<Unit, string>;
    convertation: Record<Unit, Record<string,number>>;
    notate:Record<NotateKey, string>
}

export type BaseData = {
    weight: ConvertorData;
    currency: ConvertorData;
    length: ConvertorData;
    
}

