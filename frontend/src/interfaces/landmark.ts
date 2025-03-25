export interface ILandmark {
  id: number,
  name: string,
  description: string,
  createdAt : string,
  rating: 1 | 2 | 3 | 4 | 5,
  image: string,
  location: string,
  coordinates: string,
  mapsLink: string,
  status: 'В планах' | 'Осмотрена'
}