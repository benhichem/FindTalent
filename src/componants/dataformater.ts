//const createCsvWriter = require("csv-writer").createObjectCsvWriter;
import { createObjectCsvWriter } from "csv-writer";

const records = [
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
  },
];

const csvWriter = createObjectCsvWriter({
  path: "../example.csv",
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
      id: "works__isCurrentlyWorkingHere",
      title: "works__isCurrentlyWorkingHere",
    },
    {
      id: "works__startedAtMonth",
      title: "works__startedAtMonth",
    },
    {
      id: "works__startedAtYear",
      title: "works__startedAtYear",
    },
    {
      id: "works__endedAtMonth",
      title: "works__endedAMonth",
    },
    {
      id: "works__endedAtYear",
      title: "works__endedAtYear",
    },
    {
      id: "youtubeVideos__statistics__views",
      title: "youtubeVideos__statistics__views",
    },
    {
      id: "youtubeVideos__statistics__counts",
      title: "youtubeVideos__statistics__counts",
    },
    {
      id: "youtubeVideos__statistics__abvViews",
      title: "youtubeVideos__statistics__abvViews",
    },
    {
      id: "youtubeVideos__statistics__abvLikes",
      title: "youtubeVideos__statistics__abvLikes",
    },
    {
      id: "youtubeVideos__statistics__abvComments",
      title: "youtubeVideos__statistics__abvComments",
    },
    {
      id: "youtubeVideos__videos__id",
      title: "youtubeVideos__videos__id",
    },
    {
      id: "youtubeVideos__videos__title",
      title: "youtubeVideos__videos__title",
    },
    {
      id: "youtubeVideos__videos__thumbnail",
      title: "youtubeVideos__videos__thumbnail",
    },
    {
      id: "youtubeVideos__videos__channelThumbnail",
      title: "youtubeVideos__videos__channelThumbnail",
    },
    {
      id: "youtubeVideos__videos__abvChannelSubscribers",
      title: "youtubeVideos__videos__abvChannelSubscribers",
    },
    {
      id: "youtubeVideos__videos__url",
      title: "youtubeVideos__videos__url",
    },
    {
      id: "youtubeVideos__videos__abvViews",
      title: "youtubeVideos__videos__abvViews",
    },
    {
      id: "youtubeVideos__videos__abvLikes",
      title: "youtubeVideos__videos__abvLikes",
    },
    {
      id: "youtubeVideos__channels__id",
      title: "youtubeVideos__channels__id",
    },
    {
      id: "youtubeVideos__channels__name",
      title: "youtubeVideos__channels__name",
    },
    {
      id: "youtubeVideos__channels__avatar",
      title: "youtubeVideos__channels__avatar",
    },
    {
      id: "youtubeVideos__channels__abvSubscribers",
      title: "youtubeVideos__channels__abvSubscribers",
    },
    {
      id: "portfolio__ytLink",
      title: "portfolio__ytLink",
    },
    {
      id: "portfolio__websiteLink",
      title: "portfolio__websiteLink",
    },
    {
      id: "portfolio__twitterLink",
      title: "portfolio__twitterLink",
    },
    {
      id: "portfolio__behanceLink",
      title: "portfolio__behanceLink",
    },
    {
      id: "portfolio__behanceLink",
      title: "portfolio__behanceLink",
    },
    { id: "custromTittle", title: "custromTittle" },
    { id: "allowMessages", title: "allowMessages" },
    { id: "vouchesCount", title: "vouchesCount" },
    { id: "VouchedByCurrentUser", title: "VouchedByCurrentUser" },
    { id: "latestVideoDate", title: "latestVideoDate" },
  ],
});

csvWriter
  .writeRecords(records) // returns a promise
  .then(() => {
    console.log("...Done");
  });
