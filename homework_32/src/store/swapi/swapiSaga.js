import { call, put, takeLatest, select, all } from 'redux-saga/effects';
import axios from 'axios';
import {
  fetchPeopleSuccess,
  fetchPeopleFailure,
  fetchPeopleRequest,
} from './swapiSlice';

const SWAPI_BASE_URL = 'https://swapi.tech/api/';

const getCurrentSwapiPage = (state) => state.swapi.page;


function* fetchPersonDetails(personSummary) { 
    try {
        const response = yield call(axios.get, personSummary.url);
        if (response.data && response.data.result && response.data.result.properties) {
            return {
                uid: personSummary.uid, 
                ...response.data.result.properties, 
            };
        } else {
            console.error(`Неочікувана структура відповіді для деталей персонажа з ${personSummary.url}:`, response.data);
            return null; 
        }
    } catch (error) {
        console.error(`Помилка при завантаженні деталей персонажа з ${personSummary.url}:`, error);
        return null; 
    }
}

function* handleFetchPeople(action) {
    try {
      const pageToFetch = action.payload?.page || (yield select(getCurrentSwapiPage));

      const listResponse = yield call(axios.get, `${SWAPI_BASE_URL}people/?page=${pageToFetch}&limit=10`); // Додаємо limit для консистентності

      const summaryPeople = listResponse.data.results; 

      const totalRecords = listResponse.data.total_records; 
      const totalPagesFromApi = listResponse.data.total_pages; 
      const nextUrl = listResponse.data.next;
      const previousUrl = listResponse.data.previous;

      const detailTasks = summaryPeople.map(personSummary =>
          call(fetchPersonDetails, personSummary)
      );

      const detailedPeopleWithPossibleNulls = yield all(detailTasks);

      const validDetailedPeople = detailedPeopleWithPossibleNulls.filter(person => person !== null);

      yield put(fetchPeopleSuccess({
          results: validDetailedPeople,   
          count: totalRecords,            
          next: nextUrl,
          previous: previousUrl,
          totalPagesFromApi: totalPagesFromApi 
      }));

    } catch (error) {
      console.error("Помилка у сазі handleFetchPeople:", error);
      let errorMessage = "Невідома помилка при завантаженні персонажів";
      if (error.response) {
        
        errorMessage = `Серверна помилка: ${error.response.status} - ${JSON.stringify(error.response.data)}`;
      } else if (error.request) {
        
        errorMessage = "Не вдалося отримати відповідь від сервера. Перевірте з'єднання.";
      } else {
        errorMessage = error.message;
      }
      yield put(fetchPeopleFailure(errorMessage));
    }
  }


export function* watchSwapi() {
  yield takeLatest(fetchPeopleRequest.type, handleFetchPeople);
}




