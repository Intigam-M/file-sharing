import {configureStore} from "@reduxjs/toolkit";
import auth from "~/store/auth";
import modal from "~/store/modal";

const store = configureStore({
	reducer: {
		auth,
        modal,
	}
})

export default store