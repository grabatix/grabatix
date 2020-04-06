const OAuthClient = require("intuit-oauth");
const Company = require("../models/Company");
const { dataUri }= require('../utils/multer-uploads')
const { uploader } = require('../utils/cloudinary-config.js')
const { createQuickBooksOptionsObject, paymentAPIEndpoints, paymentsUri, oAuthClient } = require("../utils/quickbooks-helpers")
const callApi = require("../utils/fetch")

// GET details of existing company.
exports.company_detail_get = function(req, res) {
    res.send('NOT IMPLEMENTED: companydetail: ' + req.params.id + ' GET');
};

// Create New Company.
exports.company_detail_post = function(req, res) {
    res.send('NOT IMPLEMENTED: companydetail: ' + req.params.id + ' POST');
};

// update fields of existing company
exports.company_detail_patch = function(req, res) {
    res.send('NOT IMPLEMENTED: companydetail: ' + req.params.id + ' PATCH');
};

// Upload companycreate form on POST.
exports.company_createupload_post =  async (req, res) => {
    if (req.file) {
        const file = dataUri(req).content;
        try {
            const result = uploader.upload(file);
            const image = result.url;
            console.log({image})

            // TODO: add image identifier to DB
            
            res.statusCode = 201;
            res.json({
                messge: 'Your image has been uploded successfully to cloudinary',
                data: { image }
            })
        } catch (err) {
            res.statusCode = 400;
            res.json({ error: { message: "Invalid File", data: err} });
        }
    } else {
        res.statusCode = 400;
        res.json({ error: { message: "Invalid File" } });
    }
};

// Handle companyprocesspayment form on POST.
exports.company_processpayment_post = function(req, res) {
    res.send('NOT IMPLEMENTED: companyprocesspayment POST');
};

// Handle companyoauth on GET.
exports.company_auth_get = function(req, res) {
    const authUri = oAuthClient.authorizeUri({
        scope: [OAuthClient.scopes.Accounting, OAuthClient.scopes.Payment, OAuthClient.scopes.Profile, OAuthClient.scopes.OpenId],
        state: "intuit-test"
    });
    console.log("");
    console.log("**********************************************");
    console.log({ authUri });
    console.log("**********************************************");
    console.log("");
    res.redirect(authUri);
};

// Handle companyauthcallback on GET.
exports.company_authcallback_get = async (req, res, next) => {
    try {
        const authResponse = await oAuthClient.createToken(req.url)
        console.log(authResponse)
        const oauth2_token_json = authResponse.getJson();

        // TODO: Store Token in DB
        
        console.log("");
        console.log("**********************************************");
        console.log({ oauth2_token_json });
        console.log("**********************************************");
        console.log(""); 

        // GET COMPANY INFO
        const companyID = oAuthClient.getToken().realmId;
        const url =
            oAuthClient.environment == "sandbox"
                ? OAuthClient.environment.sandbox
                : OAuthClient.environment.production;

        try {
            const data = await oAuthClient.makeApiCall({
              url: url + "v3/company/" + companyID + "/companyinfo/" + companyID
            })
            const companyData = data.text();
            console.log(
                "Company Data:" + JSON.stringify(companyData)
            );

            // TODO: Store Data in DB

            res.json({oauth2_token_json, companyData})
        } catch (e) {
            console.error(e);
            res.statusCode = 400;
            res.json({ err });
        }
    } catch(e) {
        console.error(e);
        res.statusCode = 400;
        res.json({ err });
    }
};

// Handle companyrefreshtoken on POST.
exports.company_refreshtoken_get = async (req, res) => {
    try {
        const authResponse = await oAuthClient.refresh()
        const oauth2_token_json = authResponse.getJson();
        // TODO: Store Token in DB
        console.log("");
        console.log("**********************************************");
        console.log({ oauth2_token_json });
        console.log("**********************************************");
        console.log("");
        res.json(oauth2_token_json);
    } catch (e) {
      console.error(e);
      res.statusCode = 400;
      res.json({ err });
    };
};