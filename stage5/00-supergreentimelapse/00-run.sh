#!/bin/sh -e

install -v -o 1000 -g 1000 -m 755 "files/timelapse" "${ROOTFS_DIR}/home/${FIRST_USER_NAME}/timelapse"
install -v -o 1000 -g 1000 -m 644 "files/watermark-logo.png" "${ROOTFS_DIR}/home/${FIRST_USER_NAME}/watermark-logo.png"
install -v -o 1000 -g 1000 -m 644 "files/plume.otf" "${ROOTFS_DIR}/home/${FIRST_USER_NAME}/plume.otf"

install -v -o 1000 -g 1000 -m 644 "files/timelapse.log" "${ROOTFS_DIR}/var/log/timelapse.log"

install -v -m 644 "files/timelapse_dropbox_token" "${ROOTFS_DIR}/boot/timelapse_dropbox_token"
install -v -m 644 "files/timelapse_uploadname" "${ROOTFS_DIR}/boot/timelapse_uploadname"
install -v -m 644 "files/timelapse_name" "${ROOTFS_DIR}/boot/timelapse_name"
install -v -m 644 "files/timelapse_strain" "${ROOTFS_DIR}/boot/timelapse_strain"
install -v -m 644 "files/timelapse_controllerid" "${ROOTFS_DIR}/boot/timelapse_controllerid"
install -v -m 644 "files/timelapse_rotate" "${ROOTFS_DIR}/boot/timelapse_rotate"

install -v -m 644 "files/wpa_supplicant.conf" "${ROOTFS_DIR}/boot/wpa_supplicant.conf"

install -v -m 644 "files/hosts" "${ROOTFS_DIR}/etc/hosts"
install -v -m 644 "files/hostname" "${ROOTFS_DIR}/etc/hostname"

install -v -m 644 "files/ssh" "${ROOTFS_DIR}/boot/ssh"

rsync -av --no-o --no-g "files/ble_set_wifi" "${ROOTFS_DIR}/home/${FIRST_USER_NAME}/"

install -v -m 644 "files/ble_set_wifi/ble-set-wifi.service" "${ROOTFS_DIR}/etc/systemd/system/ble-set-wifi.service"
ln -sf "/etc/systemd/system/ble-set-wifi.service" "${ROOTFS_DIR}/etc/systemd/system/multi-user.target.wants/ble-set-wifi.service"
