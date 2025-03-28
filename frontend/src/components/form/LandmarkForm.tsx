import {FC, useEffect} from "react";
import {useForm} from "react-hook-form";
import {ILandmark} from "../../interfaces/ILandmark.ts";
import {Button, Slider, Text, TextArea, TextInput} from "@gravity-ui/uikit";
import {store} from "../../store/store.ts";
import {observer} from "mobx-react-lite";
import {Link, useNavigate} from "react-router-dom";
import './LandmarkForm.css'
import {ArrowLeft} from "@gravity-ui/icons";
import {Icon} from "@gravity-ui/uikit";

const LandmarkForm: FC = observer(() => {
  const navigate = useNavigate();
  const {register, reset, handleSubmit,setValue} = useForm<ILandmark>({
    defaultValues:{
      name: '',
      description: '',
      image: '',
      location: '',
      coordinates: '',
    }
  })

  useEffect(()=>{
    if (store.isEditFormMode.isEdit){
      const landmark = store.landmarkById(store.isEditFormMode.id)
      if(landmark){
        reset(landmark)
      }
    }
  }, [])

  const onSubmit = (data: ILandmark) => {
    if (!store.isEditFormMode.isEdit){
      store.newLandmark(data)
      navigate('/')
    } else{
      store.updateLandmark(data, store.isEditFormMode.id)
      navigate('/')
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={'form-container'}>
          <Link to={'/'} className={'form-link'}><Icon data={ArrowLeft}/>Вернуться</Link>
        <div>
          <Text variant={'subheader-2'}>Имя достопримечательности:</Text>
          <TextInput
            id={'name'}
            {...register('name')}
            placeholder='Введите название'
            size="l"
          />
        </div>
        <div>
          <Text variant={'subheader-2'}>Описание достопримечательности:</Text>
          <TextArea
            placeholder={'Введите описание'}
            {...register('description')}
          />
        </div>
        <div>
          <Text variant={'subheader-2'}>Оценка достопримечательности:</Text>
          <Slider
            {...register('rating')}
            min={1}
            max={5}
            marks={5}
            size={'s'}
            onUpdate={(value) => setValue('rating', value)}
          />
        </div>
        <div>
          <Text variant={'subheader-2'}>Фото:</Text>
          <TextInput
            {...register('image')}
            placeholder={'Введите ссылку на фотографию'}
          />
        </div>
        <div>
          <Text variant={'subheader-2'}>Локация:</Text>
          <TextInput
            {...register('location')}
            placeholder={'Введите локацию'}
          />
        </div>
        <div>
          <Text variant={'subheader-2'}>Введите координаты в формате 00.0000,00.0000:</Text>
          <TextInput
            {...register('coordinates')}
            placeholder={'Ведите координаты'}
          />
        </div>

        <Button
          type={'submit'}
          view={'outlined-action'}
          width={'max'}
        >
          Сохранить
        </Button>
      </form>
    </>
  )
})

export default LandmarkForm