import {ILandmark} from "../interfaces/ILandmark.ts";

const APIURL = "http://localhost:3000/api"

class ApiService{

  private async request<T>(url: string, options?: RequestInit): Promise<T> {
    const request = await fetch(url, options)
    if (!request.ok) {
      throw {
        message: request.statusText,
      }
    }
    return request.json()
  }

  getAll = async ():Promise<ILandmark []> => {
    return await this.request<ILandmark []>(`${APIURL}/landmark`)
  }

  post = async (data: ILandmark):Promise<ILandmark []> => {
    return await this.request<ILandmark []>(`${APIURL}/landmark`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: "POST",
      body: JSON.stringify(data)
    })
  }

  delete = async (id: number ): Promise<ILandmark []> => {
    return this.request(`${APIURL}/landmark/${id}`, {
      method: "DELETE",
    })
  }

  getById = async (id: number ):Promise<ILandmark> => {
    return this.request(`${APIURL}/landmark/${id}`,{
      method: "GET",
    })
  }

  update = async (id: number, data: ILandmark): Promise<ILandmark []> => {
    return this.request<ILandmark []>(`${APIURL}/landmark/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: "PATCH",
      body: JSON.stringify(data)
    })
  }

  updateViewed = async (id: number): Promise<ILandmark []> => {
    return this.request(`${APIURL}/landmark/${id}/updateViewed`, {
    })
  }
}

export default ApiService