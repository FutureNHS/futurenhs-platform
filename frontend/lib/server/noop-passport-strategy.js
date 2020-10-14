const util = require("util");

const passport = require("passport-strategy");

const { getOrCreateUser } = require("./graphql");

function Strategy() {
  passport.Strategy.call(this);
}

util.inherits(Strategy, passport.Strategy);
Strategy.prototype.authenticate = async function () {
  try {
    // Test value that's an auto generated V4 UUID
    const testAuthId = "feedface-0000-0000-0000-000000000000";
    const testName = "Local User";

    const response = await getOrCreateUser({
      authId: testAuthId,
      name: testName,
    });

    const { id, name, authId, isPlatformAdmin } = response.getOrCreateUser;

    this.success({
      id,
      authId,
      name,
      isPlatformAdmin,
      emails: ["test@example.com"],
    });
  } catch (err) {
    this.error(err);
  }
};

module.exports = Strategy;
