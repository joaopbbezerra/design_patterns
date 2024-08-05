import Location from "./Location"
import Segment from "./Segment";
import Ride from "./Ride";
import RideRepository from "./RideRepository";
import SegmentRepository from "./SegmentRepository";

export default class CalculateFare {
    constructor(
        private rideRepository: RideRepository,
        private segmentRepository: SegmentRepository
    ) {}

    async execute(rideId: string): Promise<Output> {
        const ride = await this.rideRepository.getRideById(rideId);
        const segments = await this.segmentRepository.listByRideId(rideId)
        const fare = ride.calculateFare(segments);

        return { fare };
    }
}

type Output = {
    fare: number;
}