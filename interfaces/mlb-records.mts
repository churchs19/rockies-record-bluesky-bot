export interface TeamRecord {
  team: Team;
  season: string;
  streak: Streak;
  divisionRank: string;
  leagueRank: string;
  wildCardRank: string;
  sportRank: string;
  gamesPlayed: number;
  gamesBack: string;
  wildCardGamesBack: string;
  leagueGamesBack: string;
  springLeagueGamesBack: string;
  sportGamesBack: string;
  divisionGamesBack: string;
  conferenceGamesBack: string;
  leagueRecord: OverallRecord;
  lastUpdated: string;
  records: Records;
  runsAllowed: number;
  runsScored: number;
  divisionChamp: boolean;
  divisionLeader: boolean;
  hasWildcard: boolean;
  clinched: boolean;
  eliminationNumber: string;
  eliminationNumberSport: string;
  eliminationNumberLeague: string;
  eliminationNumberDivision: string;
  eliminationNumberConference: string;
  wildCardEliminationNumber: string;
  wins: number;
  losses: number;
  runDifferential: number;
  winningPercentage: string;
}

export interface Records {
  splitRecords: SplitRecord[];
  divisionRecords: DivisionRecord[];
  overallRecords: SplitRecord[];
  leagueRecords: LeagueRecord[];
  expectedRecords: SplitRecord[];
}

export interface WinLossRecord {
  wins: number;
  losses: number;
  pct: number;
}

export interface LeagueRecord extends WinLossRecord {
  league: Team;
}

export interface DivisionRecord extends WinLossRecord {
  division: Team;
}

export interface SplitRecord extends WinLossRecord {
  type: string;
}

export interface OverallRecord extends WinLossRecord {
  ties: number;
}

export interface Streak {
  streakType: string;
  streakNumber: number;
  streakCode: string;
}

export interface Team {
  id: number;
  name: string;
  link: string;
}
