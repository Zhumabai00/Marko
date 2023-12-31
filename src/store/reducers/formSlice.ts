import { FormState } from '@/models/IForm';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


const initialState: FormState = {
	data: {
		about: '',
		contacts: { tel: '', email: '' },
		advantages: { inputs: [{ id: 1, value: '' }], checkbox: '', radio: '' },
		personalData: { nickName: '', name: '', surname: '', sex: { label: '', value: '' } }
	},
	inputstore: {
		about: '',
		tel: '',
		email: '',
		nickName: '',
		name: '',
		surname: '',
		sex: { label: '', value: '' },
		personalData: { nickName: '', name: '', surname: '', sex: { label: '', value: '' } }
	},
};

const formSlice = createSlice({
	name: 'form',
	initialState,
	reducers: {
		// setFormData: (state, action) => void ({ ...state.data, ...action.payload }),
		setFormData: (state, action) => {
			state.data = { ...state.data, ...action.payload }
		},
		handleChange: (state, action) => {
			state.inputstore = { ...state.inputstore, ...action.payload }
		},
	},
});

export const { setFormData, handleChange } = formSlice.actions;

export default formSlice.reducer;
