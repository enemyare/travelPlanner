import {ILandmark} from "../interfaces/ILandmark.ts";


const APIURL = "http://localhost:3000/api"

class ApiService{
  getAll = async () => {
    const request = await fetch(`${APIURL}/landmark`)
    return request.json()
  }

  post = async (data: ILandmark) => {
    const request = await fetch(`${APIURL}/landmark`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: "POST",
      body: JSON.stringify(data)
    })
    return request.json()
  }

  delete = async (id: number ) => {
    const request = await fetch(`${APIURL}/landmark/${id}`, {
      method: "DELETE",
    })
    return request.json()
  }

  getById = async (id: number ) => {
    const request = await fetch(`${APIURL}/landmark/${id}`,{
      method: "GET",
    })
    return request.json()
  }

  update = async (id: number, data: ILandmark) => {
    const request = await fetch(`${APIURL}/landmark/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: "PATCH",
      body: JSON.stringify(data)
    })
    return request.json()
  }

  updateViewed = async (id: number) => {
    const request = await fetch(`${APIURL}/landmark/${id}/updateViewed`, {
    })
    return request.json()
  }
}

export default ApiService