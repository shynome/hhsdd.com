import { readable, writable } from 'svelte/store'
import type { OutputData, Item } from './+page.server'
export const initCurrent = (data: OutputData, cursor = 0) => {
	let count = 0
	let rest: { [k: number]: Item } = {}
	function next(skipLast: boolean = true) {
		if (count === data.items.length) {
			count = 0
		}
		if (count === 0) {
			rest = data.items.reduce((t, v, i) => {
				t[i] = v
				return t
			}, {} as typeof rest)
		}

		while (true) {
			let restKeys = Object.keys(rest) as any as number[]
			let next = Math.floor(Math.random() * restKeys.length)
			if (skipLast && restKeys[next] === cursor) {
				continue
			}
			cursor = restKeys[next]
			break
		}

		delete rest[cursor]
		count += 1
		set(data.items[cursor])
	}
	const { subscribe, set } = writable(data.items[cursor])
	return {
		subscribe,
		next,
	}
}
