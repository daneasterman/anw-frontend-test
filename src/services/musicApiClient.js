export const getTrack = async (trackId) => {
	let response

	try {
		response = await fetch(
			`https://musicapi.audionetwork.com/tracks/${trackId}`,
			{
				method: 'GET',
				headers: {
					'X-API-KEY': '8vAVegLW9F5UMR7A8jd8YaxwuwBLb68q2BSiUubm',
					'Content-Type': 'application/json',
					'Accept': 'application/json',
				},
				credentials: 'same-origin',
			}
		)

		const track = (await response.json())
		return track
	} catch (e) {
		throw e
	}
}

export const getTracks = async (trackIds) => {
	const trackIdList = trackIds.join(',')
	let response

	try {
		response = await fetch(
			`https://musicapi.audionetwork.com/tracks?ids=${trackIdList}`,
			{
				method: 'GET',
				headers: {
					'X-API-KEY': '8vAVegLW9F5UMR7A8jd8YaxwuwBLb68q2BSiUubm',
					'Content-Type': 'application/json',
					'Accept': 'application/json',
				},
				credentials: 'same-origin',
			}
		)

		const tracks = (await response.json())

		return tracks
	} catch (e) {
		throw e
	}
}

export const getAlbum = async (albumNumber) => {
	let response
	try {
		response = await fetch(
			`https://musicapi.audionetwork.com/albums/${albumNumber}`,
			{
				method: 'GET',
				headers: {
					'X-API-KEY': '8vAVegLW9F5UMR7A8jd8YaxwuwBLb68q2BSiUubm',
					'Content-Type': 'application/json',
					'Accept': 'application/json',
				},
				credentials: 'same-origin',
			}
		)

		const album = (await response.json())

		return album
	} catch (e) {
		throw e
	}
}

export const getAlbums = async () => {
	let response
	try {
		response = await fetch(`https://musicapi.audionetwork.com/albums`, {
			method: 'GET',
			headers: {
				'X-API-KEY': '8vAVegLW9F5UMR7A8jd8YaxwuwBLb68q2BSiUubm',
				'Content-Type': 'application/json',
				'Accept': 'application/json',
			},
			credentials: 'same-origin',
		})

		console.log('response is: ', response)

		const albums = (await response.json())

		return albums
	} catch (e) {
		console.log('error is: ', e)
		throw e
	}
}

export const getAlbumTracks = async (albumNumber) => {
	let response
	try {
		response = await fetch(
			`https://musicapi.audionetwork.com/albums/${albumNumber}/tracks`,
			{
				method: 'GET',
				headers: {
					'X-API-KEY': '8vAVegLW9F5UMR7A8jd8YaxwuwBLb68q2BSiUubm',
					'Content-Type': 'application/json',
					'Accept': 'application/json',
				},
				credentials: 'same-origin',
			}
		)

		const tracks = (await response.json())

		return tracks.filter((x) => x.mix === 1)
	} catch (e) {
		throw e
	}
}
