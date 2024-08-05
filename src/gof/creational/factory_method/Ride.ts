import Location from "./Location"
import crypto from "crypto"
import Segment, {DistanceSegment, TimeSegment} from "./Segment";

export default abstract class Ride {
    lastLocation: Location;

    constructor(readonly rideId: string, lat: number, long: number, readonly date: Date){
        this.lastLocation = new Location(lat, long, date);
    }

    updateLocation (newLocation: Location) {
        this.lastLocation = newLocation;
    }

    abstract calculateFare(segments: Segment[]): number;
    abstract createSegment(from: Location, to: Location): Segment
}

export class DistanceRide extends Ride {

    calculateFare (segments: DistanceSegment[]){
        let total = 0;
        for (const segment of segments) {
            total += segment.getDistance();
        }
        return total * 4;
    }

    createSegment(from: Location, to: Location): DistanceSegment {
        return new DistanceSegment(this.rideId, from, to);
    }

    //This is a static factory method - it's just an alternative to using the constructor. I could still use the constructor passing the rideId as parameter
    static create (lat: number, long: number, date: Date) {
        const rideId = crypto.randomUUID();
        return new DistanceRide(rideId, lat, long, date);
    }
}

export class TimeRide extends Ride {

    calculateFare (segments: TimeSegment[]){
        let total = 0;
        for (const segment of segments) {
            total += segment.getDiffInMinutes();
        }
        return total * 1;
    }

    createSegment(from: Location, to: Location): TimeSegment {
        return new TimeSegment(this.rideId, from, to);
    }

    static create (lat: number, long: number, date: Date) {
        const rideId = crypto.randomUUID();
        return new TimeRide(rideId, lat, long, date);
    }
}
