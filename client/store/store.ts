import { MakeStore, createWrapper, Context, HYDRATE } from "next-redux-wrapper";
import { configureStore, createAction, getDefaultMiddleware, Store } from "@reduxjs/toolkit";
import createSagaMiddleware, { Task } from "redux-saga";

import { reducer, RootState } from "./rootReducer";
import { rootSaga } from "./rootSaga";



export interface SagaStore extends Store {
  sagaTask?: Task;
}


const makeStore: MakeStore<RootState> = (context: Context) => {
  const sagaMiddleware = createSagaMiddleware();


  const store = configureStore({
    reducer,
    middleware: [...getDefaultMiddleware({serializableCheck: false}), sagaMiddleware],
    devTools: process.env.NODE_ENV !== "production",
    
  });

  (store as SagaStore).sagaTask = sagaMiddleware.run(rootSaga);
  return store;
};

export const wrapper = createWrapper<RootState>(makeStore, { debug: false });

// const sagaMiddleware = createSagaMiddleware();

// export const store = configureStore({
//   reducer: rootReducer,
//   middleware: [...getDefaultMiddleware(), sagaMiddleware],
//   devTools: process.env.NODE_ENV !== "production",
// });

// export type AppDispatch = typeof store.dispatch;
// export const useAppDispatch = () => useDispatch<AppDispatch>();

// sagaMiddleware.run(rootSaga);
