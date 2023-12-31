export interface IContact {
	tel: string,
	email: string,
}
export interface IAdvan {
	checkbox: string
	radio: string
	inputs: { id: number; value: string }[];
}

export interface IPersonal {
	nickName: string
	name: string
	surname: string
	sex: { value: string; label: string } | string;
}

export interface IData {
	about: string
	contacts: IContact;
	advantages: IAdvan
	personalData: IPersonal
}
export interface FormState {
	data: IData,
}
export interface InputField {
	id: number;
	value: string;
}

