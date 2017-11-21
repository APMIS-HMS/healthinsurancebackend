module.exports = function (data, connection, hook) {
  if (data.policyObject === undefined) {
    // only notify PROVIDER facilities
    if (data.providerFacilityId._id !== connection.user.facilityId._id) {
      return false;
    }
  } else {
    // only notify HIA facilities
    if (data.policyObject.hiaId._id !== connection.user.facilityId._id) {
      return false;
    }
  }
  return data;
};
