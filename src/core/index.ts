import { Scrapper } from "../componants/scrapper.js";
import { Formater } from "../componants/dataformater.js";
import Logger from "../misc/logger.js";

export class Index {
  private Logger: Logger;
  private Scrapper: Scrapper;
  private Formater: Formater | null;

  constructor() {
    this.Logger = new Logger("Index", "Index");
    this.Scrapper = new Scrapper();
    this.Formater = new Formater();
  }

  public async exec() {
    this.Logger.info("Starting Process ...");
    await this.Scrapper.exec();
    await this.Formater?.exec();
  }
}
