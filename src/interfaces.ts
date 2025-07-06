export interface Zone {
  zone_id: number;
  name: string;
  create_date: Date;
  is_zone_real: boolean;
}

export interface Area {
  id: number;
  name: string;
  zone_id: number;
  is_active: boolean;
  stake_id: number | null;
}

export interface MediaBaptism {
  id: number;
  value: string;
}

export interface MediaMarkedBaptism {
  id: number;
  value: string;
}

export interface Record {
  mediaMarkedBaptisms: MediaMarkedBaptism[];
  mediaBaptisms: MediaBaptism[];
  areaId: number;
  baptism: number;
  markedBaptism: number;
  markedBaptismTotal: number;
  baptismInvite: number;
  friendsSacramentMeeting: number;
  convertsSacramentMeeting: number;
  mediaFriendsSacramentMeeting: number;
  convertsTemple: number;
  newFriends: number;
  contacts: number;
  memberLessons: number;
  convertLessons: number;
}
