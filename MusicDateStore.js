const Store = require('electron-store')
const uuidv4 = require('uuid/v4')
const path = require('path')

class DataStore extends Store {
    constructor(settings) {
        super(settings)
        this.tracks = []
    }
    saveTracks() {
        this.set('tracks', this.tracks)
        return this
    }
    getTracks() {
        return this.get('tracks') || []
    }
    addTracks(tracks) {
        const trackWithProps = tracks.map(track => {
            return {
                id: uuidv4(),
                path: track,
                fileName: path.basename(track)
            }
        }).filter(track => {
            const currentTracksPath = this.getTracks().map(track => track.path)
            return currentTracksPath.indexOf(track.path) < 0
        })
        this.tracks = [ ...this.tracks, ...trackWithProps]
        return this.saveTracks()
    }
    deleteTrack(deletedId) {
        this.tracks = this.tracks.filter(item => item.id !== deletedId)
        return this.saveTracks()
    }
}
module.exports = DataStore