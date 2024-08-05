import {DistanceRide, TimeRide} from "../../../../src/gof/creational/factory_method/Ride";
import Location from "../../../../src/gof/creational/factory_method/Location";
import {DistanceSegment, TimeSegment} from "../../../../src/gof/creational/factory_method/Segment";

test("Deve criar e calcular a tarifa de uma corrida com base na distância", () => {
    const lastLocation = new Location(-27.584905257808835, -48.545022195325124, new Date("2021-03-01T10:00:00"))
    const newLocation = new Location(-27.496887588317275, -48.522234807851476, new Date("2021-03-01T12:00:00"))
    const distanceRide = DistanceRide.create(-27.584905257808835, -48.545022195325124, new Date("2021-03-01T10:00:00"))
    const segment = new DistanceSegment(distanceRide.rideId, lastLocation, newLocation)
    distanceRide.updateLocation(newLocation)
    const fare = distanceRide.calculateFare([segment]);
    expect(fare).toBe(40);
})

test("Deve criar e calcular a tarifa de uma corrida com base no tempo", () => {
    const lastLocation = new Location(-27.584905257808835, -48.545022195325124, new Date("2021-03-01T10:00:00"))
    const newLocation = new Location(-27.496887588317275, -48.522234807851476, new Date("2021-03-01T12:00:00"))
    const timeRide = TimeRide.create(-27.584905257808835, -48.545022195325124, new Date("2021-03-01T10:00:00"))
    const segment = new TimeSegment(timeRide.rideId, lastLocation, newLocation)
    timeRide.updateLocation(newLocation)
    const fare = timeRide.calculateFare([segment]);
    expect(fare).toBe(120);
})