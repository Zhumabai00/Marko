export interface IContact {
	tel: string,
	email: string
}
export interface IAdvan {
	checkbox: string
	radio: string
	inputs: { id: number; value: string }[];
}

export interface IPersonal {
	nickName: string
	name: string
	fullname: string
	sex: { value: string; label: string } | string;
}
export interface FormState {
	contacts: IContact;
	advantages: IAdvan | string
	about: string
	personalData: IPersonal | string
}
export interface InputField {
	id: number;
	value: string;
}

