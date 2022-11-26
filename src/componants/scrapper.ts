import Hero from "@ulixee/hero";
import Server from "@ulixee/server";
import fs, { readFileSync } from "node:fs";
import { json } from "stream/consumers";

import Logger from "../misc/logger.js";
import { links, acountBreaf, RootAcounnt } from "../types/index.js";

export class Scrapper {
  private source: string;

  private payload: RootAcounnt[];

  private Logger: Logger;

  private client: Hero | null;

  private server: Server | null;

  private accounts: acountBreaf[];

  constructor() {
    this.source = "https://ytjobs.co/talent/search";

    this.payload = [
      {
        id: "2157",
        name: "Mario Joos",
        functionalArea: "6",
        avatar:
          "https://d3ncuept73nu2.cloudfront.net/user_images/V4nWgmRy1IN5FbIEtrGvKYep8uodoPUgp77fUaVN.jpg",
        isVerified: true,
        hasEnabledHireMe: false,
        vitrineImage:
          "https://d3ncuept73nu2.cloudfront.net/vitrine_images/pGFj2uldvLvGkirrUxOA50TwhhZwrbftxpzZ2cR1.png",
        about: "Not available for work, here to connect with others",
        works: [
          {
            id: "16797",
            link: null,
            title: "Retention Director",
            description: "Retention",
            isCurrentlyWorkingHere: true,
            startedAtMonth: "Apr",
            startedAtYear: "2020",
            endedAtMonth: null,
            endedAtYear: null,
          },
        ],
        youtubeVideos: {
          statistics: {
            views: 3785942613,
            counts: 33,
            abvViews: "3.79B",
            abvLikes: "125.2M",
            abvComments: "4.5M",
          },
          videos: [
            {
              id: "11647",
              title: "$456,000 Squid Game In Real Life!",
              thumbnail: "https://i.ytimg.com/vi/0e3GPea1Tyg/mqdefault.jpg",
              channelThumbnail:
                "https://d3ncuept73nu2.cloudfront.net/channel_thumbnails/iFbslsMZ8M2LqWpAMGk2gveBVDvPbBE6y2jjTi7e.jpg",
              abvChannelSubscribers: "113M",
              url: "https://youtube.com/watch?v=0e3GPea1Tyg",
              abvViews: "306.6M",
              abvLikes: "14.7M",
            },
            {
              id: "2296",
              title: "I Spent 50 Hours Buried Alive",
              thumbnail: "https://i.ytimg.com/vi/9bqk6ZUsKyA/mqdefault.jpg",
              channelThumbnail:
                "https://d3ncuept73nu2.cloudfront.net/channel_thumbnails/iFbslsMZ8M2LqWpAMGk2gveBVDvPbBE6y2jjTi7e.jpg",
              abvChannelSubscribers: "113M",
              url: "https://youtube.com/watch?v=9bqk6ZUsKyA",
              abvViews: "208M",
              abvLikes: "6.4M",
            },
            {
              id: "11850",
              title: "Last To Leave Circle Wins $500,000",
              thumbnail: "https://i.ytimg.com/vi/zxYjTTXc-J8/mqdefault.jpg",
              channelThumbnail:
                "https://d3ncuept73nu2.cloudfront.net/channel_thumbnails/iFbslsMZ8M2LqWpAMGk2gveBVDvPbBE6y2jjTi7e.jpg",
              abvChannelSubscribers: "113M",
              url: "https://youtube.com/watch?v=zxYjTTXc-J8",
              abvViews: "215.1M",
              abvLikes: "4.9M",
            },
            {
              id: "11851",
              title: "Would You Sit In Snakes For $10,000?",
              thumbnail: "https://i.ytimg.com/vi/fMfipiV_17o/mqdefault.jpg",
              channelThumbnail:
                "https://d3ncuept73nu2.cloudfront.net/channel_thumbnails/iFbslsMZ8M2LqWpAMGk2gveBVDvPbBE6y2jjTi7e.jpg",
              abvChannelSubscribers: "113M",
              url: "https://youtube.com/watch?v=fMfipiV_17o",
              abvViews: "175M",
              abvLikes: "4.1M",
            },
            {
              id: "11852",
              title: "I Bought The World's Largest Mystery Box! ($500,000)",
              thumbnail: "https://i.ytimg.com/vi/ayXxwJJId_c/mqdefault.jpg",
              channelThumbnail:
                "https://d3ncuept73nu2.cloudfront.net/channel_thumbnails/iFbslsMZ8M2LqWpAMGk2gveBVDvPbBE6y2jjTi7e.jpg",
              abvChannelSubscribers: "113M",
              url: "https://youtube.com/watch?v=ayXxwJJId_c",
              abvViews: "149.6M",
              abvLikes: "3.8M",
            },
            {
              id: "11853",
              title: "World\u2019s Most Dangerous Escape Room!",
              thumbnail: "https://i.ytimg.com/vi/3jS_yEK8qVI/mqdefault.jpg",
              channelThumbnail:
                "https://d3ncuept73nu2.cloudfront.net/channel_thumbnails/iFbslsMZ8M2LqWpAMGk2gveBVDvPbBE6y2jjTi7e.jpg",
              abvChannelSubscribers: "113M",
              url: "https://youtube.com/watch?v=3jS_yEK8qVI",
              abvViews: "147.6M",
              abvLikes: "4.3M",
            },
          ],
          channels: [
            {
              id: "1054",
              name: "MrBeast",
              avatar:
                "https://d3ncuept73nu2.cloudfront.net/channel_thumbnails/iFbslsMZ8M2LqWpAMGk2gveBVDvPbBE6y2jjTi7e.jpg",
              abvSubscribers: "113M",
            },
          ],
        },
        portfolio: {
          ytLink: null,
          websiteLink: null,
          twitterLink: "Https://twitter.com/raptordaraptor",
          behanceLink: null,
        },
        customTitle: "Retention",
        allowMessages: true,
        vouchesCount: 2,
        vouchedByCurrentUser: null,
        latestVideoDate: "11/04/2022",
      },
    ];

    this.Logger = new Logger("Scraper", "Scrapper");

    this.client = null;

    this.server = null;

    this.accounts = [];
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
    for (var i = 0; i < this.accounts.length; i++) {
      try {
        let request = await this.client!.fetch(
          "https://app.ytjobs.co/api/talents/" + this.accounts[i].id
        );
        let response: RootAcounnt = await request.json();
        console.log(response.id);
        console.log("Loading This Thing");
        let file = readFileSync("data.json");

        let json = await JSON.parse(file.toString());

        json.push(response);
        console.log("Writing to json again");

        fs.writeFileSync("data.json", JSON.stringify(json));
        this.payload.push(response);
      } catch (error) {
        console.log(error);
      }
    }
  }

  private async WriteFile() {
    fs.writeFileSync("Data.json", JSON.stringify(this.payload));
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
      await this.WriteFile();
      return "Done";
    } else {
      this.Logger.error("Server and Client Failed To Load");
      return null;
    }
  }
}
