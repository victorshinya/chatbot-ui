# Chatbot UI

[![IBM Cloud Powered](https://img.shields.io/badge/IBM%20Cloud-powered-blue.svg)](https://cloud.ibm.com)
[![Platform](https://img.shields.io/badge/platform-nodejs-lightgrey.svg?style=flat)](https://developer.ibm.com/node/)

A User Interface (UI) for a Chatbot application. It allows you to run a IBM Watson Assistant's Assistant on Cloud. No new code required. This application was designed and developed to accelerate the go-to-market process.

![Architecture Design](doc/source/images/architecture.jpeg)

## Components and technologies

* [Watson Assistant](https://cloud.ibm.com/catalog/services/watson-assistant): Watson Assistant lets you build conversational interfaces into any application, device, or channel.

## Run locally and deploy

In order to deploy the code in a cloud platform, you need to install [Node.js](https://nodejs.org/). After the installation, you can follow the steps below.

### 1. Download the source code

```sh
git clone https://github.com/victorshinya/chatbot-ui.git
cd chatbot-ui
```

### 2. Install all dependencies and build the app

```sh
npm install
npm run build
```

### 3. Build your app

```sh
npm run build
```

### 4. Run the app

```sh
npm start
```

### 5. Deploy to the cloud

```sh
ibmcloud cf push {your_app_name}
```

## Roadmap

* [x] Handle response type: text
* [x] Handle response type: image
* [ ] Handle response type: options
* [ ] Handle response type: pause
* [ ] Record and receive audio
* [ ] Convert: speech to text
* [ ] Play audio
* [ ] Convert: text to speech

## License

Copyright 2019 Victor Shinya

Licensed under the Apache License, Version 2.0 (the "License").
