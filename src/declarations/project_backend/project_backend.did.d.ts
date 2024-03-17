import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface CallbackStrategy {
  'token' : Token,
  'callback' : [Principal, string],
}
export interface DocumentInfo {
  'id' : string,
  'verified' : boolean,
  'file' : string,
  'filename' : string,
  'filetype' : string,
  'points' : number,
}
export type HeaderField = [string, string];
export interface HttpRequest {
  'url' : string,
  'method' : string,
  'body' : Uint8Array | number[],
  'headers' : Array<HeaderField>,
}
export interface HttpResponse {
  'body' : Uint8Array | number[],
  'headers' : Array<HeaderField>,
  'upgrade' : [] | [boolean],
  'streaming_strategy' : [] | [StreamingStrategy],
  'status_code' : number,
}
export type Result = { 'ok' : User } |
  { 'err' : string };
export type Role = { 'admin' : null } |
  { 'owner' : null } |
  { 'authorized' : null };
export interface Row {
  'id' : bigint,
  'cityDestination' : string,
  'supplier' : string,
  'productType' : string,
  'companyName' : string,
  'quantity' : bigint,
  'cityOrigin' : string,
}
export interface StreamingCallbackHttpResponse {
  'token' : [] | [Token],
  'body' : Uint8Array | number[],
}
export type StreamingStrategy = { 'Callback' : CallbackStrategy };
export interface Token { 'arbitrary_data' : string }
export interface User {
  'created' : bigint,
  'isVisible' : boolean,
  'companyName' : string,
  'isSupplier' : boolean,
  'isFashion' : boolean,
  'principalId' : string,
}
export interface anon_class_28_1 {
  'addDocument' : ActorMethod<[DocumentInfo], undefined>,
  'addSupplierInfo' : ActorMethod<[infoRow, Array<Principal>], undefined>,
  'addToFashionHouseSuppliers' : ActorMethod<[Principal], undefined>,
  'addUser' : ActorMethod<[User], undefined>,
  'assign_role' : ActorMethod<[Principal, [] | [Role]], undefined>,
  'callerPrincipal' : ActorMethod<[], Principal>,
  'getAllDBRows' : ActorMethod<[], Array<infoRow>>,
  'getAllDocuments' : ActorMethod<[], Array<DocumentInfo>>,
  'getAllFashionHouses' : ActorMethod<[], Array<User>>,
  'getAllSuppliers' : ActorMethod<[], Array<User>>,
  'getAllUsers' : ActorMethod<[], Array<User>>,
  'getDB' : ActorMethod<[], Array<Row>>,
  'getFashionHouseSuppliers' : ActorMethod<[Principal], Array<User>>,
  'getFile' : ActorMethod<[string], [] | [Uint8Array | number[]]>,
  'getSupplierByName' : ActorMethod<[string], Array<User>>,
  'getSupplierDocs' : ActorMethod<[], Array<DocumentInfo>>,
  'getSupplierInfo' : ActorMethod<[Principal], Array<infoRow>>,
  'getSupplierSuppliers' : ActorMethod<[string], Array<User>>,
  'getSupplierSuppliersCount' : ActorMethod<[string], bigint>,
  'getSuppliersDocuments' : ActorMethod<[Principal], Array<DocumentInfo>>,
  'getUser' : ActorMethod<[], Result>,
  'http_request' : ActorMethod<[HttpRequest], HttpResponse>,
  'http_request_update' : ActorMethod<[HttpRequest], HttpResponse>,
  'invalidate_cache' : ActorMethod<[], undefined>,
  'my_role' : ActorMethod<[], string>,
  'removeFashionHouse' : ActorMethod<[Principal], undefined>,
  'removeFromFashionHouseSuppliers' : ActorMethod<[Principal], undefined>,
  'removeSupplier' : ActorMethod<[Principal], undefined>,
  'toggleUserVisibility' : ActorMethod<[Principal], undefined>,
  'updateDocument' : ActorMethod<[DocumentInfo], undefined>,
  'updateUser' : ActorMethod<[User], undefined>,
}
export interface infoRow {
  'id' : string,
  'cityDestination' : string,
  'supplier' : string,
  'productType' : string,
  'companyName' : string,
  'quantity' : bigint,
  'cityOrigin' : string,
}
export interface _SERVICE extends anon_class_28_1 {}
