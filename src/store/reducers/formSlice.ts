import { FormState } from '@/models/IForm';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const defauldData = {
	about: '',
	contacts: { tel: '', email: '' },
	advantages: { inputs: [{ id: 1, value: '' }], checkbox: '', radio: '' },
	personalData: { nickName: '', name: '', surname: '', sex: { label: '', value: '' } }
}
const initialState: FormState = {
	data: defauldData
};

const formSlice = createSlice({
	name: 'form',
	initialState,
	reducers: {
		// setFormData: (state, action) => void ({ ...state.data, ...action.payload }),
		setFormData: (state, action) => {
			state.data = { ...state.data, ...action.payload }
		},
		clearSubmit: (state, action) => {
			state.data = defauldData
		},
	},
});

export const { setFormData, clearSubmit } = formSlice.actions;

export default formSlice.reducer;
