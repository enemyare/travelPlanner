import { makeAutoObservable, runInAction} from "mobx";
import {ILandmark} from "../interfaces/ILandmark.ts";
import ApiService from "../api/apiService.ts";
import ErrorApi from "../interfaces/ErrorApi.ts";

class Store{
  private apiService: ApiService
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

  requestWrapper = async <T>(asyncFn: Promise<T>, setState: (res: T) => void)=> {
    try {
      this.isLoading = true
      const res: T = await asyncFn
      runInAction(()=> {
        setState(res)
        this.isLoading = false
      })
    }catch(err){
      this.apiError = err as ErrorApi
    }
  }

  setViewedLandmark = async (id: number) => {
    await this.requestWrapper(this.apiService.updateViewed(id), res => this.landmarks = res)
  }

  getAllLandmark = async () => {
    await this.requestWrapper(this.apiService.getAll(), (res) => this.landmarks = res)
  }

  newLandmark = async (data: ILandmark)=>{
    await this.requestWrapper(this.apiService.post(data), (res) => this.landmarks = res)
  }

  updateLandmark = async (data: ILandmark, id: number) => {
    await this.requestWrapper(this.apiService.update(id, data), res => this.landmarks = res)
  }

  deleteLandmark = async (id: number)=> {
    await this.requestWrapper(this.apiService.delete(id), res => this.landmarks = res)
  }

  getLandmarkById = async (id: number)=> {
    await this.requestWrapper(this.apiService.getById(id), res => this.detailLandmark = res)
  }
}

export const store:Store = new Store();
