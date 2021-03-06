"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _txHelper = _interopRequireDefault(require("../txHelper"));

var _util = require("../util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEFAULT_OPTIONS = {
  privateKeys: [''],
  creatorAccountId: '',
  quorum: 1,
  commandService: null,
  timeoutLimit: 5000
  /**
   * wrapper function of queries
   * @param {Object} commandOptions
   * @param {Object} transactions
   */

};

function command() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_OPTIONS,
      privateKeys = _ref.privateKeys,
      creatorAccountId = _ref.creatorAccountId,
      quorum = _ref.quorum,
      commandService = _ref.commandService,
      timeoutLimit = _ref.timeoutLimit;

  var tx = arguments.length > 1 ? arguments[1] : undefined;

  var txToSend = _txHelper.default.addMeta(tx, {
    creatorAccountId: creatorAccountId,
    quorum: quorum
  });

  txToSend = (0, _util.signWithArrayOfKeys)(txToSend, privateKeys);
  var txClient = commandService;
  return (0, _util.sendTransactions)([txToSend], txClient, timeoutLimit);
}
/**
 * addAssetQuantity
 * @param {Object} commandOptions
 * @param {Object} args
 * @property {String} args.assetId
 * @property {Number} args.amount
 * @link https://iroha.readthedocs.io/en/latest/api/commands.html#add-asset-quantity
 */


function addAssetQuantity(commandOptions, _ref2) {
  var assetId = _ref2.assetId,
      amount = _ref2.amount;
  return command(commandOptions, _txHelper.default.addCommand(_txHelper.default.emptyTransaction(), 'addAssetQuantity', {
    assetId: assetId,
    amount: amount
  }));
}
/**
 * addPeer
 * @param {Object} commandOptions
 * @param {Object} args
 * @property {String} args.address
 * @property {String} args.peerKey
 * @link https://iroha.readthedocs.io/en/latest/api/commands.html#add-peer
 */


function addPeer(commandOptions, _ref3) {
  var address = _ref3.address,
      peerKey = _ref3.peerKey;
  return command(commandOptions, _txHelper.default.addCommand(_txHelper.default.emptyTransaction(), 'addPeer', {
    peer: {
      address: address,
      peerKey: peerKey
    }
  }));
}
/**
 * addSignatory
 * @param {Object} commandOptions
 * @param {Object} args
 * @property {String} args.accountId
 * @property {String} args.publicKey
 * @link https://iroha.readthedocs.io/en/latest/api/commands.html#add-signatory
 */


function addSignatory(commandOptions, _ref4) {
  var accountId = _ref4.accountId,
      publicKey = _ref4.publicKey;
  return command(commandOptions, _txHelper.default.addCommand(_txHelper.default.emptyTransaction(), 'addSignatory', {
    accountId: accountId,
    publicKey: publicKey
  }));
}
/**
 * appendRole
 * @param {Object} commandOptions
 * @param {Object} args
 * @property {String} args.accountId
 * @property {String} args.roleName
 * @link https://iroha.readthedocs.io/en/latest/api/commands.html#append-role
 */


function appendRole(commandOptions, _ref5) {
  var accountId = _ref5.accountId,
      roleName = _ref5.roleName;
  return command(commandOptions, _txHelper.default.addCommand(_txHelper.default.emptyTransaction(), 'appendRole', {
    accountId: accountId,
    roleName: roleName
  }));
}
/**
 * createAccount
 * @param {Object} commandOptions
 * @param {Object} args
 * @property {String} args.accountName
 * @property {String} args.domainId
 * @property {String} args.publicKey
 * @link https://iroha.readthedocs.io/en/latest/api/commands.html#create-account
 */


function createAccount(commandOptions, _ref6) {
  var accountName = _ref6.accountName,
      domainId = _ref6.domainId,
      publicKey = _ref6.publicKey;
  return command(commandOptions, _txHelper.default.addCommand(_txHelper.default.emptyTransaction(), 'createAccount', {
    accountName: accountName,
    domainId: domainId,
    publicKey: publicKey
  }));
}
/**
 * createAsset
 * @param {Object} commandOptions
 * @param {Object} args
 * @property {String} args.assetName
 * @property {String} args.domainId
 * @property {Number} args.precision
 * @link https://iroha.readthedocs.io/en/latest/api/commands.html#create-asset
 */


function createAsset(commandOptions, _ref7) {
  var assetName = _ref7.assetName,
      domainId = _ref7.domainId,
      precision = _ref7.precision;
  return command(commandOptions, _txHelper.default.addCommand(_txHelper.default.emptyTransaction(), 'createAsset', {
    assetName: assetName,
    domainId: domainId,
    precision: precision
  }));
}
/**
 * createDomain
 * @param {Object} commandOptions
 * @param {Object} args
 * @property {String} args.domainId
 * @property {String} args.defaultRole
 * @link https://iroha.readthedocs.io/en/latest/api/commands.html#create-domain
 */


function createDomain(commandOptions, _ref8) {
  var domainId = _ref8.domainId,
      defaultRole = _ref8.defaultRole;
  return command(commandOptions, _txHelper.default.addCommand(_txHelper.default.emptyTransaction(), 'createDomain', {
    domainId: domainId,
    defaultRole: defaultRole
  }));
}
/**
 * createRole
 * @param {Object} commandOptions
 * @param {Object} args
 * @property {String} args.roleName
 * @property {Number[]} args.permissionsList
 * @link https://iroha.readthedocs.io/en/latest/api/commands.html#create-role
 */


function createRole(commandOptions, _ref9) {
  var roleName = _ref9.roleName,
      permissionsList = _ref9.permissionsList;
  return command(commandOptions, _txHelper.default.addCommand(_txHelper.default.emptyTransaction(), 'createRole', {
    roleName: roleName,
    permissionsList: permissionsList
  }));
}
/**
 * detachRole
 * @param {Object} commandOptions
 * @param {Object} args
 * @property {String} args.accountId
 * @property {String} args.roleName
 * @link https://iroha.readthedocs.io/en/latest/api/commands.html#detach-role
 */


function detachRole(commandOptions, _ref10) {
  var accountId = _ref10.accountId,
      roleName = _ref10.roleName;
  return command(commandOptions, _txHelper.default.addCommand(_txHelper.default.emptyTransaction(), 'detachRole', {
    accountId: accountId,
    roleName: roleName
  }));
}
/**
 * grantPermission
 * @param {Object} commandOptions
 * @param {Object} args
 * @property {String} args.accountId
 * @property {String} args.grantablePermissionName
 * @link https://iroha.readthedocs.io/en/latest/api/commands.html#grant-permission
 */


function grantPermission(commandOptions, _ref11) {
  var accountId = _ref11.accountId,
      grantablePermissionName = _ref11.grantablePermissionName;
  return command(commandOptions, _txHelper.default.addCommand(_txHelper.default.emptyTransaction(), 'grantPermission', {
    accountId: accountId,
    permission: grantablePermissionName
  }));
}
/**
 * removeSignatory
 * @param {Object} commandOptions
 * @param {Object} args
 * @property {String} args.accountId
 * @property {String} args.publicKey
 * @link https://iroha.readthedocs.io/en/latest/api/commands.html#remove-signatory
 */


function removeSignatory(commandOptions, _ref12) {
  var accountId = _ref12.accountId,
      publicKey = _ref12.publicKey;
  return command(commandOptions, _txHelper.default.addCommand(_txHelper.default.emptyTransaction(), 'removeSignatory', {
    accountId: accountId,
    publicKey: publicKey
  }));
}
/**
 * revokePermission
 * @param {Object} commandOptions
 * @param {Object} args
 * @property {String} args.accountId
 * @property {String} args.grantablePermissionName
 * @link https://iroha.readthedocs.io/en/latest/api/commands.html#revoke-permission
 */


function revokePermission(commandOptions, _ref13) {
  var accountId = _ref13.accountId,
      grantablePermissionName = _ref13.grantablePermissionName;
  return command(commandOptions, _txHelper.default.addCommand(_txHelper.default.emptyTransaction(), 'revokePermission', {
    accountId: accountId,
    grantablePermissionName: grantablePermissionName
  }));
}
/**
 * setAccountDetail
 * @param {Object} commandOptions
 * @param {Object} args
 * @property {String} args.accountId
 * @property {String} args.key
 * @property {String} args.value
 * @link https://iroha.readthedocs.io/en/latest/api/commands.html#set-account-detail
 */


function setAccountDetail(commandOptions, _ref14) {
  var accountId = _ref14.accountId,
      key = _ref14.key,
      value = _ref14.value;
  return command(commandOptions, _txHelper.default.addCommand(_txHelper.default.emptyTransaction(), 'setAccountDetail', {
    accountId: accountId,
    key: key,
    value: value
  }));
}
/**
 * setAccountQuorum
 * @param {Object} commandOptions
 * @param {Object} args
 * @property {String} args.accountId
 * @property {Number} args.quorum
 * @link https://iroha.readthedocs.io/en/latest/api/commands.html#set-account-quorum
 */


function setAccountQuorum(commandOptions, _ref15) {
  var accountId = _ref15.accountId,
      quorum = _ref15.quorum;
  return command(commandOptions, _txHelper.default.addCommand(_txHelper.default.emptyTransaction(), 'setAccountQuorum', {
    accountId: accountId,
    quorum: quorum
  }));
}
/**
 * subtractAssetQuantity
 * @param {Object} commandOptions
 * @param {Object} args
 * @property {String} args.assetId
 * @property {Number} args.amount
 * @link https://iroha.readthedocs.io/en/latest/api/commands.html#subtract-asset-quantity
 */


function subtractAssetQuantity(commandOptions, _ref16) {
  var assetId = _ref16.assetId,
      amount = _ref16.amount;
  return command(commandOptions, _txHelper.default.addCommand(_txHelper.default.emptyTransaction(), 'subtractAssetQuantity', {
    assetId: assetId,
    amount: amount
  }));
}
/**
 * transferAsset
 * @param {Object} commandOptions
 * @param {Object} args
 * @property {String} args.srcAccountId
 * @property {String} args.destAccountId
 * @property {String} args.assetId
 * @property {String} args.description
 * @property {Number} args.amount
 * @link https://iroha.readthedocs.io/en/latest/api/commands.html#transfer-asset
 */


function transferAsset(commandOptions, _ref17) {
  var srcAccountId = _ref17.srcAccountId,
      destAccountId = _ref17.destAccountId,
      assetId = _ref17.assetId,
      description = _ref17.description,
      amount = _ref17.amount;
  return command(commandOptions, _txHelper.default.addCommand(_txHelper.default.emptyTransaction(), 'transferAsset', {
    srcAccountId: srcAccountId,
    destAccountId: destAccountId,
    assetId: assetId,
    description: description,
    amount: amount
  }));
}

var _default = {
  addAssetQuantity: addAssetQuantity,
  addPeer: addPeer,
  addSignatory: addSignatory,
  appendRole: appendRole,
  createAccount: createAccount,
  createAsset: createAsset,
  createDomain: createDomain,
  createRole: createRole,
  detachRole: detachRole,
  grantPermission: grantPermission,
  removeSignatory: removeSignatory,
  revokePermission: revokePermission,
  setAccountDetail: setAccountDetail,
  setAccountQuorum: setAccountQuorum,
  subtractAssetQuantity: subtractAssetQuantity,
  transferAsset: transferAsset
};
exports.default = _default;
