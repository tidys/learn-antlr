import { join, parse } from "path";
import { existsSync, readFileSync } from "fs";
import {
  ANTLRErrorListener,
  ANTLRInputStream,
  BailErrorStrategy,
  CommonTokenStream,
  RecognitionException,
  Recognizer,
  Token,
} from "antlr4ts";
import { Visitor } from "./visitor";
import { CSVLexer } from "./antlr/CSVLexer";
import { CSVParser, HdrContext } from "./antlr/CSVParser";

const file = join(__dirname, "../test.csv");
if (!existsSync(file)) {
  console.log(`not exists ${file}`);
} else {
  const data = readFileSync(file, "utf-8");
  const charStream = new ANTLRInputStream(data);
  let lexer: CSVLexer = new CSVLexer(charStream);
  const tokens = lexer.getAllTokens();
  lexer.reset();

  const tokenStream = new CommonTokenStream(lexer);
  const parser = new CSVParser(tokenStream);
  //   parser.errorHandler = new BailErrorStrategy();
  class MyErrorListener implements ANTLRErrorListener<any> {
    syntaxError<T>(
      recognizer: Recognizer<T, any>,
      offendingSymbol: T,
      line: number,
      charPositionInLine: number,
      msg: string,
      e?: RecognitionException
    ): void {
      console.error(`语法错误：行 ${line}:${charPositionInLine} ${msg}`);
    }
  }
  // errorListener没有用
  parser.addErrorListener(new MyErrorListener());
  parser.removeErrorListeners();

  const tree = parser.csvFile();
  const visitor = new Visitor();
  try {
    visitor.visit(tree);
  } catch (e) {
    // 捕获不到错误
    console.log(e);
  }
  parser.reset();
}
