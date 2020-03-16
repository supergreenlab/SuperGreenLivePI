const util = require('util');
const bleno = require('bleno');
const fs = require('fs');

const BlenoCharacteristic = bleno.Characteristic;

const EchoCharacteristic = function() {
  EchoCharacteristic.super_.call(this, {
    uuid: 'ec0e',
    properties: ['write'],
    value: null
  });
};

util.inherits(EchoCharacteristic, BlenoCharacteristic);

// ssid;|;password;|;controllerid;|;dropbox_token;|;name;|;strain;|;uploadname;|;rotate
EchoCharacteristic.prototype.onWriteRequest = function(data, offset, withoutResponse, callback) {
  const params = data.toString().split(';|;')
  if (params.length == 8) {
    const [ ssid, pass, controllerid, dropboxToken, name, strain, uploadName, rotate ] = params;
    fs.writeFile('/etc/wpa_supplicant/wpa_supplicant.conf', `ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
update_config=1

network={
  ssid="${ssid}"
  psk="${pass}"
}`, console.log)
    fs.writeFile('/boot/timelapse_controllerid', controllerid, console.log)
    fs.writeFile('/boot/timelapse_dropbox_token', dropboxToken, console.log)
    fs.writeFile('/boot/timelapse_name', name, console.log)
    fs.writeFile('/boot/timelapse_strain', strain, console.log)
    fs.writeFile('/boot/timelapse_uploadname', uploadName, console.log)
    fs.writeFile('/boot/timelapse_rotate', rotate, console.log)
  }
  callback(this.RESULT_SUCCESS);
};

module.exports = EchoCharacteristic;
