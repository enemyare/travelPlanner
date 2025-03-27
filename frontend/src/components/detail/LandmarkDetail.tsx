import {FC, useEffect} from "react";
import {Slider, Text} from "@gravity-ui/uikit";
import {Link, useParams} from "react-router-dom";
import './LandmarkDetail.css'
import {store} from "../../store/store.ts";
import {observer} from "mobx-react-lite";

const LandmarkDetail: FC = observer(() => {
  const {id}= useParams()
  useEffect(()=>{
    store.setDetailId(Number(id))
  })
  const landmark = store.detailLandmark

  if (!landmark){
    return <div>Loading...</div>
  }

  return(
    <>
      <div className={'landmark-detail'}>
        <div className={'description-container'}>
          <img src={landmark.image} alt="" className="landmark-detail-img"/>
          <div className={'description-wrap'}>
            <Text variant={'subheader-2'}>Имя достопримечательности: {landmark.name}</Text>
            <div className={'description'}>
              <Text variant={'subheader-2'}>Описание достопримечательности:</Text>
              <Text wordBreak={'break-all'} > {landmark.description}</Text>
            </div>
          </div>
        </div>
        <div>
          <Text variant={'subheader-2'}>Оценка достопримечательности: {landmark.rating}</Text>
          <Slider
            value={landmark.rating}
            disabled={true}
            min={1}
            max={5}
            marks={5}
            size={'s'}
          />
        </div>
        <Text variant={'subheader-2'}>Локация: {landmark.location}</Text>
        <Text variant={'subheader-2'}>Достопримечательность на картах: <a href={landmark.mapsLink}>{landmark.mapsLink}</a></Text>
        <Text variant={'subheader-2'}>Координаты: {landmark.coordinates}</Text>
        <Text variant={'subheader-2'}>Дата создания: {landmark.createdAt}</Text>
        <Link  to={'/'}>Вернуться</Link>
      </div>
    </>
  )
})

export default LandmarkDetail