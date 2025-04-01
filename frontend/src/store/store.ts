import { makeAutoObservable, runInAction} from "mobx";
import {ILandmark} from "../interfaces/ILandmark.ts";
import ApiService from "../api/apiService.ts";

class Store{
  apiService: ApiService
  isLoading:boolean = false
  searchQuery: string = ''
  isHideViewed: boolean = false
  isAdmin: boolean = false
  filteredLandmarks: Array<ILandmark> = [];
  landmarks: Array<ILandmark> = []
  detailLandmark!: ILandmark
  error: unknown | string = ''

  constructor(){
    makeAutoObservable(this)
    this.apiService = new ApiService()
  }

  landmarkById = (id: number) => {
    return this.landmarks.find(item => item.id === id);
  }

  setSearchQuery = (query:string)=> {
    this.searchQuery = query
  }

  setIsAdmin = (checked: boolean) => {
    this.isAdmin = checked;
  }

  get amount () {
    return this.landmarks.length
  }

  get searchLandmarks() {
    if (this.searchQuery){
      return this.landmarks.filter(landmark =>
        landmark.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        landmark.description.toLowerCase().includes(this.searchQuery.toLowerCase()))
    }else return this.landmarks
 }

  hideViewedLandmarks = () => {
    if (!this.isHideViewed) {
      this.filteredLandmarks = this.landmarks
      this.landmarks = this.landmarks.filter((item) => item.status !== 'Осмотрена')
      this.isHideViewed = true
    }else{
      this.landmarks = this.filteredLandmarks
      this.isHideViewed = false
    }
  }

  setViewedLandmark = async (id: number) => {
    try {
      this.isLoading = true
      const res = await this.apiService.updateViewed(id)
      runInAction(() => {
        this.landmarks = res
        this.isLoading = false
      })
    }catch(err){
      this.error = err
      throw new Error()
    }
  }

  getAllLandmark = async () => {
    try {
      this.isLoading = true
      const res:ILandmark [] = await this.apiService.getAll()
      runInAction(()=> {
        this.landmarks = res
        this.isLoading = false
      })
    }catch(err){
      this.error = err
      throw new Error()
    }
  }

  newLandmark = async (data: ILandmark)=>{
    try {
      this.isLoading = true
      const res = await this.apiService.post(data)
      runInAction(()=> {
        this.landmarks = res
        this.isLoading = false
      })
    }catch(err){
      this.error = err
      throw new Error()
    }
  }

  updateLandmark = async (data: ILandmark, id: number) => {
    try {
      this.isLoading = true
      const res = await this.apiService.update(id, data)
      runInAction(()=> {
        this.landmarks = res
        this.isLoading = false
      })
    }catch(err){
      this.error = err
      throw new Error()
    }
  }

  deleteLandmark = async (id: number)=> {
    try {
      this.isLoading = true
      const res = await this.apiService.delete(id)
      runInAction(()=> {
        this.landmarks = res
        this.isLoading = false
      })
    }catch(err){
      this.error = err
      throw new Error()
    }
  }

  getLandmarkById = async (id: number)=> {
    this.isLoading = true
    try {
      const res = await this.apiService.getById(id)
      runInAction(()=> {
        this.detailLandmark = res
        this.isLoading = false
      })
    }catch(err){
      this.error = err
      throw new Error()
    }
  }
}

export const store:Store = new Store();
