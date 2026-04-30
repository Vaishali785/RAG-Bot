import { Outlet, useLocation } from "react-router-dom"
import Header from "../components/layout/Header"

const Layout = () => {
	const { pathname } = useLocation()
	return (
		<div className="relative min-h-screen overflow-hidden">
			{/* Floating gradient orbs */}
			{pathname === "/admin" ? (
				<div className="pointer-events-none absolute inset-0 overflow-hidden">
					<div
						className="absolute -top-40 -right-32 w-[500px] h-[500px] rounded-full opacity-40 blur-3xl animate-float-slow"
						style={{ background: "var(--gradient-orb-1)" }}
					/>
					<div
						className="absolute -bottom-40 -left-32 w-[450px] h-[450px] rounded-full opacity-30 blur-3xl animate-float-slower"
						style={{ background: "var(--gradient-orb-3)" }}
					/>
				</div>
			) : (
				<div className="pointer-events-none absolute inset-0 overflow-hidden">
					<div
						className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full opacity-30 blur-3xl animate-float-slow"
						style={{ background: "var(--gradient-orb-1)" }}
					/>
					<div
						className="absolute top-[16%] -right-32 w-[450px] h-[450px] rounded-full opacity-40 blur-3xl animate-float-slower"
						style={{ background: "var(--gradient-orb-2)" }}
					/>
					<div
						className="absolute -bottom-40 left-[18%] w-[500px] h-[500px] rounded-full opacity-30 blur-3xl animate-float-slow"
						style={{ background: "var(--gradient-orb-3)" }}
					/>
				</div>
			)}

			<main className="w-full  h-screen flex flex-col">
				<Header />
				<Outlet />
			</main>
		</div>
	)
}

export default Layout
