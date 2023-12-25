import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InputField {
	id: number;
	value: string;
}

interface FormState {
	inputFields: InputField[];
}

const initialState: FormState = {
	inputFields: [{ id: 1, value: '' }],
};

const inputSlice = createSlice({
	name: 'input',
	initialState,
	reducers: {
		addInputField: (state) => {
			const newId = state.inputFields.length + 1;
			state.inputFields.push({ id: newId, value: '' });
		},
		removeInputField: (state, action: PayloadAction<number>) => {
			state.inputFields = state.inputFields.filter((field) => field.id !== action.payload);
		},
		updateInputValue: (state, action: PayloadAction<{ id: number; value: string }>) => {
			const { id, value } = action.payload;
			const field = state.inputFields.find((f) => f.id === id);
			if (field) {
				field.value = value;
			}
		},
	},
});

export const { addInputField, removeInputField, updateInputValue } = inputSlice.actions;

export default inputSlice.reducer;
