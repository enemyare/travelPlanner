import {Table, TextInput, withTableSorting, withTableActions} from '@gravity-ui/uikit';
import '@gravity-ui/uikit/styles/fonts.css';
import '@gravity-ui/uikit/styles/styles.css';
import './table.css';
import {FC, useEffect} from "react";
import {observer} from "mobx-react-lite";
import {store} from "../store/store.ts";
import {ILandmark} from "../interfaces/landmark.ts";

const TableWithSorting = withTableSorting(Table);
const MyTable = withTableActions(TableWithSorting);

const landmarks: Array<ILandmark> = [
  {
    id: 1,
    name: 'Эйфелева башня',
    description: 'Знаменитая башня в Париже.',
    rating: 5,
    status: 'В планах',
    createdAt : '14:00 15.01.25',
    location: 'Париж, Франция',
    coordinates: "48.8584, 2.2945",
    image: 'https://sun9-9.userapi.com/impg/0e9ec2gq78lmC4sUqU9m2M5wL8i0GVS-pGN3LA/83zcgL815AA.jpg?size=1620x2160&quality=95&sign=9c5b9599f1b8f584112db9e6081e6d5c&type=album',
    mapsLink: 'https://maps.google.com/?q=48.8584,2.2945',
  },
  {
    id: 2,
    name: 'Колизей',
    description: 'Амфитеатр в Риме, символ древней истории.',
    rating: 4,
    status: 'Осмотрена',
    location: 'Рим, Италия',
    createdAt : '14:00 15.02.25',
    image: 'https://sun9-9.userapi.com/impg/0e9ec2gq78lmC4sUqU9m2M5wL8i0GVS-pGN3LA/83zcgL815AA.jpg?size=1620x2160&quality=95&sign=9c5b9599f1b8f584112db9e6081e6d5c&type=album',
    coordinates: "41.8902, 12.4922",
    mapsLink: 'https://maps.google.com/?q=41.8902,12.4922',
  },
  {
    id: 3,
    name: 'Статуя Свободы',
    description: 'Символ свободы и демократии в Нью-Йорке. dsdadasdasdasdsadasdasdasdasdadasdasdasdasdasdasdassdasdasdssad',
    rating: 3,
    status: 'В планах',
    createdAt : '16:00 15.01.25',
    location: 'Нью-Йорк, США',
    image: 'https://sun9-9.userapi.com/impg/0e9ec2gq78lmC4sUqU9m2M5wL8i0GVS-pGN3LA/83zcgL815AA.jpg?size=1620x2160&quality=95&sign=9c5b9599f1b8f584112db9e6081e6d5c&type=album',
    coordinates: "40.6892, -74.0445",
    mapsLink: 'https://maps.google.com/?q=40.6892,-74.0445',
  },
];


const columns = [
  {
    id: 'id',
    meta: {
      sort: true
    }
  },
  {
    id: 'name',
    name: 'Название',
    meta: {
      sort: true
    }
  },
  {
    id: 'description',
    name: 'Описание',
    className: 'description-cell',
  },
  {
    id: 'createdAt',
    name: 'Добавлено',
  },
  {
    id: 'rating',
    name: 'Рейтинг',
    meta: {
      sort: true
    }
  },
  {
    id: 'image',
    name: 'Фото',
    template: (item: any) => (
      item.image ?
      <img
        src={item.image}
        style={{ width: '100px', height: 'auto', borderRadius: '4px' }}
      />:
        <span>Отсутствует</span>
    ),
  },
  {
    id: 'location',
    name: 'Местоположение',
  },
  {
    id: 'coordinates',
    name: 'Координаты',
  },
  {
    id: 'mapsLink',
    name: 'Ссылка на карту',
    template: (item: any) => (
      <a href={item.mapsLink} target="_blank" rel="noopener noreferrer">
        Открыть карту
      </a>
    ),
  },
  {
    id: 'status',
    name: 'Статус',
  },
  // {
  //   id: 'actions',
  //   name: 'Действия',
  //   template: (item: any) => (
  //     <Button
  //       view="outlined"
  //       onClick={() => {item}}
  //     >
  //       Выбрать
  //     </Button>
  //   ),
  // },
];


const LandmarksTable: FC = observer(() => {
  useEffect(()=>{
    store.setCount(landmarks.length)
    store.filteredData = landmarks
  }, [landmarks.length])

  const getRowActions = () => {
    return [
      {
        text: 'Редактировать',
        handler: () => {},
      },
      {
        text: 'Просмотр',
        handler: () => {},
      },
      {
        text: 'Удалить',
        handler: (item:any) => {store.deleteLandmark(item.id)},
      },
    ];
  };

  return (
    <>
      <TextInput
        value={store.searchQuery}
        onChange={(e) => store.searchLandmarks(e.target.value, landmarks)}
        placeholder="Поиск по названию или описанию"
        style={{ marginBottom: '16px' }}
      />
      <MyTable
        data={store.filteredData}
        columns={columns}
        getRowActions={getRowActions}
        rowActionsSize = {'l'}
        emptyMessage="Достопримечательности не найдены"
        className={"table"}
      />
    </>

  );
});

export default LandmarksTable;