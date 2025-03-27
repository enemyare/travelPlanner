import {FC} from "react";
import {useForm} from "react-hook-form";
import {ILandmark} from "../../interfaces/ILandmark.ts";
import {Button, Slider, TextArea, TextInput} from "@gravity-ui/uikit";
import {store} from "../../store/store.ts";
import {observer} from "mobx-react-lite";
import {Link, useNavigate} from "react-router-dom";
import './LandmarkForm.css'

const LandmarkForm: FC = observer(() => {
  const navigate = useNavigate();
  const {register, handleSubmit,setValue} = useForm<ILandmark>({
    defaultValues:{
      name: '',
      description: '',
      image: '',
      location: '',
      coordinates: '',
    }
  })
  const onSubmit = (data: ILandmark) => {
    store.newLandmark(data)
    navigate('/')
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={'form-container'}>
        <div className={'form-header'}>
          <Button view={'outlined-info'}>Редактировать</Button>
          <Link  to={'/'} className={'form-link'}>Вернуться</Link>
        </div>
        <div>
          <label htmlFor='name'>Имя достопримечательности:</label>
          <TextInput
            id={'name'}
            {...register('name')}
            placeholder='Введите название'
            size="l"
          />
        </div>
        <div>
          <label htmlFor='description'>Описание достопримечательности:</label>
          <TextArea
            id={'description'}
            placeholder={'Введите описание'}
            {...register('description')}
          />
        </div>
        <div>
          <label htmlFor='rating'>Оценка достопримечательности:</label>
          <Slider
            id={'rating'}
            {...register('rating')}
            min={1}
            max={5}
            marks={5}
            size={'s'}
            onUpdate={(value) => setValue('rating', value)}
          />
        </div>
        <div>
          <label htmlFor='description'>Фото:</label>
          <TextInput
            {...register('image')}
            placeholder={'Введите ссылку на фотографию'}
          />
        </div>
        <div>
          <label htmlFor='description'>Локация:</label>
          <TextInput
            {...register('location')}
            placeholder={'Введите локацию'}
          />
        </div>
        <div>
          <label htmlFor='description'>Введите координаты в формате 00.0000, 00.0000:</label>
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
          Добавить
        </Button>
      </form>
    </>
  )
})

export default LandmarkForm