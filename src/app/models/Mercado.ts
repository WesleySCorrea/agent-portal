import { Pdv } from "./Rede";

export interface MercadoDTO {
    id: number,
    mercado: string,
    cnpj: string,
    rede_id: number,
    pdvs: Pdv[],
}

export interface CreateMercadoDTO {
    mercado: string,
    cnpj: string,
    rede_id: number,
}