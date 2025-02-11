export const load = async ({ locals: { db } }) => {
	const users = await db.query.user.findMany({
		orderBy: (t, { desc }) => desc(t.createdAt)
	});
	return {
		users
	};
};
