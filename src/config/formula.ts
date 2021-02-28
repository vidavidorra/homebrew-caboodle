import fs from 'fs';
import { logger } from '../logger';
import path from 'path';

type Version = string;
type Versions = ReadonlySet<Version>;

interface Duplicate {
  version: string;
  indices: number[];
}

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

    if (!this.templatePathExists()) {
      logger.error(
        { formula: packageName, templatePath: this.templatePath },
        `Template path MUST be an existing file`,
      );
    }

    const duplicates = this.duplicates();
    if (duplicates.length > 0) {
      duplicates.forEach((e) =>
        logger.warn(
          { formula: this.packageName, version: e.version },
          `Duplicate formula configurations at indices ${e.indices.join()}`,
        ),
      );
    }
  }

  versions(): Versions {
    return new Set(this.semanticVersions());
  }

  abstract url(version: Version): string;

  protected abstract semanticVersions(): Version[];

  private duplicates(): Duplicate[] {
    const duplicates = this.semanticVersions().reduce(
      (accumulator: Duplicate[], version, i, sourceArray) => {
        const duplicateIndex = accumulator.findIndex(
          (e) => e.version === version,
        );
        if (duplicateIndex !== -1) {
          accumulator[duplicateIndex].indices.push(i);
        } else if (sourceArray.includes(version, i + 1)) {
          accumulator.push({ version: version, indices: [i] });
        }

        return accumulator;
      },
      [],
    );

    return duplicates;
  }

  protected validateExists(version: Version): void {
    if (!this.versions().has(version)) {
      throw new Error(`Version '${version}' MUST be in 'versions()'`);
    }
  }

  private templatePathExists(): boolean {
    return (
      fs.existsSync(this.templatePath) &&
      fs.statSync(this.templatePath).isFile()
    );
  }
}

export { Formula, Version, Versions };
