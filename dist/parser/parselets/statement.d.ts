import { Parser } from '../parse';
import { IExpression } from '../expression';
import { Token } from '../../tokenizer/token';
import { IInfixParselet } from './infix';
import { StatementExpression } from '../expressions/statement';
export declare class StatementParselet implements IInfixParselet {
    precedence: number;
    constructor(precedence?: number);
    parse(parser: Parser, left: IExpression, token: Token): IExpression | StatementExpression;
}
