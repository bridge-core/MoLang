import { Parser } from '../parse'
import { TToken } from '../../tokenizer/token'
import { IPrefixParselet } from './prefix'
import { IExpression } from '../expression'
import { ForEachExpression } from '../expressions/forEach'

export class ForEachParselet implements IPrefixParselet {
	constructor(public precedence = 0) {}

	parse(parser: Parser, token: TToken) {
		parser.consume('LEFT_PARENT')
		const args: IExpression[] = []

		if (parser.match('RIGHT_PARENT'))
			throw new Error(`for_each() called without arguments`)

		do {
			args.push(parser.parseExpression())
		} while (parser.match('COMMA'))
		parser.consume('RIGHT_PARENT')

		if (args.length !== 3)
			throw new Error(
				`There must be exactly three loop() arguments; found ${args.length}`
			)

		return new ForEachExpression(args[0], args[1], args[2])
	}
}