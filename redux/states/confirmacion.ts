import { createSlice } from '@reduxjs/toolkit';
import {RootState} from "../store";

export const ConfirmacionState: any = {
  value: false
};

export const confirmacionSlice = createSlice({
  name: 'confirmacion',
  initialState: ConfirmacionState,
  reducers: {
    createConfirmacion: (state, action) => action.payload,
    modifyConfirmacion: (state, action) => ({ ...state, ...action.payload }),
    resetConfirmacion: () => ConfirmacionState
  }
});

export const { createConfirmacion, modifyConfirmacion, resetConfirmacion } = confirmacionSlice.actions;
export const selectConfirmacion = (state: RootState) => state.confirmacion.value
export default confirmacionSlice.reducer;
