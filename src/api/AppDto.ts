import React from "react";

export interface TableHeaderProps{
    readonly header: string;
    readonly access: string;
    readonly cell?: (value: any) => void;
    readonly width: number;
}