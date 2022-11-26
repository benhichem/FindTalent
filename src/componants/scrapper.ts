import Hero from "@ulixee/hero";
import Server from "@ulixee/server";
import fs, { readFileSync } from "node:fs";
import { ProgressBar } from "../misc/progressbar.js";
import Logger from "../misc/logger.js";
import { links, acountBreaf, RootAcounnt } from "../types/index.js";

export class Scrapper {
  private source: string;

  private payload: RootAcounnt[];

  private Logger: Logger;

  private client: Hero | null;

  private server: Server | null;

  private accounts: acountBreaf[];

  private bar: ProgressBar | null;

  constructor() {
    this.source = "https://ytjobs.co/talent/search";

    this.payload = [];

    this.Logger = new Logger("Scraper", "Scrapper");

    this.client = null;

    this.server = null;

    this.accounts = [];

    this.bar = null;
  }

  private async setup() {
    this.server = new Server();

    this.server.listen({ port: 8080 });

    this.client = new Hero({
      connectionToCore: {
        host: `ws://localhost:${8080}`,
      },
    });
  }

  private async Main() {
    let doit: boolean = true;
    let pageNumber = 1;

    await this.client!.goto(this.source);

    await this.client!.waitForLoad("AllContentLoaded");

    await fs.writeFileSync("Test.jpeg", await this.client!.takeScreenshot());
    //GETTING THE total Profiles Shown
    while (doit) {
      let request = await this.client!.fetch(
        "https://app.ytjobs.co/api/talents?limit=200&search=&filter=%7B%7D&page=" +
          pageNumber
      );

      let response = await request.json();

      // pushing the data in the ccounts
      let data: acountBreaf[] = await response.data;
      data.forEach((item) => {
        this.accounts.push(item);
      });
      pageNumber++;
      // need to make sure that the next page value is still present and not null
      let links: links = await response.links;
      console.log(links);
      if (links.next === null) doit = false;
    }
  }

  private async getProfiles() {
    this.bar = new ProgressBar();

    let data = this.accounts.slice(0, 50);

    this.bar.init(data.length);

    for (var i = 0; i < data.length; i++) {
      try {
        let request = await this.client!.fetch(
          "https://app.ytjobs.co/api/talents/" + this.accounts[i].id
        );
        let response: RootAcounnt = await request.json();

        let file = readFileSync("data.json");
        let json = await JSON.parse(file.toString());
        json.push(response);
        fs.writeFileSync("data.json", JSON.stringify(json));
        this.payload.push(response);
        this.bar.update(1 + i);
      } catch (error) {
        console.log(error);
      }
    }
  }

  private async quickShutDown() {
    this.Logger.info("Closing Down Client & Server ... ");
    await this.client!.close();
    await this.server!.close();
  }

  public async exec() {
    this.Logger.info("starting Scraping ... ");

    await this.setup();

    if (this.client !== null) {
      await this.Main();

      console.log(this.accounts.length);

      console.log(this.accounts[1]);

      await this.getProfiles();

      await this.quickShutDown();

      //   await this.WriteFile();

      return "Done";
    } else {
      this.Logger.error("Server and Client Failed To Load");
      return null;
    }
  }
}
