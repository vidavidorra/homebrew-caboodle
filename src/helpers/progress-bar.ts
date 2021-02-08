import Progress from 'progress';

class ProgressBar {
  private _options: Progress.ProgressBarOptions;
  private _title: string;
  bar: Progress;

  constructor(title: string, total: Progress.ProgressBarOptions['total']) {
    this._title = title;
    this._options = {
      total,
      width: 100,
      head: '>',
      incomplete: ' ',
    };

    this.bar = new Progress(this.format(), this._options);
  }

  tick(): void {
    this.bar.tick();
  }

  createNew(title: string, total: Progress.ProgressBarOptions['total']): void {
    this._title = title;
    this._options.total = total;

    this.bar = new Progress(this.format(), this._options);
  }

  private format() {
    return `${this._title} [:bar] :percent (:current/:total) ETA :eta s`;
  }
}

export { ProgressBar };
