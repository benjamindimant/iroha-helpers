// for usage with grpc package use endpoint_grpc_pb file
import grpc from 'grpc'
import {
  QueryServiceClient,
  CommandServiceClient
} from '../lib/proto/endpoint_grpc_pb'
import { queryHelper, txHelper } from '../lib'
import { TxStatus, TxStatusRequest } from '../lib/proto/endpoint_pb.js'

import flow from 'lodash.flow'

let irohaAddress = 'localhost:50051'

let adminPriv =
  '0f0ce16d2afbb8eca23c7d8c2724f0c257a800ee2bbd54688cec6b898e3f7e33'

// Creating transaction with txHelper
let transaction = flow(
  t =>
  txHelper.addCommand(t, 'AddAssetQuantity', {
    accountId: 'admin@test',
    assetId: 'coin#test',
    amount: {
      value: '100000',
      precision: '2'
    }
  }),
  t =>
    txHelper.addMeta(t, {
      creatorAccountId: 'admin@test'
    }),
  t =>
    txHelper.sign(t, adminPriv)
)(txHelper.emptyTransaction())

var txClient = new CommandServiceClient(
  irohaAddress,
  grpc.credentials.createInsecure()
)

/* Serializing transaction to Bytes */
const SerializedTransaction = transaction.serializeBinary()

const txHash = txHelper.hash(transaction)

txClient.torii(transaction, (err, data) => {
  if (err) {
    throw err
  } else {
    console.log(
      'Submitted transaction successfully! Hash: ' +
        txHash.toString('hex') + '\n'
    )
  }
})

const request = new TxStatusRequest()

request.setTxHash(txHash)

let stream = txClient.statusStream(request)

stream.on('data', function (response) {
  console.log(response.getTxStatus())
})

stream.on('end', function (end) {
  console.log('transaction status stream finished')
  console.log('Sending transfer transaction')

  let transferTransaction = flow(
    t =>
      txHelper.addCommand(t, 'transferAsset', {
        srcAccountId: 'admin@test',
        destAccountId: 'test@test',
        assetId: 'coin#test',
        amount: {
          value: '500',
          precision: '2'
        },
        description: 'Welcome'
      }),
    t =>
      txHelper.addMeta(t, {
        creatorAccountId: 'admin@test'
      }),
    t =>
      txHelper.sign(t, adminPriv)
  )(txHelper.emptyTransaction())

  const transferTxHash = txHelper.hash(transferTransaction)

  txClient.torii(transferTransaction, (err, data) => {
    if (err) {
      throw err
    } else {
      console.log(
        'Submitted transfer transaction successfully! Hash: ' +
          txHash.toString('hex') + '\n'
      )
    }
  })

  const request = new TxStatusRequest()

  request.setTxHash(txHash)

  let stream = txClient.statusStream(request)

  stream.on('data', function (response) {
    console.log(response.getTxStatus())
  })

  stream.on('end', function (response) {
    console.log('Transfer successful!')


    // Creating query with queryHelper
    let query = flow(
      (q) => queryHelper.addQuery(q, 'getAccountAssets', { accountId: 'admin@test' }),
      (q) => queryHelper.addMeta(q, { creatorAccountId: 'admin@test' }),
      (q) => queryHelper.sign(q, adminPriv)
    )(queryHelper.emptyQuery())

    // Creating query with queryHelper
    let query2 = flow(
      (q) => queryHelper.addQuery(q, 'getAccountAssets', { accountId: 'test@test' }),
      (q) => queryHelper.addMeta(q, { creatorAccountId: 'admin@test' }),
      (q) => queryHelper.sign(q, adminPriv)
    )(queryHelper.emptyQuery())

    // for usage with grpc package don't forget to pass credentials or grpc.credentials.createInsecure()
    const queryClient = new QueryServiceClient(
      irohaAddress,
      grpc.credentials.createInsecure()
    )

    // Sending query with queryHelper
    queryClient.find(query, (err, response) => {
      if (err) {
        throw err
      } else {
        console.log(JSON.stringify(response))
      }
    })

     // Sending query with queryHelper
     queryClient.find(query2, (err, response) => {
      if (err) {
        throw err
      } else {
        console.log(JSON.stringify(response))
      }
    })
  })
})
