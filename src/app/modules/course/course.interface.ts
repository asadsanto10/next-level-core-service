export type ICourseCreateData = {
	title: string;
	code: string;
	credits: number;
	preRequisiteCourses: Array<{
		courseId: string;
	}>;
};

export type ICourseFilterRequest = {
	searchTerm?: string | undefined;
};
