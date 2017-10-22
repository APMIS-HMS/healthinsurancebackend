const users = require('./users/users.service.js');
const userTypes = require('./user-types/user-types.service.js');
const platformOwners = require('./platform-owners/platform-owners.service.js');
const roles = require('./roles/roles.service.js');
const facilities = require('./facilities/facilities.service.js');
const banks = require('./banks/banks.service.js');
const industries = require('./industries/industries.service.js');
const contactPositions = require('./contact-positions/contact-positions.service.js');
const countries = require('./countries/countries.service.js');
const modules = require('./modules/modules.service.js');
const facilityCategories = require('./facility-categories/facility-categories.service.js');
const facilityOwnerships = require('./facility-ownerships/facility-ownerships.service.js');
const plans = require('./plans/plans.service.js');
const planTypes = require('./plan-types/plan-types.service.js');
const person = require('./person/person.service.js');
const premiumTypes = require('./premium-types/premium-types.service.js');
const audittray = require('./audittray/audittray.service.js');
const titles = require('./titles/titles.service.js');
const gender = require('./gender/gender.service.js');
const maritalStatus = require('./marital-status/marital-status.service.js');
const relationships = require('./relationships/relationships.service.js');
const hiaGrades = require('./hia-grades/hia-grades.service.js');
const hiaTypes = require('./hia-types/hia-types.service.js');
const providerGrades = require('./provider-grades/provider-grades.service.js');
const providerStatuses = require('./provider-statuses/provider-statuses.service.js');
const beneficiaries = require('./beneficiaries/beneficiaries.service.js');
const policies = require('./policies/policies.service.js');
const claim = require('./claim/claim.service.js');
const checkIns = require('./check-ins/check-ins.service.js');
const encounterStatuses = require('./encounter-statuses/encounter-statuses.service.js');
const encounterTypes = require('./encounter-types/encounter-types.service.js');
const claimStatuses = require('./claim-statuses/claim-statuses.service.js');
const claimTypes = require('./claim-types/claim-types.service.js');
const symptom = require('./symptom/symptom.service.js');
const diagnosis = require('./diagnosis/diagnosis.service.js');
const investigation = require('./investigation/investigation.service.js');
const drug = require('./drug/drug.service.js');
const procedure = require('./procedure/procedure.service.js');
const visitType = require('./visit-type/visit-type.service.js');
const interview = require('./interview/interview.service.js');
const preAuthorizations = require('./pre-authorizations/pre-authorizations.service');
const diagnosisTypes = require('./diagnosis-types/diagnosis-types.service.js');
const drugPackSizes = require('./drug-pack-sizes/drug-pack-sizes.service.js');
const claimPayments = require('./claim-payments/claim-payments.service.js');
module.exports = function() {
    const app = this; // eslint-disable-line no-unused-vars
    app.configure(users);
    app.configure(userTypes);
    app.configure(platformOwners);
    app.configure(roles);
    app.configure(facilities);
    app.configure(banks);
    app.configure(industries);
    app.configure(contactPositions);
    app.configure(countries);
    app.configure(modules);
    app.configure(facilityCategories);
    app.configure(facilityOwnerships);
    app.configure(plans);
    app.configure(planTypes);
    app.configure(person);
    app.configure(premiumTypes);
    app.configure(audittray);
    app.configure(titles);
    app.configure(gender);
    app.configure(maritalStatus);
    app.configure(relationships);
    app.configure(hiaGrades);
    app.configure(hiaTypes);
    app.configure(providerGrades);
    app.configure(providerStatuses);
    app.configure(beneficiaries);
    app.configure(policies);
    app.configure(claim);
    app.configure(checkIns);
    app.configure(encounterStatuses);
    app.configure(encounterTypes);
    app.configure(claimStatuses);
    app.configure(claimTypes);
    app.configure(symptom);
    app.configure(diagnosis);
    app.configure(investigation);
    app.configure(drug);
    app.configure(procedure);
    app.configure(visitType);
    app.configure(interview);
    app.configure(preAuthorizations);
    app.configure(diagnosisTypes);
    app.configure(drugPackSizes);
    app.configure(claimPayments);
};