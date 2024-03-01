export interface quickNoteInterface {
    id: number;
    qType: string;
    qNote: string;
    qPrice: number;
    qIcon: string;
    status: string;
    userId?: number;
}
export interface mDashboardInterface {
  inCome? : string,
  expenses? : string
}



export interface authDataInterface {
  id: number,
  username: string,
  fullName: string,
  userAvatar?: string,
  inActive?: string,
  dateStartNote?: string,
  token: string
}