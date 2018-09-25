// for usage with grpc package use endpoint_grpc_pb file
// import {
//   QueryServiceClient,
//   CommandServiceClient
// } from '../lib/proto/endpoint_pb_service'
import {
  QueryServiceClient,
  CommandServiceClient
} from '../lib/proto/endpoint_grpc_pb'
import { queryHelper, txHelper } from '../lib'
import grpc from 'grpc'
import { TxStatus, TxStatusRequest } from '../lib/proto/endpoint_pb.js'

import flow from 'lodash.flow'

let irohaAddress = 'localhost:50051'

let adminPriv =
  '0f0ce16d2afbb8eca23c7d8c2724f0c257a800ee2bbd54688cec6b898e3f7e33'

// Creating transaction with txHelper
let transaction = flow(
  t =>
    txHelper.addCommand(t, 'CreateAsset', {
      assetName: 'dollar10',
      domainId: 'test',
      precision: 2
    }),
  t =>
    txHelper.addMeta(t, {
      creatorAccountId: 'test@notary'
    })
)(txHelper.emptyTransaction())

let transaction2 = flow(
  t =>
    txHelper.addCommand(t, 'CreateAsset', {
      assetName: 'dollar11',
      domainId: 'test',
      precision: 2
    }),
  t =>
    txHelper.addMeta(t, {
      creatorAccountId: 'test@notary'
    })
)(txHelper.emptyTransaction())

// for usage with grpc package don't forget to pass credentials or grpc.credentials.createInsecure()
const txClient = new CommandServiceClient(irohaAddress, grpc.credentials.createInsecure())

const batchArray = txHelper.addBatchMeta([transaction, transaction2], 0)

batchArray[0] = txHelper.sign(batchArray[0], adminPriv)
batchArray[1] = txHelper.sign(batchArray[1], adminPriv)

const txHash = txHelper.hash(batchArray[0])
const txHash2 = txHelper.hash(batchArray[1])

const batch = txHelper.createTxListFromArray(batchArray)

txClient.listTorii(batch, (err, data) => {
  if (err) {
    throw err
  } else {
    console.log(
      'Submitted transaction successfully! Hash: ' +
        txHash.toString('hex') + '\n' +
        txHash2.toString('hex')
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
  console.log('finish')
})

const request2 = new TxStatusRequest()

request2.setTxHash(txHash2)

let stream2 = txClient.statusStream(request2)

stream2.on('data', function (response) {
  console.log(response.getTxStatus())
})

stream2.on('end', function (end) {
  console.log('finish')
})

// Creating query with queryHelper
let query = flow(
  (q) => queryHelper.addQuery(q, 'getAccount', { accountId: 'test@notary' }),
  (q) => queryHelper.addMeta(q, { creatorAccountId: 'test@notary' }),
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
