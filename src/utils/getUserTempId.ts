import { v4 as uuidv4 } from "uuid";

let userTempId = localStorage.getItem("userTempId");

export default function getUserTempId(): string {
	if (!userTempId) {
		userTempId = uuidv4();
		localStorage.setItem("userTempId", userTempId);
	}

	return userTempId;
}
