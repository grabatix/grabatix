const OAuthClient = require("intuit-oauth");

const oAuthConfig = {
  clientId: process.env.QB_CLIENT_ID,
  clientSecret: process.env.QB_CLIENT_SECRET,
  environment:
    process.env.NODE_ENV !== "production" ? "sandbox" : "production",
  redirectUri: process.env.QB_REDIRECT_URI
}

const MINOR_VERSION = '47'

class QBOAuth {
  constructor(oAuthConfig, minorVersion){
    if (!(this instanceof QBOAuth)) {
      return new QBOAuth(oAuthConfig, minorVersion);
    }
    this.qbAPIEndpoints = {
      tokens: "/quickbooks/v4/payments/tokens",
      charges: "/quickbooks/v4/payments/charges",
      echecks: "/quickbooks/v4/payments/echecks"
    }
    this.oAuthClient = new OAuthClient(oAuthConfig);
    this.quickbooksBaseUri =
      this.oAuthClient.environment == "sandbox"
        ? OAuthClient.environment.sandbox
        : OAuthClient.environment.production;
  } 

  updateRealmId = realmId => {
    this.realmId = realmId;
  }

  getCompanyInfo = async () => {
    const {oAuthClient, quickbooksBaseUri, realmId} = this;
    try {
      const response = await oAuthClient.makeApiCall({
        url: quickbooksBaseUri + "v3/company/" + realmId + "/companyinfo/" + realmId
      })
      const companyData = response.getJson();
      return companyData
    } catch (e) {
      throw new Error(e)
    }
  }

  createQuickBooksOptionsObject = (method = "POST", body, oauth2_token_json) => {
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

  queryQuickbooks = async (query) => {
    const {oAuthClient, quickbooksBaseUri, realmId, minorVersion} = this;
    try {
        const response = await oAuthClient.makeApiCall({
          url: quickbooksBaseUri + "v3/company/" + realmId + "/query?query=" + query + "&minorversion=" + minorVersion
        })
        const queryData = response.getJson();
        return queryData;
    } catch (e) {
        throw new Error(e)
    }
  }

  getItemDetail = async (itemId) => {
    const {oAuthClient, quickbooksBaseUri, realmId} = this;
    try {
      const response = await oAuthClient.makeApiCall({
        url: quickbooksBaseUri + "v3/company/" + realmId + "/item/" + itemId + "?minorversion=" + minorVersion
      })
      const itemDetail = response.getJson();
      return itemDetail
    } catch (e) {
      throw new Error(e)
    }
  }
}

const qboAuth = new QBOAuth(oAuthConfig, MINOR_VERSION)

module.exports = {
  qboAuth
}