<script lang="ts">
	import { enhance } from '$app/forms';
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import { formatCurrency } from '$lib/utils';
	import { queryParam } from 'sveltekit-search-params';
	import { toast } from 'svelte-sonner';
	import type { ActionData } from './$types';
	import * as Table from '$lib/components/ui/table';

	let showProduct = $state(false);
	let { data } = $props();
	let term = queryParam('term');
</script>

<div class="space-y-4 p-8 pt-6">
	<div class="flex items-center justify-between space-y-2">
		<h2 class="text-3xl font-bold capitalize tracking-tight">Products</h2>
		<div class="flex items-center space-x-2">
			<Input bind:value={$term} class="w-[150px] lg:w-[250px]" placeholder="Search products..." />
			<Button href="products/add">Add Product</Button>
		</div>
	</div>
	{#if data.products.length > 0}
		<Table.Root>
			<Table.Header>
				<Table.Row>
					<Table.Head class="w-[100px]">ID</Table.Head>
					<Table.Head>image</Table.Head>
					<Table.Head>Name</Table.Head>
					<Table.Head>Category</Table.Head>
					<Table.Head>Sub category</Table.Head>
					<Table.Head>Price</Table.Head>
					<Table.Head>Stock</Table.Head>
					<Table.Head class="text-right">Actions</Table.Head>
				</Table.Row>
			</Table.Header>

			<Table.Body>
				{#each data.products as product (product.id)}
					<Table.Row>
						<Table.Cell class="font-medium">{product.id}</Table.Cell>
						<Table.Cell>
							<img src={product.images[0].fileUrl} class="size-14 rounded border" alt="" />
						</Table.Cell>
						<Table.Cell>{product.name}</Table.Cell>
						<Table.Cell>{product.category.name}</Table.Cell>
						<Table.Cell>{product.subCategory}</Table.Cell>
						<Table.Cell>{formatCurrency(product.price)}</Table.Cell>
						<Table.Cell>{product.stock}</Table.Cell>
						<Table.Cell class="text-right">
							<form
								action="?/deleteProduct"
								use:enhance={({}) => {
									return async ({ update, result }) => {
										// Wait for the form to be updated
										await update();
										// Check if there's a message in the result
										if (result.type === 'success') {
											const data = result.data as ActionData;

											toast.success(data?.message!);
										} else if (result.type === 'failure') {
											const data = result.data as ActionData;

											toast.error(data?.message!);
										}
									};
								}}
								method="POST"
							>
								<input type="text" name="id" value={product.id} hidden />
								<Button type="submit" variant="outline" size="sm">Delete</Button>
							</form>
						</Table.Cell>
					</Table.Row>
				{/each}
			</Table.Body>
		</Table.Root>
	{:else}
		<p
			class="flex h-[70vh] w-full flex-col items-center justify-center gap-3 text-center text-3xl text-muted-foreground"
		>
			No products
			<Button href="products/add">Add Product</Button>
		</p>
	{/if}
</div>
