import { ArmNoneEabiGcc, CMake } from './formulae/index';
import { Formula } from './formula';
import { logger } from '../logger';

class Formulae {
  readonly formulae: Readonly<Formula[]>;
  readonly versions: Readonly<string[]>;

  constructor() {
    this.formulae = [new CMake(), new ArmNoneEabiGcc()];
    this.versions = this.formulae.flatMap((formula) =>
      [...formula.versions()].map(
        (version) => `${formula.packageName}@${version}`,
      ),
    );
  }
}

const f = new Formulae();
logger.info(
  {
    formulae: f.formulae.map((e) => e.name),
    versions: f.versions,
  },
  'Formulae in configuration',
);
