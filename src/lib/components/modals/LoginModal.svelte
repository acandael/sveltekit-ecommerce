<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Form from '$lib/components/ui/form';
	import { loginSchema } from '$lib/formSchema';
	import { Loader2 } from 'lucide-svelte';
	import { Input } from '../ui/input';
	import { defaults, superForm } from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';
	import { toast } from 'svelte-sonner';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { loginModalState, requestPasswordResetModalState } from '$lib/states/modalState.svelte';
	import { authClient } from '$lib/client';

	const form = superForm(defaults(zod(loginSchema)), {
		SPA: true,
		validators: zod(loginSchema),
		async onUpdate({ form }) {
			if (form.valid) {
				const { email, password } = form.data;
				const { error } = await authClient.signIn.email(
					{
						email,
						password
					},
					{
						onSuccess(ctx) {
							toast.success('login successful');
							loginModalState.setFalse();
							if ($page.url.pathname === '/password-reset')
								goto('/', {
									invalidateAll: true
								});
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

<Dialog.Root bind:open={loginModalState.value}>
	<Dialog.Content class="w-full p-5">
		<Dialog.Header class="mt-10">
			<Dialog.Title>Login to your account</Dialog.Title>
			<Dialog.Description>
				Enter you email and password to login, click login when you are ready.
			</Dialog.Description>
		</Dialog.Header>
		<form method="POST" use:enhance>
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
						<Input {...props} bind:value={$formData.password} />
					{/snippet}
				</Form.Control>

				<Form.FieldErrors />
			</Form.Field>
			<button
				type="button"
				onclick={() => {
					loginModalState.setFalse();
					requestPasswordResetModalState.setTrue();
				}}
				class="text-sm text-primary"
			>
				forgot your password?
			</button>
			<Form.Button class="mt-2 w-full">
				{#if $delayed}
					<Loader2 class="size-6 animate-spin" />
				{:else}
					Login
				{/if}
			</Form.Button>
		</form>
	</Dialog.Content>
</Dialog.Root>
