import {autorun, makeAutoObservable} from "mobx";
import {ILandmark} from "../interfaces/ILandmark.ts";

type editFormType = {
  isEdit: boolean,
  id: number
}

class Store{
  detailId: number = NaN
  searchQuery: string = ''
  isHideViewed: boolean = false
  isAdmin: boolean = false
  isEditFormMode: editFormType = {
    isEdit: false,
    id: 0,
  }
  copyLandmarks: Array<ILandmark> = [];
  landmarks: Array<ILandmark> = [{
    id: 1,
    name: 'Эйфелева башня',
    description: 'Знаменитая башня в Париже.',
    rating: 5,
    status: 'В планах',
    createdAt : '25.03.25, 00:43',
    location: 'Париж, Франция',
    coordinates: "48.8584, 2.2945",
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Tour_Eiffel_Wikimedia_Commons_%28cropped%29.jpg/1200px-Tour_Eiffel_Wikimedia_Commons_%28cropped%29.jpg',
    mapsLink: 'https://maps.google.com/?q=48.8584,2.2945',
  },
    {
      id: 2,
      name: 'Колизей',
      description: 'Амфитеатр в Риме, символ древней истории.',
      rating: 4,
      status: 'Осмотрена',
      location: 'Рим, Италия',
      createdAt : '23.03.25, 00:43',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKsZ8F41cwbdOXAD17K4dWWZy6y8fFz_mR9w&s',
      coordinates: "41.8902, 12.4922",
      mapsLink: 'https://maps.google.com/?q=41.8902,12.4922',
    },
    {
      id: 3,
      name: 'Статуя Свободы',
      description: 'Символ свободы и демократии в Нью-Йорке.',
      rating: 3,
      status: 'В планах',
      createdAt : '21.03.25, 00:43',
      location: 'Нью-Йорк, США',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Statue_of_Liberty_7.jpg/280px-Statue_of_Liberty_7.jpg',
      coordinates: "40.6892, -74.0445",
      mapsLink: 'https://maps.google.com/?q=40.6892,-74.0445',
    },]
  count: number = this.landmarks.length

  constructor(){
    makeAutoObservable(this)

  }

  landmarkById(id: number){
    return this.landmarks.find(item => item.id === id);
  }

  upCount = ()=>{
    this.count++
  }

  setSearchQuery = (query:string)=> {
    this.searchQuery = query
  }

  setDetailId = (id: number)=> {
    this.detailId = id;
  }

  setIsEditFormMode = (id: number, isEdit: boolean) => {
    this.isEditFormMode = {
      id: id,
      isEdit: isEdit,
    }
  }

  setLandmarks = (data: ILandmark[]) => {
    this.landmarks = [...data]
  }

  setIsAdmin = (checked: boolean) => {
    this.isAdmin = checked;
  }

   get searchLandmarks( ) {
    return this.landmarks
      .filter((item) => {
      if (this.searchQuery){
        const query = this.searchQuery.toLowerCase();
        return (
          item.name.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query)
        );
      }
      return true
    })
  }

  get detailLandmark () {
    return this.landmarks.find((landmark: ILandmark) => landmark.id === this.detailId)
  }

  hideViewedLandmarks = () => {
    if (!this.isHideViewed) {
      this.copyLandmarks = this.landmarks
      this.landmarks = this.landmarks.filter((item) => item.status !== 'Осмотрена')
      this.isHideViewed = true
    }else{
      this.landmarks = this.copyLandmarks
      this.isHideViewed = false
    }
  }

  setViewedLandmark = (id: number) => {
    const index = this.landmarks.findIndex(landmark => landmark.id === id);
    if (index !== -1) {
      const updatedLandmark: ILandmark = {
        ...this.landmarks[index],
        status: 'Осмотрена'
      };
      this.landmarks = [
        ...this.landmarks.slice(0, index),
        updatedLandmark,
        ...this.landmarks.slice(index + 1)
      ];
    }
  }

  newLandmark = (data: ILandmark)=>{
    const id = this.landmarks.length+1
    const mapsLink = `https://maps.google.com/?q=${data.coordinates}`
    const newItem = {
      ...data,
      id: id,
      createdAt: new Date().toLocaleDateString('ru-RU', {
        hour: 'numeric',
        minute: 'numeric',
        year: '2-digit',
        month: '2-digit',
        day: 'numeric',
      }),
      mapsLink: mapsLink,
      status: 'В планах'
    }
    this.upCount()
    this.landmarks.push(<ILandmark>newItem)
  }

  updateLandmark = (data: ILandmark, id: number) => {
    const index = this.landmarks.findIndex(item => item.id === id)
    const mapsLink = `https://maps.google.com/?q=${data.coordinates}`
    if (index !== -1) {
      this.landmarks[index] = {...data,
        id,
        createdAt: new Date().toLocaleDateString('ru-RU', {
          hour: 'numeric',
          minute: 'numeric',
          year: '2-digit',
          month: '2-digit',
          day: 'numeric',
        }),
        mapsLink
      };
    }
    this.setIsEditFormMode(0, false)
  }

  deleteLandmark = (id: number)=> {
    this.landmarks = this.landmarks.filter((item) => item.id !== id )
    this.count--
  }

}

export const store:Store = new Store();

autorun(() => {

})