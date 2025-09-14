export interface CommandHistory {
    id: number;
    agentAddress: string;
    command: string;
    status: string;
    createdAt: string;
    finishedAt?: string;
    usuario: string;
}