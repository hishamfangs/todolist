export interface ApiResponse<T> {
	status: "success" | "error";
	data?: T;
	message?: string;
	error?: {
		message: string;
		code?: string;
	};
}

export class ApiError extends Error {
	code: string;

	constructor(message: string, code: string = "UNKNOWN") {
		super(message);
		this.code = code;
		this.name = "ApiError";
	}
}

export async function handleApiResponse<T>(response: Response): Promise<T> {
	// Handle server errors
	if (!response.ok && response.status >= 500) {
		throw new ApiError("Server error", "SERVER_ERROR");
	}

	let body: ApiResponse<T>;
	try {
		body = await response.json();
	} catch (e) {
		throw new ApiError("Invalid JSON response", "INVALID_RESPONSE");
	}

	// Check if response has the unified format
	if (body.status === "error") {
		throw new ApiError(
			body.error?.message || "Unknown error",
			body.error?.code || "UNKNOWN"
		);
	}

	if (body.status === "success") {
		return body.data as T;
	}

	// Fallback for any unexpected format
	throw new ApiError("Unexpected response format", "INVALID_RESPONSE");
}
