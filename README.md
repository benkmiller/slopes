# Slopes

THE GREATEST SNOW APP EVER

## Installing the Ionic Framework

Follow this guide: http://ionicframework.com/getting-started/

## Running on local browser

Run the following command on the command line interface:
`ionic serve --lab`

This will show the app in an interface similar to a smartphone screen.

## Running on iOS devices

Ensure you have iOS development tools and Mac OSX installed.

Connect your iOS device to your computer.

Run the following command on the command line interface:

1) `ionic platform ios` to select iOS as your target platform

2) `ionic build ios` to build the app for iOS

3) `ionic run ios` to run the app on your iOS device.

If you do not have an iOS device connected, the command `ionic run ios` will run on an emulator.

## Running on Android devices

Connect your Android device to your computer.

Run the following command on the command line interface:

1) `ionic platform android` to select Android as your target platform

2) `ionic build android` to build the app for Android

3) `ionic run Android` to run the app on your Android device.

If you do not have an Android device connected, the command `ionic run Android` will run on an emulator.

## Build Errors and Resolutions

1) Node Sass could not find a binding for your current environment:

Run the following command on the CLI: `npm rebuild node-sass`
