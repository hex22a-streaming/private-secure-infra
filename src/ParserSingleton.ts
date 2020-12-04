import { injectable } from 'inversify';
import 'reflect-metadata';

import { ParseOptions } from 'commander';

import container from './inversify.config';
import TYPES from './types';

import Parser from './Parser';
import Commander from './services/Commander';

@injectable()
class ParserSingleton implements Parser {
  private static parser: Parser | null = null;

  public static getParser(): Parser {
    if (this.parser === null) {
      this.parser = new ParserSingleton();
    }
    return this.parser;
  }

  private constructor() {
    this.commander = container.get<Commander>(TYPES.Commander);
  }

  commander: Commander

  initialize(): void {
    this.commander
      .command('aws')
      .description('a module that provides support for AWS provider')
      .command('kek [arg]')
      .description('subcommand')
      .action(this.parseVpnCommand);
  }

  parseVpnCommand(arg: string): void {
    console.log('aws command called', arg);
  }

  parse(argv?: string[] | undefined, options?: ParseOptions | undefined): void {
    this.commander.parse(argv, options);
  }
}

export default ParserSingleton;
