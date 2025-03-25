import {autorun, makeAutoObservable} from "mobx";
import {ILandmark} from "../interfaces/landmark.ts";


class Store{
  count: number = 0
  searchQuery: string = ''
  isHideViewed: boolean = false;
  copyFilteredLandmarks: Array<ILandmark> = [];
  filteredLandmarks: Array<ILandmark> = []

  constructor(){
    makeAutoObservable(this)

  }

  setCount(count:number){
    this.count = count
  }

  searchLandmarks(searchQuery:string, data:Array<ILandmark>) {
    this.searchQuery = searchQuery
    this.filteredLandmarks = data.filter((item) => {
      const query = this.searchQuery.toLowerCase();
      return (
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query)
      );
    })
  }

  deleteLandmark = (id: number)=> {
    this.filteredLandmarks = this.filteredLandmarks.filter((item) => item.id !== id )
  }

  hideViewed = () => {
    if (!this.isHideViewed) {
      this.copyFilteredLandmarks = this.filteredLandmarks
      this.filteredLandmarks = this.filteredLandmarks.filter((item) => item.status !== 'Осмотрена')
      this.isHideViewed = true
    }else{
      this.filteredLandmarks = this.copyFilteredLandmarks
      this.isHideViewed = false
    }
  }
}

export const store:Store = new Store();

autorun(() => {
  console.log(store.filteredLandmarks)
  console.log(store.isHideViewed)
  console.log(store.copyFilteredLandmarks)
})