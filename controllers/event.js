const Event = require('../models/event')

class EventCtrl {
    static async getAllEvents(req, res, next) { }
    static async eventsNearMe(req, res, next) {
        const { location } = req.query
        if (!location) res.json("Bad request")
        const [lat, lng] = location.split(",")
        const query = {
            location: {
                $geoIntersects: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [lng, lat],
                    },
                },
            },
        }
        const events = await Event.find(query).populate("organization")

        res.send(events)

    }
    static async forwardToOrg(req, res, next) { }
}

module.exports = EventCtrl;