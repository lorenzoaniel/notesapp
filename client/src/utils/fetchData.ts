import { ConflictError, UnauthorizedError } from "../errors/http_error";

export const fetchData = async (input: RequestInfo, init?: RequestInit) => {
	const response = await fetch(input, {
		...init,
		headers: {
			"Content-Type": "application/json",
			"Access-Control-Allow-Origin": "https://animated-melba-f0cb96.netlify.app",
			"Access-Control-Allow-Headers": "Content-Type",
			Referer: "https://animated-melba-f0cb96.netlify.app",
		},
		credentials: "include",
		mode: "cors",
		referrerPolicy: "strict-origin-when-cross-origin",
	});
	if (response.ok) {
		return response;
	} else {
		const errorBody = await response.json();
		const errorMessage = errorBody.error;
		if (response.status === 401) {
			throw new UnauthorizedError(errorMessage);
		} else if (response.status === 409) {
			throw new ConflictError(errorMessage);
		} else {
			throw Error("Request failed with status: " + response.status + " message: " + errorMessage);
		}
	}
};
