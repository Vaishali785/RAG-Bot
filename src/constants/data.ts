import type { Doc, Palette } from "../types/app-types"

export const palettes: Palette[] = [
	{
		id: "lavender",
		name: "Lavender Mist",
		swatches: ["#a78bfa", "#f0abfc", "#7dd3fc", "#fed7aa"],
		light: {
			primary: "262 75% 62%",
			accent: "290 70% 75%",
			ring: "262 75% 62%",
			gradientButton: "linear-gradient(135deg, hsl(262 80% 62%), hsl(290 75% 65%))",
			gradientUser: "linear-gradient(135deg, hsl(262 75% 62%), hsl(285 70% 65%))",
			gradientPage:
				"linear-gradient(135deg, hsl(250 80% 94%) 0%, hsl(275 75% 92%) 30%, hsl(300 70% 93%) 55%, hsl(20 80% 94%) 80%, hsl(200 75% 94%) 100%)",
			orb1: "radial-gradient(circle, hsl(270 90% 75%), hsl(290 80% 65%))",
			orb2: "radial-gradient(circle, hsl(320 80% 80%), hsl(290 70% 70%))",
			orb3: "radial-gradient(circle, hsl(200 85% 80%), hsl(220 75% 70%))",
			orbCore:
				"radial-gradient(circle at 35% 30%, hsl(290 95% 85%), hsl(270 80% 60%) 55%, hsl(250 70% 45%) 100%)",
		},
		dark: {
			primary: "270 75% 68%",
			accent: "290 60% 60%",
			ring: "270 75% 68%",
			gradientButton: "linear-gradient(135deg, hsl(265 75% 60%), hsl(290 70% 60%))",
			gradientUser: "linear-gradient(135deg, hsl(265 70% 55%), hsl(290 65% 55%))",
			gradientPage:
				"linear-gradient(135deg, hsl(260 30% 7%) 0%, hsl(275 28% 9%) 50%, hsl(290 25% 8%) 100%)",
			orb1: "radial-gradient(circle, hsl(270 60% 45%), hsl(290 55% 35%))",
			orb2: "radial-gradient(circle, hsl(310 55% 42%), hsl(290 50% 32%))",
			orb3: "radial-gradient(circle, hsl(220 55% 40%), hsl(240 50% 30%))",
			orbCore:
				"radial-gradient(circle at 35% 30%, hsl(280 80% 70%), hsl(265 70% 50%) 55%, hsl(250 60% 25%) 100%)",
		},
	},
	{
		id: "ocean",
		name: "Ocean Breeze",
		swatches: ["#0ea5e9", "#22d3ee", "#5eead4", "#bfdbfe"],
		light: {
			primary: "199 89% 48%",
			accent: "188 90% 60%",
			ring: "199 89% 48%",
			gradientButton: "linear-gradient(135deg, hsl(199 89% 48%), hsl(188 90% 55%))",
			gradientUser: "linear-gradient(135deg, hsl(199 89% 48%), hsl(178 80% 50%))",
			gradientPage:
				"linear-gradient(135deg, hsl(200 90% 95%) 0%, hsl(190 85% 93%) 35%, hsl(170 75% 93%) 65%, hsl(210 90% 95%) 100%)",
			orb1: "radial-gradient(circle, hsl(199 90% 75%), hsl(210 85% 65%))",
			orb2: "radial-gradient(circle, hsl(170 80% 75%), hsl(180 75% 65%))",
			orb3: "radial-gradient(circle, hsl(220 85% 80%), hsl(200 80% 70%))",
			orbCore:
				"radial-gradient(circle at 35% 30%, hsl(190 95% 85%), hsl(199 89% 55%) 55%, hsl(210 80% 35%) 100%)",
		},
		dark: {
			primary: "199 80% 60%",
			accent: "188 70% 55%",
			ring: "199 80% 60%",
			gradientButton: "linear-gradient(135deg, hsl(199 75% 50%), hsl(188 70% 50%))",
			gradientUser: "linear-gradient(135deg, hsl(199 70% 45%), hsl(178 65% 45%))",
			gradientPage:
				"linear-gradient(135deg, hsl(210 40% 7%) 0%, hsl(200 38% 9%) 50%, hsl(190 35% 8%) 100%)",
			orb1: "radial-gradient(circle, hsl(199 60% 40%), hsl(210 55% 32%))",
			orb2: "radial-gradient(circle, hsl(170 55% 38%), hsl(180 50% 30%))",
			orb3: "radial-gradient(circle, hsl(220 55% 40%), hsl(200 50% 32%))",
			orbCore:
				"radial-gradient(circle at 35% 30%, hsl(190 80% 70%), hsl(199 75% 45%) 55%, hsl(210 70% 22%) 100%)",
		},
	},
	{
		id: "sunset",
		name: "Warm Sunset",
		swatches: ["#f97316", "#ec4899", "#f59e0b", "#fda4af"],
		light: {
			primary: "20 90% 55%",
			accent: "330 85% 65%",
			ring: "20 90% 55%",
			gradientButton: "linear-gradient(135deg, hsl(20 90% 58%), hsl(340 85% 62%))",
			gradientUser: "linear-gradient(135deg, hsl(20 90% 58%), hsl(0 85% 60%))",
			gradientPage:
				"linear-gradient(135deg, hsl(30 95% 94%) 0%, hsl(15 90% 93%) 30%, hsl(340 85% 94%) 65%, hsl(45 95% 94%) 100%)",
			orb1: "radial-gradient(circle, hsl(20 95% 75%), hsl(0 85% 70%))",
			orb2: "radial-gradient(circle, hsl(340 90% 80%), hsl(320 80% 70%))",
			orb3: "radial-gradient(circle, hsl(45 95% 78%), hsl(30 90% 70%))",
			orbCore:
				"radial-gradient(circle at 35% 30%, hsl(35 100% 85%), hsl(15 90% 60%) 55%, hsl(345 80% 45%) 100%)",
		},
		dark: {
			primary: "20 85% 60%",
			accent: "330 70% 60%",
			ring: "20 85% 60%",
			gradientButton: "linear-gradient(135deg, hsl(20 80% 55%), hsl(340 75% 58%))",
			gradientUser: "linear-gradient(135deg, hsl(20 75% 50%), hsl(0 75% 55%))",
			gradientPage:
				"linear-gradient(135deg, hsl(20 30% 7%) 0%, hsl(0 28% 8%) 50%, hsl(340 25% 8%) 100%)",
			orb1: "radial-gradient(circle, hsl(20 60% 42%), hsl(0 55% 35%))",
			orb2: "radial-gradient(circle, hsl(340 55% 40%), hsl(320 50% 32%))",
			orb3: "radial-gradient(circle, hsl(45 60% 38%), hsl(30 55% 32%))",
			orbCore:
				"radial-gradient(circle at 35% 30%, hsl(30 85% 65%), hsl(15 80% 45%) 55%, hsl(345 75% 22%) 100%)",
		},
	},
	{
		id: "forest",
		name: "Forest Sage",
		swatches: ["#10b981", "#84cc16", "#a3e635", "#d9f99d"],
		light: {
			primary: "160 70% 40%",
			accent: "85 70% 55%",
			ring: "160 70% 40%",
			gradientButton: "linear-gradient(135deg, hsl(160 70% 42%), hsl(140 65% 50%))",
			gradientUser: "linear-gradient(135deg, hsl(160 70% 42%), hsl(180 65% 45%))",
			gradientPage:
				"linear-gradient(135deg, hsl(140 60% 94%) 0%, hsl(160 55% 93%) 35%, hsl(80 65% 93%) 65%, hsl(190 55% 94%) 100%)",
			orb1: "radial-gradient(circle, hsl(160 75% 70%), hsl(170 70% 60%))",
			orb2: "radial-gradient(circle, hsl(85 70% 75%), hsl(100 65% 65%))",
			orb3: "radial-gradient(circle, hsl(190 70% 78%), hsl(180 65% 68%))",
			orbCore:
				"radial-gradient(circle at 35% 30%, hsl(150 90% 85%), hsl(160 70% 45%) 55%, hsl(170 75% 25%) 100%)",
		},
		dark: {
			primary: "160 65% 50%",
			accent: "85 55% 55%",
			ring: "160 65% 50%",
			gradientButton: "linear-gradient(135deg, hsl(160 65% 42%), hsl(140 60% 45%))",
			gradientUser: "linear-gradient(135deg, hsl(160 60% 38%), hsl(180 55% 40%))",
			gradientPage:
				"linear-gradient(135deg, hsl(160 30% 6%) 0%, hsl(150 28% 8%) 50%, hsl(180 25% 8%) 100%)",
			orb1: "radial-gradient(circle, hsl(160 55% 38%), hsl(170 50% 30%))",
			orb2: "radial-gradient(circle, hsl(85 50% 35%), hsl(100 45% 28%))",
			orb3: "radial-gradient(circle, hsl(190 55% 38%), hsl(180 50% 30%))",
			orbCore:
				"radial-gradient(circle at 35% 30%, hsl(150 75% 60%), hsl(160 65% 38%) 55%, hsl(170 70% 18%) 100%)",
		},
	},
	{
		id: "midnight",
		name: "Midnight Indigo",
		swatches: ["#4f46e5", "#7c3aed", "#3b82f6", "#1e1b4b"],
		light: {
			primary: "245 75% 60%",
			accent: "265 70% 65%",
			ring: "245 75% 60%",
			gradientButton: "linear-gradient(135deg, hsl(245 80% 60%), hsl(265 75% 62%))",
			gradientUser: "linear-gradient(135deg, hsl(245 80% 58%), hsl(225 80% 60%))",
			gradientPage:
				"linear-gradient(135deg, hsl(230 60% 94%) 0%, hsl(245 65% 93%) 35%, hsl(265 60% 94%) 65%, hsl(220 70% 95%) 100%)",
			orb1: "radial-gradient(circle, hsl(245 85% 75%), hsl(265 75% 65%))",
			orb2: "radial-gradient(circle, hsl(225 85% 78%), hsl(215 75% 68%))",
			orb3: "radial-gradient(circle, hsl(280 75% 78%), hsl(265 70% 68%))",
			orbCore:
				"radial-gradient(circle at 35% 30%, hsl(255 95% 85%), hsl(245 80% 55%) 55%, hsl(230 70% 30%) 100%)",
		},
		dark: {
			primary: "245 80% 70%",
			accent: "265 70% 65%",
			ring: "245 80% 70%",
			gradientButton: "linear-gradient(135deg, hsl(245 75% 60%), hsl(265 70% 62%))",
			gradientUser: "linear-gradient(135deg, hsl(245 70% 55%), hsl(225 70% 55%))",
			gradientPage:
				"linear-gradient(135deg, hsl(230 35% 6%) 0%, hsl(245 32% 8%) 50%, hsl(265 30% 8%) 100%)",
			orb1: "radial-gradient(circle, hsl(245 60% 45%), hsl(265 55% 38%))",
			orb2: "radial-gradient(circle, hsl(225 60% 42%), hsl(215 55% 35%))",
			orb3: "radial-gradient(circle, hsl(280 55% 42%), hsl(265 50% 35%))",
			orbCore:
				"radial-gradient(circle at 35% 30%, hsl(255 80% 70%), hsl(245 70% 48%) 55%, hsl(230 65% 22%) 100%)",
		},
	},
	{
		id: "rose",
		name: "Rose Quartz",
		swatches: ["#f43f5e", "#ec4899", "#f472b6", "#fbcfe8"],
		light: {
			primary: "346 80% 58%",
			accent: "330 80% 70%",
			ring: "346 80% 58%",
			gradientButton: "linear-gradient(135deg, hsl(346 82% 58%), hsl(330 78% 62%))",
			gradientUser: "linear-gradient(135deg, hsl(346 82% 58%), hsl(315 75% 60%))",
			gradientPage:
				"linear-gradient(135deg, hsl(340 90% 95%) 0%, hsl(330 85% 94%) 35%, hsl(0 85% 95%) 65%, hsl(310 80% 95%) 100%)",
			orb1: "radial-gradient(circle, hsl(346 90% 78%), hsl(330 80% 70%))",
			orb2: "radial-gradient(circle, hsl(315 85% 80%), hsl(300 75% 70%))",
			orb3: "radial-gradient(circle, hsl(0 85% 82%), hsl(345 80% 72%))",
			orbCore:
				"radial-gradient(circle at 35% 30%, hsl(340 100% 88%), hsl(346 80% 58%) 55%, hsl(330 70% 35%) 100%)",
		},
		dark: {
			primary: "346 80% 65%",
			accent: "330 70% 60%",
			ring: "346 80% 65%",
			gradientButton: "linear-gradient(135deg, hsl(346 75% 55%), hsl(330 70% 58%))",
			gradientUser: "linear-gradient(135deg, hsl(346 70% 50%), hsl(315 65% 52%))",
			gradientPage:
				"linear-gradient(135deg, hsl(340 30% 7%) 0%, hsl(330 28% 8%) 50%, hsl(0 25% 8%) 100%)",
			orb1: "radial-gradient(circle, hsl(346 60% 42%), hsl(330 55% 35%))",
			orb2: "radial-gradient(circle, hsl(315 55% 40%), hsl(300 50% 32%))",
			orb3: "radial-gradient(circle, hsl(0 55% 40%), hsl(345 50% 32%))",
			orbCore:
				"radial-gradient(circle at 35% 30%, hsl(340 85% 70%), hsl(346 75% 50%) 55%, hsl(330 70% 22%) 100%)",
		},
	},
]

export const initialDocs: Doc[] = [
	{ id: "1", name: "shipping-policy.pdf", size: "248 KB", status: "indexed" },
	{ id: "2", name: "returns-faq.md", size: "12 KB", status: "indexed" },
	{ id: "3", name: "product-catalog.pdf", size: "1.4 MB", status: "indexed" },
]
