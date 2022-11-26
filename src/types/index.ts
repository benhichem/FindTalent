export interface links {
  first: string | null;
  last: string | null;
  preve: string | null;
  next: string | null;
}

export interface acountBreaf {
  id: string;
  name: string;
  functionalArea: string;
  avatar: string;
  isVerified: boolean;
  hasEnabledHireMe: boolean;
}

export interface RootAcounnt {
  id: string;
  name: string;
  functionalArea: string;
  avatar: string;
  isVerified: boolean;
  hasEnabledHireMe: boolean;
  vitrineImage: string;
  about: string;
  works: Work[];
  youtubeVideos: YoutubeVideos;
  portfolio: Portfolio;
  customTitle: string;
  allowMessages: boolean;
  vouchesCount: number;
  vouchedByCurrentUser: any;
  latestVideoDate: string;
}

export interface Work {
  id: string;
  link: any;
  title: string;
  description: string;
  isCurrentlyWorkingHere: boolean;
  startedAtMonth: string | null;
  startedAtYear: string;
  endedAtMonth: string | null;
  endedAtYear: string | null;
}

export interface YoutubeVideos {
  statistics: Statistics;
  videos: Video[];
  channels: Channel[];
}

export interface Statistics {
  views: number;
  counts: number;
  abvViews: string;
  abvLikes: string;
  abvComments: string;
}

export interface Video {
  id: string;
  title: string;
  thumbnail: string;
  channelThumbnail: string;
  abvChannelSubscribers: string;
  url: string;
  abvViews: string;
  abvLikes: string;
}

export interface Channel {
  id: string;
  name: string;
  avatar: string;
  abvSubscribers: string;
}

export interface Portfolio {
  ytLink: any;
  websiteLink: any;
  twitterLink: string;
  behanceLink: any;
}
