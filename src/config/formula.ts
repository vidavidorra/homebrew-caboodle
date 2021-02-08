import fs from 'fs';
import path from 'path';

type Version = string;
type Versions = ReadonlySet<Version>;

abstract class Formula {
  readonly templatePath: string;
  constructor(
    public readonly name: string,
    public readonly packageName: string,
    templatePath: string,
  ) {
    this.templatePath = templatePath;
    if (!path.isAbsolute(templatePath)) {
      this.templatePath = path.join(__dirname, 'formulae', templatePath);
    }

    this.validateTemplatePath();
  }

  abstract versions(): Versions;
  abstract url(version: Version): string;

  protected validateVersion(version: Version): void {
    if (!this.versions().has(version)) {
      throw new Error(`Version '${version}' MUST be in 'versions()'`);
    }
  }

  private validateTemplatePath(): void {
    if (
      !fs.existsSync(this.templatePath) ||
      !fs.statSync(this.templatePath).isFile()
    ) {
      throw new Error(
        `Template path '${this.templatePath}' MUST be an existing file`,
      );
    }
  }
}

export { Formula, Version, Versions };
