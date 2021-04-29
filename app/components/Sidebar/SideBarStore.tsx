import {Type} from "protobufjs";

export class SideBarStore {
  static subscribers: Array<(plainText: string) => void> = [];
  static messageTypes: {[key: string]: Type} = {};
  public static publishMessageClicked(plainText: string) {
    SideBarStore.subscribers.forEach(callback => {
      callback(plainText);
    });
    return;
  }

  public static addListenerToMessageClicked(
    callback: (plainText: string) => void
  ) {
    SideBarStore.subscribers.push(callback);
  }

  public static importProtoClass(typeUrl:string, messageType: Type) {
    SideBarStore.messageTypes[typeUrl] = messageType;
  }

  public static getMessageFromTypeUrl(typeUrl:string) {
    return SideBarStore.messageTypes[typeUrl];
  }
}
