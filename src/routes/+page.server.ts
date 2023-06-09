import type { ServerLoad } from '@sveltejs/kit'

import type { VideoItem } from '$lib/bili-api'

export type Item = {
	title: string
	subtitle: string
	desc: string
	videos?: VideoItem[]
}

export type OutputData = {
	cursor: number
	items: Item[]
	count: number
	rest: { [k: number]: Item }
}

import { searchVideo, getVideoInfo } from '$lib/bili-api'

export const load: ServerLoad<any, any, OutputData> = async () => {
	let a = await getVideoInfo('BV1w341167Gj')
	console.log(a)
	return {
		cursor: 0,
		count: 0,
		rest: [],
		items: [
			{
				title: 'hhsdd',
				subtitle: '狐狐是垫的(歌)',
				desc: `由<a href="https://space.bilibili.com/477792" target="bili_xuehusang">"雪狐桑"</a>老婆<a href="https://space.bilibili.com/671538942" target="bili_neeko">"黎歌Neeko"</a>倾情献唱(迫害)`,
				videos: await searchVideo('hhsdd'),
			},
			{
				title: '狐狐是大的',
				subtitle: '错误的gachi想法',
				desc: '',
			},
			{
				title: '狐狐是DD',
				subtitle: '海王, 有多位后宫',
				desc: '',
				videos: await Promise.all([
					getVideoInfo('BV1w341167Gj'), // Minicatty 萨摩
				]),
			},
		],
	}
}
