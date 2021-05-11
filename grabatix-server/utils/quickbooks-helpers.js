const OAuthClient = require(`intuit-oauth`)
const {
  GRABATIX,
  INTUIT: { MINOR_VERSION, OAUTH },
} = require(`../config`)

class QBOAuth {
  constructor(oAuthConfig, minorVersion) {
    if (!(this instanceof QBOAuth)) {
      return new QBOAuth(oAuthConfig, minorVersion)
    }
    this.oAuthClient = new OAuthClient(oAuthConfig)
    this.quickbooksBaseUri =
      this.oAuthClient.environment == `sandbox`
        ? OAuthClient.environment.sandbox
        : OAuthClient.environment.production
    this.minorVersion = minorVersion
  }

  updateRealmId(realmId) {
    this.realmId = realmId
    return this.realmId
  }

  async getCompanyInfo(id = undefined) {
    const { oAuthClient, quickbooksBaseUri, realmId, minorVersion } = this
    const companyId = id ? id : realmId
    const url =
      quickbooksBaseUri +
      `v3/company/` +
      companyId +
      `/companyinfo/` +
      companyId +
      `?minorversion=` +
      minorVersion
    // console.log(url)
    try {
      const response = await oAuthClient.makeApiCall({
        url,
      })
      const companyData = response.getJson()
      return companyData
    } catch (e) {
      return Promise.reject(e)
    }
  }

  async queryQuickbooks(query) {
    const { oAuthClient, quickbooksBaseUri, realmId, minorVersion } = this
    try {
      const response = await oAuthClient.makeApiCall({
        url:
          quickbooksBaseUri +
          `v3/company/` +
          realmId +
          `/query?query=` +
          encodeURIComponent(query) +
          `&minorversion=` +
          minorVersion,
      })
      const queryData = response.getJson()
      return queryData
    } catch (e) {
      return Promise.reject(e)
    }
  }

  async createCategory(categoryName) {
    const { oAuthClient, quickbooksBaseUri, realmId, minorVersion } = this
    try {
      const response = await oAuthClient.makeApiCall({
        url:
          quickbooksBaseUri +
          `v3/company/` +
          realmId +
          `/item?minorversion=` +
          minorVersion,
        method: `POST`,
        headers: {
          'Content-Type': `application/json`,
        },
        body: JSON.stringify({
          Type: `Category`,
          Name: categoryName,
        }),
      })
      const queryData = response.getJson()
      return queryData
    } catch (error) {
      console.error(error)
      return ``
    }
  }

  async createItem({ displayLabel }) {
    const { oAuthClient, quickbooksBaseUri, realmId, minorVersion } = this
    try {
      const category = await this.getGrabatixCategory()
      const response = await oAuthClient.makeApiCall({
        url:
          quickbooksBaseUri +
          `v3/company/` +
          realmId +
          `/item?minorversion=` +
          minorVersion,
        method: `POST`,
        headers: {
          'Content-Type': `application/json`,
        },
        body: JSON.stringify({
          SubItem: true,
          ParentRef: {
            name: category[0].Name,
            value: category[0].Value,
          },
          Type: `Service`,
          Name: displayLabel,
          PurchaseCost: 0,
          IncomeAccountRef: {
            name: `Services`,
            value: 1,
          },
          TrackQtyOnHand: false,
        }),
      })
      const queryData = response.getJson()
      console.log(queryData)
      return queryData
    } catch (e) {
      console.error(e)
      return Promise.reject(e)
    }
  }

  async getItemsByCategory(categoryName) {
    try {
      const response = await this.queryQuickbooks(`select * from Item`)
      const {
        QueryResponse: { Item },
      } = response
      return Item.filter(
        (item) => item.ParentRef && item.ParentRef.name === categoryName
      )
    } catch (e) {
      console.error(e)
      return Promise.reject(e)
    }
  }

  async getGrabatixCategory() {
    try {
      const response = await this.queryQuickbooks(
        `select Name,Id from Item where Type='Category'`
      )
      const {
        QueryResponse: { Item },
      } = response
      return Item.filter((item) => item.Name === GRABATIX.CATEGORY_NAME)
    } catch (e) {
      console.error(e)
      return Promise.reject(e)
    }
  }

  async getItemDetail(itemId) {
    const { oAuthClient, quickbooksBaseUri, realmId, minorVersion } = this
    try {
      const response = await oAuthClient.makeApiCall({
        url:
          quickbooksBaseUri +
          `v3/company/` +
          realmId +
          `/item/` +
          itemId +
          `?minorversion=` +
          minorVersion,
      })
      const itemDetail = response.getJson()
      return itemDetail
    } catch (e) {
      return Promise.reject(e)
    }
  }

  async getEmployeeDetail(employeeId) {
    const { oAuthClient, quickbooksBaseUri, realmId, minorVersion } = this
    try {
      const response = await oAuthClient.makeApiCall({
        url:
          quickbooksBaseUri +
          `v3/company/` +
          realmId +
          `/employee/` +
          employeeId +
          `?minorversion=` +
          minorVersion,
      })
      const itemDetail = response.getJson()
      return itemDetail
    } catch (e) {
      return Promise.reject(e)
    }
  }

  async createToken(url) {
    try {
      const response = await this.oAuthClient.createToken(url)
      const oauth2Token = response.getJson()
      return oauth2Token
    } catch (e) {
      return Promise.reject(e)
    }
  }

  async revokeToken(token) {
    try {
      const response = await this.oAuthClient.revoke({ token })
      const revokeResponse = response.getJson()
      return revokeResponse
    } catch (e) {
      return Promise.reject(e)
    }
  }

  async refreshToken() {
    try {
      const response = await this.oAuthClient.refresh()
      const oauth2Token = response.getJson()
      return oauth2Token
    } catch (e) {
      return Promise.reject(e)
    }
  }

  handleQBError(res, error) {
    console.error(error)
    const message =
      error && error.error_description
        ? error.error_description
        : `Unable to Process Request`
    res.status(500).json({ error: { message, statusCode: 500 } })
  }
}

const qboAuth = new QBOAuth(OAUTH, MINOR_VERSION)

module.exports = {
  qboAuth,
  OAuthClient,
}
