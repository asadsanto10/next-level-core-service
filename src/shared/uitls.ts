/* eslint-disable no-plusplus */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const asyncForEach = async (array: Array<any>, callback: any): Promise<void> => {
	if (!Array.isArray(array)) {
		throw new Error('Expected an array');
	}
	for (let i = 0; i < array.length; i++) {
		// eslint-disable-next-line no-await-in-loop
		await callback(array[i], i, array);
	}
};
