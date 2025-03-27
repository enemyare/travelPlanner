import {
  Table,
  TextInput,
  withTableSorting,
  withTableActions,
  Icon,
  Button,
  TableColumnConfig,
  TableDataItem
} from '@gravity-ui/uikit';
import '@gravity-ui/uikit/styles/fonts.css';
import '@gravity-ui/uikit/styles/styles.css';
import './LandmarksTable.css';
import {FC} from "react";
import {observer} from "mobx-react-lite";
import {store} from "../../store/store.ts";
import {Eye, Pencil, TrashBin } from '@gravity-ui/icons';
import {Link, useNavigate} from "react-router-dom";
import {ILandmark} from "../../interfaces/ILandmark.ts";

const TableWithSorting = withTableSorting(Table);
const MyTable = withTableActions(TableWithSorting);

const columns: TableColumnConfig<TableDataItem>[] = [
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
    template: (item ) => (
      item.image ?
      <img
        className={'table-img'}
        src={item.image}
        alt={''}
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
    template: (item) => (
      <a href={item.mapsLink} target="_blank" rel="noopener noreferrer">
        Открыть карту
      </a>
    ),
  },
  {
    id: 'status',
    name: 'Статус',
  },
];


const LandmarksTable: FC = observer(() => {
  const navigate = useNavigate()

  const getRowActions = () => {
    return [
      {
        text: 'Редактировать',
        icon: <Icon data={Pencil} size={16} />,
        handler: () => {},
      },
      {
        text: 'Осмотрел',
        icon: <Icon data={Eye} size={16} />,
        handler: (item:ILandmark) => {
          store.setViewedLandmark(item.id)
        },
      },
      {
        text: 'Удалить',
        icon: <Icon data={TrashBin} size={16} />,
        handler: (item:ILandmark) => {
          store.deleteLandmark(item.id)
        },
      },
    ];
  };

  return (
    <>
      <div className="search-container">
        <TextInput
          onChange={(e) => store.setSearchQuery(e.target.value)}
          placeholder="Поиск по названию или описанию"
          style={{ marginBottom: '16px' }}
        />
        <Button
          view={"outlined-info"}
        >
          <Link to={"/newlandmark"}>Добавить достопримечательность</Link>
        </Button>

        <Button
          view={"outlined-action"}
          onClick={() => store.hideViewedLandmarks()}
          className={"hide-btn"}
        >
          {
            store.isHideViewed ? "Показать все": " Скрыть осмотренные"
          }
        </Button>
      </div>
      <MyTable
        data={store.searchLandmarks}
        columns={columns}
        getRowActions={getRowActions}
        rowActionsSize = {'l'}
        emptyMessage="Достопримечательности не найдены"
        className={"table"}
        onRowClick={(item) => {
          navigate(`/landmark/${item.id}`);
        }}
      />
    </>

  );
});

export default LandmarksTable;