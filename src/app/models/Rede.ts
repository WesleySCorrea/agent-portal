export interface Rede {
    id: number,
    rede: string,
    cnpj: string,
    mercados: Mercado[],
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