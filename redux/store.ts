import {configureStore} from '@reduxjs/toolkit';
import {userSlice} from './states/user';
import {confirmacionSlice} from "./states/confirmacion";

export interface AppStore {
    user: any;
    confirmacion: any;
}

export const store = configureStore<AppStore>({
    reducer: {
        user: userSlice.reducer,
        confirmacion: confirmacionSlice.reducer
    }
});
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
