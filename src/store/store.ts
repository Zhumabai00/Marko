import { PostsApi } from "@/services/PostsApi"
import { combineReducers, configureStore } from "@reduxjs/toolkit"



const rootReducer = combineReducers({
	// userReducer,
	[PostsApi.reducerPath]: PostsApi.reducer
})

export const setupStore = () => {
	return configureStore({
		reducer: rootReducer,
		// middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(postAPI.middleware)
		middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(PostsApi.middleware)
	})
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
