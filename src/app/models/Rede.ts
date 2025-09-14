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