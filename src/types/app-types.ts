export type Doc = { id: string; name: string; size: string; status: "indexed" | "processing" }

type ThemeVars = {
	primary: string
	accent: string
	ring: string
	gradientButton: string
	gradientUser: string
	gradientPage: string
	orb1: string
	orb2: string
	orb3: string
	orbCore: string
}

export type Palette = {
	id: PaletteOptions
	name: string
	swatches: string[]
	light: ThemeVars
	dark: ThemeVars
}

export type PaletteOptions = "lavender" | "ocean" | "sunset" | "forest" | "midnight" | "rose"
export type Themes = "light" | "dark"
export type TabSlug = "knowledge" | "appearance"

export type LocalConfig = {
	theme?: Themes
	palette?: PaletteOptions
}

export type Msg = {
	id: string
	sender: "user" | "assistant"
	content: string
	status?: "loading" | "streaming" | "error" | "done"
	errorMsg?: string
	type?: "greeting" | "message"
}

export type Status = "none" | "loading" | "success" | "fail" | "file"

export type SendMsgProps = {
	query: string
	type?: "greeting" | "message"
	status?: "loading" | "streaming" | "error" | "done"
}

export type MsgAction =
	| {
			type: "ADD_USER_MSG"
			payload: Msg
	  }
	| {
			type: "START_AI_MSG"
			payload: Msg
	  }
	| {
			type: "UPDATE_AI_MSG"
			id: string
			chunk: string
	  }
	| {
			type: "FINISH_AI_MSG"
			id: string
			msg: string
	  }
	| {
			type: "ERROR_AI_MSG"
			id: string
			errorMsg: string
	  }
	| {
			type: "CLEAR_MSGS"
	  }
