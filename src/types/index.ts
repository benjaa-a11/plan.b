export type Channel = {
  id: string;
  name: string;
  logoUrl: string;
  streamUrl: string;
  category: string;
  description: string;
};

export type ChannelOption = {
  id: string;
  name: string;
  logoUrl?: string;
};

export type Match = {
  id: string;
  team1: string;
  team1Logo: string;
  team2: string;
  team2Logo: string;
  time: string;
  isLive: boolean;
  channels: ChannelOption[];
  matchDetails?: string;
  matchTimestamp: Date;
};