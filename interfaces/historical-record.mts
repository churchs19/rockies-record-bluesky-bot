import { WinLossRecord } from "./mlb-records.mts";

export interface HistoricalRecord extends WinLossRecord {
  season: string;
  teamName: string;
  gamesPlayed: number;
  league: string;
}
