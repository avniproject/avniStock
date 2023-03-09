# avni-stock

[![Join the chat at https://gitter.im/avniproject/avni-stock](https://badges.gitter.im/avniproject/avni-stock.svg)](https://gitter.im/avniproject/avni-stock?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Offline mobile application for the stock management.

### Run app in the dev env

- Start packager using `make start`.
- For the first time, download packages using `make deps`.
- On another terminal run `make run-app` to run the app.

### Release bundle

- gradle.properties and avni-stock.keystore are stored in keeweb. And place these files as mentioned in the [docs](https://reactnative.dev/docs/signed-apk-android).
- AVNI_STOCK_CLIENT_BUGSNAG_API_KEY env var needs to be set with value from bugsnag
- Create bundle using command ` versionName=1.0 versionCode=10000 make release-prod-bundle`. Replace the vesionName and versionCode values.
- Upload bundle to playstore.
