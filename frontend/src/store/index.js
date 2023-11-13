import { configureStore, getDefaultMiddleware  } from '@reduxjs/toolkit'
import auth from "~/store/auth";
import modal from "~/store/modal";

const store = configureStore({
	reducer: {
		auth,
        modal,
	},
    middleware: getDefaultMiddleware({
        serializableCheck: false,
    }),
})

export default store