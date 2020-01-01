const assert = require("assert");
const User = require("../src/user");

describe("Updating Record", () => {
  let joe;

  beforeEach(done => {
    joe = new User({ name: "Joe" });
    joe.save(() => done());
  });

  it("instance type using set n save", done => {
    joe
      .set("name", "Alex")
      .save()
      .then(() => {
        return User.find();
      })
      .then(users => {
        assert(users.length === 1);
        assert(users[0].name === "Alex");
        done();
      });
  });

  it("A model instance can update", done => {
    joe
      .updateOne({ name: "Alex" })
      .then(() => {
        return User.find();
      })
      .then(users => {
        assert(users.length === 1);
        assert(users[0].name === "Alex");
        done();
      });
  });

  it("A model class can update", done => {
    User.update({ name: "Joe" }, { name: "Alex" })
      .then(() => User.find())
      .then(users => {
        assert(users.length === 1);
        assert(users[0].name === "Alex");
        done();
      });
  });

  it("A model class can update one record", done => {
    User.findOneAndUpdate({ name: "Joe" }, { name: "Alex" })
      .then(() => User.find())
      .then(users => {
        assert(users.length === 1);
        assert(users[0].name === "Alex");
        done();
      });
  });

  it("A model class can find a record with and Id and update", done => {
    User.findByIdAndUpdate({ _id: joe._id }, { name: "Alex" })
      .then(() => User.find())
      .then(users => {
        assert(users.length === 1);
        assert(users[0].name === "Alex");
        done();
      });
  });
});
