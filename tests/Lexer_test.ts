import TokenKind from "$src/TokenKind.js";
import Lexer from "$src/Lexer.js";
import type { Token } from "$src/typings/types.js";
import { expect } from "chai";
import { describe, it } from "node:test";

describe("Lexer", () => {
  it("NAG", () => {
    const lexer = new Lexer("$4");
    const token = lexer.lex();
    expect(token.kind).to.equal(TokenKind.NumericAnnotationGlyph);
    expect(token.value).to.equal("$4");
  });

  it("comment", () => {
    const lexer = new Lexer("{ comment }");
    const token = lexer.lex();
    expect(token.kind).to.equal(TokenKind.Comment);
    expect(token.value).to.equal("comment");
  });

  it("half-move", () => {
    const lexer = new Lexer("35...0-0");
    const tokens: Token[] = [];
    let token: Token;
    do {
      token = lexer.lex();
      tokens.push(token);
    } while (token.kind !== TokenKind.EndOfFile);
    expect(tokens[0].kind).to.equal(TokenKind.MoveNumber);
    expect(tokens[0].value).to.equal("35");
    expect(tokens[1].kind).to.equal(TokenKind.Points);
    expect(tokens[1].value).to.equal("...");
    expect(tokens[2].kind).to.equal(TokenKind.Notation);
    expect(tokens[2].value).to.equal("0-0");
  });
});