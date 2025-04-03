import { makeAutoObservable, runInAction} from "mobx";
import {ILandmark} from "../interfaces/ILandmark.ts";
import ApiService from "../api/apiService.ts";
import ErrorApi from "../interfaces/ErrorApi.ts";

class Store{
  apiService: ApiService
  isLoading:boolean = false
  searchQuery: string = ''
  isHideViewed: boolean = false
  isAdmin: boolean = false
  filteredLandmarks: Array<ILandmark> = [];
  landmarks:  ILandmark [] = []
  detailLandmark!: ILandmark
  apiError: ErrorApi = {
    message: ""
  }

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
      this.apiError = err as ErrorApi
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
      this.apiError = err as ErrorApi
    }
  }

  newLandmark = async (data: ILandmark)=>{
    try {
      this.isLoading = true
      const res: ILandmark [] = await this.apiService.post(data)
      runInAction(()=> {
        this.landmarks = res
        this.isLoading = false
      })
    }catch(err){
      this.apiError = err as ErrorApi
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
      this.apiError = err as ErrorApi
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
      this.apiError = err as ErrorApi
    }
  }

  getLandmarkById = async (id: number)=> {
    this.isLoading = true
    try {
      const res: ILandmark = await this.apiService.getById(id)
      runInAction(()=> {
        this.detailLandmark = res
        this.isLoading = false
      })
    }catch(err){
      this.apiError = err as ErrorApi
    }
  }
}

export const store:Store = new Store();
