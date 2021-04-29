import { remote } from "electron";
import {
  fromFileName,
  Proto,
  walkServices
} from "bloomrpc-mock";
import {mockRequestMethods, mockTypeFields} from "./automock";
import * as path from "path";
import { ProtoFile, ProtoMessageList, ProtoService } from "./protobuf";
import {Namespace, ReflectionObject, Service, Type} from "protobufjs";
import {SideBarStore} from "../components/Sidebar/SideBarStore";

const commonProtosPath = [
  // @ts-ignore
  path.join(__static)
];

export type OnProtoUpload = (protoFiles: ProtoFile[], err?: Error) => void;

/**
 * Upload protofiles
 * @param onProtoUploaded
 * @param importPaths
 */
export async function importProtos(
  onProtoUploaded: OnProtoUpload,
  importPaths?: string[]
) {
  const openDialogResult = await remote.dialog.showOpenDialog(
    remote.getCurrentWindow(),
    {
      properties: ["openFile", "multiSelections"],
      filters: [{ name: "Protos", extensions: ["proto"] }]
    }
  );

  const filePaths = openDialogResult.filePaths;

  if (!filePaths) {
    return;
  }
  await loadProtos(filePaths, importPaths, onProtoUploaded);
}

/**
 * Load protocol buffer files
 * @param filePaths
 * @param importPaths
 * @param onProtoUploaded
 */
export async function loadProtos(
  filePaths: string[],
  importPaths?: string[],
  onProtoUploaded?: OnProtoUpload
): Promise<ProtoFile[]> {
  try {
    const protos = await Promise.all(
      filePaths.map(fileName =>
        fromFileName(fileName, [
          ...(importPaths ? importPaths : []),
          ...commonProtosPath
        ])
      )
    );

    const protoList = protos.reduce((list: ProtoFile[], proto: Proto) => {
      // Services with methods
      const services = parseServices(proto);
      const messages = parseAllMessages(proto);

      // Proto file
      list.push({
        proto,
        fileName: proto.fileName.split(path.sep).pop() || "",
        services,
        messages
      });

      return list;
    }, []);
    onProtoUploaded && onProtoUploaded(protoList, undefined);
    return protoList;
  } catch (e) {
    console.error(e);
    onProtoUploaded && onProtoUploaded([], e);

    if (!onProtoUploaded) {
      throw e;
    }

    return [];
  }
}

/**
 * Parse all grpc messages
 * @param proto
 */
function parseAllMessages(proto: Proto) {
  const { root } = proto;
  const protoMessageList: ProtoMessageList = {};

  traverse(root, typeNode => {
    let node: Namespace = typeNode;
    const trace: Array<String> = [];
    while (node.parent) {
      trace.push(node.name);
      node = node.parent;
    }
    trace.push(node.name);
    const messageName = trace.reverse().filter(s => s.length > 0).join(".");
    SideBarStore.importProtoClass(messageName, typeNode);
    protoMessageList[messageName] = {
      proto: proto,
      messageName,
      plain: mockTypeFields(typeNode),
    };
  });
  return protoMessageList;
}

function traverse(node: ReflectionObject, onType: (node: Type) => void) {
  if (node instanceof Type) {
    onType(node);
  } else if (node instanceof Namespace) {
    if (node.nested) {
      Object.values(node.nested).forEach(n => {
        traverse(n, onType);
      });
    }
  }
}

/**
 * Parse Grpc services from root
 * @param proto
 */
function parseServices(proto: Proto) {
  const services: { [key: string]: ProtoService } = {};

  walkServices(proto, (service: Service, _: any, serviceName: string) => {
    const mocks = mockRequestMethods(service);
    services[serviceName] = {
      serviceName: serviceName,
      proto,
      methodsMocks: mocks,
      methodsName: Object.keys(mocks)
    };
  });

  return services;
}

export function importResolvePath(): Promise<string> {
  return new Promise(async (resolve, reject) => {
    const openDialogResult = await remote.dialog.showOpenDialog(
      remote.getCurrentWindow(),
      {
        properties: ["openDirectory"],
        filters: []
      }
    );

    const filePaths = openDialogResult.filePaths;

    if (!filePaths) {
      return reject("No folder selected");
    }
    resolve(filePaths[0]);
  });
}
