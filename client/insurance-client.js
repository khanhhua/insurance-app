(function Services(root) {
	var exports_ = {};

	var API_ENDPOINT = 'http://localhost:8080/api';

	exports_.buyPolicy = function (policyObject) {
		return request.post(API_ENDPOINT + '/policies')
	}

	root.Services = exports_;
})(window);

(function BuyPolicy(root) {
	var exports_ = {};

	exports_.showBuyPolicyModal = function () {
		$('#buyPolicyModal').modal('show');
	}

	// export
	root.BuyPolicy = exports_;
})(window);

(function DeclareClaim(root) {
	var exports_ = {};

	exports_.showClaimModal = function () {
		$('#notifyLossModal').modal('show');
	}

	// export
	root.DeclareClaim = exports_;
})(window);
