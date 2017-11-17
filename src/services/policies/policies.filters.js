module.exports = function (data, connection, hook) {
  // if (data.connection.user.userType.name === 'Beneficiary') {
  //   // only notify PROVIDER facilities
  //   if (data.providerFacilityId._id !== connection.user.facilityId._id) {
  //     return false;
  //   }
  // } else if(data.connection.user.userType.name === 'Health Insurance Agent') {
  //   // only notify HIA facilities
  //   if (data.policyObject.hiaId._id !== connection.user.facilityId._id) {
  //     return false;
  //   }
  // }else if(data.connection.user.userType.name === 'Provider') {
  //   // only notify HIA facilities
  //   if (data.policyObject.hiaId._id !== connection.user.facilityId._id) {
  //     return false;
  //   }
  // }else if(data.connection.user.userType.name === 'Platform Owner') {
  //   // only notify HIA facilities
  //   if (data.policyObject.hiaId._id !== connection.user.facilityId._id) {
  //     return false;
  //   }
  // }
  return data;
};
