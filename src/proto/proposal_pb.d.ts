// package: iroha.protocol
// file: proposal.proto

import * as jspb from "google-protobuf";
import * as block_pb from "./block_pb";

export class Proposal extends jspb.Message {
  getHeight(): number;
  setHeight(value: number): void;

  clearTransactionsList(): void;
  getTransactionsList(): Array<block_pb.Transaction>;
  setTransactionsList(value: Array<block_pb.Transaction>): void;
  addTransactions(value?: block_pb.Transaction, index?: number): block_pb.Transaction;

  getCreatedTime(): number;
  setCreatedTime(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Proposal.AsObject;
  static toObject(includeInstance: boolean, msg: Proposal): Proposal.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Proposal, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Proposal;
  static deserializeBinaryFromReader(message: Proposal, reader: jspb.BinaryReader): Proposal;
}

export namespace Proposal {
  export type AsObject = {
    height: number,
    transactionsList: Array<block_pb.Transaction.AsObject>,
    createdTime: number,
  }
}

