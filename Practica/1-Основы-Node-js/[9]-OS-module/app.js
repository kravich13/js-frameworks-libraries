const express = require("express")
const app = express()
const os = require("os")


// tmp
// console.log(os.tmpdir())


// LE
// console.log(os.endianness())


// vladislav-ms7996
// console.log(os.hostname())


// Linux
// console.log(os.type())


// Linux
// console.log(os.platform())


// x64
// console.log(os.arch())


// 5.8.11-1-MANJARO
// console.log(os.release())


// 20209
// console.log(os.uptime())


// [ 2.01, 1.91, 1.96 ]
// console.log(os.loadavg())


// 12523642880
// console.log(os.totalmem())


// 4042313728
// console.log(os.freemem())


// [
//   {
//     model: 'Intel(R) Core(TM) i3-6100 CPU @ 3.70GHz',
//     speed: 3700,
//     times: {
//       user: 5550240,
//       nice: 3050,
//       sys: 1681940,
//       idle: 12568060,
//       irq: 99390
//     }
//   },
//   {
//     model: 'Intel(R) Core(TM) i3-6100 CPU @ 3.70GHz',
//     speed: 3700,
//     times: {
//       user: 5626890,
//       nice: 2730,
//       sys: 1662090,
//       idle: 12607190,
//       irq: 86550
//     }
//   },
//   {
//     model: 'Intel(R) Core(TM) i3-6100 CPU @ 3.70GHz',
//     speed: 3700,
//     times: {
//       user: 5656160,
//       nice: 3300,
//       sys: 1656430,
//       idle: 12552310,
//       irq: 96760
//     }
//   },
//   {
//     model: 'Intel(R) Core(TM) i3-6100 CPU @ 3.70GHz',
//     speed: 3700,
//     times: {
//       user: 5531010,
//       nice: 3240,
//       sys: 1652870,
//       idle: 12649770,
//       irq: 171420
//     }
//   }
// ]
// console.log(os.cpus())


// {
//     lo: [
//       {
//         address: '127.0.0.1',
//         netmask: '255.0.0.0',
//         family: 'IPv4',
//         mac: '00:00:00:00:00:00',
//         internal: true,
//         cidr: '127.0.0.1/8'
//       },
//       {
//         address: '::1',
//         netmask: 'ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff',
//         family: 'IPv6',
//         mac: '00:00:00:00:00:00',
//         internal: true,
//         cidr: '::1/128',
//         scopeid: 0
//       }
//     ],
//     enp2s0: [
//       {
//         address: '192.168.0.101',
//         netmask: '255.255.255.0',
//         family: 'IPv4',
//         mac: '4c:cc:6a:48:ff:8c',
//         internal: false,
//         cidr: '192.168.0.101/24'
//       },
//       {
//         address: 'fe80::14b7:5118:983d:edb5',
//         netmask: 'ffff:ffff:ffff:ffff::',
//         family: 'IPv6',
//         mac: '4c:cc:6a:48:ff:8c',
//         internal: false,
//         cidr: 'fe80::14b7:5118:983d:edb5/64',
//         scopeid: 2
//       }
//     ]
// }
// console.log(os.networkInterfaces())


app.get("/", function (req, res) {
    res.send("<h1>Vlad Kravich</h1>")
})


app.listen(3000)