const request = require('request-promise-native')


const APIKEY = '<ADD API KEY HERE>';
const DYHOST = 'https://dy-api.com'; 


async function choose(userId, sessionId, dyContext, selectors = []) {
    const options = {
      method: 'POST',
      uri: `${DYHOST}/v2/serve/user/choose`,
      headers: {
        'DY-API-Key': APIKEY,
      },
      body: {
        selector: {
          names: selectors,
        },
        user: {
          dyid: userId,
          _dyid_server: userId,
        },
        session: {
            context: dyContext,
          },
          context: dyContext,
        },
        json: true,
      };
  
    let variations = {};
    try {
      const response = await request(options);
      variations = response.choices;
      
      console.log(`Choose response 1 Update: ${JSON.stringify(response, null, 2)}`);
    } catch (e) {
      console.error(`ERROR IN CHOOSE: ${e.message}`);
    }
    return variations;
  }

  function flattenCampaignData(res, choice) {
    res[choice.name] = { decisionId: choice.decisionId, ...choice.variations[0].payload.data };
    return res;
  }
  
  module.exports = {
    choose
  };

  
