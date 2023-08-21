export interface IGenericResponse<T> {
	data: T;
	meta: {
		page: number;
		limit: number;
		total: number;
	};
}
