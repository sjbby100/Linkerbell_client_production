/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { all, takeLatest, put } from "redux-saga/effects";
import fetchAllListApi from "../../core/apis/fetchAllList";
import { Category_url_list, Url } from "../../models/UrlStateTypes";
import _ from "lodash";
import {
  FETCH_ALL_LIST,
  FETCH_ALL_LIST_REQUEST,
  FETCH_CATEGORIES_URL_LIST,
  CATEGORISE_FAVORITE_LIST,
  UPDATE_CATEGORIES_URL_LIST,
} from "../module/linkData";

export default function* authSaga() {
  yield all([
    takeLatest(FETCH_ALL_LIST_REQUEST, fetchAllList$),
    takeLatest(UPDATE_CATEGORIES_URL_LIST, updateCategoriesList$),
  ]);
}

function* fetchAllList$() {
  try {
    const res = yield fetchAllListApi();
    const AllList = { ...res.data };
    yield put({ type: FETCH_ALL_LIST, payload: { AllList } });
    yield fetchList$(AllList.lists);
  } catch (e) {
    console.log(e.response.data);
  }
}
function* updateCategoriesList$(action: any) {
  const { AllList } = action.payload;
  try {
    yield fetchList$(AllList);
    const favorite_list: Url[] = [];
    _.forEach(AllList, (item: Url) => {
      item.favorite && favorite_list.push(item);
    });
    yield categoriseFavList(favorite_list);
  } catch (e) {
    console.log(e.response.data);
  }
}

function* fetchList$(lists: Url[]) {
  try {
    const categories_url_list: Category_url_list = {};
    const favorite_list: Url[] = [];
    _.forEach(lists, (item: Url) => {
      const { category_id } = item;
      item.favorite && favorite_list.push(item);
      if (categories_url_list[category_id]) {
        categories_url_list[category_id].push(item);
      } else {
        categories_url_list[category_id] = [];
        categories_url_list[category_id].push(item);
      }
    });
    yield put({
      type: FETCH_CATEGORIES_URL_LIST,
      payload: { categories_url_list },
    });
    yield categoriseFavList(favorite_list);
  } catch (e) {
    console.log(e.response.data);
  }
}

function* categoriseFavList(favorite_list: Url[]) {
  yield put({
    type: CATEGORISE_FAVORITE_LIST,
    payload: { favorite_list },
  });
}