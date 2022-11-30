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
    let Next: boolean = true;
    let pageNumber = 1;

    await this.client!.goto(this.source);

    await this.client!.waitForLoad("AllContentLoaded");

    await fs.writeFileSync("Test.jpeg", await this.client!.takeScreenshot());
    //GETTING THE total Collecting Profiles ...s Shown
    //Just TO set up the Progress Bar
    let PageNums = await this.client!.fetch(
      "https://app.ytjobs.co/api/talents?limit=200&search=&filter=%7B%7D&page=1"
    );

    let response = await PageNums.json();

    this.Logger.info("Collecting Profiles ...");

    let t = await response.meta.last_page;

    this.bar = new ProgressBar();

    await this.bar.init(t);

    while (Next) {
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

      this.bar.update(pageNumber);

      // need to make sure that the next page value is still present and not null
      let links: links = await response.links;

      if (links.next === null) Next = false;
    }
    this.bar = null;
  }

  private async getProfiles() {
    this.Logger.info("Collecting Details of each Profile ...");
    // Creating a new Progress Bar
    this.bar = new ProgressBar();
    // This Need To be Removed by the end of the Project

    //let data = this.accounts.slice(0, 50);

    this.bar.init(this.accounts.length);
    // Looping thru each Profile and Gather information
    for (var i = 0; i < this.accounts.length; i++) {
      try {
        let request = await this.client!.fetch(
          "https://app.ytjobs.co/api/talents/" + this.accounts[i].id
        );
        let response: RootAcounnt = await request.json();

        let file = readFileSync("../data.json");
        let json = await JSON.parse(file.toString());
        json.push(response);
        fs.writeFileSync("../data.json", JSON.stringify(json));
        this.payload.push(response);
        this.bar.update(1 + i);
      } catch (error) {
        console.log(error);
      }
    }
    this.bar = null;
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

      this.Logger.info("Accounts Collected :: " + this.accounts.length);

      await this.getProfiles();

      await this.quickShutDown();

      return true;
    } else {
      this.Logger.error("Server and Client Failed To Load");

      return false;
    }
  }
}
