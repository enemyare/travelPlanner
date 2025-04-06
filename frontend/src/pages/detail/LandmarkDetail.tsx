import {FC, useEffect} from "react";
import {Slider, Text, Icon, Button, Tooltip} from "@gravity-ui/uikit";
import {Link, useNavigate, useParams} from "react-router-dom";
import './LandmarkDetail.css'
import {store} from "../../store/store.ts";
import {observer} from "mobx-react-lite";
import {ArrowLeft} from '@gravity-ui/icons';
import ErrorComponent from "../../components/error/ErrorComponent.tsx";
import LoadingComponent from "../../components/loading/LoadingComponent.tsx";

const LandmarkDetail: FC = observer(() => {
  const navigate = useNavigate()
  const { isLoading, isAdmin, apiError, getLandmarkById} = store
  const {id}= useParams()
  const numId: number = Number(id)

  useEffect(()=>{
    getLandmarkById(numId)
  }, [numId, getLandmarkById])

  const onEdit = () => {
    navigate(`/updateLandmark/${numId}`)
  }

  if (apiError.message){
    return <ErrorComponent/>
  }

  if (isLoading){
    return <LoadingComponent/>
  }

  return (
    <>
    <div className={'landmark-detail'}>
        <div className={'detail-header'}>
          <Link className={'back-icon'} to={'/'}><Icon  data={ArrowLeft}/>Вернуться</Link>
          <Tooltip
            content="Включите режим администратора"
            placement="top"
            openDelay={0}
            disabled={isAdmin}
          >
            <div>
              <Button view={'outlined-info'} onClick={onEdit} disabled={!isAdmin}>Редактировать</Button>
            </div>
          </Tooltip>
        </div>
        <div className={'description-container'}>
          <img src={store.detailLandmark?.image} alt="" className="landmark-detail-img"/>
          <div className={'description-wrap'}>
            <Text variant={'subheader-2'}>Имя достопримечательности: {store.detailLandmark?.name}</Text>
            <div className={'description'}>
              <Text variant={'subheader-2'}>Описание достопримечательности:</Text>
              <Text wordBreak={'break-all'} > {store.detailLandmark?.description}</Text>
            </div>
          </div>
        </div>
        <div>
          <Text variant={'subheader-2'}>Рейтинг достопримечательности: {store.detailLandmark?.rating}</Text>
          <Slider
            value={store.detailLandmark?.rating}
            disabled={true}
            min={1}
            max={5}
            marks={5}
            size={'s'}
          />
        </div>
        <Text variant={'subheader-2'}>Локация: {store.detailLandmark?.location}</Text>
        <Text variant={'subheader-2'}>Достопримечательность на картах: <a href={store.detailLandmark?.mapsLink}>{store.detailLandmark?.mapsLink}</a></Text>
        <Text variant={'subheader-2'}>Координаты: {store.detailLandmark?.coordinates}</Text>
        <Text variant={'subheader-2'}>Дата создания: {new Date(String(store.detailLandmark?.createdAt)).toLocaleDateString('ru-RU',
          {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
          })}</Text>
      </div>
    </>
  )
})

export default LandmarkDetail