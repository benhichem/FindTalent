import fs from "node:fs";
import { RootAcounnt } from "../types";
import { createObjectCsvWriter } from "csv-writer";

export class Formater {
  csvWriter_options: { path: string; header: { id: string; title: string }[] };
  file_path: string;
  payload: any[];

  constructor() {
    this.file_path = "../data.json";
    this.payload = [];
    this.csvWriter_options = {
      path: "../final.csv",
      header: [
        { id: "id", title: "id" },
        { id: "name", title: "name" },
        { id: "functionalArea", title: "functionalArea" },
        { id: "avatar", title: "avatar" },
        { id: "isVerified", title: "isVerified" },
        { id: "hasEnabledHireMe", title: "hasEnabledHireMe" },
        { id: "vitrineImage", title: "vitrineImage" },
        { id: "about", title: "about" },
        { id: "works_id", title: "works_id" },
        { id: "works_link", title: "works_link" },
        { id: "works_title", title: "works_title" },
        { id: "works_description", title: "works_description" },
        {
          id: "works_isCurrentlyWorkingHere",
          title: "works_isCurrentlyWorkingHere",
        },
        {
          id: "works_startedAtMonth",
          title: "works_startedAtMonth",
        },
        {
          id: "works_startedAtYear",
          title: "works_startedAtYear",
        },
        {
          id: "works_endedAtMonth",
          title: "works_endedAMonth",
        },
        {
          id: "works_endedAtYear",
          title: "works_endedAtYear",
        },
        {
          id: "youtubeVideos_statistics_views",
          title: "youtubeVideos_statistics_views",
        },
        {
          id: "youtubeVideos_statistics_counts",
          title: "youtubeVideos_statistics_counts",
        },
        {
          id: "youtubeVideos_statistics_abvViews",
          title: "youtubeVideos_statistics_abvViews",
        },
        {
          id: "youtubeVideos_statistics_abvLikes",
          title: "youtubeVideos_statistics_abvLikes",
        },
        {
          id: "youtubeVideos_statistics_abvComments",
          title: "youtubeVideos_statistics_abvComments",
        },
        {
          id: "youtubeVideos_videos_id",
          title: "youtubeVideos_videos_id",
        },
        {
          id: "youtubeVideos_videos_title",
          title: "youtubeVideos_videos_title",
        },
        {
          id: "youtubeVideos_videos_thumbnail",
          title: "youtubeVideos_videos_thumbnail",
        },
        {
          id: "youtubeVideos_videos_channelThumbnail",
          title: "youtubeVideos_videos_channelThumbnail",
        },
        {
          id: "youtubeVideos_videos_abvChannelSubscribers",
          title: "youtubeVideos_videos_abvChannelSubscribers",
        },
        {
          id: "youtubeVideos_videos_url",
          title: "youtubeVideos_videos_url",
        },
        {
          id: "youtubeVideos_videos_abvViews",
          title: "youtubeVideos_videos_abvViews",
        },
        {
          id: "youtubeVideos_videos_abvLikes",
          title: "youtubeVideos_videos_abvLikes",
        },
        {
          id: "youtubeVideos_channels_id",
          title: "youtubeVideos_channels_id",
        },
        {
          id: "youtubeVideos_channels_name",
          title: "youtubeVideos_channels_name",
        },
        {
          id: "youtubeVideos_channels_avatar",
          title: "youtubeVideos_channels_avatar",
        },
        {
          id: "youtubeVideos_channels_abvSubscribers",
          title: "youtubeVideos_channels_abvSubscribers",
        },
        {
          id: "portfolio_ytLink",
          title: "portfolio_ytLink",
        },
        {
          id: "portfolio_websiteLink",
          title: "portfolio_websiteLink",
        },
        {
          id: "portfolio_twitterLink",
          title: "portfolio_twitterLink",
        },
        {
          id: "portfolio_behanceLink",
          title: "portfolio_behanceLink",
        },

        { id: "custromTittle", title: "custromTittle" },
        { id: "allowMessages", title: "allowMessages" },
        { id: "vouchesCount", title: "vouchesCount" },
        { id: "VouchedByCurrentUser", title: "VouchedByCurrentUser" },
        { id: "latestVideoDate", title: "latestVideoDate" },
      ],
    };
  }

  private async setup() {
    let t = fs.existsSync(this.file_path);
    return t;
  }

  private someCool(data: any[], tingweneed: string) {
    let result = [];
    for (var i = 0; i < data.length; i++) {
      result.push(data[i][tingweneed]);
    }
    return result;
  }

  private async Formate_data(data: RootAcounnt[]) {
    for (var i = 0; i < data.length; i++) {
      let Profile = {
        id: data[i].id,
        name: data[i].name,
        functionalArea: data[i].functionalArea,
        avatar: data[i].avatar,
        isVerified: data[i].isVerified,
        hasEnabledHireMe: data[i].hasEnabledHireMe,
        vitrineImage: data[i].vitrineImage,
        about: data[i].about,
        works_id: this.someCool(data[i].works, "id"),
        works_link: this.someCool(data[i].works, "link"),
        works_title: this.someCool(data[i].works, "title"),
        works_description: this.someCool(data[i].works, "description"),
        works_isCurrentlyWorkingHere: this.someCool(
          data[i].works,
          "isCurrentlyWorkingHere"
        ),
        works_startedAtMonth: this.someCool(data[i].works, "startedAtMonth"),
        works_startedAtYear: this.someCool(data[i].works, "startedAtYear"),
        works_endedAtMonth: this.someCool(data[i].works, "endedAtMonth"),
        works_endedAtYear: this.someCool(data[i].works, "endedAtYear"),
        youtubeVideos_statistics_views: data[i].youtubeVideos.statistics.views,
        youtubeVideos_statistics_counts:
          data[i].youtubeVideos.statistics.counts,
        youtubeVideos_statistics_abvViews:
          data[i].youtubeVideos.statistics.abvViews,
        youtubeVideos_statistics_abvLikes:
          data[i].youtubeVideos.statistics.abvLikes,
        youtubeVideos_statistics_abvComments:
          data[i].youtubeVideos.statistics.abvComments,
        youtubeVideos_videos_id: this.someCool(
          data[i].youtubeVideos.videos,
          "id"
        ),
        youtubeVideos_videos_title: this.someCool(
          data[i].youtubeVideos.videos,
          "title"
        ),
        youtubeVideos_videos_thumbnail: this.someCool(
          data[i].youtubeVideos.videos,
          "thumbnail"
        ),

        youtubeVideos_videos_channelThumbnail: this.someCool(
          data[i].youtubeVideos.videos,
          "channelThumbnail"
        ),
        youtubeVideos_videos_abvChannelSubscribers: this.someCool(
          data[i].youtubeVideos.videos,
          "abvChannelSubscribers"
        ),
        youtubeVideos_videos_url: this.someCool(
          data[i].youtubeVideos.videos,
          "url"
        ),
        youtubeVideos_videos_abvViews: this.someCool(
          data[i].youtubeVideos.videos,
          "abvViews"
        ),
        youtubeVideos_videos_abvLikes: this.someCool(
          data[i].youtubeVideos.videos,
          "abvLikes"
        ),
        youtubeVideos_channels_id: this.someCool(
          data[i].youtubeVideos.channels,
          "id"
        ),
        youtubeVideos_channels_name: this.someCool(
          data[i].youtubeVideos.channels,
          "name"
        ),
        youtubeVideos_channels_avatar: this.someCool(
          data[i].youtubeVideos.channels,
          "avatar"
        ),
        youtubeVideos_channels_abvSubscribers: this.someCool(
          data[i].youtubeVideos.channels,
          "abvSubscribers"
        ),
        portfolio_ytLink: data[i].portfolio.ytLink,
        portfolio_websiteLink: data[i].portfolio.websiteLink,
        portfolio_twitterLink: data[i].portfolio.twitterLink,
        portfolio_behanceLink: data[i].portfolio.behanceLink,
        custromTittle: data[i].customTitle,
        allowMessages: data[i].allowMessages,
        vouchesCount: data[i].vouchesCount,
        latestVideoDate: data[i].latestVideoDate,
      };
      this.payload.push(Profile);
    }
  }

  private async ReadFile() {
    let ReadMe = await fs.readFileSync(this.file_path);
    let resson = JSON.parse(ReadMe.toString());
    return resson;
  }

  public async exec() {
    if (await this.setup()) {
      let Data = await this.ReadFile();
      await this.Formate_data(Data);
      const csvWriter = createObjectCsvWriter(this.csvWriter_options);
      csvWriter
        .writeRecords(this.payload) // returns a promise
        .then(() => {
          console.log("...Done");
        });
      return;
    } else {
      return null;
    }
  }
}
