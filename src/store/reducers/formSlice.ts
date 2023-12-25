import { FormState } from '@/models/IForm';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


const initialState: FormState = {
	about: '',
	contacts: { tel: '', email: '' },
	advantages: { inputs: [{ id: 1, value: '' }], checkbox: '', radio: '' },
	personalData: { nickName: '', name: '', fullname: '', sex: '' }
};

const formSlice = createSlice({
	name: 'form',
	initialState,
	reducers: {
		setFormData: (state, action) => {
			// state.formData = action.payload
			return { ...state, ...action.payload };
		},
		submitForm: (state, action) => {
			console.log('Form submitted:', { ...state, ...action.payload });
		},
	},
});

export const { setFormData, submitForm } = formSlice.actions;

export default formSlice.reducer;
