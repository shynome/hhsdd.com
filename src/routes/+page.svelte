<script lang="ts">
	export let data: OutputData
	import type { OutputData } from './+page.server'
	import { initCurrent } from './store'
	const current = initCurrent(data)

	import { dev } from '$app/environment'
	import { onMount } from 'svelte'
	let ready = false
	onMount(() => {
		console.log('嘿嘿, 被狐狐看到了, 所以小小的更新下')
		ready = true
		current.next(false)
		if (!dev) {
			console.log('repo: https://github.com/shynome/hhsdd.com')
		}
	})
</script>

<svelte:head>
	<meta name="description" content="hhsdd 狐狐是垫的 狐狐是大的 狐狐是DD" />
	<meta name="keywords" content="hhsdd,狐狐是垫的,狐狐是大的,狐狐是DD" />
	<title>{$current.title}</title>
</svelte:head>

<div class:ready class="root">
	<header class="container">
		<div class="card">
			<h2>{$current.title}</h2>
			<h6>{$current.subtitle}</h6>
			<p class="desc">
				{@html $current.desc}
			</p>
		</div>
		<button class="refresh" on:click={() => current.next()}>换一种解释 hhsdd</button>
	</header>
	<main class="container">
		{#if $current.videos}
			<div class="videos">
				<h3>视频为证</h3>
				<ul class="row">
					{#each $current.videos as v}
						<li class="column column-33">
							<a href="https://www.bilibili.com/video/{v.bvid}/" target="_blank" class="img">
								<img
									src={v.pic}
									referrerpolicy="no-referrer"
									alt={v.title}
									width="960"
									height="600"
								/>
								<span class="author">{v.author}</span>
							</a>
							<a href="https://www.bilibili.com/video/{v.bvid}/" target="_blank">
								<h6>{@html v.title}</h6>
							</a>
						</li>
					{/each}
				</ul>
			</div>
		{/if}
	</main>
</div>

<style>
	.root {
		opacity: 0;
	}
	.root.ready {
		opacity: 1;
	}
	.card {
		position: relative;
	}
	.img {
		font-size: 0;
		position: relative;
	}
	.img img {
		height: auto;
	}
	.author {
		position: absolute;
		right: 0;
		bottom: 0;
		color: #fff;
		background-color: rgba(0, 0, 0, 0.7);
		padding: 3px 7px;
		font-size: 1.5rem;
	}
	/* .card .refresh {
		position: absolute;
		right: 0;
	} */
	button.refresh {
		text-transform: unset;
	}
	ul {
		flex-wrap: wrap;
	}
	@media (max-width: 40rem) {
		ul li.column-33 {
			flex: 0 0 50%;
			max-width: 50%;
		}
	}
</style>
