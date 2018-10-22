import { Buffer } from 'buffer'
import { sign as signTransaction, derivePublicKey } from 'ed25519.js'
import { sha3_256 as sha3 } from 'js-sha3'
import cloneDeep from 'lodash.clonedeep'
import forEach from 'lodash.foreach'
import * as Commands from './proto/commands_pb'
import { Signature, Amount, uint256 } from './proto/primitive_pb'
import Transaction from './proto/block_pb'
import { capitalize } from './util.js'

const emptyTransaction = () => new Transaction.Transaction()

/**
 * Returns payload from the transaction or a new one
 * @param {Object} transaction
 */
const getOrCreatePayload = transaction => transaction.hasPayload() ? cloneDeep(transaction.getPayload()) : new Transaction.Transaction.Payload()

// TODO: Create corner cases for AddPeer, setPermission
/**
 * Returns new query with added command.
 * @param {Object} transaction base transaction
 * @param {String} commandName name of a commandName. For reference, visit http://iroha.readthedocs.io/en/latest/api/commands.html
 * @param {Object} params command parameters. For reference, visit http://iroha.readthedocs.io/en/latest/api/commands.html
 */
const addCommand = (transaction, commandName, params) => {
  let payloadCommand = new Commands[capitalize(commandName)]()

  let amount

  if (params.amount) {
      amount = new Amount()
      let value = new uint256()
      // FIXME: will only work with JS 64bit numbers :) Maybe we need to utilize setFirst/Second/etc.
      value.setFourth(params.amount.value)
      amount.setValue(value)
      amount.setPrecision(params.amount.precision)
    }

  forEach(params, (value, key) => {
    let valueToSet = value
    if (key === 'amount') valueToSet = amount
    payloadCommand['set' + capitalize(key)](valueToSet)
  })

  let command = new Commands.Command()

  let commandNameSetter = 'set' + capitalize(commandName)
   // Fix for setAccountQuorum
  if (commandNameSetter === 'setSetAccountQuorum') commandNameSetter = 'setSetQuorum'

  command[commandNameSetter](payloadCommand)

  let payload = getOrCreatePayload(transaction)

  payload.addCommands(command, payload.getCommandsList.length)

  let txWithCommand = cloneDeep(transaction)
  txWithCommand.setPayload(payload)

  return txWithCommand
}

/**
 * Returns new transaction with meta information
 * @param {Object} transaction base transaction
 * @param {Object} meta - meta info
 * @param {String} meta.creatorAccountId accountID of transaction's creator
 * @param {Number} meta.createdTime time of transaction creation
 * @param {Number} meta.quorum minimum amount of signatures needed to sign a transaction
 */
const addMeta = (transaction, { creatorAccountId, createdTime = Date.now(), quorum = 1 }) => {
  let payload = getOrCreatePayload(transaction)

  payload.setCreatorAccountId(creatorAccountId)
  payload.setCreatedTime(createdTime)
  payload.setQuorum(quorum)

  let transactionWithMeta = cloneDeep(transaction)
  transactionWithMeta.setPayload(payload)

  return transactionWithMeta
}

/**
 * Returns new transaction with one more signature
 * @param {Object} transaction base transaction
 * @param {String} privateKeyHex - private key of query's creator in hex.
 */
const sign = (transaction, privateKeyHex) => {
  const privateKey = Buffer.from(privateKeyHex, 'hex')
  const publicKey = derivePublicKey(privateKey)

  const payloadHash = hash(transaction)

  const signatory = signTransaction(payloadHash, publicKey, privateKey)

  let s = new Signature()
  s.setPubkey(publicKey)
  s.setSignature(signatory)

  let signedTransactionWithSignature = cloneDeep(transaction)
  signedTransactionWithSignature.addSignatures(s, signedTransactionWithSignature.getSignaturesList.length)

  return signedTransactionWithSignature
}

/**
 * Returns hash of a transaction
 * @param {Object} transaction base transaction
 * @param {String} privateKeyHex private key of query's creator in hex.
 * @returns {Buffer} transaction hash
 */
const hash = transaction => Buffer.from(sha3.array(transaction.getPayload().serializeBinary()))

// TODO: Add types for commands
export default {
  addCommand,
  addMeta,
  sign,
  emptyTransaction,
  hash
}
