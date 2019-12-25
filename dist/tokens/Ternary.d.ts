import { Token } from "./Token";
export declare class Ternary extends Token<Token<unknown>[]> {
    token_type: string;
    private data;
    constructor(str: string);
    readonly token_data: Token<unknown>[];
    static is(str: string): boolean;
}
