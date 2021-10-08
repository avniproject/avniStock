log:
	adb logcat *:S ReactNative:V ReactNativeJS:V BackgroundTask:V

uninstall-apk:
	-adb uninstall ${app_android_package_name}

start:
	yarn run start

run-in-android:
	yarn run android

create-bundle:
	cd android && ./gradlew bundleRelease

create-apk:
	cd android && ./gradlew assembleRelease
