export const getAlbumArtworkUrl = async (albumNumber) => {
	try {
		const response = await makeRequest(`
			albumCollection(where: { id: ${albumNumber}}, limit: 1) {
				items {
					id,
					artwork {
						url
					}
				}
			}
		`)

		const result = await response.json()
		return result.data.albumCollection.items[0].artwork.url
	} catch (e) {
		throw e
	}
}

export const getArtistHeadshotUrl = async (artistId) => {
	try {
		const response = await makeRequest(`
			artistCollection(where: { id: ${artistId}}, limit: 1) {
				items {
					id,
					headshot {
						url
					}
				}
			}
	`)

		const result = await response.json()
		return result.data.artistCollection.items[0].headshot.url
	} catch (e) {
		throw e
	}
}

async function makeRequest(query) {
	return await fetch(
		`https://graphql.contentful.com/content/v1/spaces/uygeax0v3i3l/environments/master`,
		{
			method: 'POST',
			headers: {
				Authorization:
					'Bearer K4mLhth_USji84PyjthsyF1N-ByR71fFggGmgaeY_SE',
					'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				query: `{${query}}`,
			}),
		}
	)
}
