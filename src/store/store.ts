import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { formReducer, inputReducer } from "./reducers"


const rootReducer = combineReducers({
	inputReducer,
	formReducer,
})
console.log(formReducer);


export const setupStore = () => {
	return configureStore({
		reducer: rootReducer,
	})
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
