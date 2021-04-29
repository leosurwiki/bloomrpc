import { Proto, ServiceMethodsPayload } from "bloomrpc-mock";

export interface ProtoFile {
  proto: Proto;
  fileName: string;
  services: ProtoServiceList;
  messages: ProtoMessageList;
}

export interface ProtoServiceList {
  [key: string]: ProtoService;
}

export interface ProtoService {
  proto: Proto;
  serviceName: string;
  methodsMocks: ServiceMethodsPayload;
  methodsName: string[];
}

export interface ProtoMessageList {
  [key: string]: ProtoMessage;
}

export interface ProtoMessage {
  proto: Proto;
  messageName: string;
  plain: { [key: string]: any };
}
