<p align="center">
  <img src="./resources/blue/256x256.png" />
</p>
<h1 align="center">BloomRPC</h1>

<p align="center">
  <img src="https://img.shields.io/github/release/uw-labs/bloomrpc.svg" />
  <a href="https://uw-labs.slack.com/">
    <img src="https://img.shields.io/badge/Join-Slack-e44a61.svg" />
  </a>
</p>
<p align="center">The missing GUI Client for GRPC services. 🌸 </p>

<p align="center">Inspired by <b>Postman</b> and <b>GraphQL Playground</b> <br/>
  <b>BloomRPC</b> aims to provide the simplest and most efficient developer experience for exploring
and querying your GRPC services.
</p>

<br/>

<p align="center">
  Install the client, select your protobuf files and start making requests! <br/>
  <b>No extra</b> steps or configuration <b>needed</b>.
</p>

## Forked from the origin to support Any proto
BloomRPC is a GUI for gRPC manual testing. Not only does it provide an interactive way to make gRPC calls, it also automatically generates the gRPC request with mocked data when you select a rpc method.

However, we cannot use it to test our event log libraries since the event envelope encloses an event as an ambiguous “any type”, which is not currently supported by BloomRPC. So we extended BloomRPC to support “any type”, and here is an example of how we manually test the monolith event log forwarder consumer.

Double click a RPC to bootstrap a request with some random mocked data.
![image](https://user-images.githubusercontent.com/5493592/116621423-fb36e780-a8f7-11eb-9e61-8c309a60f9ae.png)
Double click a message to fill ambiguous “any” fields.
![image](https://user-images.githubusercontent.com/5493592/116621445-02f68c00-a8f8-11eb-9fac-a8cb06bea9f0.png)


## Features

- Native GRPC calls
- Unary Calls and Server Side Streaming Support
- Client side and Bi-directional Streaming
- Automatic Input recognition
- Multi tabs operations
- Metadata support
- Persistent Workspace
- Request Cancellation
- Much more...

### Shortcuts

<kbd>CTRL</kbd>+<kbd>w</kbd> or <kbd>CMD</kbd>+<kbd>w</kbd>: close tab

<kbd>ESC</kbd>: focos editor

<kbd>CTRL</kbd>+<kbd>Enter</kbd> or <kbd>CMD</kbd>+<kbd>Enter</kbd>: send request

### GRPC Web

GRPC Web is now supported! Just toggle the `GRPC` switch to `WEB`.

Note on https:

- add https to the url, note for GRPC-Web it also supports path, e.g. https://example.com/grpcweb/v1
- or turn on "TLS" -> Server certificate (default port will change to 443)
- self-signed certificate not supported at the moment

## Installation
We support all the major operation systems, **MacOS / Windows / Linux Deb - Arch Linux**

You can install the client downloading the installer directly from the [Releases Page](https://github.com/uw-labs/bloomrpc/releases)

#### For MacOS and Homebrew users:

```
brew install --cask bloomrpc
```
The app will get installed and copied to the path `/Applications/BloomRPC.app`

#### For Windows and chocolatey users:

```
choco install bloomrpc
```
Search for bloomrpc in windows search.

### Build from source:

```
git clone https://github.com/uw-labs/bloomrpc.git
cd bloomrpc

yarn install && ./node_modules/.bin/electron-rebuild
npm run package
```
The installer will be located in the `release` folder

## Preview

<img src="./resources/editor-preview.gif" />


## Planned Features

- [x] Client-Side Streaming and Bi-Directional Streaming Support
- [x] Draggable tabs
- [x] Web Version with GRPC-WEB

## Contributing

We are welcome to any kind of feedback and contributions.

#### Development Mode:

Run this 2 commands in two different terminals
```
npm run start-server-dev
npm run start-main-dev
```

## Built with amazing technologies

<p float="left">
  <img src="./resources/thirdparties/electron-logo.png" width="100"/>
  <img src="./resources/thirdparties/react-logo.png" width="120" />
  <img src="./resources/thirdparties/grpc-logo.png" width="160" />
</p>
