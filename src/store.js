import { configureStore } from "@reduxjs/toolkit";
import emailListDataSlice from './actions/emailListActions';
import emailBodyDataSlice from './actions/bodyActions';

export const store = configureStore({
    reducer: {
        emailList: emailListDataSlice,
        emailBody: emailBodyDataSlice
    },
});