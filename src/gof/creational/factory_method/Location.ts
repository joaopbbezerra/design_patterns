import Coord from "./Coord";

export default class Location {
    coord: Coord;

    constructor(
        public lat: number,
        public long: number,
        public date: Date
    ) {
        this.coord = new Coord(lat, long);
    }
}