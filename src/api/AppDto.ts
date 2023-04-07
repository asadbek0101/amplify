
export interface TableHeaderProps{
    readonly header: string;
    readonly access: string;
    readonly cell?: (value: any) => void;
    readonly width: number;
}

export interface IdProps{
    readonly id: number;
}
