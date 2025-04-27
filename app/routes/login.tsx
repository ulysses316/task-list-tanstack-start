import { login } from "@/utils/serverFunctions";
import { useForm } from "@tanstack/react-form";
import type { AnyFieldApi } from "@tanstack/react-form";
import { createFileRoute } from "@tanstack/react-router";
import * as v from "valibot";

export const Route = createFileRoute("/login")({
	component: Login,
});

function Login() {
	const form = useForm({
		defaultValues: {
			email: "",
			password: "",
		},
		validators: {
			onChange: v.object({
				email: v.pipe(v.string(), v.email()),
				password: v.pipe(v.string(), v.minLength(8), v.maxLength(20)),
			}),
		},
		onSubmit: async ({ value }) => {
			login({ data: value });
		},
	});

	const handdleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		e.stopPropagation();
		form.handleSubmit();
	};

	return (
		<section className="flex justify-center items-center h-screen">
			<div className="border rounded-lg shadow-lg p-8 bg-white sm:min-w-3/4 md:min-w-2/4 lg:min-w-1/4 min-w-full">
				<h1>Login Form</h1>
				<form className="flex flex-col gap-2" onSubmit={handdleSubmit}>
					<form.Field name="email">
						{(field) => (
							<div className="flex flex-col gap-1">
								<label htmlFor={field.name}>Email:</label>
								<input
									className="border rounded-sm outline-0"
									name={field.name}
									value={field.state.value}
									onBlur={field.handleBlur}
									onChange={(e) => field.handleChange(e.target.value)}
									type="text"
								/>
								<FieldInfo field={field} />
							</div>
						)}
					</form.Field>
					<form.Field name="password">
						{(field) => (
							<div className="flex flex-col gap-1">
								<label htmlFor={field.name}>Password:</label>
								<input
									className="border rounded-sm outline-0"
									name={field.name}
									value={field.state.value}
									onBlur={field.handleBlur}
									onChange={(e) => field.handleChange(e.target.value)}
									type="password"
								/>
								<FieldInfo field={field} />
							</div>
						)}
					</form.Field>
					<button className="border w-fit py-2 px-6 text-nowrap" type="submit">
						Submit
					</button>
				</form>
			</div>
		</section>
	);
}

function FieldInfo({ field }: { field: AnyFieldApi }) {
	return (
		<>
			{field.state.meta.isTouched && field.state.meta.errors.length ? (
				<em>{field.state.meta.errors.map((err) => err.message).join(",")}</em>
			) : null}
			{field.state.meta.isValidating ? "Validating..." : null}
		</>
	);
}
