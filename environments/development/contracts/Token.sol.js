// Factory "morphs" into a Pudding class.
// The reasoning is that calling load in each context
// is cumbersome.

(function() {

  var contract_data = {
    abi: [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_amount","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_amount","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_amount","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_spender","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Approval","type":"event"}],
    binary: "60606040526104bf806100126000396000f3606060405236156100775760e060020a600035046306fdde038114610079578063095ea7b3146100d357806318160ddd1461013e57806323b872dd14610147578063313ce5671461016357806370a082311461016f57806395d89b4114610195578063a9059cbb146101f1578063dd62ed3e1461020a575b005b61023e60028054602060018216156101000260001901909116829004601f810182900490910260809081016040526060828152929190828280156102d75780601f106102ac576101008083540402835291602001916102d7565b61018b60043560243533600160a060020a03908116600081815260016020908152604080832094871680845294825282208590556060858152919392917f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9259190a35060015b92915050565b61018b60055481565b61018b6004356024356044356000600034111561036a57610002565b61018b60045460ff1681565b600160a060020a03600435166000908152602081905260409020545b6060908152602090f35b61023e600380546020601f600260001961010060018616150201909316929092049182018190040260809081016040526060828152929190828280156102d75780601f106102ac576101008083540402835291602001916102d7565b61018b600435602435600060003411156102df57610002565b61018b600435602435600160a060020a03808316600090815260016020908152604080832093851683529290522054610138565b60405180806020018281038252838181518152602001915080519060200190808383829060006004602084601f0104600f02600301f150905090810190601f16801561029e5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b820191906000526020600020905b8154815290600101906020018083116102ba57829003601f168201915b505050505081565b33600160a060020a03168152602081905260408120548290108015906103055750600082115b1561036557604080822080548490039055600160a060020a03808516808452918320805485019055606084815233909116907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef90602090a3506001610138565b610138565b600160a060020a0384168152602081905260408120548290108015906103ae575060016020908152604080832033600160a060020a03168452909152812054829010155b80156103ba5750600082115b156104b857816000600050600085600160a060020a03168152602001908152602001600020600082828250540192505081905550816000600050600086600160a060020a03168152602001908152602001600020600082828250540392505081905550816001600050600086600160a060020a03168152602001908152602001600020600050600033600160a060020a0316815260200190815260200160002060008282825054039250508190555082600160a060020a031684600160a060020a03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a35060015b939250505056",
    unlinked_binary: "60606040526104bf806100126000396000f3606060405236156100775760e060020a600035046306fdde038114610079578063095ea7b3146100d357806318160ddd1461013e57806323b872dd14610147578063313ce5671461016357806370a082311461016f57806395d89b4114610195578063a9059cbb146101f1578063dd62ed3e1461020a575b005b61023e60028054602060018216156101000260001901909116829004601f810182900490910260809081016040526060828152929190828280156102d75780601f106102ac576101008083540402835291602001916102d7565b61018b60043560243533600160a060020a03908116600081815260016020908152604080832094871680845294825282208590556060858152919392917f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9259190a35060015b92915050565b61018b60055481565b61018b6004356024356044356000600034111561036a57610002565b61018b60045460ff1681565b600160a060020a03600435166000908152602081905260409020545b6060908152602090f35b61023e600380546020601f600260001961010060018616150201909316929092049182018190040260809081016040526060828152929190828280156102d75780601f106102ac576101008083540402835291602001916102d7565b61018b600435602435600060003411156102df57610002565b61018b600435602435600160a060020a03808316600090815260016020908152604080832093851683529290522054610138565b60405180806020018281038252838181518152602001915080519060200190808383829060006004602084601f0104600f02600301f150905090810190601f16801561029e5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b820191906000526020600020905b8154815290600101906020018083116102ba57829003601f168201915b505050505081565b33600160a060020a03168152602081905260408120548290108015906103055750600082115b1561036557604080822080548490039055600160a060020a03808516808452918320805485019055606084815233909116907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef90602090a3506001610138565b610138565b600160a060020a0384168152602081905260408120548290108015906103ae575060016020908152604080832033600160a060020a03168452909152812054829010155b80156103ba5750600082115b156104b857816000600050600085600160a060020a03168152602001908152602001600020600082828250540192505081905550816000600050600086600160a060020a03168152602001908152602001600020600082828250540392505081905550816001600050600086600160a060020a03168152602001908152602001600020600050600033600160a060020a0316815260200190815260200160002060008282825054039250508190555082600160a060020a031684600160a060020a03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a35060015b939250505056",
    address: "",
    generated_with: "2.0.9",
    contract_name: "Token"
  };

  function Contract() {
    if (Contract.Pudding == null) {
      throw new Error("Token error: Please call load() first before creating new instance of this contract.");
    }

    Contract.Pudding.apply(this, arguments);
  };

  Contract.load = function(Pudding) {
    Contract.Pudding = Pudding;

    Pudding.whisk(contract_data, Contract);

    // Return itself for backwards compatibility.
    return Contract;
  }

  Contract.new = function() {
    if (Contract.Pudding == null) {
      throw new Error("Token error: Please call load() first before calling new().");
    }

    return Contract.Pudding.new.apply(Contract, arguments);
  };

  Contract.at = function() {
    if (Contract.Pudding == null) {
      throw new Error("Token error: Please call load() first before calling at().");
    }

    return Contract.Pudding.at.apply(Contract, arguments);
  };

  Contract.deployed = function() {
    if (Contract.Pudding == null) {
      throw new Error("Token error: Please call load() first before calling deployed().");
    }

    return Contract.Pudding.deployed.apply(Contract, arguments);
  };

  if (typeof module != "undefined" && typeof module.exports != "undefined") {
    module.exports = Contract;
  } else {
    // There will only be one version of Pudding in the browser,
    // and we can use that.
    window.Token = Contract;
  }

})();
