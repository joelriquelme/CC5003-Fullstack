export interface MedalRow {
  id: number;
  departmentCode: string;   
  departmentName: string; 
  gold: number;
  silver: number;
  bronze: number;
  points: number;
}

export interface ScoreRow {
  id: number;
  discipline: string;      
  departmentCode: string;   
  points: number;
}

export interface Match {
  id: number;
  discipline: string;
  date: string;            
  teamA: string;
  teamB: string;
  scoreA?: number;
  scoreB?: number;
}
