import axios, { type AxiosResponse } from 'axios'

export const client = axios.create()

export interface VideoItem {
	title: string
	pic: string
	bvid: string
	author: string
}

interface Response<T> {
	data: T
}

interface VideoResult {
	result: VideoItem[]
}

export const searchVideo = async (word: string) => {
	const cookies = await client.get('https://bilibili.com').then((r) => r.headers['set-cookie'])
	let l = new URL('https://api.bilibili.com/x/web-interface/search/type')
	l.searchParams.set('keyword', word)
	l.searchParams.set('search_type', 'video')
	l.searchParams.set('order', 'click')
	const r = await client
		.get<any, Response<AxiosResponse<VideoResult>>>(l.toString(), {
			headers: {
				Cookie: cookies?.join(';'),
			},
		})
		.then((r) => r.data.data)
	let items: VideoItem[] = r.result
	return items
}

type VideoInfoResponse = Response<VideoItem>

export const getVideoInfo = async (bvid: string) => {
	let l = new URL('https://api.bilibili.com/x/web-interface/view')
	l.searchParams.set('bvid', bvid)
	const r = await client
		.get<any, AxiosResponse<VideoInfoResponse>>(l.toString())
		.then((r) => r.data.data)
	// @ts-ignore
	r.author = r.owner.name
	return r
}
