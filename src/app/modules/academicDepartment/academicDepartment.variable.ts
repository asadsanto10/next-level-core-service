export const academicDepartmentFilterableFields: Array<string> = [
	'searchTerm',
	'id',
	'academicFacultyId',
	'title',
];

export const academicDepartmentSearchableFields: Array<string> = ['title'];

export const academicDepartmentRelationalFields: Array<string> = ['academicFacultyId'];
export const academicDepartmentRelationalFieldsMapper: { [key: string]: string } = {
	academicFacultyId: 'academicFaculty',
};
export const academicDepartmentOptions = ['limit', 'page', 'sortBy', 'sortOrder'];
