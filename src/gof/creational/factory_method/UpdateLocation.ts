import Location from "./Location"
import Segment, {DistanceSegment} from "./Segment";
import Ride from "./Ride";
import RideRepository from "./RideRepository";
import SegmentRepository from "./SegmentRepository";

export default class UpdateLocation {
    constructor(
        private rideRepository: RideRepository,
        private segmentRepository: SegmentRepository
    ) {}

    async execute(input: Input): Promise<void> {
        const ride = await this.rideRepository.getRideById(input.rideId);
        const newLocation = new Location(input.lat, input.long, input.date);
        const segment = ride.createSegment(ride.lastLocation, newLocation)
        ride.updateLocation(newLocation);
        await this.rideRepository.update(ride);
        await this.segmentRepository.save(segment);

    }
}

type Input = {
    rideId: string,
    lat: number,
    long: number,
    date: Date
}