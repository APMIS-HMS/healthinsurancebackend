const { populate } = require('feathers-hooks-common');
const claimUniqueNo = require('../../hooks/claim-unique-no');
const checkOut = require('../../hooks/check-out');

//const populateBeneficiary = require('../../hooks/populate-beneficiary');

const beneficiarySchemaList = {
  include: [{
    service: 'beneficiaries',
    nameAs: 'beneficiaryObject',
    parentField: 'checkedinDetail.beneficiaryId',
    childField: '_id'
  }]
};

const personSchemaList = {
  include: [{
    service: 'people',
    nameAs: 'personObject',
    parentField: 'beneficiaryObject.personId',
    childField: '_id'
  }]
};
const policySchemaList = {
  include: [{
    service: 'policies',
    nameAs: 'policyObject',
    parentField: 'beneficiaryId',
    childField: 'principalBeneficiary._id',
    query: {
      $limit:1
    }
  }]
};

const facilitySchemaList = {
  include: [{
    service: 'facilities',
    nameAs: 'facilityObject',
    parentField: 'checkedinDetail.providerFacilityId._id',
    childField: '_id',
    
  }]
};



module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [claimUniqueNo()],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [populate({ schema: beneficiarySchemaList }),  populate({ schema: facilitySchemaList })],
    get: [],
    create: [checkOut()],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
