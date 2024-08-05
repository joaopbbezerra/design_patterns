export default class Coord {
    constructor(public lat: number, public lon: number){
        if (lat < -90 || lat > 90) {
            throw new Error('Invalid latitude');
        }

        if (lon < -180 || lon > 180) {
            throw new Error('Invalid longitude');
        }
    }
}