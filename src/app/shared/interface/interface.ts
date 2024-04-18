  export interface SearchResponse {
    status:                boolean;
    simbologia:            any[];
    obras?:                 Obra[];
    Pavimentación:         Alumbrado;
    Alumbrado:             Alumbrado;
    "Drenaje Sanitario":   Alumbrado;
    Edificación:           Alumbrado;
    Electrificación:       Alumbrado;
    Mercados:              Alumbrado;
    "Muro de Contención":  Alumbrado;
    Panteones:             Alumbrado;
    "Parques y Jardínes":  Alumbrado;
    Puentes:               Alumbrado;
    "Red de Agua Potable": Alumbrado;
    "Relleno Sanitario":   Alumbrado;
    "Señalamiento Vial":   Alumbrado;
    "Techado en escuela":  Alumbrado;
    obras_avance_inicial:  number;
    obras_avance_1_50:     number;
    obras_avance_51_99:    number;
    obras_avance_100:      number;
    obras_terminadas:      number;
    obras_contratadas:     number;
    obras_tripartita:      number;
    obras_acciones:        number;
    obras_concluidas:      number;
    obras_proceso:         number;
    obras_iniciar:         number;
    obras_sin_iniciar:     number;
    obras_suspendidas:     number;
    obras_canceladas:      number;
    obras_recision:        number;
}

export interface Alumbrado {
    Terminada:     number;
    "En proceso":  number;
    "Por iniciar": number;
    Suspendida:    number;
    Cancelada:     number;
    "En recisión": number;
    "Sin iniciar": number;
    rango0:        Rango;
    rango1:        Rango;
    rango2:        Rango;
    rango3:        Rango;
    rango4:        Rango;
}

export interface Rango {
    Terminada:     number;
    "En proceso":  number;
    "Por iniciar": number;
    Suspendida:    number;
    Cancelada:     number;
    "En recisión": number;
    "Sin iniciar": number;
}

export interface Obra {
    id:                    number;
    num_obra:              string;
    numero_paquete:        Array<number | string> | boolean;
    pertenece_a:           PerteneceA;
    geojson:               string;
    estado_obra:           EstadoObra;
    estado_administrativo: EstadoAdministrativo;
    situacion_obra:        SituacionObra;
    detalle:               string;
    descripcion:           string;
    anio:                  string;
    fecha_inicio:          Date;
    fecha_termino:         Date;
    area:                  boolean;
    longitud:              boolean;
    sector:                Sector;
    region:                boolean | RegionEnum;
    simbologia_ids:        Array<number | string>;
    simbologia_ids2:       number[];
    simbologia_nombres:    string;
    colonia_nombres:       string;
    domicilio:             string;
    entre_calles:          boolean | string;
    colonia:               number[];
    porcentaje_avance:     number;
    obras_ids:             any[];
    fotografias_id:        FotografiasID[];
    simbologia:            string;
}

export enum EstadoAdministrativo {
    Cerrado = "Cerrado",
    EnProceso = "En proceso",
}

export enum EstadoObra {
    Oc = "OC",
    Ot = "OT",
    Ott = "OTT",
}

export interface FotografiasID {
    url:  string;
    tipo: Tipo;
}

export enum Tipo {
    A = "A",
    D = "D",
}

export enum PerteneceA {
    Ayto = "ayto",
}

export enum RegionEnum {
    A = "A",
    B = "B",
    C = "C",
}

export enum Sector {
    C = "C",
    CR = "CR",
    N = "N",
    O = "O",
    P = "P",
    S = "S",
    V = "V",
}

export enum SituacionObra {
    EnProceso = "En proceso",
    Terminada = "Terminada",
}


