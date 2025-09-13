export interface FileInfo {
    host: string,
    os: string,
    timestamp: string,
    command: string,
    path: string,
    entries: Entrie[],
    content?: string,
    status?: string,
    message?: string,
}

export interface Entrie {
    name: string;
    path: string;
    is_dir: boolean;
    is_file: boolean;
    is_symlink: boolean;
    ext: string;
    mime?: string;
    size?: number;
    created?: string;
    modified?: string;
    accessed?: string;
    hidden?: boolean;
    system?: boolean;
}