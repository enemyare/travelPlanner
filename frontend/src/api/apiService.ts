import {ILandmark} from "../interfaces/ILandmark.ts";


const APIURL = "http://localhost:3000/api"

class ApiService{

  private async responseWrapper<T>(url: string, options?: RequestInit): Promise<T> {
    const request = await fetch(url, options)
    if (!request.ok) {
      throw {
        message: request.statusText,
      }
    }
    return request.json()
  }

  getAll = async ():Promise<ILandmark []> => {
    const request: ILandmark [] = await this.responseWrapper<ILandmark []>(`${APIURL}/landmark`)
    return request
  }

  post = async (data: ILandmark):Promise<ILandmark []> => {
    const request: ILandmark [] = await this.responseWrapper<ILandmark []>(`${APIURL}/landmark`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: "POST",
      body: JSON.stringify(data)
    })
    return request
  }

  delete = async (id: number ): Promise<ILandmark []> => {
    const request: Promise<ILandmark []> = this.responseWrapper(`${APIURL}/landmark/${id}`, {
      method: "DELETE",
    })
    return request
  }

  getById = async (id: number ):Promise<ILandmark> => {
    const request: Promise<ILandmark> = this.responseWrapper(`${APIURL}/landmark/${id}`,{
      method: "GET",
    })
    return request
  }

  update = async (id: number, data: ILandmark): Promise<ILandmark []> => {
    const request: Promise<ILandmark []> = this.responseWrapper<ILandmark []>(`${APIURL}/landmark/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: "PATCH",
      body: JSON.stringify(data)
    })
    return request
  }

  updateViewed = async (id: number) => {
    const request: Promise<ILandmark []> = this.responseWrapper(`${APIURL}/landmark/${id}/updateViewed`, {
    })
    return request
  }
}

export default ApiService