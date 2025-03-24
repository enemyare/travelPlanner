import {makeAutoObservable} from "mobx";
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

  setSearchQuery(searchQuery:string, data:Array<ILandmark>) {
    this.searchQuery = searchQuery
    this.filteredData = data.filter((item) => {
      const query = this.searchQuery.toLowerCase();
      return (
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query)
      );
    })
  }
}

export const store:Store = new Store();