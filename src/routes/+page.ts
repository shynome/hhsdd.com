import type { Load } from '@sveltejs/kit'

export const ssr = false

import type { OutputData as InputData, Item } from './+page.server'

export type OutputData = InputData & {
	current: Item
}

export const load: Load<any, InputData, OutputData> = ({ data, depends }) => {
	// console.log(data)
	depends('hhsdd:next')
	if (data.count === data.items.length) {
		data.count = 0
	}
	if (data.count === 0) {
		data.rest = data.items.reduce((t, v, i) => {
			t[i] = v
			return t
		}, {} as typeof data.rest)
	}
	while (true) {
		let restKeys = Object.keys(data.rest) as any as number[]
		let next = Math.floor(Math.random() * restKeys.length)
		if (restKeys[next] !== data.cursor) {
			data.cursor = restKeys[next]
			break
		}
	}
	delete data.rest[data.cursor]
	data.count += 1
	return {
		...data,
		current: data.items[data.cursor],
	}
}
