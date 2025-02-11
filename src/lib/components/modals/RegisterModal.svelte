<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import { registerSchema } from '$lib/formSchema';
	import * as Form from '$lib/components/ui/form';
	import { Loader2 } from 'lucide-svelte';
	import Input from '../ui/input/input.svelte';
	import { zod } from 'sveltekit-superforms/adapters';
	import { defaults, superForm } from 'sveltekit-superforms';
	import { toast } from 'svelte-sonner';
	import { registerModalState } from '$lib/states/modalState.svelte';
	import { authClient } from '$lib/client';
	const form = superForm(defaults(zod(registerSchema)), {
		SPA: true,
		validators: zod(registerSchema),
		async onUpdate({ form }) {
			if (form.valid) {
				const { name, email, password } = form.data;
				const { data, error } = await authClient.signUp.email(
					{
						email,
						password,
						name
					},
					{
						onSuccess(ctx) {
							toast.success('registration successful');
							registerModalState.setFalse();
						}
					}
				);
				if (error) {
					if (error.message) {
						toast.error(error.message);
					} else {
						toast.error(error.statusText);
					}
				}
			}
		}
	});

	const { form: formData, enhance, delayed } = form;
</script>

<Dialog.Root bind:open={registerModalState.value}>
	<Dialog.Content class="w-full p-5">
		<Dialog.Header class="mt-10">
			<Dialog.Title>Create an account</Dialog.Title>
		</Dialog.Header>
		<form method="POST" use:enhance>
			<Form.Field {form} name="name">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Name</Form.Label>
						<Input {...props} bind:value={$formData.name} />
					{/snippet}
				</Form.Control>

				<Form.FieldErrors />
			</Form.Field>
			<Form.Field {form} name="email">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Email</Form.Label>
						<Input {...props} bind:value={$formData.email} />
					{/snippet}
				</Form.Control>

				<Form.FieldErrors />
			</Form.Field>
			<Form.Field {form} name="password">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Password</Form.Label>
						<Input type="password" {...props} bind:value={$formData.password} />
					{/snippet}
				</Form.Control>

				<Form.FieldErrors />
			</Form.Field>
			<Form.Field {form} name="confirmPassword">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Confirm Password</Form.Label>
						<Input type="password" {...props} bind:value={$formData.confirmPassword} />
					{/snippet}
				</Form.Control>

				<Form.FieldErrors />
			</Form.Field>
			<Form.Button class="mt-2 w-full">
				{#if $delayed}
					<Loader2 class="size-6 animate-spin" />
				{:else}
					Register
				{/if}
			</Form.Button>
		</form>
	</Dialog.Content>
</Dialog.Root>
