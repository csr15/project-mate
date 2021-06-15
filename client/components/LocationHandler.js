import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

const verifyPermissions = async () => {
  const result = await Permissions.askAsync(Permissions.LOCATION);
  if (result.status !== "granted") {
    return false;
  }
  return true;
};

export const getLocationHandler = async () => {
  const hasPermission = await verifyPermissions();
  if (!hasPermission) {
    return;
  }

  try {
    const location = await Location.getCurrentPositionAsync({
      timeInterval: 5000,
    });

    return {
      location: {
        longitude: location.coords.longitude,
        latitude: location.coords.latitude,
      },
    };
  } catch (err) {
    return false;
  }
};
