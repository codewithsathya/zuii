const asin = Math.asin;
const cos = Math.cos;
const sin = Math.sin;
const sqrt = Math.sqrt;
const PI = Math.PI;

const R = 6378137;

function squared(x) {
  return x * x;
}

function toRad(x) {
  return (x * PI) / 180.0;
}

function hav(x) {
  return squared(sin(x / 2));
}

function haversineDistance(a, b) {
  const aLat = toRad(Array.isArray(a) ? a[1] : a.latitude || a.lat);
  const bLat = toRad(Array.isArray(b) ? b[1] : b.latitude || b.lat);
  const aLng = toRad(Array.isArray(a) ? a[0] : a.longitude || a.lng || a.lon);
  const bLng = toRad(Array.isArray(b) ? b[0] : b.longitude || b.lng || b.lon);

  const ht = hav(bLat - aLat) + cos(aLat) * cos(bLat) * hav(bLng - aLng);
  return 2 * R * asin(sqrt(ht));
}

let speedOfDrone = 80; // meters/sec
let startRestTime = 10; // sec
let pickupRestTime = 10; // sec
let deliveryRestTime = 10; // sec

let drones = {};

function getCoordinates(
  startTime,
  endTime,
  currentTime,
  startLocation,
  endLocation
) {
  let ratio = (currentTime - startTime) / (endTime - startTime);
  let lat = ratio * (endLocation.lat - startLocation.lat) + startLocation.lat;
  let lng = ratio * (endLocation.lng - startLocation.lng) + startLocation.lng;
  return { lat, lng };
}

function getLocation(droneId) {
  if (!droneId) {
    return null;
  }
  if (!drones[droneId]) {
    return null;
  }
  let {
    baseStationLocation,
    pickupLocation,
    deliveryLocation,
    startTime,
    startDepartureTime,
    pickArrivalTime,
    pickDepartureTime,
    deliveryArrivalTime,
    deliveryDepartureTime,
    baseReachTime,
  } = drones[droneId];

  let currentTime = Date.now();

  let baseToPickDistance = haversineDistance(
    baseStationLocation,
    pickupLocation
  );
  let pickToDeliveryDistance = haversineDistance(
    pickupLocation,
    deliveryLocation
  );
  let deliveryToBaseDistance = haversineDistance(
    deliveryLocation,
    baseStationLocation
  );

  if (currentTime > startTime && currentTime < startDepartureTime) {
    return baseStationLocation;
  } else if (
    currentTime > startDepartureTime &&
    currentTime < pickArrivalTime
  ) {
    return getCoordinates(
      startDepartureTime,
      pickArrivalTime,
      currentTime,
      baseStationLocation,
      pickupLocation
    );
  } else if (currentTime > pickArrivalTime && currentTime < pickDepartureTime) {
    return pickupLocation;
  } else if (
    currentTime > pickDepartureTime &&
    currentTime < deliveryArrivalTime
  ) {
    return getCoordinates(
      pickDepartureTime,
      deliveryArrivalTime,
      currentTime,
      pickupLocation,
      deliveryLocation
    );
  } else if (
    currentTime > deliveryArrivalTime &&
    currentTime < deliveryDepartureTime
  ) {
    return deliveryLocation;
  } else if (
    currentTime > deliveryDepartureTime &&
    currentTime < baseReachTime
  ) {
    return getCoordinates(
      deliveryDepartureTime,
      baseReachTime,
      currentTime,
      deliveryLocation,
      baseStationLocation
    );
  } else if (currentTime > baseReachTime) {
    return baseStationLocation;
  }
  return baseStationLocation;
}

function startDrone(
  droneId,
  baseStationLocation,
  pickupLocation,
  deliveryLocation
) {
  let baseToPickDistance = haversineDistance(
    baseStationLocation,
    pickupLocation
  );
  let pickToDeliveryDistance = haversineDistance(
    pickupLocation,
    deliveryLocation
  );
  let deliveryToBaseDistance = haversineDistance(
    deliveryLocation,
    baseStationLocation
  );
  let totalDistance =
    baseToPickDistance + pickToDeliveryDistance + deliveryToBaseDistance;
  drones[droneId] = {
    droneId,
    baseStationLocation,
    pickupLocation,
    deliveryLocation,
    startTime: Date.now(),
  };

  drones[droneId].startDepartureTime =
    drones[droneId].startTime + startRestTime * 1000;
  drones[droneId].pickArrivalTime =
    drones[droneId].startDepartureTime +
    (baseToPickDistance / speedOfDrone) * 1000;
  drones[droneId].pickDepartureTime =
    drones[droneId].pickArrivalTime + pickupRestTime * 1000;
  drones[droneId].deliveryArrivalTime =
    drones[droneId].pickDepartureTime +
    (pickToDeliveryDistance / speedOfDrone) * 1000;
  drones[droneId].deliveryDepartureTime =
    drones[droneId].deliveryArrivalTime + deliveryRestTime * 1000;
  drones[droneId].baseReachTime =
    drones[droneId].deliveryDepartureTime +
    (deliveryToBaseDistance / speedOfDrone) * 1000;

  console.log(haversineDistance(pickupLocation, deliveryLocation));
  return (
    totalDistance / speedOfDrone +
    startRestTime +
    pickupRestTime +
    deliveryRestTime
  );
}

module.exports = {
  startDrone,
  getLocation,
};
