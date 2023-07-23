import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms/server';
import { fail } from '@sveltejs/kit';

const newUserSchema = z.object({
	email: z.string().email(),
	username: z.string().min(3).max(20),
	password: z.string().min(8).max(100),
	confirmPassword: z.string().min(8).max(100)
});

export const load = async (event) => {
	const form = await superValidate(event, newUserSchema);
	return {
		form
	};
};

export const actions = {
	register: async (event) => {
		const form = await superValidate(event, newUserSchema);
        console.log(form);

        if(!form.valid){
            return fail(400, {
                form
            })
        }

        return { form }
	}
};
