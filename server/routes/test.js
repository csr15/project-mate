import { db } from "../models/user";

db.publishes
  .aggregate([
    {
      $match: {
        hide: false,
      },
    },
  ])
  .pretty();

db.publishes.updateMany(
  {},
  {
    $set: { collaborationRequestedUsers: [] },
  }
);

db.publishes.findOne({
  collaborators: { $in: ["60866450fd508b4a94170089"] },
});

db.publishes.find({ "collaborators.1": { $exists: true } });


const removedArray = db.publishes.find().sort({_id: -1}).limit(3).toArray().map(function(doc) {return doc._id})

db.publishes.deleteMany({_id: {$in: removedArray}})