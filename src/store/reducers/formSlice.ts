import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface IContact {
	tel: string,
	email: string
}
interface IAdvan {
	checkbox: string
	radio: string
	inputs: { id: number; value: string }[];
	sex: { value: string; label: string } | string;
}

interface IPersonal {
	nickName: string
	name: string
	fullname: string
	sex: { value: string; label: string } | string;
}
interface FormState {
	contacts: IContact;
	advantages: IAdvan
	about: string
	personalData: IPersonal
}

const initialState: FormState = {
	contacts: { tel: '', email: '' },
	advantages: { inputs: [{ id: 1, value: '' }], checkbox: '', radio: '', sex: '' },
	about: '',
	personalData: { nickName: '', name: '', fullname: '', sex: '' }
};

const formSlice = createSlice({
	name: 'form',
	initialState,
	reducers: {
		setFormData: (state, action) => {
			return { ...state, ...action.payload };
		},
		submitForm: (state, action) => {
			console.log('Form submitted:', { ...state, ...action.payload });
		},
	},
});

export const { setFormData, submitForm } = formSlice.actions;

export default formSlice.reducer;
