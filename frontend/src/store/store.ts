import {makeAutoObservable} from "mobx";


class Store{
  count: number = 0
  searchQuery: string = ''

  constructor(){
    makeAutoObservable(this)

  }

  setCount(count:number){
    this.count = count
  }

  setSearchQuery(searchQuery:string){
    this.searchQuery = searchQuery
  }


}

export const store:Store = new Store();