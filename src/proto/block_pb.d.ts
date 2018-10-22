// package: iroha.protocol
// file: block.proto

import * as jspb from "google-protobuf";
import * as commands_pb from "./commands_pb";
import * as primitive_pb from "./primitive_pb";

export class Header extends jspb.Message {
  getCreatedTime(): number;
  setCreatedTime(value: number): void;

  clearSignaturesList(): void;
  getSignaturesList(): Array<primitive_pb.Signature>;
  setSignaturesList(value: Array<primitive_pb.Signature>): void;
  addSignatures(value?: primitive_pb.Signature, index?: number): primitive_pb.Signature;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Header.AsObject;
  static toObject(includeInstance: boolean, msg: Header): Header.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Header, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Header;
  static deserializeBinaryFromReader(message: Header, reader: jspb.BinaryReader): Header;
}

export namespace Header {
  export type AsObject = {
    createdTime: number,
    signaturesList: Array<primitive_pb.Signature.AsObject>,
  }
}

export class Transaction extends jspb.Message {
  hasPayload(): boolean;
  clearPayload(): void;
  getPayload(): Transaction.Payload | undefined;
  setPayload(value?: Transaction.Payload): void;

  clearSignaturesList(): void;
  getSignaturesList(): Array<primitive_pb.Signature>;
  setSignaturesList(value: Array<primitive_pb.Signature>): void;
  addSignatures(value?: primitive_pb.Signature, index?: number): primitive_pb.Signature;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Transaction.AsObject;
  static toObject(includeInstance: boolean, msg: Transaction): Transaction.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Transaction, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Transaction;
  static deserializeBinaryFromReader(message: Transaction, reader: jspb.BinaryReader): Transaction;
}

export namespace Transaction {
  export type AsObject = {
    payload?: Transaction.Payload.AsObject,
    signaturesList: Array<primitive_pb.Signature.AsObject>,
  }

  export class Payload extends jspb.Message {
    clearCommandsList(): void;
    getCommandsList(): Array<commands_pb.Command>;
    setCommandsList(value: Array<commands_pb.Command>): void;
    addCommands(value?: commands_pb.Command, index?: number): commands_pb.Command;

    getCreatorAccountId(): string;
    setCreatorAccountId(value: string): void;

    getCreatedTime(): number;
    setCreatedTime(value: number): void;

    getQuorum(): number;
    setQuorum(value: number): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Payload.AsObject;
    static toObject(includeInstance: boolean, msg: Payload): Payload.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Payload, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Payload;
    static deserializeBinaryFromReader(message: Payload, reader: jspb.BinaryReader): Payload;
  }

  export namespace Payload {
    export type AsObject = {
      commandsList: Array<commands_pb.Command.AsObject>,
      creatorAccountId: string,
      createdTime: number,
      quorum: number,
    }
  }
}

export class Block extends jspb.Message {
  hasPayload(): boolean;
  clearPayload(): void;
  getPayload(): Block.Payload | undefined;
  setPayload(value?: Block.Payload): void;

  clearSignaturesList(): void;
  getSignaturesList(): Array<primitive_pb.Signature>;
  setSignaturesList(value: Array<primitive_pb.Signature>): void;
  addSignatures(value?: primitive_pb.Signature, index?: number): primitive_pb.Signature;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Block.AsObject;
  static toObject(includeInstance: boolean, msg: Block): Block.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Block, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Block;
  static deserializeBinaryFromReader(message: Block, reader: jspb.BinaryReader): Block;
}

export namespace Block {
  export type AsObject = {
    payload?: Block.Payload.AsObject,
    signaturesList: Array<primitive_pb.Signature.AsObject>,
  }

  export class Payload extends jspb.Message {
    clearTransactionsList(): void;
    getTransactionsList(): Array<Transaction>;
    setTransactionsList(value: Array<Transaction>): void;
    addTransactions(value?: Transaction, index?: number): Transaction;

    getTxNumber(): number;
    setTxNumber(value: number): void;

    getHeight(): number;
    setHeight(value: number): void;

    getPrevBlockHash(): Uint8Array | string;
    getPrevBlockHash_asU8(): Uint8Array;
    getPrevBlockHash_asB64(): string;
    setPrevBlockHash(value: Uint8Array | string): void;

    getCreatedTime(): number;
    setCreatedTime(value: number): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Payload.AsObject;
    static toObject(includeInstance: boolean, msg: Payload): Payload.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Payload, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Payload;
    static deserializeBinaryFromReader(message: Payload, reader: jspb.BinaryReader): Payload;
  }

  export namespace Payload {
    export type AsObject = {
      transactionsList: Array<Transaction.AsObject>,
      txNumber: number,
      height: number,
      prevBlockHash: Uint8Array | string,
      createdTime: number,
    }
  }
}

