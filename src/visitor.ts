import { ParseTree } from "antlr4ts/tree/ParseTree";
import {
  CsvFileContext,
  FieldContext,
  HdrContext,
  RowContext,
} from "./antlr/CSVParser";
import { CSVVisitor } from "./antlr/CSVVisitor";
import { AbstractParseTreeVisitor } from "antlr4ts/tree/AbstractParseTreeVisitor";

export class Visitor
  extends AbstractParseTreeVisitor<void>
  implements CSVVisitor<void>
{
  protected defaultResult(): void {}
  visitCsvFile(ctx: CsvFileContext): void {
    console.log(ctx.text);
    // this.visit(ctx); // 会陷入死循环
    this.visitChildren(ctx);
    ctx.sourceInterval;
  }
  visitHdr(ctx: HdrContext): void {
    console.log(ctx.text);
    this.visitChildren(ctx);
  }
  visitRow(ctx: RowContext): void {
    console.log(ctx.text);
    this.visitChildren(ctx);
  }
  visitField(ctx: FieldContext): void {
    console.log(ctx.text);
  }
}
