export interface User {
	phone: string;
	password: string;
	code: string;
}

export interface UserForm {
	form: User;
}

// Pick挑选：从User模块挑选phone和password组成一个新类型
export type UserParams = Pick<User, "phone" | "password">;
