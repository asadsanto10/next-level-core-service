import { IPageOtions } from '../interface/pagination';

interface IPageOptionsReturn extends Partial<IPageOtions> {
	skip?: number;
}

const calculatePagination = (pageOptions: Partial<IPageOtions>): IPageOptionsReturn => {
	const page = Number(pageOptions.page || 1);
	const limit = Number(pageOptions.limit || 10);
	const skip = (page - 1) * limit;

	const sortBy = pageOptions.sortBy || 'createdAt';
	const sortOrder = pageOptions.sortOrder || 'desc';
	return {
		page,
		limit,
		skip,
		sortBy,
		sortOrder,
	};
};

export default calculatePagination;
