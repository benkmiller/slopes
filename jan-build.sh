#!/bin/bash

clear

echo "This script will build an Ionic Android App and push it to the device"

echo "The apk file will be pushed into ~/APK/ folder"

echo "Deleting old apk"

rm ~/Documents/Programming/CPEN321/slopes/platforms/android/build/outputs/apk/*

echo "APKs deleted"

ionic build android

echo "Build complete."

echo "Transferring apk to device..."

adb -s ef755fc3 install ~/Documents/Programming/CPEN321/slopes/platforms/android/build/outputs/apk/android-debug.apk

echo "Build and transfer complete"

