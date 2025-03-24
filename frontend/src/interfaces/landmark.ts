export enum Status{
  Planning = "planning",
  Complete = "complete"
}

export interface Coordinates{
  latitude: number,
  longitude: number
}

export interface Landmark {
  id: number,
  name: string,
  description: string,
  createdAt : Date,
  rating: 1 | 2 | 3 | 4 | 5,
  image: string,
  location: string,
  coordinates: Coordinates,
  mapsLink: string,
  status: Status
}