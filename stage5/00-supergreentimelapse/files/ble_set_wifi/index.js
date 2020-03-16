const bleno = require('bleno')
const EchoCharacteristic = require('./characteristic');

let name = 'sgl-cam'
let serviceUuids = ['7bfdeb0b-f06d-480f-a82c-cde56ab3d686']

bleno.on('stateChange', function(state) {
  if (state === 'poweredOn') {
    bleno.startAdvertising(name, serviceUuids)
  }
});

bleno.on('advertisingStart', function(error) {
  console.log('on -> advertisingStart: ' + (error ? 'error ' + error : 'success'));

  if (!error) {
    bleno.setServices([
      new bleno.PrimaryService({
        uuid: serviceUuids[0],
        characteristics: [
          new EchoCharacteristic()
        ]
      })
    ]);
  }
});
