<script lang="ts">
	import { onMount } from 'svelte';
	import { scale } from 'svelte/transition';
	import { Menu, X } from 'lucide-svelte';
	import WhatsAppIcon from './WhatsAppIcon.svelte';

	let { whatsappUrl }: { whatsappUrl: string } = $props();

	const links = [
		{ id: 'masalah', label: 'Masalah' },
		{ id: 'solusi', label: 'Solusi' },
		{ id: 'fase', label: 'Fase' },
		{ id: 'keunggulan', label: 'Keunggulan' }
	];

	let active = $state('');
	let scrolled = $state(false);
	let menuOpen = $state(false);
	let wrapperEl: HTMLElement;
	let linksEl: HTMLDivElement;
	let indicator = $state({ left: 0, width: 0, visible: false });

	// Pill penanda bergeser ke link section yang sedang terlihat.
	function moveIndicator(id: string) {
		const el = linksEl?.querySelector<HTMLAnchorElement>(`[data-id="${id}"]`);
		indicator = el
			? { left: el.offsetLeft, width: el.offsetWidth, visible: true }
			: { ...indicator, visible: false };
	}

	$effect(() => moveIndicator(active));

	onMount(() => {
		const onScroll = () => {
			scrolled = window.scrollY > 40;
			// Section aktif = yang terakhir melewati 40% tinggi layar.
			const line = window.innerHeight * 0.4;
			let current = '';
			for (const { id } of links) {
				const el = document.getElementById(id);
				if (el && el.getBoundingClientRect().top <= line) current = id;
			}
			const footer = document.querySelector('footer');
			if (footer && footer.getBoundingClientRect().top <= line) current = '';
			active = current;
		};
		const onResize = () => moveIndicator(active);
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		window.addEventListener('resize', onResize);
		return () => {
			window.removeEventListener('scroll', onScroll);
			window.removeEventListener('resize', onResize);
		};
	});
</script>

<svelte:window
	onclick={(e) => {
		// composedPath tetap valid walau ikon tombol sudah diganti saat klik.
		if (menuOpen && !e.composedPath().includes(wrapperEl)) menuOpen = false;
	}}
	onkeydown={(e) => e.key === 'Escape' && (menuOpen = false)}
/>

<header class="pointer-events-none fixed inset-x-0 top-0 z-50">
	<div
		bind:this={wrapperEl}
		class="nav-wrap pointer-events-auto relative mx-auto max-w-5xl px-3 transition-[padding] duration-500 sm:px-6 {scrolled ? 'pt-2.5' : 'pt-4'}"
	>
		<nav
			class="nav-bar flex items-center justify-between gap-2 rounded-[22px] border border-slate-200/80 bg-white/75 p-1.5 backdrop-blur-xl backdrop-saturate-150 transition-[box-shadow,background-color] duration-500 {scrolled
				? 'bg-white/90 shadow-[0_4px_0_0_#E2E8F0,0_18px_40px_-18px_rgb(15_23_42/0.25)]'
				: 'shadow-[0_3px_0_0_#E2E8F0]'}"
		>
			<!-- Brand -->
			<a href="/" class="group flex shrink-0 items-center gap-2.5 rounded-2xl py-1 pr-3 pl-1">
				<span class="relative flex h-9 w-9 items-center justify-center rounded-xl border border-brand-100 bg-brand-50 transition-transform duration-300 group-hover:-rotate-6">
					<img src="/logo-khwarizmi-192.png" alt="" class="h-7 w-7" />
				</span>
				<span class="leading-none">
					<span class="block text-[15px] font-black tracking-tight text-slate-900">HRIS</span>
					<span class="mt-0.5 block text-[10px] font-bold tracking-[0.25em] text-brand-600 uppercase">by Khwarizmi</span>
				</span>
			</a>

			<!-- Menu desktop -->
			<div bind:this={linksEl} class="relative hidden items-center md:flex">
				<span
					class="absolute inset-y-0 rounded-xl border border-brand-100 bg-brand-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] {indicator.visible ? 'opacity-100' : 'opacity-0'}"
					style="left:{indicator.left}px;width:{indicator.width}px"
					aria-hidden="true"
				></span>
				{#each links as link}
					<a
						href="#{link.id}"
						data-id={link.id}
						class="relative rounded-xl px-4 py-2 text-sm font-bold transition-colors duration-300 {active === link.id
							? 'text-brand-700'
							: 'text-slate-500 hover:text-slate-900'}"
					>
						{link.label}
					</a>
				{/each}
			</div>

			<div class="flex items-center gap-1.5">
				<a
					href={whatsappUrl}
					target="_blank"
					rel="noopener noreferrer"
					class="pressable inline-flex items-center gap-2 rounded-2xl border border-brand-700 px-4 py-2.5 text-sm font-bold text-white shadow-[0_3px_0_0_#006151] hover:shadow-[0_2px_0_0_#006151]"
					style="background:linear-gradient(135deg,#01866F,#017563)"
				>
					<span class="relative flex">
						<WhatsAppIcon size={16} />
						<span class="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full border border-brand-600 bg-lime-300">
							<span class="absolute inset-0 animate-ping rounded-full bg-lime-300"></span>
						</span>
					</span>
					<span class="hidden sm:inline">Konsultasi Gratis</span>
					<span class="sm:hidden">Konsultasi</span>
				</a>
				<button
					type="button"
					onclick={() => (menuOpen = !menuOpen)}
					aria-label={menuOpen ? 'Tutup menu' : 'Buka menu'}
					aria-expanded={menuOpen}
					class="pressable flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 shadow-[0_2px_0_0_#E2E8F0] hover:shadow-[0_1px_0_0_#E2E8F0] md:hidden"
				>
					{#if menuOpen}<X size={18} />{:else}<Menu size={18} />{/if}
				</button>
			</div>
		</nav>

		<!-- Menu mobile -->
		{#if menuOpen}
			<div
				transition:scale={{ start: 0.95, duration: 180 }}
				class="absolute inset-x-3 top-full mt-2 origin-top overflow-hidden rounded-2xl border border-slate-200 bg-white py-1 shadow-2xl sm:inset-x-6 md:hidden"
			>
				{#each links as link, i}
					<a
						href="#{link.id}"
						onclick={() => (menuOpen = false)}
						class="flex items-center justify-between px-5 py-3.5 text-sm font-bold hover:bg-slate-50 {active === link.id ? 'text-brand-700' : 'text-slate-700'}"
					>
						{link.label}
						<span class="text-xs text-slate-300">{String(i + 1).padStart(2, '0')}</span>
					</a>
				{/each}
			</div>
		{/if}
	</div>
</header>
