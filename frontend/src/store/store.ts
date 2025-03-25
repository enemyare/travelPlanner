import {autorun, makeAutoObservable} from "mobx";
import {ILandmark} from "../interfaces/landmark.ts";


class Store{
  count: number = 0
  searchQuery: string = ''
  filteredData: Array<ILandmark> = []

  constructor(){
    makeAutoObservable(this)

  }

  setCount(count:number){
    this.count = count
  }

  searchLandmarks(searchQuery:string, data:Array<ILandmark>) {
    this.searchQuery = searchQuery
    this.filteredData = data.filter((item) => {
      const query = this.searchQuery.toLowerCase();
      return (
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query)
      );
    })
  }

  deleteLandmark = (id: number)=> {
    this.filteredData = this.filteredData.filter((item) => item.id !== id );
  }
}

export const store:Store = new Store();

autorun(() => {
  console.log(store.filteredData)
})