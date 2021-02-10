var MoLang=function(e){"use strict";const t={"!":"BANG","!=":"NOT_EQUALS","&&":"AND","(":"LEFT_PARENT",")":"RIGHT_PARENT","*":"ASTERISK","+":"PLUS",",":"COMMA","-":"MINUS","/":"SLASH",":":"COLON",";":"SEMICOLON","<":"SMALLER","<=":"SMALLER_OR_EQUALS","=":"ASSIGN","==":"EQUALS",">":"GREATER",">=":"GREATER_OR_EQUALS","?":"QUESTION","??":"NULLISH_COALESCING","[":"ARRAY_LEFT","]":"ARRAY_RIGHT","{":"CURLY_LEFT","||":"OR","}":"CURLY_RIGHT"},s=new Set(["return","continue","break","for_each","loop","false","true"]);class r{constructor(e,t,s,r){this.type=e,this.text=t,this.startColumn=s,this.startLine=r}getType(){return this.type}getText(){return this.text}getPosition(){return{startColumn:this.startColumn,startLineNumber:this.startLine,endColumn:this.startLine+this.text.length,endLineNumber:this.startLine}}}class i{constructor(e){this.i=0,this.currentColumn=0,this.currentLine=0,this.keywordTokens=e?new Set([...s,...e]):s}init(e){this.currentLine=0,this.currentColumn=0,this.i=0,this.expression=e}next(){for(;this.i<this.expression.length;){let e=this.i+1<this.expression.length?t[this.expression[this.i]+this.expression[this.i+1]]:void 0;if(e)return this.i++,new r(e,this.expression[this.i-1]+this.expression[this.i++],this.currentColumn,this.currentLine);if(e=t[this.expression[this.i]],e)return new r(e,this.expression[this.i++],this.currentColumn,this.currentLine);if("'"===this.expression[this.i]){let e=this.i+1;for(;e<this.expression.length&&"'"!==this.expression[e];)e++;e++;const t=new r("STRING",this.expression.substring(this.i,e),this.currentColumn,this.currentLine);return this.i=e,t}if(this.isLetter(this.expression[this.i])){let e=this.i+1;for(;e<this.expression.length&&(this.isLetter(this.expression[e])||this.isNumber(this.expression[e])||"_"===this.expression[e]||"."===this.expression[e]);)e++;const t=this.expression.substring(this.i,e).toLowerCase();return this.i=e,new r(this.keywordTokens.has(t)?t.toUpperCase():"NAME",t,this.currentColumn,this.currentLine)}if(this.isNumber(this.expression[this.i])){let e=this.i+1,t=!1;for(;e<this.expression.length&&(this.isNumber(this.expression[e])||"."===this.expression[e]&&!t);)"."===this.expression[e]&&(t=!0),e++;const s=new r("NUMBER",this.expression.substring(this.i,e),this.currentColumn,this.currentLine);return this.i=e,s}"\n"===this.expression[this.i]&&(this.currentLine++,this.currentColumn=0),this.i++,this.currentColumn++}return new r("EOF","",this.currentColumn,this.currentLine)}hasNext(){return this.i<this.expression.length}isLetter(e){return e>="a"&&e<="z"||e>="A"&&e<="Z"}isNumber(e){return e>="0"&&e<="9"}}class n{}class o extends n{constructor(e){super(),this.value=e,this.type="NumberExpression"}isStatic(){return!0}eval(){return this.value}}class a extends n{constructor(e,t,s){super(),this.left=e,this.right=t,this.evalHelper=s,this.type="GenericOperatorExpression"}isStatic(){return this.left.isStatic()&&this.right.isStatic()}eval(){return this.evalHelper()}}class h{constructor(e=0){this.precedence=e}parse(e,t,s){const r=e.parseExpression(this.precedence);switch(s.getText()){case"+":return new a(t,r,()=>{const e=t.eval(),i=r.eval();if("number"!=typeof e&&"boolean"!=typeof e||"number"!=typeof i&&"boolean"!=typeof i)throw new Error(`Cannot use numeric operators for expression "${e} ${s.getText()} ${i}"`);return e+i});case"-":return new a(t,r,()=>{const e=t.eval(),i=r.eval();if("number"!=typeof e&&"boolean"!=typeof e||"number"!=typeof i&&"boolean"!=typeof i)throw new Error(`Cannot use numeric operators for expression "${e} ${s.getText()} ${i}"`);return e-i});case"*":return new a(t,r,()=>{const e=t.eval(),i=r.eval();if("number"!=typeof e&&"boolean"!=typeof e||"number"!=typeof i&&"boolean"!=typeof i)throw new Error(`Cannot use numeric operators for expression "${e} ${s.getText()} ${i}"`);return e*i});case"/":return new a(t,r,()=>{const e=t.eval(),i=r.eval();if("number"!=typeof e&&"boolean"!=typeof e||"number"!=typeof i&&"boolean"!=typeof i)throw new Error(`Cannot use numeric operators for expression "${e} ${s.getText()} ${i}"`);return e/i});case"&&":return new a(t,r,()=>t.eval()&&r.eval());case"||":return new a(t,r,()=>t.eval()||r.eval());case"<":return new a(t,r,()=>t.eval()<r.eval());case"<=":return new a(t,r,()=>t.eval()<=r.eval());case">":return new a(t,r,()=>t.eval()>r.eval());case">=":return new a(t,r,()=>t.eval()>=r.eval());case"==":return new a(t,r,()=>t.eval()===r.eval());case"!=":return new a(t,r,()=>t.eval()!==r.eval());case"??":return new a(t,r,()=>t.eval()??r.eval());case"=":return new a(t,r,()=>{if(t.setPointer)return t.setPointer(r.eval()),0;throw Error("Cannot assign to "+t.type)});default:throw new Error("Operator not implemented")}}}var c;!function(e){e[e.SCOPE=1]="SCOPE",e[e.STATEMENT=2]="STATEMENT",e[e.PROPERTY_ACCESS=3]="PROPERTY_ACCESS",e[e.ARRAY_ACCESS=4]="ARRAY_ACCESS",e[e.ASSIGNMENT=5]="ASSIGNMENT",e[e.CONDITIONAL=6]="CONDITIONAL",e[e.NULLISH_COALESCING=7]="NULLISH_COALESCING",e[e.AND=8]="AND",e[e.OR=9]="OR",e[e.COMPARE=10]="COMPARE",e[e.SUM=11]="SUM",e[e.PRODUCT=12]="PRODUCT",e[e.EXPONENT=13]="EXPONENT",e[e.PREFIX=14]="PREFIX",e[e.POSTFIX=15]="POSTFIX",e[e.FUNCTION=16]="FUNCTION"}(c||(c={}));class u extends n{constructor(e,t){super(),this.tokenType=e,this.expression=t,this.type="PrefixExpression"}isStatic(){return this.expression.isStatic()}eval(){const e=this.expression.eval();switch(this.tokenType){case"MINUS":if("number"!=typeof e)throw new Error(`Cannot use "-" operator in front of ${typeof e}: "-${e}"`);return-e;case"BANG":if("string"==typeof e)throw new Error(`Cannot use "!" operator in front of string: "!${e}"`);return!e}}}class p{constructor(e=0){this.precedence=e}parse(e,t){return new u(t.getType(),e.parseExpression(this.precedence))}}class l{constructor(e=0){this.precedence=e}parse(e,t){return new o(Number(t.getText()))}}class x extends n{constructor(e,t,s=!1){super(),this.env=e,this.name=t,this.isFunctionCall=s,this.type="NameExpression"}isStatic(){return!1}setPointer(e){this.env.setAt(this.name,e)}setFunctionCall(e=!0){this.isFunctionCall=e}getAsString(){return this.name}eval(){const e=this.env.getFrom(this.name);return this.isFunctionCall||"function"!=typeof e?e:e()}}class E{constructor(e=0){this.precedence=e}parse(e,t){return new x(e.executionEnv,t.getText())}}class f{constructor(e=0){this.precedence=e}parse(e,t){const s=e.parseExpression(this.precedence);return e.consume("RIGHT_PARENT"),s}}class g extends n{constructor(e,t,s){super(),this.leftExpression=e,this.thenExpression=t,this.elseExpression=s,this.type="TernaryExpression"}get isReturn(){return this.leftResult?this.thenExpression.isReturn:this.elseExpression.isReturn}get isContinue(){return this.leftResult?this.thenExpression.isContinue:this.elseExpression.isContinue}get isBreak(){return this.leftResult?this.thenExpression.isBreak:this.elseExpression.isBreak}isStatic(){return this.leftExpression.isStatic()&&this.thenExpression.isStatic()&&this.elseExpression.isStatic()}eval(){return this.leftResult=this.leftExpression.eval(),this.leftResult?this.thenExpression.eval():this.elseExpression.eval()}}class m{constructor(e=0){this.precedence=e,this.exprName="Ternary"}parse(e,t,s){let r,i=e.parseExpression(this.precedence-1);return r=e.match("COLON")?e.parseExpression(this.precedence-1):new o(0),new g(t,i,r)}}class w extends n{constructor(e){super(),this.expression=e,this.type="ReturnExpression",this.isReturn=!0}isStatic(){return!1}eval(){return this.expression.eval()}}class R{constructor(e=0){this.precedence=e}parse(e,t){const s=e.parseExpression(c.STATEMENT);return new w(e.match("SEMICOLON")?s:new o(0))}}class S extends n{constructor(e){super(),this.expressions=e,this.type="StatementExpression",this.didReturn=!1,this.wasLoopBroken=!1,this.wasLoopContinued=!1}get isReturn(){return this.didReturn}get isBreak(){return!!this.wasLoopBroken&&(this.wasLoopBroken=!1,!0)}get isContinue(){return!!this.wasLoopContinued&&(this.wasLoopContinued=!1,!0)}isStatic(){let e=0;for(;e<this.expressions.length;){if(!this.expressions[e].isStatic())return!1;e++}return!0}eval(){this.didReturn=!1,this.wasLoopBroken=!1,this.wasLoopContinued=!1;let e=0;for(;e<this.expressions.length;){let t=this.expressions[e].eval();if(this.expressions[e].isReturn)return this.didReturn=!0,t;if(this.expressions[e].isContinue)return void(this.wasLoopContinued=!0);if(this.expressions[e].isBreak)return void(this.wasLoopBroken=!0);e++}return 0}getExpression(){return this.expressions[0]}}class C extends n{constructor(e,t=!1){super(),this.value=e,this.isReturn=t,this.type="StaticExpression"}isStatic(){return!0}eval(){return this.value}}class v{constructor(e=0){this.precedence=e}parse(e,t,s){if(e.useOptimizer&&(t.isStatic()&&(t=new C(t.eval(),t.isReturn)),t.isReturn))return t;let r,i=[t];do{if(r=e.parseExpression(this.precedence),e.useOptimizer){if(r.isStatic()){if(!r.isReturn&&e.agressiveStaticOptimizer)continue;r=new C(r.eval(),r.isReturn)}if(r.isReturn){i.push(r);break}}i.push(r)}while(e.match("SEMICOLON")||r.isReturn);return new S(i)}}class T extends n{constructor(e){super(),this.name=e,this.type="StringExpression"}isStatic(){return!0}eval(){return this.name.substring(1,this.name.length-1)}}class d{constructor(e=0){this.precedence=e}parse(e,t){return new T(t.getText())}}class A extends n{constructor(e,t){super(),this.name=e,this.args=t,this.type="FunctionExpression"}isStatic(){return!1}eval(){const e=[];let t=0;for(;t<this.args.length;)e.push(this.args[t++].eval());const s=this.name.eval();if("function"!=typeof s)throw new Error(this.name.getAsString()+" is not callable!");return s(...e)}}class N{constructor(e=0){this.precedence=e}parse(e,t,s){const r=[];if(!t.setFunctionCall)throw new Error(t.type+" is not callable!");if(t.setFunctionCall(!0),!e.match("RIGHT_PARENT")){do{r.push(e.parseExpression())}while(e.match("COMMA"));e.consume("RIGHT_PARENT")}return new A(t,r)}}class L extends n{constructor(e,t){super(),this.name=e,this.lookup=t,this.type="ArrayAccessExpression"}isStatic(){return!1}setPointer(e){this.name.eval()[this.lookup.eval()]=e}eval(){return this.name.eval()[this.lookup.eval()]}}class O{constructor(e=0){this.precedence=e}parse(e,t,s){const r=e.parseExpression(this.precedence-1);if(!t.setPointer)throw new Error(`"${t.eval()}" is not an array`);if(!e.match("ARRAY_RIGHT"))throw new Error(`No closing bracket for opening bracket "[${r.eval()}"`);return new L(t,r)}}class I{constructor(e=0){this.precedence=e}parse(e,t){let s,r=!1,i=[];do{if(e.match("CURLY_RIGHT")){r=!0;break}if(s=e.parseExpression(c.STATEMENT),e.useOptimizer&&(s.isStatic()&&(s=new C(s.eval(),s.isReturn)),s.isReturn)){i.push(s);break}i.push(s)}while(e.match("SEMICOLON")||s.isReturn);if(!r&&!e.match("CURLY_RIGHT"))throw new Error("Missing closing curly bracket");return new S(i)}}class P extends n{constructor(e,t){super(),this.count=e,this.expression=t,this.type="LoopExpression"}get isReturn(){return this.expression.isReturn}isStatic(){return this.count.isStatic()&&this.expression.isStatic()}eval(){const e=Number(this.count.eval());if(Number.isNaN(e))throw new Error(`First loop() argument must be of type number, received "${typeof this.count.eval()}"`);if(e>1024)throw new Error(`Cannot loop more than 1024x times, received "${e}"`);let t=0;for(;t<e;){t++;const e=this.expression.eval();if(this.expression.isBreak)break;if(!this.expression.isContinue&&this.expression.isReturn)return e}return 0}}class b{constructor(e=0){this.precedence=e}parse(e,t){e.consume("LEFT_PARENT");const s=[];if(e.match("RIGHT_PARENT"))throw new Error("loop() called without arguments");do{s.push(e.parseExpression())}while(e.match("COMMA"));if(e.consume("RIGHT_PARENT"),2!==s.length)throw new Error("There must be exactly two loop() arguments; found "+s.length);return new P(s[0],s[1])}}class y extends n{constructor(e,t,s){if(super(),this.variable=e,this.arrayExpression=t,this.expression=s,this.type="ForEachExpression",!this.variable.setPointer)throw new Error(`First for_each() argument must be a variable, received "${typeof this.variable.eval()}"`)}get isReturn(){return this.expression.isReturn}isStatic(){return this.variable.isStatic()&&this.arrayExpression.isStatic()&&this.expression.isStatic()}eval(){const e=this.arrayExpression.eval();if(!Array.isArray(e))throw new Error(`Second for_each() argument must be an array, received "${typeof e}"`);let t=0;for(;t<e.length;){this.variable.setPointer(e[t++]);const s=this.expression.eval();if(this.expression.isBreak)break;if(!this.expression.isContinue&&this.expression.isReturn)return s}return 0}}class M{constructor(e=0){this.precedence=e}parse(e,t){e.consume("LEFT_PARENT");const s=[];if(e.match("RIGHT_PARENT"))throw new Error("for_each() called without arguments");do{s.push(e.parseExpression())}while(e.match("COMMA"));if(e.consume("RIGHT_PARENT"),3!==s.length)throw new Error("There must be exactly three for_each() arguments; found "+s.length);return new y(s[0],s[1],s[2])}}class k extends n{constructor(){super(),this.type="ContinueExpression",this.isContinue=!0}isStatic(){return!1}eval(){return 0}}class _{constructor(e=0){this.precedence=e}parse(e,t){return new k}}class U extends n{constructor(){super(),this.type="BreakExpression",this.isBreak=!0}isStatic(){return!1}eval(){return 0}}class F{constructor(e=0){this.precedence=e}parse(e,t){return new U}}class G extends n{constructor(e){super(),this.value=e,this.type="BooleanExpression"}isStatic(){return!0}eval(){return this.value}}class ${constructor(e=0){this.precedence=e}parse(e,t){return new G("true"===t.getText())}}class H extends class{constructor(e=!1,t=!0,s=!1){this.useOptimizer=e,this.agressiveStaticOptimizer=t,this.partialResolveOnParse=s,this.prefixParselets=new Map,this.infixParselets=new Map,this.readTokens=[],this.lastConsumed=new r("SOF","",0,0),this.tokenIterator=new i}updateConfig(e,t,s){void 0!==e&&(this.useOptimizer=e),void 0!==t&&(this.agressiveStaticOptimizer=t),void 0!==s&&(this.partialResolveOnParse=s)}init(e){this.tokenIterator.init(e),this.lastConsumed=new r("SOF","",0,0),this.readTokens=[]}setTokenizer(e){this.tokenIterator=e}setExecutionEnvironment(e){this.executionEnv=e}parseExpression(e=0){let t=this.consume();if("EOF"===t.getType())return new o(0);const s=this.prefixParselets.get(t.getType());if(!s)throw new Error(`Cannot parse ${t.getType()} expression "${t.getType()}"`);let r=s.parse(this,t);return r.isReturn?r:this.parseInfixExpression(r,e)}parseInfixExpression(e,t=0){let s;for(;t<this.getPrecedence();){s=this.consume();e=this.infixParselets.get(s.getType()).parse(this,e,s)}return e}getPrecedence(){const e=this.infixParselets.get(this.lookAhead(0)?.getType());return e?.precedence??0}getLastConsumed(){return this.lastConsumed}consume(e){const t=this.lookAhead(0);if(e){if(t.getType()!==e)throw new Error(`Expected token "${e}" and found "${t.getType()}"`);this.consume()}return this.lastConsumed=this.readTokens.pop(),this.lastConsumed}match(e,t=!0){return this.lookAhead(0).getType()===e&&(t&&this.consume(),!0)}lookAhead(e){for(;e>=this.readTokens.length;)this.readTokens.push(this.tokenIterator.next());return this.readTokens[e]}registerInfix(e,t){this.infixParselets.set(e,t)}registerPrefix(e,t){this.prefixParselets.set(e,t)}getInfix(e){return this.infixParselets.get(e)}getPrefix(e){return this.prefixParselets.get(e)}}{constructor(e=!0,t=!0){super(e,t),this.registerPrefix("NAME",new E),this.registerPrefix("STRING",new d),this.registerPrefix("NUMBER",new l),this.registerPrefix("TRUE",new $(c.PREFIX)),this.registerPrefix("FALSE",new $(c.PREFIX)),this.registerPrefix("RETURN",new R),this.registerPrefix("CONTINUE",new _),this.registerPrefix("BREAK",new F),this.registerPrefix("LOOP",new b),this.registerPrefix("FOR_EACH",new M),this.registerInfix("QUESTION",new m(c.CONDITIONAL)),this.registerPrefix("LEFT_PARENT",new f),this.registerInfix("LEFT_PARENT",new N(c.FUNCTION)),this.registerInfix("ARRAY_LEFT",new O(c.ARRAY_ACCESS)),this.registerPrefix("CURLY_LEFT",new I(c.SCOPE)),this.registerInfix("SEMICOLON",new v(c.STATEMENT)),this.registerPrefix("MINUS",new p(c.PREFIX)),this.registerPrefix("BANG",new p(c.PREFIX)),this.registerInfix("PLUS",new h(c.SUM)),this.registerInfix("MINUS",new h(c.SUM)),this.registerInfix("ASTERISK",new h(c.PRODUCT)),this.registerInfix("SLASH",new h(c.PRODUCT)),this.registerInfix("EQUALS",new h(c.COMPARE)),this.registerInfix("NOT_EQUALS",new h(c.COMPARE)),this.registerInfix("GREATER_OR_EQUALS",new h(c.COMPARE)),this.registerInfix("GREATER",new h(c.COMPARE)),this.registerInfix("SMALLER_OR_EQUALS",new h(c.COMPARE)),this.registerInfix("SMALLER",new h(c.COMPARE)),this.registerInfix("AND",new h(c.AND)),this.registerInfix("OR",new h(c.OR)),this.registerInfix("NULLISH_COALESCING",new h(c.NULLISH_COALESCING)),this.registerInfix("ASSIGN",new h(c.ASSIGNMENT))}}const B=(e,t)=>e+Math.random()*(t-e),z=(e,t)=>Math.round(e+Math.random()*(t-e)),Y={"math.abs":Math.abs,"math.acos":Math.acos,"math.asin":Math.asin,"math.atan":Math.atan,"math.atan2":Math.atan2,"math.ceil":Math.ceil,"math.clamp":(e,t,s)=>"number"!=typeof e||Number.isNaN(e)?t:e>s?s:e<t?t:e,"math.cos":Math.cos,"math.die_roll":(e,t,s)=>{let r=0;for(;0<e;)r+=B(t,s);return r},"math.die_roll_integer":(e,t,s)=>{let r=0;for(;0<e;)r+=z(t,s);return r},"math.exp":Math.exp,"math.floor":Math.floor,"math.hermite_blend":e=>3*e^2-2*e^3,"math.lerp":(e,t,s)=>(s<0?s=0:s>1&&(s=1),e+(t-e)*s),"math.lerp_rotate":(e,t,s)=>{const r=e=>((e+180)%360+180)%360;if((e=r(e))>(t=r(t))){let s=e;e=t,t=s}return t-e>180?r(t+s*(360-(t-e))):e+s*(t-e)},"math.ln":Math.log,"math.max":Math.max,"math.min":Math.min,"math.mod":(e,t)=>e%t,"math.pi":Math.PI,"math.pow":Math.pow,"math.random":B,"math.random_integer":z,"math.round":Math.round,"math.sin":Math.sin,"math.sqrt":Math.sqrt,"math.trunc":Math.trunc};class D{constructor(e){this.env={...Y,...this.flattenEnv(e)}}flattenEnv(e,t="",s={}){for(let r in e)"object"!=typeof e[r]||Array.isArray(e[r])?s[`${t}${r}`]=e[r]:this.flattenEnv(e[r],`${t}${r}.`,s);return s}setAt(e,t){if("."===e[1])switch(e[0]){case"q":e="query"+e.substring(1,e.length);break;case"t":e="temp"+e.substring(1,e.length);break;case"v":e="variable"+e.substring(1,e.length);break;case"c":e="context"+e.substring(1,e.length);break;case"f":e="function"+e.substring(1,e.length)}return this.env[e]=t}getFrom(e){if("."===e[1])switch(e[0]){case"q":e="query"+e.substring(1,e.length);break;case"t":e="temp"+e.substring(1,e.length);break;case"v":e="variable"+e.substring(1,e.length);break;case"c":e="context"+e.substring(1,e.length);break;case"f":e="function"+e.substring(1,e.length)}return this.env[e]}}class Q{constructor(e={},t={}){this.config=t,this.expressionCache={},this.totalCacheEntries=0,this.parser=new H(this.config.useOptimizer,this.config.useAgressiveStaticOptimizer),this.executionEnvironment=new D(e)}updateConfig(e){this.config=Object.assign(this.config,e),e.tokenizer&&this.parser.setTokenizer(e.tokenizer),this.parser.updateConfig(e.useOptimizer,e.useAgressiveStaticOptimizer,e.partialResolveOnParse)}clearCache(){this.expressionCache={},this.totalCacheEntries=0}execute(e){this.parser.setExecutionEnvironment(this.executionEnvironment);const t=this.parse(e).eval();return void 0===t?0:"boolean"==typeof t?Number(t):t}executeAndCatch(e){try{return this.execute(e)}catch{return 0}}parse(e){if(this.config.useCache??1){const t=this.expressionCache[e];if(t)return t}this.parser.init(e);const t=this.parser.parseExpression();return(this.config.useCache??1)&&(this.totalCacheEntries>(this.config.maxCacheSize||256)&&this.clearCache(),this.expressionCache[e]=(this.config.useOptimizer??1)&&t.isStatic()?new C(t.eval()):t,this.totalCacheEntries++),t}getParser(){return this.parser}}return e.MoLang=Q,e.Tokenizer=i,e.default=Q,e}({});
