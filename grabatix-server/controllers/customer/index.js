const Customer = require("../../database/models/Customer");

// GET details of existing customer.
exports.customer_detail_get = function(req, res) {
    res.send('NOT IMPLEMENTED: customerdetail: ' + req.params.id + ' GET');
};

// Create New customer.
exports.customer_detail_post = function(req, res) {
    res.send('NOT IMPLEMENTED: customerdetail: ' + req.params.id + ' POST');
};

// update fields of existing customer
exports.customer_detail_patch = function(req, res) {
    res.send('NOT IMPLEMENTED: customerdetail: ' + req.params.id + ' PATCH');
};

// Upload customercreate form on POST.
exports.customer_createupload_post = function(req, res) {
    res.send('NOT IMPLEMENTED: customercreateupload POST');
};

// Handle customerrefreshtoken on POST.
exports.customer_refreshtoken_get = function(req, res) {
    res.send('NOT IMPLEMENTED: customerrefreshtoken GET');
};

// Handle customerprocesspayment form on POST.
exports.customer_processpayment_post = function(req, res) {
    res.send('NOT IMPLEMENTED: customerprocesspayment POST');
};

// Handle customeroauth on GET.
exports.customer_auth_get = function(req, res) {
    res.send('NOT IMPLEMENTED: customerdelete GET');
};

// Handle customerauthcallback on GET.
exports.customer_authcallback_get = function(req, res) {
    res.send('NOT IMPLEMENTED: customerauthcallback GET');
};