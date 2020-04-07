const OAuthClient = require("intuit-oauth");
const Company = require("../models/Company");
const { dataUri }= require('../utils/multer-uploads')
const { uploader } = require('../utils/cloudinary-config.js')
const { qboAuth } = require("../utils/quickbooks-helpers")
const callApi = require("../utils/fetch")

// TODO: ADD TIMEOUT TO REQUESTS TO EITHER QBO or MongoDB

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
    const authUri = qboAuth.oAuthClient.authorizeUri({
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
        const authResponse = await qboAuth.oAuthClient.createToken(req.url)
        const oauth2_token_json = authResponse.getJson();

        // TODO: Store Token in DB

        // GET COMPANY INFO
        qboAuth.updateRealmId(qboAuth.oAuthClient.getToken().realmId);

        try {
            const companyData = await qboAuth.getCompanyInfo()

            // TODO: Store Data in DB 
            // TODO: Send data back to page via redirect or some other method

            res.json({id, oauth2_token_json, companyData})
        } catch (e) {
            throw new Error(e.message)
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
        const authResponse = await qboAuth.oAuthClient.refresh()
        const oauth2_token_json = authResponse.getJson();

        // TODO: Store Token in DB

        res.json(oauth2_token_json);
    } catch (e) {
      console.error(e);
      res.statusCode = 400;
      res.json({ err });
    };
};

exports.company_listitems_get = async (req, res) => {
    const { companyid } = req.params;

    // TODO: Use DB or object in memory? Decide Y or N?

    try {
        const query = "Select * from Item";
        const items = await qboAuth.queryQuickbooks(query)

        res.json({items})
    } catch (e) {
        console.error(e);
        res.statusCode = 400;
        res.json({ err });
    }
}

exports.company_itemdetail_get = async (req, res) => {
    const { companyid, itemid } = req.params;
    
    // TODO: Validate itemId
    // TODO: Use DB or object in memory? Decide Y or N?

    try {
        const item = await qboAuth.getItemDetail(itemid)

        res.json({item})
    } catch (e) {
        console.error(e);
        res.statusCode = 400;
        res.json({ err });
    }
}

exports.company_createitem_post = async (req, res) => {
    res.send('NOT IMPLEMENTED: createitem: ' + req.params.companyid + ' POST');
}

exports.company_updateitem_put = async (req, res) => {
    res.send('NOT IMPLEMENTED: updateitem: ' + req.params.companyid + ' PUT ' + req.params.itemid);
}

exports.company_listcategories_get = async (req, res) => {
    const { companyid } = req.params;
    try {
        const query = "Select * from Item where Type='Category'";
        const categories = await qboAuth.queryQuickbooks(query)

        // TODO: Store Data in DB 

        res.json({categories})
    } catch (e) {
        console.error(e);
        res.statusCode = 400;
        res.json({ err });
    }
}

exports.company_categorydetail_get = async (req, res) => {
    const { companyid, categoryid } = req.params;
    
    // TODO: Validate categoryid
    // TODO: Use DB or object in memory? Decide Y or N?

    try {
        const category = await qboAuth.getItemDetail(categoryid)
        res.json({category})
    } catch (e) {
        console.error(e);
        res.statusCode = 400;
        res.json({ err });
    }
}

exports.company_createcategory_post = async (req, res) => {
    res.send('NOT IMPLEMENTED: createcategory: ' + req.params.companyid + ' POST');
}

exports.company_updatecategory_put = async (req, res) => {
    res.send('NOT IMPLEMENTED: updatecategory: ' + req.params.companyid + ' PUT ' + req.params.categoryid);
}

exports.company_listemployees_get = async (req, res) => {
    res.send('NOT IMPLEMENTED: listemployees: ' + req.params.companyid + ' GET');
}

exports.company_employeedetail_get = async (req, res) => {
    const { companyid, employeeid } = req.params;
    res.json({ companyid, employeeid })
}

exports.company_createemployee_post = async (req, res) => {
    res.send('NOT IMPLEMENTED: createemployee: ' + req.params.companyid + ' POST');
}

exports.company_updateemployee_put = async (req, res) => {
    res.send('NOT IMPLEMENTED: updateemployee: ' + req.params.companyid + ' PUT ' + req.params.employeeid);
}