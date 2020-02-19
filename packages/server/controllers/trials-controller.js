const debug = require("debug")("server:api:trials");
const { GetAllTrials } = require("../adapters/thirdPartyApi");
const {
  trialIsOngoingAt,
  trialIsNotCanceled,
  trialIsSponsoredBy,
  trialIsInCountry,
  trialToSummary
} = require('./trials-filters');

async function getOngoingTrialsBySponsor({ sponsorName, countryCode }) {
  debug(
    `trials-controller.getOngoingTrialsBySponsor called with: sponsorName=${sponsorName} countryCode=${countryCode}`
  );
  const allTrials = await GetAllTrials();
  const currentDate = Date.now();

  const ongoingTrials = allTrials
    .filter(trialIsOngoingAt(currentDate))
    .filter(trialIsNotCanceled)
    .filter(trialIsSponsoredBy(sponsorName))
    .filter(trialIsInCountry(countryCode))
    .map(trialToSummary);

  return ongoingTrials;
}

module.exports = { getOngoingTrialsBySponsor };
