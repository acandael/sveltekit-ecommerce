import { createDb } from '$lib/server/db/index.js';

export const load = async ({ locals }) => {
	const { db } = locals;
	await db.query.user.findMany();
};
