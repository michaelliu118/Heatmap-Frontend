//import { config } from "./../config";

export const getAuthInfo = async () => {
	/**
	 * Fetches authentication info provided by Azure authN/authZ (easy auth)
	 */
	const options = { method: "GET" };
	try {
		var response = await fetch("/.auth/me", options);
		var authInfo = await response.json();
		return authInfo;
	} catch (error) {
		console.log("Failed to get auth info", error);
	}
};

export const apiFetcher = async (url, method, body, headers) => {
	/*
	An async function for making requests to a backend API.
	Adds Azure Easy Auth's access token of the signed-in user
	to the authorization header of each request to the backend
	API

	@param <url:string>: The api endpoint
	@param <method:string>: HTTP method e.g. "GET", "POST"...
	@param <body:JSON>: Body of the request 
	@param <headers:JSON>: HTTP headers of the request

	@return <Promise>: The response returned from the API 
	*/

	// if not running locally add JSON web Token to headers


	const options = {
		headers: headers,
		method: method,
		body: JSON.stringify(body),
	};

	let response = await fetch(url, options);
	if (!response.ok) {
		let error = new Error(response.statusText);
		error.response = response;
		error.status = response.status;
		throw error;
	}

	return response;
};
