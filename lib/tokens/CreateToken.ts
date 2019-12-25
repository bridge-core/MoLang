import { Group } from "./Group";
import { Ternary } from "./Ternary";
import { NumberToken } from "./Number";
import { StringToken } from "./String";

export class CreateToken {
    private static tokens = [
        Group,
        Ternary,

        NumberToken,
        StringToken
    ];

    static create(str: string) {
        for(let T of this.tokens) {
            if(T.is(str)) return new T(str);
        }
            
        
        throw new Error(`Unable to match expression "${str}" to token type.`);
    }
}