import {DateTime} from "luxon";

console.log(`Time: ${DateTime.now().ts}`);

const a= DateTime.now().c;
console.log(`Time: ${a}`);

console.log(DateTime.now().isLuxonDateTime);

console.log(Object.getOwnPropertyNames(DateTime.now()));

// const now1 = DateTime.now();
// setTimeout(()=>{
//     const now2 = DateTime.now();

//     console.log(now2.diff(now1));
// },1000);


console.log(DateTime.now().diff(DateTime.fromISO('2010-08-10')).isLuxonDateTime);

console.log(DateTime.now().toUnixInteger());
console.log(DateTime.now().ts);

console.log(typeof(DateTime.now().toUnixInteger()));
console.log(typeof(DateTime.now().ts));

console.log(DateTime.now().toJSDate());

console.log(DateTime.utc().toISO());

// console.log(new Date('2024-04-07T00:25:58.718Z'))

console.log(DateTime.utc(2017, 5, 15, 17, 36));

console.log(DateTime.utc(2017, 5, 15, 12, 36));


console.log(DateTime.utc(2024, 5, 15, 12, 35, 35, 100).toLocal());

console.log(DateTime.local(2024, 5, 15, 17, 36).toUTC());

console.log(DateTime.now().toObject());

console.log(DateTime.fromObject({ year: 2024, month: 5, day: 15, hour: 17, minute: 36 }));

console.log(DateTime.fromObject({ year: 2027, month: 5, day: 15, hour: 17, minute: 36 }, { zone: 'Asia/Calcutta' }));

console.log(DateTime.fromObject({ year: 2017, month: 5, day: 15, hour: 17, minute: 36 }, { zone: 'Asia/Singapore' }));

console.log(DateTime.now().setZone('Asia/Dhaka'));

console.log(DateTime.now().setZone('Asia/Singapore').startOf('seconds'));