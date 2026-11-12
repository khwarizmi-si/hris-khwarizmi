<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import {
		ArrowRight,
		CalendarClock,
		ChevronDown,
		Crown,
		FileSignature,
		MapPin,
		ShieldCheck,
		UserCheck,
		Wallet
	} from 'lucide-svelte';
	import WhatsAppIcon from './WhatsAppIcon.svelte';

	interface Props {
		whatsappUrl: string;
		/** Jumlah karyawan hadir yang dihitung naik di kartu Absensi. */
		presentCount?: number;
	}

	let { whatsappUrl, presentCount = 21 }: Props = $props();

	let containerEl: HTMLDivElement;
	let shellEl: HTMLDivElement;
	let sheenEl: HTMLDivElement;
	let mockupEl: HTMLDivElement;

	const featureList = [
		{ icon: MapPin, label: 'Absensi & location lock' },
		{ icon: FileSignature, label: 'Approval dokumen digital' },
		{ icon: Wallet, label: 'Payroll & integrasi BPJS' }
	];

	const attendance = [
		{ initials: 'WO', name: 'Winda O.', meta: 'Masuk 07:52', status: 'In-Office', badge: 'bg-brand-50 text-brand-700' },
		{ initials: 'RH', name: 'Rizky H.', meta: 'Masuk 08:03', status: 'In-Office', badge: 'bg-brand-50 text-brand-700' },
		{ initials: 'SR', name: 'Satria R.', meta: 'Kunjungan klien', status: 'Out-Office', badge: 'bg-orange-50 text-orange-700' }
	];

	const documents = [
		{ title: 'Kontrak Kerja — Sarah A.', by: 'HR Admin', status: 'Disetujui', badge: 'bg-brand-50 text-brand-700' },
		{ title: 'NDA — Divisi IT', by: 'Manager IT', status: 'Menunggu', badge: 'bg-amber-50 text-amber-700' },
		{ title: 'Pengajuan Cuti — David C.', by: 'Atasan langsung', status: 'Disetujui', badge: 'bg-brand-50 text-brand-700' }
	];

	const BRAND = 'linear-gradient(135deg, #3FAE97, #01866F)';

	onMount(() => {
		gsap.registerPlugin(ScrollTrigger);
		const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
		const isMobile = window.innerWidth < 768;
		let raf = 0;

		// Kartu selalu berukuran penuh; yang mengecil/membesar hanya "cangkang"
		// latarnya lewat transform scale, jadi isi kartu tidak di-layout ulang.
		const shellScale = isMobile ? 0.92 : 0.85;
		const shellRadius = (isMobile ? 32 : 40) / shellScale;

		const rotX = gsap.quickTo(mockupEl, 'rotationX', { duration: 1.2, ease: 'power3.out' });
		const rotY = gsap.quickTo(mockupEl, 'rotationY', { duration: 1.2, ease: 'power3.out' });
		const sheenX = gsap.quickSetter(sheenEl, 'x', 'px');
		const sheenY = gsap.quickSetter(sheenEl, 'y', 'px');
		const onMouseMove = (e: MouseEvent) => {
			if (reduceMotion || window.scrollY > window.innerHeight * 9) return;
			cancelAnimationFrame(raf);
			raf = requestAnimationFrame(() => {
				const rect = shellEl.getBoundingClientRect();
				const w = shellEl.offsetWidth;
				const h = shellEl.offsetHeight;
				const scale = rect.width / w || 1;
				sheenX((e.clientX - rect.left) / scale - w / 2);
				sheenY((e.clientY - rect.top) / scale - h / 2);
				rotY((e.clientX / window.innerWidth - 0.5) * 2 * 8);
				rotX(-(e.clientY / window.innerHeight - 0.5) * 2 * 8);
			});
		};
		window.addEventListener('mousemove', onMouseMove, { passive: true });

		const ctx = gsap.context(() => {
			if (reduceMotion) {
				gsap.set('.hero-text-wrapper, .cta-wrapper, .scroll-hint', { autoAlpha: 0 });
				gsap.set('.main-card', { autoAlpha: 1 });
				gsap.set('.card-shell', { scale: 1, borderRadius: 0 });
				gsap.set('.card-brand, .card-copy, .mockup-wrapper, .floating-badge, .module-0', { autoAlpha: 1 });
				gsap.set('.counter-val', { innerHTML: presentCount });
				return;
			}

			gsap.set('.text-track', { autoAlpha: 0, y: 60, scale: 0.85, filter: 'blur(20px)', rotationX: -20 });
			gsap.set('.text-days', { autoAlpha: 1, clipPath: 'inset(0 100% 0 0)' });
			gsap.set('.scroll-hint', { autoAlpha: 0, y: 10 });
			gsap.set('.main-card', { y: window.innerHeight + 200, autoAlpha: 1 });
			gsap.set('.card-shell', { scale: shellScale, borderRadius: shellRadius });
			gsap.set(['.card-brand', '.card-copy', '.mockup-wrapper', '.floating-badge'], { autoAlpha: 0 });
			gsap.set(['.module-1', '.module-2'], { autoAlpha: 0 });
			gsap.set('.module-0', { autoAlpha: 1 });
			gsap.set('.feat-item', { opacity: 0.4 });
			gsap.set('.feat-0', { opacity: 1 });
			gsap.set('.cta-wrapper', { autoAlpha: 0, scale: 0.8 });

			gsap
				.timeline({ delay: 0.3 })
				.to('.text-track', { duration: 1.8, autoAlpha: 1, y: 0, scale: 1, filter: 'blur(0px)', rotationX: 0, ease: 'expo.out' })
				.to('.text-days', { duration: 1.4, clipPath: 'inset(0 0% 0 0)', ease: 'power4.inOut' }, '-=1.0')
				.to('.scroll-hint', { duration: 0.8, autoAlpha: 1, y: 0, ease: 'power2.out' }, '-=0.4');

			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: containerEl,
					start: 'top top',
					end: '+=7500',
					pin: true,
					scrub: 1,
					anticipatePin: 1
				}
			});

			const switchModule = (from: number, to: number) => {
				const label = `module-${to}`;
				tl.to(`.module-${from}`, { autoAlpha: 0, x: -40, ease: 'power3.inOut', duration: 0.8 }, label)
					.fromTo(`.module-${to}`, { autoAlpha: 0, x: 40 }, { autoAlpha: 1, x: 0, ease: 'power3.inOut', duration: 0.8 }, label)
					.fromTo(`.module-${to} .module-item`, { y: 20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.15, ease: 'back.out(1.4)', duration: 0.8 }, `${label}+=0.3`)
					.to(`.feat-${from}`, { opacity: 0.4, duration: 0.6 }, label)
					.to(`.feat-${to}`, { opacity: 1, duration: 0.6 }, label)
					.to({}, { duration: 1.6 });
			};

			tl.to('.scroll-hint', { autoAlpha: 0, duration: 0.4 }, 0)
				.to('.hero-text-wrapper', { scale: 1.15, filter: 'blur(20px)', opacity: 0.2, ease: 'power2.inOut', duration: 2 }, 0)
				.to('.bg-grid-theme', { scale: 1.15, opacity: 0.2, ease: 'power2.inOut', duration: 2 }, 0)
				.to('.main-card', { y: 0, ease: 'power3.inOut', duration: 2 }, 0)
				.to('.card-shell', { scale: 1, borderRadius: 0, ease: 'power3.inOut', duration: 1.5 })
				.fromTo(
					'.mockup-wrapper',
					{ y: 300, z: -500, rotationX: 40, rotationY: -25, autoAlpha: 0, scale: 0.6 },
					{ y: 0, z: 0, rotationX: 0, rotationY: 0, autoAlpha: 1, scale: 1, ease: 'expo.out', duration: 2.5 },
					'-=0.8'
				)
				.fromTo('.module-0 .module-item', { y: 24, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.15, ease: 'back.out(1.2)', duration: 1.2 }, '-=1.5')
				.to('.counter-val', { innerHTML: presentCount, snap: { innerHTML: 1 }, duration: 2, ease: 'expo.out' }, '-=1.8')
				.fromTo('.floating-badge', { y: 100, autoAlpha: 0, scale: 0.7, rotationZ: -10 }, { y: 0, autoAlpha: 1, scale: 1, rotationZ: 0, ease: 'back.out(1.5)', duration: 1.5, stagger: 0.2 }, '-=2.0')
				.fromTo('.card-copy', { x: -50, autoAlpha: 0 }, { x: 0, autoAlpha: 1, ease: 'power4.out', duration: 1.5 }, '-=1.5')
				.fromTo('.card-brand', { x: -50, autoAlpha: 0, scale: 0.9 }, { x: 0, autoAlpha: 1, scale: 1, ease: 'expo.out', duration: 1.5 }, '<')
				.to({}, { duration: 1.6 });

			switchModule(0, 1);
			switchModule(1, 2);

			tl.set('.hero-text-wrapper', { autoAlpha: 0 })
				.set('.cta-wrapper', { autoAlpha: 1 })
				.to({}, { duration: 1 })
				.to(['.mockup-wrapper', '.floating-badge', '.card-copy', '.card-brand'], {
					scale: 0.9, y: -40, z: -200, autoAlpha: 0, ease: 'power3.in', duration: 1.2, stagger: 0.05
				})
				.to('.card-shell', { scale: shellScale, borderRadius: shellRadius, ease: 'expo.inOut', duration: 1.8 }, 'pullback')
				.to('.cta-wrapper', { scale: 1, ease: 'expo.inOut', duration: 1.8 }, 'pullback')
				.to('.main-card', { y: -window.innerHeight - 300, ease: 'power3.in', duration: 1.5 })
				.to({}, { duration: 2 });
		}, containerEl);

		return () => {
			window.removeEventListener('mousemove', onMouseMove);
			cancelAnimationFrame(raf);
			ctx.revert();
		};
	});
</script>

<div
	bind:this={containerEl}
	class="relative flex h-screen w-full items-center justify-center overflow-hidden bg-slate-50 text-slate-900 antialiased"
	style="perspective: 1500px"
>
	<div class="film-grain" aria-hidden="true"></div>
	<div class="bg-grid-theme pointer-events-none absolute inset-0 z-0 opacity-60" aria-hidden="true"></div>

	<!-- LAPISAN BELAKANG: tagline -->
	<div class="hero-text-wrapper preserve-3d absolute z-10 flex w-full flex-col items-center justify-center px-4 text-center will-change-transform">
		<p class="text-track gsap-reveal mb-6 inline-flex items-center gap-2 rounded-2xl border border-brand-200 bg-brand-50 px-4 py-2 text-xs font-bold tracking-[0.2em] text-brand-700 uppercase shadow-[0_2px_0_0_#9DD9CB]">
			<ShieldCheck size={14} /> HRIS by Khwarizmi
		</p>
		<h1 class="text-track gsap-reveal text-3d-matte mb-2 text-4xl font-black tracking-tight md:text-6xl lg:text-7xl">
			HRIS terintegrasi,
		</h1>
		<h1 class="text-days gsap-reveal text-brand-gradient text-4xl font-black tracking-tighter md:text-6xl lg:text-7xl">
			sepenuhnya milik Anda.
		</h1>
		<p class="scroll-hint gsap-reveal mt-10 flex flex-col items-center gap-1 text-xs font-bold tracking-widest text-slate-400 uppercase">
			Gulir untuk menjelajah
			<ChevronDown size={18} class="animate-bounce" />
		</p>
	</div>

	<!-- LAPISAN BELAKANG 2: CTA -->
	<div class="cta-wrapper gsap-reveal absolute z-10 flex w-full flex-col items-center justify-center px-4 text-center will-change-transform">
		<h2 class="text-brand-gradient mb-6 text-4xl font-black tracking-tight md:text-6xl lg:text-7xl">
			Bangun sistem HR Anda.
		</h2>
		<p class="mx-auto mb-12 max-w-xl text-lg leading-relaxed text-slate-500 md:text-xl">
			Absensi, data karyawan, approval dokumen, hingga payroll — terintegrasi dan dikendalikan penuh oleh perusahaan.
		</p>
		<div class="flex flex-col gap-4 sm:flex-row">
			<a
				href={whatsappUrl}
				target="_blank"
				rel="noopener noreferrer"
				class="pressable inline-flex items-center justify-center gap-2 rounded-2xl border border-brand-700 px-7 py-4 text-base font-bold text-white shadow-[0_3px_0_0_#006151] hover:shadow-[0_2px_0_0_#006151]"
				style="background:linear-gradient(135deg,#01866F,#017563)"
			>
				<WhatsAppIcon size={18} /> Konsultasi Gratis
			</a>
			<a
				href="#fase"
				class="pressable inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-7 py-4 text-base font-bold text-slate-700 shadow-[0_2px_0_0_#E2E8F0] hover:shadow-[0_1px_0_0_#E2E8F0]"
			>
				Lihat fase pengembangan <ArrowRight size={18} />
			</a>
		</div>
	</div>

	<!-- LAPISAN DEPAN: kartu fitur -->
	<div class="pointer-events-none absolute inset-0 z-20 flex items-center justify-center" style="perspective: 1500px">
		<div class="main-card gsap-reveal pointer-events-auto relative flex h-full w-full items-center justify-center">
			<div bind:this={shellEl} class="card-shell premium-depth-card absolute inset-0 overflow-hidden" aria-hidden="true">
				<div bind:this={sheenEl} class="card-sheen"></div>
			</div>

			<div class="relative z-10 mx-auto flex h-full w-full max-w-7xl flex-col items-center justify-evenly px-4 py-6 lg:grid lg:grid-cols-[1fr_1.5fr] lg:grid-rows-2 lg:gap-x-10 lg:px-12 lg:py-0">
				<!-- Nama brand -->
				<div class="card-brand gsap-reveal z-30 order-1 flex w-full flex-col items-center lg:col-start-1 lg:row-start-1 lg:items-start lg:self-end lg:pb-6">
					<img src="/logo-khwarizmi-192.png" alt="" class="mb-4 hidden h-14 w-14 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.4)] lg:block" />
					<h2 class="text-card-silver text-6xl leading-none font-black tracking-tighter uppercase md:text-7xl lg:text-[6.5rem]">HRIS</h2>
					<p class="mt-1 text-sm font-bold tracking-[0.4em] text-brand-100 uppercase lg:text-base legible">by Khwarizmi</p>
				</div>

				<!-- Mockup dashboard -->
				<div
					class="mockup-wrapper relative z-10 order-2 flex h-[300px] w-full items-center justify-center sm:h-[380px] lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:h-[560px]"
					style="perspective: 1000px"
				>
					<div bind:this={mockupEl} class="preserve-3d relative w-full max-w-[680px] will-change-transform">
						<div class="mockup-frame rounded-[28px] border border-white/60 bg-white p-2 sm:p-3">
							<img
								src="/img/mockup-hris.png"
								alt="Dashboard HRIS by Khwarizmi di desktop, laptop, dan ponsel"
								width="1188"
								height="824"
								class="w-full rounded-[20px]"
							/>
						</div>

						<!-- Kartu modul: berganti Absensi → Approval → Payroll saat di-scroll -->
						<div class="absolute right-0 -bottom-6 z-20 hidden w-[290px] sm:block lg:-right-6 lg:-bottom-4">
							<!-- Absensi -->
							<div class="module-0 module-card absolute right-0 bottom-0 w-full">
								<div class="module-item mb-3 flex items-center justify-between">
									<div>
										<p class="text-[11px] font-bold tracking-widest text-slate-400 uppercase">Absensi hari ini</p>
										<p class="text-2xl font-black tracking-tight text-slate-900"><span class="counter-val">0</span><span class="text-slate-400">/22</span> hadir</p>
									</div>
									<span class="flex h-10 w-10 items-center justify-center rounded-2xl border border-brand-200 bg-brand-50 text-brand-600"><UserCheck size={20} /></span>
								</div>
								<div class="flex flex-col gap-2">
									{#each attendance as a}
										<div class="module-item flex items-center justify-between rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-[0_3px_0_0_#E2E8F0]">
											<div class="flex items-center gap-2.5">
												<span class="flex h-8 w-8 items-center justify-center rounded-full text-[10px] font-black text-white" style="background:{BRAND}">{a.initials}</span>
												<div>
													<p class="text-xs font-extrabold text-slate-800">{a.name}</p>
													<p class="text-[10px] font-bold text-slate-400">{a.meta}</p>
												</div>
											</div>
											<span class="rounded-lg px-2 py-1 text-[10px] font-extrabold {a.badge}">{a.status}</span>
										</div>
									{/each}
								</div>
							</div>

							<!-- Approval -->
							<div class="module-1 module-card absolute right-0 bottom-0 w-full">
								<div class="module-item mb-3 flex items-center justify-between">
									<div>
										<p class="text-[11px] font-bold tracking-widest text-slate-400 uppercase">Approval dokumen</p>
										<p class="text-2xl font-black tracking-tight text-slate-900">4 <span class="text-slate-400">menunggu</span></p>
									</div>
									<span class="flex h-10 w-10 items-center justify-center rounded-2xl border border-amber-200 bg-amber-50 text-amber-600"><FileSignature size={20} /></span>
								</div>
								<div class="flex flex-col gap-2">
									{#each documents as d}
										<div class="module-item flex items-center justify-between gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-[0_3px_0_0_#E2E8F0]">
											<div class="min-w-0">
												<p class="truncate text-xs font-extrabold text-slate-800">{d.title}</p>
												<p class="text-[10px] font-bold text-slate-400">{d.by}</p>
											</div>
											<span class="shrink-0 rounded-lg px-2 py-1 text-[10px] font-extrabold {d.badge}">{d.status}</span>
										</div>
									{/each}
								</div>
							</div>

							<!-- Payroll -->
							<div class="module-2 module-card absolute right-0 bottom-0 w-full">
								<div class="module-item mb-3 flex items-center justify-between">
									<div>
										<p class="text-[11px] font-bold tracking-widest text-slate-400 uppercase">Payroll November</p>
										<p class="text-2xl font-black tracking-tight text-slate-900">22 <span class="text-slate-400">slip gaji</span></p>
									</div>
									<span class="flex h-10 w-10 items-center justify-center rounded-2xl border border-orange-200 bg-orange-50 text-orange-600"><Wallet size={20} /></span>
								</div>
								<div class="module-item mb-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 shadow-[0_3px_0_0_#E2E8F0]">
									<div class="mb-2 flex justify-between text-[10px] font-extrabold text-slate-500">
										<span>Diproses</span><span class="text-brand-700">100%</span>
									</div>
									<div class="h-2 overflow-hidden rounded-full bg-slate-100"><div class="h-full w-full rounded-full" style="background:{BRAND}"></div></div>
								</div>
								<div class="grid grid-cols-2 gap-2">
									<div class="module-item rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-[0_3px_0_0_#E2E8F0]">
										<p class="text-[10px] font-bold text-slate-400">BPJS</p>
										<p class="text-xs font-extrabold text-brand-700">Terhitung ✓</p>
									</div>
									<div class="module-item rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-[0_3px_0_0_#E2E8F0]">
										<p class="text-[10px] font-bold text-slate-400">Jadwal transfer</p>
										<p class="text-xs font-extrabold text-slate-800">25 Nov</p>
									</div>
								</div>
							</div>
						</div>
					</div>

					<!-- Badge kaca melayang -->
					<div class="floating-badge floating-ui-badge absolute bottom-[8%] left-0 z-30 flex items-center gap-3 rounded-xl p-3 lg:bottom-[10%] lg:-left-8 lg:gap-4 lg:rounded-2xl lg:p-4">
						<div class="flex h-8 w-8 items-center justify-center rounded-full border border-brand-300/40 bg-brand-400/20 text-brand-100 lg:h-10 lg:w-10">
							<Crown size={18} />
						</div>
						<div>
							<p class="text-xs font-bold tracking-tight text-white lg:text-sm">System Ownership</p>
							<p class="text-[10px] font-medium text-brand-100/60 lg:text-xs">100% milik perusahaan</p>
						</div>
					</div>
					<div class="floating-badge floating-ui-badge absolute -top-4 right-4 z-30 hidden items-center gap-3 rounded-xl p-3 sm:flex lg:-top-6 lg:right-10 lg:gap-4 lg:rounded-2xl lg:p-4">
						<div class="flex h-8 w-8 items-center justify-center rounded-full border border-amber-300/40 bg-amber-400/20 text-amber-200 lg:h-10 lg:w-10">
							<CalendarClock size={18} />
						</div>
						<div>
							<p class="text-xs font-bold tracking-tight text-white lg:text-sm">Cuti disetujui</p>
							<p class="text-[10px] font-medium text-brand-100/60 lg:text-xs">2 hari · oleh atasan</p>
						</div>
					</div>
				</div>

				<!-- Teks fitur -->
				<div class="card-copy legible gsap-reveal z-30 order-3 flex w-full flex-col justify-center px-4 text-center lg:col-start-1 lg:row-start-2 lg:justify-start lg:self-start lg:px-0 lg:text-left">
					<h3 class="mb-0 text-2xl font-black tracking-tight text-white md:text-3xl lg:mb-5 lg:text-4xl">
						Satu sistem untuk seluruh urusan HR.
					</h3>
					<p class="mx-auto hidden max-w-sm text-sm leading-relaxed text-brand-50 md:block md:text-base lg:mx-0 lg:mb-6 lg:max-w-none lg:text-lg">
						Dibangun khusus untuk perusahaan Anda — data, sistem, dan pengembangannya sepenuhnya di tangan Anda.
					</p>
					<ul class="mt-4 hidden flex-col gap-2.5 lg:mt-0 lg:flex">
						{#each featureList as feat, i}
							<li class="feat-item feat-{i} flex items-center gap-3 text-sm font-bold text-white lg:text-base">
								<span class="flex h-9 w-9 items-center justify-center rounded-xl border border-white/20 bg-white/10">
									<feat.icon size={17} />
								</span>
								{feat.label}
							</li>
						{/each}
					</ul>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.gsap-reveal {
		visibility: hidden;
	}

	.preserve-3d {
		transform-style: preserve-3d;
	}

	.film-grain {
		position: absolute;
		inset: 0;
		pointer-events: none;
		z-index: 50;
		opacity: 0.035;
		background: url('data:image/svg+xml;utf8,<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(%23n)"/></svg>');
	}

	.bg-grid-theme {
		background-size: 60px 60px;
		background-image:
			linear-gradient(to right, rgb(15 23 42 / 0.05) 1px, transparent 1px),
			linear-gradient(to bottom, rgb(15 23 42 / 0.05) 1px, transparent 1px);
		mask-image: radial-gradient(ellipse at center, black 0%, transparent 70%);
		-webkit-mask-image: radial-gradient(ellipse at center, black 0%, transparent 70%);
	}

	.text-3d-matte {
		color: #0f172a;
		text-shadow:
			0 10px 30px rgb(15 23 42 / 0.18),
			0 2px 4px rgb(15 23 42 / 0.1);
	}

	.text-brand-gradient {
		background: linear-gradient(180deg, #0aa086 0%, #006151 100%);
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
		transform: translateZ(0);
		filter: drop-shadow(0 10px 20px rgb(1 134 111 / 0.2)) drop-shadow(0 2px 4px rgb(1 134 111 / 0.15));
	}

	/* Teks di atas kartu hijau bisa menimpa area putih mockup, jadi diberi
	   halo hijau gelap agar tetap terbaca di kedua latar. */
	.legible {
		text-shadow:
			0 0 2px rgb(0 36 31 / 0.9),
			0 1px 3px rgb(0 36 31 / 0.85),
			0 4px 18px rgb(0 36 31 / 0.75);
	}

	.text-card-silver {
		background: linear-gradient(180deg, #ffffff 0%, #c9ebe3 100%);
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
		transform: translateZ(0);
		filter: drop-shadow(0 0 1.5px rgb(0 36 31 / 0.95)) drop-shadow(0 2px 4px rgb(0 36 31 / 0.8)) drop-shadow(0 12px 24px rgb(0 0 0 / 0.5));
	}

	.premium-depth-card {
		background: linear-gradient(145deg, #01866f 0%, #006151 45%, #00241f 100%);
		box-shadow:
			0 40px 100px -20px rgb(0 36 31 / 0.7),
			0 20px 40px -20px rgb(0 0 0 / 0.6),
			inset 0 1px 2px rgb(255 255 255 / 0.25),
			inset 0 -2px 4px rgb(0 0 0 / 0.6);
		border: 1px solid rgb(255 255 255 / 0.06);
	}

	.main-card,
	.card-shell,
	.card-sheen {
		will-change: transform;
	}

	.card-sheen {
		position: absolute;
		top: 50%;
		left: 50%;
		width: 1600px;
		height: 1600px;
		margin: -800px 0 0 -800px;
		pointer-events: none;
		background: radial-gradient(800px circle at center, rgb(255 255 255 / 0.08) 0%, transparent 40%);
	}

	.mockup-frame {
		box-shadow:
			0 8px 0 0 #9dd9cb,
			0 40px 80px -15px rgb(0 0 0 / 0.55);
	}

	.module-card {
		border-radius: 1.25rem;
		border: 1px solid #e2e8f0;
		background: #f8fafc;
		padding: 1rem;
		box-shadow:
			0 6px 0 0 #e2e8f0,
			0 30px 60px -15px rgb(0 0 0 / 0.5);
	}

	.floating-ui-badge {
		background: linear-gradient(135deg, rgb(0 46 39 / 0.92) 0%, rgb(0 24 20 / 0.88) 100%);
		box-shadow:
			0 0 0 1px rgb(255 255 255 / 0.15),
			0 25px 50px -12px rgb(0 0 0 / 0.6),
			inset 0 1px 1px rgb(255 255 255 / 0.25);
	}
</style>
