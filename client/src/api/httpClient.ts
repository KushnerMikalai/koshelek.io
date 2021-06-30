import axios, {AxiosInstance, AxiosResponse} from 'axios'

declare module 'axios' {
    interface AxiosResponse<T = any> extends Promise<T> {
    }
}

abstract class HttpClient {
    protected readonly instance: AxiosInstance;

    public constructor(baseURL: string) {
        this.instance = axios.create({
            baseURL,
        });

        this._initializeResponseInterceptor();
    }

    private _handleResponse = ({data}: AxiosResponse) => data
    protected _handleError = (error: any) => Promise.reject(error)

    private _initializeResponseInterceptor = () => {
        this.instance.interceptors.response.use(
            this._handleResponse,
            this._handleError,
        )
    }
}

export default HttpClient
