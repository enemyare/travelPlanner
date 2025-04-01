export interface ILandmark {
  id: number,
  name: string,
  description: string,
  createdAt?: Date,
  rating:  number | [number, number],
  image: string,
  location: string,
  coordinates: string,
  mapsLink?: string,
  status?: 'В планах' | 'Осмотрена'
}




