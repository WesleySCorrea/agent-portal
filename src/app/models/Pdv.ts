export interface PdvDTO {
    id: number,
    pdv_name: string,
    agent_adress: string,
    sistema: string,
    versao: string,
    mercado_id: number,
}

export interface CreatePdvDTO {
    pdv_name: string,
    agent_adress: string,
    sistema: string,
    versao: string
    mercado_id: number
}