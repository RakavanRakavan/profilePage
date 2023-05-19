# profilePage

## Run the project in local

1. Please check the react-native version in your system. 
   
   Then replace it in android/build.gradle --> allprojects/configurations.all

2. Run the below command to start the metro server.

    `npm start`

3. Run the following command to start the bundle file for android.

    `npm run android`


## To generate APK file - Android platform.

1. Create bundle file for android
    - Run the following command
        `react-native bundle --dev false --platform android --entry-file index.js --bundle-output ./android/app/src/main/assets/index.android.bundle --assets-dest ./android/app/src/main/res`
   
    - Move to the android diretcory
        
        `cd android`

2. Create an APK file for debug mode
    - Run the following command in your terminal
         
         `./gradlew assembleDebug`

3. Create an APK file for release mode
    - Run the following command in your terminal
         
         `./gradlew assembleRelease`

         