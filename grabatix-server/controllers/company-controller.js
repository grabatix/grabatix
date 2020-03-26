const Company = require("../models/Company");

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
exports.company_createupload_post = function(req, res) {
    res.send('NOT IMPLEMENTED: companycreateupload POST');
};

// Handle companyrefreshtoken on POST.
exports.company_refreshtoken_get = function(req, res) {
    res.send('NOT IMPLEMENTED: companyrefreshtoken GET');
};

// Handle companyprocesspayment form on POST.
exports.company_processpayment_post = function(req, res) {
    res.send('NOT IMPLEMENTED: companyprocesspayment POST');
};

// Handle companyoauth on GET.
exports.company_auth_get = function(req, res) {
    res.send('NOT IMPLEMENTED: companydelete GET');
};

// Handle companyauthcallback on GET.
exports.company_authcallback_get = function(req, res) {
    res.send('NOT IMPLEMENTED: companyauthcallback GET');
};