import { Formula, Version } from '../formula';

const versions: {
  semantic: string;
  release: string;
  version: string;
  architecture: string;
}[] = [
  {
    semantic: '7.2.1',
    release: '7-2017q4',
    version: '7-2017-q4-major',
    architecture: 'linux',
  },
  {
    semantic: '9.3.1',
    release: '9-2020q2',
    version: '9-2020-q2-update',
    architecture: 'x86_64-linux',
  },
];

class ArmNoneEabiGcc extends Formula {
  constructor() {
    super(
      'GNU Arm Embedded Toolchain',
      'arm-none-eabi-gcc',
      'arm-none-eabi-gcc.mustache',
    );
  }

  url(version: Version): string {
    this.validateExists(version);

    const v = versions.find((e) => e.semantic === version);
    if (v === undefined) {
      throw new Error(`Version '${version}' MUST be in 'versions()'`);
    }

    return [
      'https://developer.arm.com/-/media/Files/downloads/gnu-rm/',
      `${v.release}/gcc-arm-none-eabi-${v.version}-${v.architecture}.tar.bz2`,
    ].join('');
  }

  protected semanticVersions(): Version[] {
    return versions.map((e) => e.semantic);
  }
}

export default ArmNoneEabiGcc;
