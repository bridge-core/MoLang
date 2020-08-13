export const TokenTypes = new Map<string, string>([
	['==', 'EQUALS'],
	['!=', 'NOT_EQUALS'],
	['??', 'NULLISH_COALESCING'],
	['&&', 'AND'],
	['||', 'OR'],
	['>=', 'GREATER_OR_EQUALS'],
	['<=', 'SMALLER_OR_EQUALS'],

	['>', 'GREATER'],
	['<', 'SMALLER'],
	['(', 'LEFT_PARENT'],
	[')', 'RIGHT_PARENT'],
	['[', 'ARRAY_LEFT'],
	[']', 'ARRAY_RIGHT'],
	[',', 'COMMA'],
	['=', 'ASSIGN'],
	['+', 'PLUS'],
	['-', 'MINUS'],
	['*', 'ASTERISK'],
	['/', 'SLASH'],
	['?', 'QUESTION'],
	[':', 'COLON'],
	[';', 'SEMICOLON'],
	['!', 'BANG'],
])

export const KeywordTokens = new Set(['return'])
