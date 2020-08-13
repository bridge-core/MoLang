import { TTokenType } from '../../tokenizer/token'
import { IExpression } from '../expression'
import { ReturnExpression } from './return'

export class StatementExpression {
	constructor(protected expressions: IExpression[]) {}

	isStatic() {
		let i = 0
		while (i < this.expressions.length) {
			if (!this.expressions[i].isStatic()) return false
			i++
		}
		return true
	}

	eval() {
		let i = 0
		while (i < this.expressions.length) {
			let res = this.expressions[i].eval()
			if (
				this.expressions[i].isReturn ||
				this.expressions[i] instanceof ReturnExpression
			)
				return res
			i++
		}
		return 0
	}

	getExpression() {
		return this.expressions[0]
	}
}