import { parse } from 'dotenv';
import { readFileSync } from 'fs';

export interface EnvConfig {
  [key: string]: string;
}

export class ConfigService {
  private envConfig: EnvConfig;
  constructor(filePath: string) {
    const config = parse(readFileSync(filePath));
    this.envConfig = config;
  }

  get(key: string): string {
    return this.envConfig[key];
  }

  isEnv(env: string): boolean {
    return this.envConfig.APP_ENV === env;
  }

}