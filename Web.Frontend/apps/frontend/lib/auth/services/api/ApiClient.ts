export interface ApiResponse<T = unknown> {
    data: T;
    status: number;
    statusText: string;
}

export interface ApiError {
    message: string;
    status?: number;
    data?: unknown;
}

export class ApiClient {
    private baseURL: string;

    constructor(baseURL: string) {
        this.baseURL = baseURL.replace(/\/$/, ''); // Remove trailing slash
    }

    private async request<T = any>(
        endpoint: string,
        options: RequestInit = {}
    ): Promise<ApiResponse<T>> {
        const url = `${this.baseURL}${endpoint}`;

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            ...options.headers,
        };

        const config: RequestInit = {
            ...options,
            credentials: 'include', // Always include cookies
            headers,
        };

        try {
            const response = await fetch(url, config);
            
            let data: T;
            const contentType = response.headers.get('content-type');
            
            if (contentType && contentType.includes('application/json')) {
                data = await response.json();
            } else {
                data = await response.text() as unknown as T;
            }

            if (!response.ok) {
                const error: ApiError = {
                    message: `HTTP error! status: ${response.status}`,
                    status: response.status,
                    data
                };
                throw error;
            }

            return {
                data,
                status: response.status,
                statusText: response.statusText
            };
        } catch (error) {
            if (error instanceof Error) {
                throw {
                    message: error.message,
                    status: 0
                } as ApiError;
            }
            throw error;
        }
    }

    async get<T = any>(endpoint: string, config?: RequestInit): Promise<ApiResponse<T>> {
        return this.request<T>(endpoint, {
            method: 'GET',
            ...config,
        });
    }

    async post<T = unknown>(endpoint: string, data?: unknown, config?: RequestInit): Promise<ApiResponse<T>> {
        return this.request<T>(endpoint, {
            method: 'POST',
            body: data ? JSON.stringify(data) : undefined,
            ...config,
        });
    }

    async put<T = unknown>(endpoint: string, data?: unknown, config?: RequestInit): Promise<ApiResponse<T>> {
        return this.request<T>(endpoint, {
            method: 'PUT',
            body: data ? JSON.stringify(data) : undefined,
            ...config,
        });
    }

    async patch<T = unknown>(endpoint: string, data?: unknown, config?: RequestInit): Promise<ApiResponse<T>> {
        return this.request<T>(endpoint, {
            method: 'PATCH',
            body: data ? JSON.stringify(data) : undefined,
            ...config,
        });
    }

    async delete<T = any>(endpoint: string, config?: RequestInit): Promise<ApiResponse<T>> {
        return this.request<T>(endpoint, {
            method: 'DELETE',
            ...config,
        });
    }
}