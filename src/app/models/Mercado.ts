import { PdvDTO } from "./Pdv";

export interface MercadoDTO {
    id: number,
    mercado: string,
    cnpj: string,
    rede_id: number,
    pdvs: PdvDTO[],
}

export interface CreateMercadoDTO {
    mercado: string,
    cnpj: string,
    rede_id: number,
}