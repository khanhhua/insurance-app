var mod = angular.module('app', ['ngRoute']);

mod.service('web3', function () {
	var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

	return web3;
});

mod.service('insuranceService', ['$q', 'web3', function ($q, web3) {
	var abi = [{"constant":false,"inputs":[],"name":"payPremium","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"description","type":"string"},{"name":"lossValue","type":"uint256"}],"name":"claimLoss","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"receivePayout","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"viewPayout","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getPolicyNo","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"claimNo","type":"uint8"},{"name":"lossValue","type":"uint256"}],"name":"confirmLoss","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getPublicData","outputs":[{"name":"no","type":"string"},{"name":"amount","type":"uint256"},{"name":"lastClaimNo","type":"uint256"},{"name":"lastClaimDescription","type":"string"},{"name":"lastLossValue","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"claimNo","type":"uint8"}],"name":"payForClaim","outputs":[{"name":"","type":"string"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"getInsuredAmount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"policyNo_","type":"string"},{"name":"insuredAmount_","type":"uint256"},{"name":"policyHolder_","type":"address"},{"name":"policyVendor_","type":"address"},{"name":"incidentAuthority_","type":"address"}],"payable":true,"stateMutability":"payable","type":"constructor"}];
	var contract = web3.eth.contract(abi);

	var contractBytecode = '6060604052604051610f7b380380610f7b833981016040528080518201919060200180519190602001805191906020018051919060200180519150505b600085805161004f9291602001906101cd565b50600584905560028054600160a060020a031916600160a060020a038416179055604080519081016040908152600160a060020a0380851683526001602080850191909152600254909116600090815260069091522081518154600160a060020a031916600160a060020a039190911617815560208201516001918201558054600160a060020a031916600160a060020a03861617905550604080519081016040908152600160a060020a0380861683526002602080850191909152600154909116600090815260069091522081518154600160a060020a031916600160a060020a03919091161781556020820151600191909101555060038054600160a060020a031916600160a060020a038316179055604080519081016040908152600160a060020a038084168352600360208085018290529054909116600090815260069091522081518154600160a060020a031916600160a060020a039190911617815560208201516001909101555060006004555b505050505061026d565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061020e57805160ff191683800117855561023b565b8280016001018555821561023b579182015b8281111561023b578251825591602001919060010190610220565b5b5061024892915061024c565b5090565b61026a91905b808211156102485760008155600101610252565b5090565b90565b610cff8061027c6000396000f300606060405236156100965763ffffffff7c010000000000000000000000000000000000000000000000000000000060003504166329c08ba2811461009b5780632f6e0f95146100a55780637e872ad61461010a578063abe855c21461012f578063b490ed8c14610154578063b788fb89146101df578063bf7ce74214610273578063c027fae11461037e578063d66c39d714610404575b600080fd5b6100a3610429565b005b34156100b057600080fd5b6100f860046024813581810190830135806020601f82018190048102016040519081016040528181529291906020840183838082843750949650509335935061044692505050565b60405190815260200160405180910390f35b341561011557600080fd5b6100f86104f7565b60405190815260200160405180910390f35b341561013a57600080fd5b6100f86105f2565b60405190815260200160405180910390f35b341561015f57600080fd5b6101676106a3565b60405160208082528190810183818151815260200191508051906020019080838360005b838110156101a45780820151818401525b60200161018b565b50505050905090810190601f1680156101d15780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34156101ea57600080fd5b61016760ff6004351660243561074c565b60405160208082528190810183818151815260200191508051906020019080838360005b838110156101a45780820151818401525b60200161018b565b50505050905090810190601f1680156101d15780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561027e57600080fd5b61028661084c565b604051808060200186815260200185815260200180602001848152602001838103835288818151815260200191508051906020019080838360005b838110156102da5780820151818401525b6020016102c1565b50505050905090810190601f1680156103075780820380516001836020036101000a031916815260200191505b50838103825285818151815260200191508051906020019080838360005b8381101561033e5780820151818401525b602001610325565b50505050905090810190601f16801561036b5780820380516001836020036101000a031916815260200191505b5097505050505050505060405180910390f35b61016760ff60043516610a2e565b60405160208082528190810183818151815260200191508051906020019080838360005b838110156101a45780820151818401525b60200161018b565b50505050905090810190601f1680156101d15780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561040f57600080fd5b6100f8610b56565b60405190815260200160405180910390f35b34670de0b6b3a7640000815b600480549290910490910190555b50565b6007805460009160018201918261045d8382610b5d565b916000526020600020906005020160005b60a060405190810160409081528582526020820189905281018790526000606082018190526080820152919050815181556020820151816001019080516104b9929160200190610b8f565b5060408201518160020155606082015181600301556080820151600491909101805460ff1916911515919091179055509091508190505b5092915050565b60075460009081905b600081111561059f5760078054600019830190811061051b57fe5b906000526020600020906005020160005b506004015460ff161515600114156105955760078054600019830190811061055057fe5b906000526020600020906005020160005b506003015482019150600060076001830381548110151561057e57fe5b906000526020600020906005020160005b50600301555b5b60001901610500565b60008211156105e85760015473ffffffffffffffffffffffffffffffffffffffff1682156108fc0283604051600060405180830381858888f1935050505015156105e857600080fd5b5b8192505b505090565b60075460009081905b60008111156105e85760078054600019830190811061061657fe5b906000526020600020906005020160005b506004015460ff161515600114156106905760078054600019830190811061064b57fe5b906000526020600020906005020160005b506003015482019150600060076001830381548110151561067957fe5b906000526020600020906005020160005b50600301555b5b600019016105fb565b8192505b505090565b6106ab610c0e565b60008054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156107415780601f1061071657610100808354040283529160200191610741565b820191906000526020600020905b81548152906001019060200180831161072457829003601f168201915b505050505090505b90565b610754610c0e565b6007545b6000811115610096578360ff1660076001830381548110151561077757fe5b906000526020600020906005020160005b5054141561083657826007600183038154811015156107a357fe5b906000526020600020906005020160005b5060020154146107c357600080fd5b60016007600183038154811015156107d757fe5b906000526020600020906005020160005b50600401805460ff191691151591909117905560408051908101604052600281527f4f4b000000000000000000000000000000000000000000000000000000000000602082015291506104f0565b5b60001901610758565b600080fd5b5092915050565b610854610c0e565b60008061085f610c0e565b60008060008054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156108f85780601f106108cd576101008083540402835291602001916108f8565b820191906000526020600020905b8154815290600101906020018083116108db57829003601f168201915b50505050509550600554945060006007805490501115610a25575060078054600019810191908290811061092857fe5b906000526020600020906005020160005b505460078054919550908290811061094d57fe5b906000526020600020906005020160005b506001018054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156109f65780601f106109cb576101008083540402835291602001916109f6565b820191906000526020600020905b8154815290600101906020018083116109d957829003601f168201915b50505050509250600781815481101515610a0c57fe5b906000526020600020906005020160005b506002015491505b5b509091929394565b610a36610c0e565b60075434905b6000811115610b18578360ff16600760018303815481101515610a5b57fe5b906000526020600020906005020160005b50541415610b0d57600780546000198301908110610a8657fe5b906000526020600020906005020160005b506004015460ff16151560011415610b0d5781600760018303815481101515610abc57fe5b906000526020600020906005020160005b506003015560408051908101604052600281527f4f4b00000000000000000000000000000000000000000000000000000000000060208201529250610b4f565b5b5b60001901610a3c565b60408051908101604052600f81527f434c41494d5f4e4f545f464f554e440000000000000000000000000000000000602082015292505b5050919050565b6005545b90565b815481835581811511610b8957600502816005028360005260206000209182019101610b899190610c20565b5b505050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10610bd057805160ff1916838001178555610bfd565b82800160010185558215610bfd579182015b82811115610bfd578251825591602001919060010190610be2565b5b50610c0a929150610c6a565b5090565b60206040519081016040526000815290565b61074991905b80821115610c0a576000808255610c406001830182610c8b565b50600060028201819055600382015560048101805460ff19169055600501610c26565b5090565b90565b61074991905b80821115610c0a5760008155600101610c70565b5090565b90565b50805460018160011615610100020316600290046000825580601f10610cb15750610443565b601f0160209004906000526020600020908101906104439190610c6a565b5b505600a165627a7a7230582069577eb7cedc2f55d80f9422865b54535f371a86d0f8cf5c2ffde0a9766d78970029';

	function buyPolicy (policyNo, insuredAmount) {
		var deferred = $q.defer();

		var policyNo_ = policyNo;
		var insuredAmount_ = insuredAmount;
		var policyHolder_ = web3.eth.accounts[0];
		var policyVendor_ = web3.eth.accounts[1];
		var incidentAuthority_ = web3.eth.accounts[2];

	  contract.new(
		   policyNo_,
			 insuredAmount_,
		   policyHolder_,
		   policyVendor_,
		   incidentAuthority_,
		   {
		     from: web3.eth.accounts[0],
		     data: contractBytecode,
		     gas: '4700000'
		   }, function (e, contract){
		    if (e) {
					return deferred.reject(e);
				}
		    if (typeof contract.address !== 'undefined') {
					console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
					return deferred.resolve(contract);
		    }
		 });

		 return deferred.promise;
	}

	function getPolicy (policyAddress) {
		var deferred = $q.defer();

		contract.at(policyAddress, function (e, result) {
			if (e) {
				return deferred.reject(e);
			} else if (result) {
				return deferred.resolve(result);
			}
		});

		return deferred.promise;
	}

	function notifyLoss (policyAddress, description, lossValue) {
		var instance = contract.at(policyAddress);
		var deferred = $q.defer();

		instance.claimLoss(description, lossValue, {
			from: web3.eth.accounts[0],
			gas: '4700000'
		}, function (e, result) {
			if (e) {
				return deferred.reject(e);
			}
			deferred.resolve(result);
		})

		return deferred.promise;
	}

	function confirmLoss (policyAddress, claimNo, lossValue) {
		var instance = contract.at(policyAddress);
		var deferred = $q.defer();

		instance.confirmLoss(claimNo, lossValue, {
			from: web3.eth.accounts[2],
			gas: '4700000'
		}, function (e, result) {
			if (e) {
				return deferred.reject(e);
			}
			deferred.resolve(result);
		})

		return deferred.promise;
	}

	function payForClaim (policyAddress, payoutValue) {
		var instance = contract.at(policyAddress);
		var deferred = $q.defer();

		instance.getPublicData(function (e, publicData) {
			if (e) {
				return deferred.reject(e);
			}

			var claimNo = publicData[2].toString();
			var lossValue = publicData[4].toString();

			instance.payForClaim(claimNo, {
				from: web3.eth.accounts[1],
				gas: '4700000',
				value: payoutValue
			}, function (e, result) {
				if (e) {
					return deferred.reject(e);
				}
				deferred.resolve(result);
			});
		});
		return deferred.promise;
	}

	return {
		buyPolicy: buyPolicy,
		getPolicy: getPolicy,
		notifyLoss: notifyLoss,
		confirmLoss: confirmLoss,
		payForClaim: payForClaim
	};
}]);

mod.controller('BuyPolicyCtrl', ['$scope', 'insuranceService', BuyPolicyCtrl]);
function BuyPolicyCtrl($scope, insuranceService) {
	$scope.policyNo = null;
	$scope.insuredAmount = null;

	$scope.policy = null;

	$scope.onBuyClick = function () {
		insuranceService.buyPolicy($scope.policyNo, $scope.insuredAmount).then(function (policy) {
			$scope.policy = policy;
		})
	};
}

mod.controller('ClaimCtrl', ['$scope', 'insuranceService', ClaimCtrl]);
function ClaimCtrl($scope, insuranceService) {
	$scope.policyAddress = null;
	$scope.policy = null;
	$scope.insuredAmount = null;

	$scope.description = null;
	$scope.lossValue = null;

	$scope.onClaimClick = function () {
		insuranceService.notifyLoss($scope.policyAddress, $scope.description, $scope.lossValue);
	};

	$scope.$watch('policyAddress', function (policyAddress) {
		if (!policyAddress) {
			return;
		}

		insuranceService.getPolicy(policyAddress).then(function (policy) {
			$scope.policy = policy;

			policy.getInsuredAmount({}, function (e, insuredAmount) {
				$scope.$apply(function () {
					$scope.insuredAmount = insuredAmount.c[0];
				});
			});
		});
	})
}

mod.controller('ConfirmCtrl', ['$scope', 'insuranceService', ConfirmCtrl]);
function ConfirmCtrl($scope, insuranceService) {
	$scope.policyAddress = null;
	$scope.policy = null;
	$scope.lossValue = null;

	$scope.claim = {
		claimNo: null,
		description: null,
		lossValue: null
	};

	$scope.confirmTransaction = null;
	$scope.confirmError = null;

	$scope.onConfirmClick = function () {
		insuranceService.confirmLoss($scope.policyAddress, $scope.claim.claimNo,
				$scope.lossValue).then(function (result) {
					if (result) {
						$scope.confirmTransaction = result;
					}
				}).catch(function (e) {
					$scope.confirmError = e;
				});
	};

	$scope.$watch('policyAddress', function (policyAddress) {
		if (!policyAddress) {
			return;
		}

		insuranceService.getPolicy(policyAddress).then(function (policy) {
			$scope.policy = policy;

			policy.getPublicData({}, function (e, publicData) {
				if (e) {
					return;
				}

				$scope.$apply(function () {
					$scope.insuredAmount = publicData[1].toString();

					$scope.claim.claimNo = publicData[2].toString();
					$scope.claim.description = publicData[3].toString();
					$scope.claim.lossValue = publicData[4].toString();
				});
			});


		});
	})
}

mod.controller('PayoutCtrl', ['$scope', 'insuranceService', PayoutCtrl]);
function PayoutCtrl($scope, insuranceService) {
	$scope.policyAddress = null;
	$scope.policy = null;
	$scope.lossValue = null;
	$scope.payoutValue = null;

	$scope.claim = {
		claimNo: null,
		description: null,
		lossValue: null
	};

	$scope.confirmTransaction = null;
	$scope.confirmError = null;

	$scope.onPayoutClick = function () {
		insuranceService.payForClaim($scope.policyAddress, $scope.payoutValue).then(function (result) {
					if (result) {
						$scope.confirmTransaction = result;
					}
				}).catch(function (e) {
					$scope.confirmError = e;
				});
	};

	$scope.$watch('policyAddress', function (policyAddress) {
		if (!policyAddress) {
			return;
		}

		insuranceService.getPolicy(policyAddress).then(function (policy) {
			$scope.policy = policy;

			policy.getPublicData({}, function (e, publicData) {
				if (e) {
					return;
				}

				$scope.$apply(function () {
					$scope.insuredAmount = publicData[1].toString();

					$scope.claim.claimNo = publicData[2].toString();
					$scope.claim.description = publicData[3].toString();
					$scope.claim.lossValue = publicData[4].toString();
				});
			});


		});
	})
}

mod.config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
	$locationProvider.html5Mode = false;

	$routeProvider.caseInsensitiveMatch = true;
	$routeProvider
	.when('/buy', {
		controller: 'BuyPolicyCtrl',
		templateUrl: '/templates/buy.html'
	})
	.when('/claim', {
		controller: 'ClaimCtrl',
		templateUrl: '/templates/claim.html'
	})
	.when('/confirm', {
		controller: 'ConfirmCtrl',
		templateUrl: '/templates/confirm-loss.html'
	})
	.when('/payout', {
		controller: 'PayoutCtrl',
		templateUrl: '/templates/payout.html'
	})
	.when('/', {
		templateUrl: '/templates/home.html'
	});
}]);
