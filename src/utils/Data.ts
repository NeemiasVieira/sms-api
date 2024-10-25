import { Environment } from "./FormatarDatas";

export class Data extends Date {
  constructor() {
    super();
    if (process.env.NODE_ENV === Environment.PROD) {
      const currentTime = this.getTime();
      const gmtMinus3 = currentTime - 3 * 60 * 60 * 1000;
      this.setTime(gmtMinus3);
    }
  }
}
