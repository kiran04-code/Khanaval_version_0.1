import mongoose from "mongoose";
export const MongoDbConnnection = (url) => {
    return mongoose.connect(url);
};
//# sourceMappingURL=mongodb.js.map