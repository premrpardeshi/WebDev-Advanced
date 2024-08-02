import * as grpc from "@grpc/grpc-js";
import { ServiceClientConstructor } from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";

const packageDefinition = protoLoader.loadSync("./a.proto");

const personProto = grpc.loadPackageDefinition(packageDefinition);

const PERSONS = [
  {
    name: "harkirat",
    age: 45,
  },
  {
    name: "raman",
    age: 45,
  },
];

//@ts-ignore
function AddPerson(call, callback) {
  console.log(call);
  let person = {
    name: call.request.name,
    age: call.request.age,
  };
  PERSONS.push(person);
  callback(null, person);
}

// @ts-ignore
function GetPersonByName(call, callback) {
  let name = call.request.name;
  let requiredPerson = PERSONS.find((person) => person.name === name);
  callback(null, requiredPerson);
}

const server = new grpc.Server();

server.addService(
  (personProto.AddressBookService as ServiceClientConstructor).service,
  { AddPerson, GetPersonByName }
);
server.bindAsync(
  "0.0.0.0:50051",
  grpc.ServerCredentials.createInsecure(),
  () => {
    server.start();
  }
);
