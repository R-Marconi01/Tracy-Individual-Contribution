export const idlFactory = ({ IDL }) => {
  const DocumentInfo = IDL.Record({
    'id' : IDL.Text,
    'verified' : IDL.Bool,
    'file' : IDL.Text,
    'filename' : IDL.Text,
    'filetype' : IDL.Text,
    'points' : IDL.Nat32,
  });
  const infoRow = IDL.Record({
    'id' : IDL.Text,
    'cityDestination' : IDL.Text,
    'supplier' : IDL.Text,
    'productType' : IDL.Text,
    'companyName' : IDL.Text,
    'quantity' : IDL.Nat,
    'cityOrigin' : IDL.Text,
  });
  const User = IDL.Record({
    'created' : IDL.Int,
    'isVisible' : IDL.Bool,
    'companyName' : IDL.Text,
    'isSupplier' : IDL.Bool,
    'isFashion' : IDL.Bool,
    'principalId' : IDL.Text,
  });
  const Role = IDL.Variant({
    'admin' : IDL.Null,
    'owner' : IDL.Null,
    'authorized' : IDL.Null,
  });
  const Row = IDL.Record({
    'id' : IDL.Nat,
    'cityDestination' : IDL.Text,
    'supplier' : IDL.Text,
    'productType' : IDL.Text,
    'companyName' : IDL.Text,
    'quantity' : IDL.Nat,
    'cityOrigin' : IDL.Text,
  });
  const Result = IDL.Variant({ 'ok' : User, 'err' : IDL.Text });
  const HeaderField = IDL.Tuple(IDL.Text, IDL.Text);
  const HttpRequest = IDL.Record({
    'url' : IDL.Text,
    'method' : IDL.Text,
    'body' : IDL.Vec(IDL.Nat8),
    'headers' : IDL.Vec(HeaderField),
  });
  const Token = IDL.Record({ 'arbitrary_data' : IDL.Text });
  const StreamingCallbackHttpResponse = IDL.Record({
    'token' : IDL.Opt(Token),
    'body' : IDL.Vec(IDL.Nat8),
  });
  const CallbackStrategy = IDL.Record({
    'token' : Token,
    'callback' : IDL.Func([Token], [StreamingCallbackHttpResponse], ['query']),
  });
  const StreamingStrategy = IDL.Variant({ 'Callback' : CallbackStrategy });
  const HttpResponse = IDL.Record({
    'body' : IDL.Vec(IDL.Nat8),
    'headers' : IDL.Vec(HeaderField),
    'upgrade' : IDL.Opt(IDL.Bool),
    'streaming_strategy' : IDL.Opt(StreamingStrategy),
    'status_code' : IDL.Nat16,
  });
  const anon_class_28_1 = IDL.Service({
    'addDocument' : IDL.Func([DocumentInfo], [], []),
    'addSupplierInfo' : IDL.Func([infoRow, IDL.Vec(IDL.Principal)], [], []),
    'addToFashionHouseSuppliers' : IDL.Func([IDL.Principal], [], []),
    'addUser' : IDL.Func([User], [], []),
    'assign_role' : IDL.Func([IDL.Principal, IDL.Opt(Role)], [], []),
    'callerPrincipal' : IDL.Func([], [IDL.Principal], []),
    'getAllDBRows' : IDL.Func([], [IDL.Vec(infoRow)], ['query']),
    'getAllDocuments' : IDL.Func([], [IDL.Vec(DocumentInfo)], ['query']),
    'getAllFashionHouses' : IDL.Func([], [IDL.Vec(User)], ['query']),
    'getAllSuppliers' : IDL.Func([], [IDL.Vec(User)], ['query']),
    'getAllUsers' : IDL.Func([], [IDL.Vec(User)], ['query']),
    'getDB' : IDL.Func([], [IDL.Vec(Row)], []),
    'getFashionHouseSuppliers' : IDL.Func(
        [IDL.Principal],
        [IDL.Vec(User)],
        ['query'],
      ),
    'getFile' : IDL.Func([IDL.Text], [IDL.Opt(IDL.Vec(IDL.Nat8))], ['query']),
    'getSupplierByName' : IDL.Func([IDL.Text], [IDL.Vec(User)], ['query']),
    'getSupplierDocs' : IDL.Func([], [IDL.Vec(DocumentInfo)], ['query']),
    'getSupplierInfo' : IDL.Func(
        [IDL.Principal],
        [IDL.Vec(infoRow)],
        ['query'],
      ),
    'getSupplierSuppliers' : IDL.Func([IDL.Text], [IDL.Vec(User)], ['query']),
    'getSupplierSuppliersCount' : IDL.Func([IDL.Text], [IDL.Nat], []),
    'getSuppliersDocuments' : IDL.Func(
        [IDL.Principal],
        [IDL.Vec(DocumentInfo)],
        ['query'],
      ),
    'getUser' : IDL.Func([], [Result], ['query']),
    'http_request' : IDL.Func([HttpRequest], [HttpResponse], ['query']),
    'http_request_update' : IDL.Func([HttpRequest], [HttpResponse], []),
    'invalidate_cache' : IDL.Func([], [], []),
    'my_role' : IDL.Func([], [IDL.Text], []),
    'removeFashionHouse' : IDL.Func([IDL.Principal], [], []),
    'removeFromFashionHouseSuppliers' : IDL.Func([IDL.Principal], [], []),
    'removeSupplier' : IDL.Func([IDL.Principal], [], []),
    'toggleUserVisibility' : IDL.Func([IDL.Principal], [], []),
    'updateDocument' : IDL.Func([DocumentInfo], [], []),
    'updateUser' : IDL.Func([User], [], []),
  });
  return anon_class_28_1;
};
export const init = ({ IDL }) => { return []; };
