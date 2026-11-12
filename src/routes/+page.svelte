<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import {
		AlertTriangle,
		ArrowRight,
		ArrowUpRight,
		Ban,
		BarChart3,
		BadgeDollarSign,
		Building2,
		CalendarCheck,
		CalendarDays,
		Check,
		Clock,
		Crown,
		Expand,
		FileOutput,
		FileSignature,
		Handshake,
		Link2,
		Mail,
		MapPin,
		Repeat,
		ShieldCheck,
		SlidersHorizontal,
		UserCog,
		UserMinus,
		Wallet,
		Workflow,
		Wrench,
		Zap
	} from 'lucide-svelte';
	import CinematicHero from '$lib/components/CinematicHero.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import WhatsAppIcon from '$lib/components/WhatsAppIcon.svelte';
	import { EMAIL_URL, INSTAGRAM_URL, SITE_URL, WHATSAPP_URL } from '$lib/config';

	const statement =
		'HRIS by Khwarizmi membantu perusahaan membangun sistem HR milik mereka sendiri — terintegrasi, dapat dikembangkan, dan dikendalikan penuh oleh perusahaan.';

	const stats = [
		{ value: '100%', label: 'Data ownership di tangan perusahaan' },
		{ value: '0%', label: 'Vendor lock-in' },
		{ value: '24/7', label: 'Akses sistem kapan saja' },
		{ value: '1 Th', label: 'Free maintenance tahun pertama' }
	];

	const marquee = ['Absensi', 'Data Karyawan', 'Approval Dokumen', 'Shifting', 'Time Off', 'Payroll', 'BPJS'];

	const impacts = [
		{ value: '40%', label: 'Waktu admin terbuang' },
		{ value: '35%', label: 'Error rate data' },
		{ value: '50%', label: 'Delay approval' }
	];

	const problems = [
		{ icon: AlertTriangle, title: 'Absensi tidak akurat', desc: 'Data absensi manual rawan error dan manipulasi.' },
		{ icon: Clock, title: 'Approval lambat', desc: 'Proses persetujuan memakan waktu berhari-hari.' },
		{ icon: Link2, title: 'Ketergantungan vendor', desc: 'Biaya berulang dan risiko data terkunci di vendor.' },
		{ icon: Ban, title: 'Sistem tidak fleksibel', desc: 'Software kaku yang sulit menyesuaikan kebutuhan bisnis.' }
	];

	const solutions = [
		{
			icon: ShieldCheck,
			title: 'Kontrol Penuh Data',
			tags: ['ownership', 'privasi', 'server sendiri'],
			desc: 'Data karyawan sepenuhnya di bawah kontrol perusahaan Anda — bukan di tangan vendor.',
			panel: 'bg-brand-50 border-brand-200',
			tile: 'bg-brand-500 border-brand-700 shadow-[0_4px_0_0_#006151]',
			dot: 'bg-brand-500',
			chips: ['Server milik perusahaan', 'Akses berbasis peran', 'Backup terjadwal ✓']
		},
		{
			icon: Zap,
			title: 'Akses Real-time',
			tags: ['dashboard', 'terpusat', 'live'],
			desc: 'Data selalu terbarui dalam satu dashboard terpusat untuk HR dan manajemen.',
			panel: 'bg-blue-50 border-blue-200',
			tile: 'bg-blue-500 border-blue-700 shadow-[0_4px_0_0_#1D4ED8]',
			dot: 'bg-blue-500',
			chips: ['Total karyawan · 22', 'Hadir hari ini · 21', 'Dokumen pending · 4']
		},
		{
			icon: Workflow,
			title: 'Alur Kerja Rapi',
			tags: ['approval', 'dokumen', 'notifikasi'],
			desc: 'Pengajuan, persetujuan, dan arsip dokumen tersusun dalam alur yang jelas.',
			panel: 'bg-amber-50 border-amber-200',
			tile: 'bg-amber-500 border-amber-700 shadow-[0_4px_0_0_#B45309]',
			dot: 'bg-amber-500',
			chips: ['Diajukan · Karyawan', 'Ditinjau · Atasan', 'Disetujui · HR ✓']
		},
		{
			icon: Expand,
			title: 'Siap Dikembangkan',
			tags: ['modular', 'custom', 'bertahap'],
			desc: 'Fleksibel menyesuaikan SOP dan kebutuhan bisnis Anda seiring perusahaan bertumbuh.',
			panel: 'bg-orange-50 border-orange-200',
			tile: 'bg-orange-500 border-orange-700 shadow-[0_4px_0_0_#C2410C]',
			dot: 'bg-orange-500',
			chips: ['Modul Payroll · ditambahkan', 'Integrasi BPJS', 'Sesuai SOP internal']
		}
	];
	const solutionCols = [
		solutions.map((f, i) => ({ ...f, n: i + 1 })).filter((_, i) => i % 2 === 0),
		solutions.map((f, i) => ({ ...f, n: i + 1 })).filter((_, i) => i % 2 === 1)
	];

	const phases = [
		{
			name: 'Foundation',
			desc: 'Fitur dasar untuk operasional HR sehari-hari.',
			items: [
				{ icon: CalendarCheck, label: 'Attendance System' },
				{ icon: FileSignature, label: 'Document Approval' },
				{ icon: FileOutput, label: 'Export Data' },
				{ icon: MapPin, label: 'Location Lock' },
				{ icon: Building2, label: 'In-Office / Out-Office Status' }
			]
		},
		{
			name: 'Operations',
			desc: 'Manajemen operasional karyawan yang lebih lengkap.',
			items: [
				{ icon: Repeat, label: 'Import / Export Attendance' },
				{ icon: UserCog, label: 'Shifting Management' },
				{ icon: UserMinus, label: 'Resign Employee' },
				{ icon: CalendarDays, label: 'Time Off Management' }
			]
		},
		{
			name: 'Finance',
			desc: 'Integrasi sistem keuangan dan kewajiban karyawan.',
			items: [
				{ icon: Wallet, label: 'Payroll Management' },
				{ icon: Handshake, label: 'BPJS Integration' }
			]
		}
	];
	let activePhase = $state(0);

	const advantages = [
		{ icon: BadgeDollarSign, title: 'One-time Investment', desc: 'Tanpa biaya langganan tahunan — investasi sekali untuk kepemilikan selamanya.', tile: 'bg-brand-50 border-brand-200 text-brand-600' },
		{ icon: Crown, title: 'Full System Ownership', desc: 'Sistem & data sepenuhnya milik perusahaan, tidak tergantung vendor.', tile: 'bg-orange-50 border-orange-200 text-orange-600' },
		{ icon: Wrench, title: 'Free Maintenance Tahun Pertama', desc: 'Dukungan penuh termasuk maintenance dan update selama tahun pertama.', tile: 'bg-blue-50 border-blue-200 text-blue-600' },
		{ icon: SlidersHorizontal, title: '100% Customizable', desc: 'Disesuaikan dengan kebutuhan bisnis dan SOP internal perusahaan.', tile: 'bg-purple-50 border-purple-200 text-purple-600' },
		{ icon: BarChart3, title: 'Siap Dikembangkan', desc: 'Siap pakai, namun tetap fleksibel untuk pengembangan jangka panjang.', tile: 'bg-amber-50 border-amber-200 text-amber-600' },
		{ icon: ShieldCheck, title: 'Data Security & Privacy', desc: 'Data tersimpan aman di server perusahaan atau hosting pilihan Anda.', tile: 'bg-slate-100 border-slate-200 text-slate-700' }
	];

	const trust = ['Garansi 1 tahun', 'Support 24/7', 'Konsultasi gratis'];

	const year = new Date().getFullYear();
	const pad = (n: number) => String(n).padStart(2, '0');

	const jsonLd = JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'SoftwareApplication',
		name: 'HRIS by Khwarizmi',
		applicationCategory: 'BusinessApplication',
		operatingSystem: 'Web-Based',
		description:
			'Sistem HR terintegrasi sepenuhnya milik perusahaan Anda dengan fitur absensi, data karyawan, approval dokumen, dan payroll management.',
		provider: { '@type': 'Organization', name: 'Khwarizmi', url: 'https://khwarizmi.id' }
	});

	onMount(() => {
		gsap.registerPlugin(ScrollTrigger);
		if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

		const ctx = gsap.context(() => {
			gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
				gsap.fromTo(
					el,
					{ y: 70, autoAlpha: 0 },
					{ y: 0, autoAlpha: 1, duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 88%' } }
				);
			});

			gsap.utils.toArray<HTMLElement>('[data-lines]').forEach((el) => {
				gsap.fromTo(
					el.querySelectorAll('.line > span'),
					{ yPercent: 110 },
					{ yPercent: 0, duration: 1.3, stagger: 0.1, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 85%' } }
				);
			});

			gsap.fromTo(
				'.statement .word',
				{ opacity: 0.12 },
				{ opacity: 1, stagger: 0.1, ease: 'none', scrollTrigger: { trigger: '.statement', start: 'top 80%', end: 'bottom 50%', scrub: true } }
			);

			gsap.utils.toArray<HTMLElement>('.feat-visual').forEach((el) => {
				gsap.fromTo(
					el.querySelector('.feat-visual-inner'),
					{ y: 40 },
					{ y: -40, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } }
				);
			});

			const marqueeTween = gsap.to('.marquee-track', { xPercent: -50, ease: 'none', duration: 30, repeat: -1 });
			ScrollTrigger.create({
				trigger: '.marquee',
				start: 'top bottom',
				end: 'bottom top',
				onUpdate: (self) => {
					gsap.to(marqueeTween, { timeScale: self.direction * (1 + Math.min(Math.abs(self.getVelocity()) / 400, 4)), duration: 0.3, overwrite: true });
					gsap.to(marqueeTween, { timeScale: self.direction, duration: 1.2, delay: 0.3, overwrite: false });
				}
			});
		});

		ScrollTrigger.refresh();
		return () => ctx.revert();
	});
</script>

<svelte:head>
	<title>HRIS by Khwarizmi — Sistem HR Terintegrasi Sepenuhnya Milik Anda</title>
	<meta
		name="description"
		content="HRIS terintegrasi milik perusahaan Anda. Sistem manajemen HR stabil dengan absensi, data karyawan, approval dokumen, payroll. One-time investment, full ownership."
	/>
	<meta name="robots" content="index, follow, max-image-preview:large" />
	<link rel="canonical" href="{SITE_URL}/" />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="{SITE_URL}/" />
	<meta property="og:title" content="HRIS by Khwarizmi — Sistem HR Terintegrasi Sepenuhnya Milik Anda" />
	<meta property="og:description" content="HRIS terintegrasi milik perusahaan Anda: absensi, data karyawan, approval dokumen, payroll." />
	<meta property="og:image" content="{SITE_URL}/img/mockup-hris.png" />
	<meta name="twitter:card" content="summary_large_image" />
	{@html `<script type="application/ld+json">${jsonLd}</script>`}
</svelte:head>

<!-- Navbar mengambang -->
<Navbar whatsappUrl={WHATSAPP_URL} />

<main>
	<!-- Hero sinematik (scroll-driven) -->
	<CinematicHero whatsappUrl={WHATSAPP_URL} />

	<!-- 01 · Tentang -->
	<section class="mx-auto max-w-7xl px-4 pt-28 pb-24 sm:px-6 lg:pt-40">
		<p class="micro-label mb-10">( 01 ) &nbsp;Tentang</p>
		<p class="statement max-w-6xl text-[clamp(1.9rem,4.6vw,4.25rem)] leading-[1.08] font-black tracking-tight text-slate-900">
			{#each statement.split(' ') as word}<span class="word">{word}</span>{' '}{/each}
		</p>

		<div class="mt-20 grid grid-cols-2 gap-x-6 gap-y-10 border-t border-slate-200 pt-10 lg:grid-cols-4">
			{#each stats as stat}
				<div data-reveal>
					<p class="text-brand text-5xl font-black tracking-tighter sm:text-6xl">{stat.value}</p>
					<p class="mt-2 max-w-[14rem] text-sm font-bold text-slate-500">{stat.label}</p>
				</div>
			{/each}
		</div>
	</section>

	<!-- Marquee -->
	<div class="marquee overflow-hidden border-y border-slate-200 bg-white py-6 select-none sm:py-8" aria-hidden="true">
		<div class="marquee-track flex w-max">
			{#each [0, 1] as _}
				<div class="flex shrink-0 items-center">
					{#each marquee as item}
						<span class="px-6 text-[clamp(2.5rem,7vw,6rem)] leading-none font-black tracking-tighter text-slate-900 sm:px-10">{item}</span>
						<span class="h-4 w-4 shrink-0 rounded-full bg-brand-500 sm:h-6 sm:w-6"></span>
					{/each}
				</div>
			{/each}
		</div>
	</div>

	<!-- 02 · Masalah -->
	<section id="masalah" class="mx-auto max-w-7xl scroll-mt-24 px-4 py-28 sm:px-6 lg:py-40">
		<div class="mb-16 flex flex-col justify-between gap-8 lg:mb-24 lg:flex-row lg:items-end">
			<div>
				<p class="micro-label mb-8">( 02 ) &nbsp;Masalah</p>
				<h2 data-lines class="display">
					<span class="line"><span>Masalah yang</span></span>
					<span class="line"><span class="text-accent">sering terjadi.</span></span>
				</h2>
			</div>
			<p data-reveal class="max-w-sm text-lg leading-relaxed text-slate-500">
				Sistem HR yang tidak optimal diam-diam menghambat pertumbuhan bisnis.
			</p>
		</div>

		<div class="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
			<div data-reveal class="lg:sticky lg:top-28 lg:self-start">
				<div class="overflow-hidden rounded-[28px] border border-orange-200 bg-orange-50 shadow-[0_8px_0_0_#FED7AA]">
					<img
						src="/img/orang-pusing.png"
						alt="Tim kantor kewalahan dengan sistem HR manual"
						width="1600"
						height="900"
						loading="lazy"
						class="aspect-video w-full object-cover"
					/>
					<div class="grid grid-cols-3 border-t border-orange-200 bg-white">
						{#each impacts as impact, i}
							<div class="p-5 sm:p-6 {i > 0 ? 'border-l border-orange-100' : ''}">
								<p class="text-accent text-3xl font-black tracking-tighter sm:text-4xl">{impact.value}</p>
								<p class="mt-1 text-xs font-bold text-slate-500 sm:text-sm">{impact.label}</p>
							</div>
						{/each}
					</div>
				</div>
			</div>

			<ol>
				{#each problems as p, i}
					<li data-reveal class="grid grid-cols-[auto_1fr] items-start gap-6 border-t border-slate-200 py-10 last:border-b sm:gap-8">
						<span class="outline-num-accent text-6xl leading-none font-black tracking-tighter sm:text-7xl">{pad(i + 1)}</span>
						<div>
							<div class="mb-3 flex items-center gap-3">
								<span class="flex h-10 w-10 items-center justify-center rounded-2xl border border-orange-200 bg-orange-50 text-orange-600">
									<p.icon size={18} />
								</span>
								<h3 class="text-2xl font-black tracking-tight sm:text-3xl">{p.title}</h3>
							</div>
							<p class="max-w-md text-lg leading-relaxed text-slate-500">{p.desc}</p>
						</div>
					</li>
				{/each}
			</ol>
		</div>
	</section>

	<!-- 03 · Solusi -->
	<section id="solusi" class="scroll-mt-24 border-t border-slate-200 bg-white">
		<div class="mx-auto max-w-7xl px-4 py-28 sm:px-6 lg:py-40">
			<div class="mb-16 flex flex-col justify-between gap-8 lg:mb-24 lg:flex-row lg:items-end">
				<div>
					<p class="micro-label mb-8">( 03 ) &nbsp;Solusi</p>
					<h2 data-lines class="display">
						<span class="line"><span>Satu sistem,</span></span>
						<span class="line"><span class="text-brand">dibangun untuk Anda.</span></span>
					</h2>
				</div>
				<p data-reveal class="max-w-sm text-lg leading-relaxed text-slate-500">
					Absensi, data karyawan, dan approval dokumen terintegrasi — dibangun khusus untuk perusahaan Anda.
				</p>
			</div>

			<!-- Mockup + CTA -->
			<div
				data-reveal
				class="relative mb-24 grid items-center gap-10 overflow-hidden rounded-[32px] border border-brand-700 p-8 text-white shadow-[0_8px_0_0_#006151] sm:p-12 lg:mb-32 lg:grid-cols-[1fr_1.4fr]"
				style="background:linear-gradient(135deg,#01866F,#004D41)"
			>
				<div class="dot-grid-light absolute inset-0"></div>
				<div class="relative">
					<p class="mb-6 text-xs font-bold tracking-[0.25em] text-brand-100 uppercase">Konsultasi gratis</p>
					<h3 class="mb-4 text-4xl font-black tracking-tight sm:text-5xl">Diskusikan kebutuhan HR Anda.</h3>
					<p class="mb-10 max-w-sm leading-relaxed text-brand-50/85">
						Ceritakan alur kerja perusahaan Anda, kami bantu rancang sistem yang pas — tanpa biaya konsultasi.
					</p>
					<a
						href={WHATSAPP_URL}
						target="_blank"
						rel="noopener noreferrer"
						class="pressable inline-flex w-fit items-center gap-2 rounded-2xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-bold text-brand-700 shadow-[0_3px_0_0_#E2E8F0] hover:shadow-[0_2px_0_0_#E2E8F0]"
					>
						<WhatsAppIcon size={18} /> Chat via WhatsApp
					</a>
				</div>
				<img
					src="/img/mockup-hris.png"
					alt="Dashboard HRIS: total karyawan, kehadiran, dan dokumen dalam satu tampilan"
					width="1188"
					height="824"
					loading="lazy"
					class="relative w-full rounded-[24px] border border-white/60 bg-white p-2 shadow-[0_8px_0_0_#9DD9CB] sm:p-3"
				/>
			</div>

			<div class="grid gap-x-8 gap-y-16 md:grid-cols-2">
				{#each solutionCols as col, c}
					<div class="flex flex-col gap-16 lg:gap-24 {c === 1 ? 'md:pt-40' : ''}">
						{#each col as f}
							<article data-reveal>
								<div class="feat-visual relative mb-6 aspect-[4/3] overflow-hidden rounded-[28px] border {f.panel}">
									<div class="dot-grid absolute inset-0"></div>
									<div class="feat-visual-inner absolute inset-0 flex items-center justify-center p-6">
										<div class="flex flex-col gap-3 sm:gap-4">
											<div class="mb-1 flex h-14 w-14 items-center justify-center rounded-2xl border text-white sm:h-16 sm:w-16 {f.tile}">
												<f.icon size={28} />
											</div>
											{#each f.chips as chip, k}
												<div
													class="flex w-fit items-center gap-2.5 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold whitespace-nowrap text-slate-700 shadow-[0_4px_0_0_#E2E8F0] sm:px-5 sm:py-3.5 sm:text-base"
													style="margin-left:{k * 2}rem"
												>
													<span class="h-2 w-2 shrink-0 rounded-full {f.dot}"></span>
													{chip}
												</div>
											{/each}
										</div>
									</div>
								</div>
								<p class="mb-3 text-xs font-bold tracking-wider text-slate-400 uppercase">
									{pad(f.n)} &nbsp;·&nbsp; {f.tags.join(' • ')}
								</p>
								<h3 class="mb-2 text-2xl font-black tracking-tight sm:text-3xl">{f.title}</h3>
								<p class="max-w-md leading-relaxed text-slate-500">{f.desc}</p>
							</article>
						{/each}
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- 04 · Fase -->
	<section id="fase" class="scroll-mt-24 border-t border-slate-200">
		<div class="mx-auto grid max-w-7xl gap-12 px-4 py-28 sm:px-6 lg:grid-cols-[1fr_1.3fr] lg:py-40">
			<div class="lg:sticky lg:top-32 lg:self-start">
				<p class="micro-label mb-8">( 04 ) &nbsp;Fase pengembangan</p>
				<h2 data-lines class="display mb-10">
					<span class="line"><span>Mulai dasar,</span></span>
					<span class="line"><span class="text-brand">tumbuh bertahap.</span></span>
				</h2>
				<div data-reveal class="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_6px_0_0_#E2E8F0]">
					<img src="/img/diskusi.png" alt="Tim Khwarizmi berdiskusi merancang fase sistem HR" width="1600" height="900" loading="lazy" class="aspect-video w-full object-cover" />
					<div class="flex items-start gap-3 border-t border-slate-200 p-5">
						<span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-orange-200 bg-orange-50 text-orange-600">
							<CalendarCheck size={18} />
						</span>
						<div>
							<p class="font-black text-slate-900">Fleksibel & bertahap</p>
							<p class="text-sm leading-relaxed text-slate-500">Setiap fase dapat dikustomisasi sesuai timeline dan pertumbuhan bisnis Anda.</p>
						</div>
					</div>
				</div>
			</div>

			<div data-reveal>
				<div class="mb-8 flex flex-wrap gap-2 rounded-2xl border border-slate-200 bg-white p-1.5" role="tablist">
					{#each phases as phase, i}
						<button
							type="button"
							role="tab"
							aria-selected={activePhase === i}
							onclick={() => (activePhase = i)}
							class="flex-1 rounded-xl border px-4 py-2.5 text-sm font-bold transition-[transform,box-shadow] duration-150 {activePhase === i
								? 'border-brand-700 bg-brand-500 text-white shadow-[0_3px_0_0_#006151] hover:translate-y-px hover:shadow-[0_2px_0_0_#006151] active:translate-y-0.75 active:shadow-none'
								: 'border-transparent text-slate-400 hover:text-slate-600'}"
						>
							Fase {i + 1}<span class="hidden sm:inline"> · {phase.name}</span>
						</button>
					{/each}
				</div>

				{#key activePhase}
					{@const phase = phases[activePhase]}
					<div class="phase-panel">
						<div class="mb-8 flex items-baseline gap-6 border-b border-slate-200 pb-8">
							<span class="outline-num text-7xl leading-none font-black tracking-tighter sm:text-8xl">{pad(activePhase + 1)}</span>
							<div>
								<h3 class="text-3xl font-black tracking-tight sm:text-4xl">{phase.name}</h3>
								<p class="mt-1 text-lg text-slate-500">{phase.desc}</p>
							</div>
						</div>
						<ul class="grid gap-3 sm:grid-cols-2">
							{#each phase.items as item}
								<li class="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_6px_0_0_#E2E8F0]">
									<span class="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-brand-200 bg-brand-50 text-brand-600">
										<item.icon size={20} />
									</span>
									<span class="font-extrabold text-slate-800">{item.label}</span>
								</li>
							{/each}
						</ul>
					</div>
				{/key}
			</div>
		</div>
	</section>

	<!-- 05 · Keunggulan -->
	<section id="keunggulan" class="scroll-mt-24 border-t border-slate-200 bg-white">
		<div class="mx-auto max-w-7xl px-4 py-28 sm:px-6 lg:py-40">
			<div class="mb-16 flex flex-col justify-between gap-8 lg:mb-24 lg:flex-row lg:items-end">
				<div>
					<p class="micro-label mb-8">( 05 ) &nbsp;Keunggulan</p>
					<h2 data-lines class="display">
						<span class="line"><span>Kenapa memilih</span></span>
						<span class="line"><span class="text-brand">HRIS by Khwarizmi.</span></span>
					</h2>
				</div>
				<p data-reveal class="max-w-sm text-lg leading-relaxed text-slate-500">
					Investasi sistem HR yang tepat untuk masa depan perusahaan Anda.
				</p>
			</div>

			<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{#each advantages as adv, i}
					<div data-reveal class="rounded-[28px] border border-slate-200 bg-white p-7 shadow-[0_6px_0_0_#E2E8F0] sm:p-8">
						<div class="mb-10 flex items-start justify-between">
							<span class="flex h-14 w-14 items-center justify-center rounded-2xl border {adv.tile}">
								<adv.icon size={26} />
							</span>
							<span class="text-xs font-bold tracking-wider text-slate-300">{pad(i + 1)}</span>
						</div>
						<h3 class="mb-2 text-xl font-black tracking-tight sm:text-2xl">{adv.title}</h3>
						<p class="leading-relaxed text-slate-500">{adv.desc}</p>
					</div>
				{/each}
			</div>
		</div>
	</section>
</main>

<!-- Pre-footer CTA + footer gelap -->
<footer class="relative overflow-hidden bg-slate-950 text-white">
	<div class="pointer-events-none absolute -top-40 left-1/2 h-[32rem] w-[48rem] -translate-x-1/2 rounded-full bg-brand-500/25 blur-[140px]"></div>

	<div class="relative mx-auto max-w-7xl px-4 pt-28 pb-20 sm:px-6 lg:pt-40">
		<div class="grid items-end gap-12 lg:grid-cols-[1.3fr_1fr]">
			<div>
				<p class="micro-label mb-10 !text-slate-500">( 06 ) &nbsp;Mulai sekarang</p>
				<h2 data-lines class="text-[clamp(2.75rem,8vw,7.5rem)] leading-[0.92] font-black tracking-tighter">
					<span class="line"><span>Bangun sistem</span></span>
					<span class="line"><span>HR milik</span></span>
					<span class="line"><span class="text-brand-light">Anda sendiri.</span></span>
				</h2>
				<p data-reveal class="mt-8 max-w-lg text-lg leading-relaxed text-slate-400">
					Diskusikan kebutuhan perusahaan Anda bersama tim kami. Kami bantu rancang sistem HR yang relevan, aman, dan berkelanjutan.
				</p>
				<div data-reveal class="mt-10 flex flex-wrap gap-4">
					<a
						href={WHATSAPP_URL}
						target="_blank"
						rel="noopener noreferrer"
						class="pressable inline-flex items-center gap-2 rounded-2xl border border-brand-700 px-7 py-4 text-base font-bold text-white shadow-[0_3px_0_0_#006151] hover:shadow-[0_2px_0_0_#006151]"
						style="background:linear-gradient(135deg,#01866F,#017563)"
					>
						<WhatsAppIcon size={18} /> Konsultasi Gratis Sekarang
					</a>
					<a
						href={EMAIL_URL}
						class="pressable inline-flex items-center gap-2 rounded-2xl border border-slate-700 bg-slate-900 px-7 py-4 text-base font-bold text-white shadow-[0_3px_0_0_#334155] hover:shadow-[0_2px_0_0_#334155]"
					>
						<Mail size={18} /> Kirim Email
					</a>
				</div>
				<ul data-reveal class="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm font-bold text-slate-400">
					{#each trust as t}
						<li class="flex items-center gap-2"><Check size={16} class="text-brand-400" /> {t}</li>
					{/each}
				</ul>
			</div>
			<div data-reveal class="overflow-hidden rounded-[28px] border border-slate-800">
				<img src="/img/cta.png" alt="Konsultasi sistem HR bersama tim Khwarizmi" width="1600" height="900" loading="lazy" class="aspect-[4/3] w-full object-cover" />
			</div>
		</div>

		<div class="mt-28 grid gap-10 border-t border-slate-800 pt-12 text-sm sm:grid-cols-3">
			<div>
				<p class="mb-4 text-xs font-bold tracking-[0.25em] text-slate-500 uppercase">Produk</p>
				<ul class="space-y-2.5 font-bold text-slate-300">
					<li><a href="#masalah" class="hover:text-white">Masalah</a></li>
					<li><a href="#solusi" class="hover:text-white">Solusi</a></li>
					<li><a href="#fase" class="hover:text-white">Fase</a></li>
					<li><a href="#keunggulan" class="hover:text-white">Keunggulan</a></li>
				</ul>
			</div>
			<div>
				<p class="mb-4 text-xs font-bold tracking-[0.25em] text-slate-500 uppercase">Kontak</p>
				<ul class="space-y-2.5 font-bold text-slate-300">
					<li><a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 hover:text-white"><WhatsAppIcon size={15} /> WhatsApp</a></li>
					<li><a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 hover:text-white"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" /></svg> Instagram <ArrowUpRight size={13} /></a></li>
					<li><a href={EMAIL_URL} class="inline-flex items-center gap-2 hover:text-white"><Mail size={15} /> info@khwarizmi.id</a></li>
				</ul>
			</div>
			<div>
				<p class="mb-4 text-xs font-bold tracking-[0.25em] text-slate-500 uppercase">Perusahaan</p>
				<p class="leading-relaxed font-bold text-slate-300">PT. Alkhwarizmi Kreatif Produktif</p>
				<p class="mt-2 leading-relaxed text-slate-500">Stability · Ownership · Scalable</p>
			</div>
		</div>
	</div>

	<div class="relative overflow-hidden px-2" aria-hidden="true">
		<p class="text-brand-light text-center text-[18.5vw] leading-[0.8] font-black tracking-tighter">KHWARIZMI</p>
	</div>
	<div class="relative mx-auto flex max-w-7xl justify-between px-4 py-6 text-xs font-bold text-slate-500 sm:px-6">
		<p>© {year} HRIS by Khwarizmi</p>
		<a href="#top" onclick={(e) => { e.preventDefault(); scrollTo({ top: 0, behavior: 'smooth' }); }} class="hover:text-white">Kembali ke atas ↑</a>
	</div>
</footer>

<style>
	.micro-label {
		font-size: 0.75rem;
		font-weight: 700;
		letter-spacing: 0.25em;
		text-transform: uppercase;
		color: #94a3b8;
	}

	.display {
		font-size: clamp(2.6rem, 7vw, 6.5rem);
		line-height: 0.95;
		font-weight: 900;
		letter-spacing: -0.035em;
	}

	.line {
		display: block;
		overflow: hidden;
		padding-bottom: 0.08em;
	}
	.line > span {
		display: inline-block;
	}

	.text-brand,
	.text-brand-light,
	.text-accent {
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
	}
	.text-brand {
		background-image: linear-gradient(180deg, #0aa086 0%, #006151 100%);
	}
	/* Versi lebih terang untuk latar gelap footer. */
	.text-brand-light {
		background-image: linear-gradient(180deg, #6cc3b0 0%, #01866f 100%);
	}
	.text-accent {
		background-image: linear-gradient(180deg, #fb923c 0%, #ea580c 100%);
	}

	.outline-num {
		color: transparent;
		-webkit-text-stroke: 1.5px #9dd9cb;
	}
	.outline-num-accent {
		color: transparent;
		-webkit-text-stroke: 1.5px #fdba74;
	}

	.dot-grid {
		background-image: radial-gradient(rgb(15 23 42 / 0.08) 1px, transparent 1px);
		background-size: 18px 18px;
	}
	.dot-grid-light {
		background-image: radial-gradient(rgb(255 255 255 / 0.12) 1px, transparent 1px);
		background-size: 18px 18px;
	}

	.phase-panel {
		animation: phase-in 0.4s cubic-bezier(0.16, 1, 0.3, 1);
	}
	@keyframes phase-in {
		from {
			opacity: 0;
			transform: translateY(12px);
		}
	}
</style>
