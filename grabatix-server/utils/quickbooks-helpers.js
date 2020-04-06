const OAuthClient = require("intuit-oauth");

const oAuthConfig = {
    clientId: process.env.QB_CLIENT_ID,
    clientSecret: process.env.QB_CLIENT_SECRET,
    environment:
      process.env.NODE_ENV !== "production" ? "sandbox" : "production",
    redirectUri: process.env.QB_REDIRECT_URI
}

const oAuthClient = new OAuthClient(oAuthConfig);

const createQuickBooksOptionsObject = (method = "POST", body, oauth2_token_json) => {
    // console.log({ oauth2_token_json });
    const headers = {
      Accept: "application/json",
      "Request-Id": uuidv4(),
      Authorization: `Bearer ${oauth2_token_json["access_token"]}`,
      "Content-Type": "application/json;charset=UTF-8"
    };
    return {
      headers,
      method,
      body: JSON.stringify(body)
    };
};

const qbAPIEndpoints = {
    tokens: "/quickbooks/v4/payments/tokens",
    charges: "/quickbooks/v4/payments/charges",
    echecks: "/quickbooks/v4/payments/echecks"
};

const paymentsUri =
        process.NODE_ENV !== "production"
          ? "https://sandbox.api.intuit.com"
          : "https://api.intuit.com";

module.exports = {
    createQuickBooksOptionsObject, paymentAPIEndpoints, paymentsUri, oAuthClient
}