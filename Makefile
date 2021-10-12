app_android_package_name := com.avnistock

#for emulators using virtualbox
ip:=$(shell ifconfig | grep -A 2 'vboxnet' | grep 'inet ' | tail -1 | xargs | cut -d ' ' -f 2 | cut -d ':' -f 2)
#for default Andoird Emulator
ip:=$(if $(ip),$(ip),$(shell ifconfig | grep -A 2 'wlp' | grep 'inet ' | tail -1 | xargs | cut -d ' ' -f 2 | cut -d ':' -f 2))
sha:=$(shell git rev-parse --short=4 HEAD)

log:
	adb logcat *:S ReactNative:V ReactNativeJS:V BackgroundTask:V

uninstall-apk:
	-adb uninstall ${app_android_package_name}

start:
	yarn run start

_run_app:
	yarn run android

create-bundle:
	cd android && ./gradlew bundleRelease

create-apk:
	cd android && ./gradlew assembleRelease

setup_hosts:
	sed 's/SERVER_URL_VAR/$(ip)/g' config/env/dev.json.template > config/env/dev.json

define _create_config
	@echo "Creating config for $1"
	@echo "module.exports = Object.assign(require('../../config/env/$(1).json'), {COMMIT_ID: '$(sha)'});" > src/framework/Config.js
endef

as_dev: ; $(call _create_config,dev)
as_staging: ; $(call _create_config,staging)
as_staging_dev: ; $(call _create_config,staging_dev)
as_uat: ; $(call _create_config,uat)
as_prerelease: ; $(call _create_config,prerelease)
as_prod: ; $(call _create_config,prod)
as_prod_dev: ; $(call _create_config,prod_dev)

run-app: setup_hosts as_dev _run_app
run-app-staging: as_staging _run_app
run-app-prod: as_prod _run_app

get_db: ## Get realmdb and copy to ../
	mkdir -p ../avni-stock-db; adb pull /data/data/${app_android_package_name}/files/default.realm ../avni-stock-db

deps:
	yarn install

clean:
	rm -rf node_modules
