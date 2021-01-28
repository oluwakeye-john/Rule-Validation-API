class Logger {
  private readonly name;
  constructor(name: string) {
    this.name = name;
  }

  log(msg: any): void {
    if (process.env.NODE_ENV !== "production") {
      // only log to console in development mode
      const dt = new Date();
      const resp = `${dt.toLocaleTimeString()} --- ${this.name} --- ${msg}`;
      console.log(resp);
    }
  }
}

export default Logger;
