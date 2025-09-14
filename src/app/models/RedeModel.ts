export interface RedeDTO {
    id: number | null,
    rede: string,
    cnpj: string,
    mercados: Mercado[],
}

export interface CreateRedeDTO {
    rede: string,
    cnpj: string,
}

export interface Mercado {
    id: number,
    mercado: string,
    cnpj: string,
    rede_id: number,
    pdvs: Pdv[],
}

export interface Pdv {
    id: string,
    pdv_name: string,
    agent_adress: string,
    sistema: string,
    versao: string,
    mercado_id: string,
}