const {check} = require('express-validator');
const Event = require('../../models/Event');

exports.bookingValidationRules = [
    check('id').trim().notEmpty().isMongoId().withMessage('Invalid eventId.').custom(async (val) => {
        const event = await Event.findById(val);
        if (!event) {
            throw new Error('Event not found');
        }
    }),
]

