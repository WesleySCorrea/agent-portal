import { MercadoDTO } from "./Mercado";

export interface RedeDTO {
    id: number | null,
    rede: string,
    cnpj: string,
    mercados: MercadoDTO[],
}

export interface CreateRedeDTO {
    rede: string,
    cnpj: string,
}

export interface Pdv {
    id: string,
    pdv_name: string,
    agent_adress: string,
    sistema: string,
    versao: string,
    mercado_id: string,
}