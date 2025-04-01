import {
  Table,
  TextInput,
  withTableSorting,
  withTableActions,
  Icon,
  Button,
  TableColumnConfig,
  TableDataItem, Switch, Text, Tooltip, Spin, TableActionConfig
} from '@gravity-ui/uikit';
import '@gravity-ui/uikit/styles/fonts.css';
import '@gravity-ui/uikit/styles/styles.css';
import './LandmarksTable.css';
import {FC, useEffect} from "react";
import {observer} from "mobx-react-lite";
import {store} from "../../store/store.ts";
import {Eye, Pencil, TrashBin } from '@gravity-ui/icons';
import {Link, useNavigate} from "react-router-dom";

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
    align: "center",
    meta: {
      sort: true
    },
    template: (item) => (
      <div>
        {new Date(item.createdAt).toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
        })}
      </div>
    )
  },
  {
    id: 'rating',
    name: 'Рейтинг',
    align: "center",
    meta: {
      sort: true
    }
  },
  {
    id: 'image',
    name: 'Фото',
    align: "center",
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
    align: "center",
    name: 'Местоположение',
  },
  {
    id: 'coordinates',
    align: "center",
    name: 'Координаты',
  },
  {
    id: 'mapsLink',
    name: 'Ссылка на карту',
    align: "center",
    template: (item) => (
      <a href={item.mapsLink} target="_blank" rel="noopener noreferrer">
        Открыть карту
      </a>
    ),
  },
  {
    id: 'status',
    name: 'Статус',
    align: "center",
  },
];


const LandmarksTable: FC = observer(() => {
  const navigate = useNavigate()
  const {    isLoading, isAdmin,  isHideViewed,
    getAllLandmark, setSearchQuery, setIsAdmin, deleteLandmark, setViewedLandmark, hideViewedLandmarks} = store

  useEffect(()=> {
    getAllLandmark()
  }, [getAllLandmark, deleteLandmark])

  const getRowActions  = (): TableActionConfig<TableDataItem> [] => {
    return [
      {
        text: 'Редактировать',
        icon: <Icon data={Pencil} size={16} />,
        handler: (item) => {
          navigate(`/updateLandmark/${item.id}`)
        },
        disabled: !isAdmin,
      },
      {
        text: 'Осмотрел',
        icon: <Icon data={Eye} size={16} />,
        handler: (item ) => {
          setViewedLandmark(item.id)
        },
      },
      {
        text: 'Удалить',
        icon: <Icon data={TrashBin} size={16} />,
        handler: (item) => {
           deleteLandmark(item.id)
        },
        disabled: !isAdmin,
      },
    ];
  };

  if (isLoading){
    return <Spin></Spin>
  }

  return (
    <>
      <h2>Кол-во достопримечательностей: {store.amount}</h2>
      <div className="search-container">
        <TextInput
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Поиск по названию или описанию"
        />
        <div className={'admin-switch'}>
          <Text>Режим администратора:</Text>
          <Switch checked={isAdmin} onUpdate={(checked) => {
            setIsAdmin(checked)
          }}/>
        </div>
        <Tooltip
          content="Включите режим администратора"
          placement="top"
          openDelay={0}
          disabled={isAdmin}
        >
          <div>
            <Button
              disabled={!isAdmin}
              view={"outlined-info"}
            >
              <Link to={"/newlandmark"}>Добавить достопримечательность</Link>
            </Button>
          </div>
        </Tooltip>


        <Button
          view={"outlined-action"}
          onClick={() => hideViewedLandmarks()}
          className={"hide-btn"}
        >
          {
             isHideViewed ? "Показать все" : " Скрыть осмотренные"
          }
        </Button>
      </div>
      <MyTable
        data={store.searchLandmarks}
        columns={columns}
        getRowActions={getRowActions}
        rowActionsSize={'l'}
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