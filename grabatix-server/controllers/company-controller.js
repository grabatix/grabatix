const OAuthClient = require("intuit-oauth");
const Company = require("../models/Company");
const { dataUri }= require('../utils/multer-uploads')
const { uploader } = require('../utils/cloudinary-config.js')
const { createQuickBooksOptionsObject, qbAPIEndpoints, paymentsUri, oAuthClient } = require("../utils/quickbooks-helpers")
const callApi = require("../utils/fetch")

// GET details of existing company.
exports.company_detail_get = function(req, res) {
    res.send('NOT IMPLEMENTED: companydetail: ' + req.params.companyid + ' GET');
};

// Create New Company.
exports.company_detail_post = function(req, res) {
    res.send('NOT IMPLEMENTED: companydetail: POST');
};

// update fields of existing company
exports.company_detail_patch = function(req, res) {
    res.send('NOT IMPLEMENTED: companydetail: ' + req.params.companyid + ' PATCH');
};

// Upload companycreate form on POST.
exports.company_createupload_post =  async (req, res) => {
    const { companyid } = req.params;
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
    const { companyid } = req.params;
    const authUri = oAuthClient.authorizeUri({
        scope: [OAuthClient.scopes.Accounting, OAuthClient.scopes.Payment, OAuthClient.scopes.Profile, OAuthClient.scopes.OpenId],
        state: companyid
    });

    res.redirect(authUri);
};

// Handle companyauthcallback on GET.
exports.company_authcallback_get = async (req, res, next) => {
    const id = req.query.state;

    // TODO: validate id 
    
    // then....
    try {
        const authResponse = await oAuthClient.createToken(req.url)
        const oauth2_token_json = authResponse.getJson();

        // TODO: Store Token in DB

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
            const companyData = data.getJson();

            // TODO: Store Data in DB 
            // TODO: Send data back to page via redirect or some other method

            res.json({id, oauth2_token_json, companyData})
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
    const { companyid } = req.params;
    try {
        const authResponse = await oAuthClient.refresh()
        const oauth2_token_json = authResponse.getJson();

        // TODO: Store Token in DB

        res.json(oauth2_token_json);
    } catch (e) {
      console.error(e);
      res.statusCode = 400;
      res.json({ err });
    };
};

exports.company_listitems_get = (req, res) => {
    res.send('NOT IMPLEMENTED: listitems: ' + req.params.companyid + ' GET');
}

exports.company_createitem_post = (req, res) => {
    res.send('NOT IMPLEMENTED: createitem: ' + req.params.companyid + ' POST');
}

exports.company_updateitem_put = (req, res) => {
    res.send('NOT IMPLEMENTED: updateitem: ' + req.params.companyid + ' PUT ' + req.params.itemid);
}

exports.company_listcategories_get = (req, res) => {
    res.send('NOT IMPLEMENTED: listcategories: ' + req.params.companyid + ' GET');
}

exports.company_createcategory_post = (req, res) => {
    res.send('NOT IMPLEMENTED: createcategory: ' + req.params.companyid + ' POST');
}

exports.company_updatecategory_put = (req, res) => {
    res.send('NOT IMPLEMENTED: updatecategory: ' + req.params.companyid + ' PUT ' + req.params.categoryid);
}

exports.company_listemployees_get = (req, res) => {
    res.send('NOT IMPLEMENTED: listemployees: ' + req.params.companyid + ' GET');
}

exports.company_createemployee_post = (req, res) => {
    res.send('NOT IMPLEMENTED: createemployee: ' + req.params.companyid + ' POST');
}

exports.company_updateemployee_put = (req, res) => {
    res.send('NOT IMPLEMENTED: updateemployee: ' + req.params.companyid + ' PUT ' + req.params.employeeid);
}