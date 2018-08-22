'use strict';

module.exports = function (app) {
    return function (req, res, next) {
        const personId = req.body.personId;
        const medical = req.body.medical;

        app.service('people').find({ query: { _id: personId}}).then(personRes => {
            if (personRes.data.length > 0) {
              let person = personRes.data[0];
              person.medical = medical;
                // Attach the medical object and update
                app.service('people').patch(person._id, person, {}).then(updatedPerson => {
                    if (updatedPerson) {
                        res.send(updatedPerson);
                        next;
                    }
                });
            } else {
                res.send({error: 'email does not match any item.'});
                next;
            }
        }).catch(err => {
          next;
        });
    };
};
