import {FC} from "react";
import {useForm} from "react-hook-form";
import {ILandmark} from "../interfaces/ILandmark.ts";
import {Button, Slider, TextArea, TextInput} from "@gravity-ui/uikit";
import {store} from "../store/store.ts";
import {observer} from "mobx-react-lite";
import {Link} from "react-router-dom";


const LandmarksForm: FC = observer(() => {
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
    store.newLandMarks(data)
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{marginBottom: '16px'}}>
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
          width={'max'}
        >
          Добавить
        </Button>
        <Link  to={'/'}>Вернуться</Link>
      </form>
    </>
  )
})

export default LandmarksForm