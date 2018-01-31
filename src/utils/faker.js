const fakerator = require('fakerator')
module.exports = {
  get ip() {
    return fakerator.internet.ip()
  },
  get referer() {
    const q = [
      'https://www.baidu.com',
      'https://lianjia.com/',
      'http://maoyan.com/'
    ]
    return q[parseInt(Math.random() * q.length)]
  },
  get device() {
    const devices = ["Blackberry PlayBook","Blackberry PlayBook landscape","BlackBerry Z30","BlackBerry Z30 landscape","Galaxy Note 3","Galaxy Note 3 landscape","Galaxy Note II","Galaxy Note II landscape","Galaxy S III","Galaxy S III landscape","Galaxy S5","Galaxy S5 landscape","iPad","iPad landscape","iPad Mini","iPad Mini landscape","iPad Pro","iPad Pro landscape","iPhone 4","iPhone 4 landscape","iPhone 5","iPhone 5 landscape","iPhone 6","iPhone 6 landscape","iPhone 6 Plus","iPhone 6 Plus landscape","iPhone X","iPhone X landscape","Kindle Fire HDX","Kindle Fire HDX landscape","LG Optimus L70","LG Optimus L70 landscape","Microsoft Lumia 550","Microsoft Lumia 950","Microsoft Lumia 950 landscape","Nexus 10","Nexus 10 landscape","Nexus 4","Nexus 4 landscape","Nexus 5","Nexus 5 landscape","Nexus 5X","Nexus 5X landscape","Nexus 6","Nexus 6 landscape","Nexus 6P","Nexus 6P landscape","Nexus 7","Nexus 7 landscape","Nokia Lumia 520","Nokia Lumia 520 landscape","Nokia N9","Nokia N9 landscape"]
    return devices[parseInt(Math.random() * devices.length)]
  },
  get token() {
    return '0x'
    + Math.random().toString(16).substring(2,12)
    + Math.random().toString(16).substring(2,12)
    + Math.random().toString(16).substring(2,12)
    + Math.random().toString(16).substring(2,12)
  }
}
