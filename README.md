# Веб-приложение для управления достопримечательностями  
##  Основные возможности

- Веб-приложение для управления достопримечательностями
- Основные возможности
- Сортировка
- Счётчик достопримечательностей
- Режим администратора
- Добавление новых достопримечательностей
- Удаление достопримечательностей
- Редактирование достопримечательностей
- Отметка просмотренных достопримечательностей
- Поиск по названию и описанию
  
## Технологии

- **Frontend**:
  - React  + TypeScript
  - MobX 
  - Gravity UI Design System
  - React Router 6
  - React Hook Form

- **Backend**:
  - Nest  
  - Prisma

## Установка и запуск 
#### Запуск frontend
1. Клонировать репозиторий и открыть папку проекта:
``` 
git clone https://github.com/enemyare/travelPlanner.git
cd travelPlanner
```
2. Открыть frontend
``` 
cd frontend
```
3. Установить зависимости:
```
npm install
```
4. Запустить:
```
npm run dev
```

#### Запуск backend
1. Открыть папку проекта и установить зависимости
```
cd backend
npm install
```
2. Добавить в .env данные для подключения к базе данных
```
DATABASE_URL="postgresql://youruser:password@localhost:5432/yourdb?schema=public"
```
3. Запустить генерацию prisma client и произвести миграцию
```
prisma generate
npx prisma migrate dev --name "description"
```
4. Запустить проект
```
nest start
```

## REST API 
 - GET /api/landmark — получение списка всех достопримечательностей
 - GET /api/landmark/{id} — получение конкретной достопримечательности по ID
 - POST /api/landmark — создание новой достопримечательности
 - DELETE /api/landmark/{id} — удаление достопримечательности
 - PATCH /api/landmark/{id} — обновление существующей достопримечательности 
 - GET /api/landmark/search — поиск по названию и описанию
