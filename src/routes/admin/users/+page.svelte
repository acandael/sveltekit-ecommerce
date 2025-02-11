<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import { ChevronDown } from 'lucide-svelte';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { authClient } from '$lib/client';
	import { toast } from 'svelte-sonner';
	import { invalidateAll } from '$app/navigation';
	import * as Table from '$lib/components/ui/table';

	let { data } = $props();
</script>

<div class="space-y-4 p-8">
	<div class="flex items-center justify-between space-y-2">
		<h2 class="text-3xl font-bold capitalize tracking-tight">Users</h2>
		<div class="flex items-center space-x-2">
			<Input class="w-[150px] lg:w-[250]" placeholder="Search products..." />
			<Button href="products/add">Add User</Button>
		</div>
	</div>
	<Table.Root>
		<Table.Header>
			<Table.Row>
				<Table.Head class="w-[100px]">Name</Table.Head>
				<Table.Head>Email</Table.Head>
				<Table.Head>Role</Table.Head>
				<Table.Head>Status</Table.Head>
				<Table.Head>Join Date</Table.Head>
				<Table.Head>Total spent</Table.Head>
				<Table.Head class="text-right">Actions</Table.Head>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{#each data.users as user}
				<Table.Row>
					<Table.Cell>{user.name}</Table.Cell>
					<Table.Cell>{user.email}</Table.Cell>
					<Table.Cell>{user.role}</Table.Cell>
					<Table.Cell>{!user.banned ? 'active' : 'banned'}</Table.Cell>
					<Table.Cell>{user.createdAt}</Table.Cell>
					<Table.Cell>${100}</Table.Cell>
					<!-- <Table.Cell>{user.orderCount}</Table.Cell> -->
					<Table.Cell class="text-right">
						<DropdownMenu.Root>
							<DropdownMenu.Trigger>
								<Button variant="outline" size="icon">
									<ChevronDown />
								</Button>
							</DropdownMenu.Trigger>
							<DropdownMenu.Content>
								{#if user.banned}
									<DropdownMenu.Item
										onclick={async () => {
											const res = await authClient.admin.unbanUser({
												userId: user.id
											});
											if (res.error) {
												toast.error(res.error.message || '');
												return;
											}
											toast.success('user has been unbanned');
											invalidateAll();
										}}>Unban user</DropdownMenu.Item
									>
								{:else}
									<DropdownMenu.Item
										onclick={async () => {
											const res = await authClient.admin.banUser({
												userId: user.id
											});
											if (res.error) {
												toast.error(res.error.message || '');
												return;
											}
											toast.success('user has been banned');
											invalidateAll();
										}}>ban user</DropdownMenu.Item
									>
								{/if}
							</DropdownMenu.Content>
						</DropdownMenu.Root>
					</Table.Cell>
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>
</div>
