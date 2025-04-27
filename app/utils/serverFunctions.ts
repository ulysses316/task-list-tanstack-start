import { prisma } from "@/utils/lib/prisma";
import { createServerFn } from "@tanstack/react-start";

export const login = createServerFn({ method: "POST" })
	.validator((data: { email: string; password: string }) => data)
	.handler(async (ctx) => {
		try {
			const findUser = await prisma.user.findFirst({
				where: {
					email: ctx.data.email,
				},
			});

			console.log(findUser);

			await prisma.$disconnect();
		} catch (error) {
			console.error("Error finding user:", error);
			await prisma.$disconnect();
			process.exit(1);
		}
	});

export const signUp = createServerFn({ method: "POST" })
	.validator((data: { email: string; password: string }) => data)
	.handler(async (ctx) => {
		try {
			const createUser = await prisma.user.create({
				data: {
					email: ctx.data.email,
					password: ctx.data.password,
				},
			});

			console.log(createUser);

			await prisma.$disconnect();
		} catch (error) {
			console.error("Error creating user:", error);
			await prisma.$disconnect();
			process.exit(1);
		}
	});
