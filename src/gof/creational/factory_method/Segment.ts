import Location from './Location'

export default abstract class Segment {
    constructor(readonly rideId: string, readonly from: Location, readonly to: Location) {}
}

export class DistanceSegment extends Segment {

    getDistance(): number {
        const earthRadius = 6371;
        const degreesToRadians = Math.PI / 180;
        const deltaLat = (this.to.coord.lat - this.from.coord.lat) * degreesToRadians;
        const deltaLon = (this.to.coord.lon - this.from.coord.lon) * degreesToRadians;

        const a =
            Math.sin(deltaLat / 2) *
            Math.sin(deltaLat / 2) +
            Math.cos(this.from.coord.lat * degreesToRadians) *
            Math.cos(this.to.coord.lat * degreesToRadians) *
            Math.sin(deltaLon / 2) *
            Math.sin(deltaLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return Math.round(earthRadius * c)
    }
}

export class TimeSegment extends Segment {

    getDiffInMinutes(): number {
        const diff = this.to.date.getTime() - this.from.date.getTime();
        return Math.round(diff / 60000)
    }
}