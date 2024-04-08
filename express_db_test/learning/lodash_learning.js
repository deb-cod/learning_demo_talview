import _ from 'lodash';
// console.log(_);

const numbers = [1,2,3,4,5,6,7,8,9,10];
// console.log(_.first(numbers));
// console.log(_.last(numbers));
// console.log(_.lastIndexOf(numbers));
// console.log(_.head(numbers));
// console.log(_.nth(numbers,6));


// const chunked = _.chunk(numbers,4);
// console.log(chunked);


// const num_1 = [1,6,8];
// console.log(_.difference(numbers,num_1));
// console.log(_.differenceBy(numbers,[2], Math.floor));

// console.log(_.isEqual());


// var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
 
// console.log(_.differenceWith(objects, [{ 'x': 1, 'y': 2 }], _.isEqual));

// console.log(_.drop(numbers,1));
// console.log(numbers);

// console.log(_.dropRight(numbers, 3));

// var users = [
//     { 'user': 'barney',  'active': false },
//     { 'user': 'fred',    'active': false },
//     { 'user': 'pebbles', 'active': true }
//   ];
   
//   console.log(_.dropWhile(users, function(o) { return !o.active; }));
//   // => objects for ['pebbles']
   
//   // The `_.matches` iteratee shorthand.
//   console.log(_.dropWhile(users, { 'user': 'barney', 'active': false }));
//   // => objects for ['fred', 'pebbles']
   
//   // The `_.matchesProperty` iteratee shorthand.
//   console.log(_.dropWhile(users, ['active', false]));
//   // => objects for ['pebbles']
   
//   // The `_.property` iteratee shorthand.
//   console.log( _.dropWhile(users, 'active'));
//   // => objects for ['barney', 'fred', 'pebbles']


//   console.log(_.take(numbers,6));

// console.log(_.takeRight(numbers,6));
// console.log(_.union(_.take(numbers,6), _.takeRight(numbers,6)));

// const new_arr = [1, 2, [6, [7]], [5]];
// console.log(_.flatten(new_arr));
// console.log(_.flattenDepth(new_arr,2))
// console.log(_.flattenDeep(new_arr));


// const contacts = [
//     {
//         "id": 1,
//         "first_name": "Coretta",
//         "last_name": "Van Hesteren",
//         "email": "cvanhesteren0@businessinsider.com",
//         "working_sector": "Mining & Quarrying of Nonmetallic Minerals (No Fuels)",
//         "car_make": "GMC",
//         "car_model": "Sierra 3500",
//         "car_model_year": 2007,
//         "car_vin_number": "1G6KY54983U106221",
//         "created_at": "2024-03-27T12:59:46.590Z",
//         "updated_at": "2024-03-27T12:59:46.590Z"
//     },
//     {
//         "id": 2,
//         "first_name": "Janot",
//         "last_name": "Stace",
//         "email": "jstace1@blogger.com",
//         "working_sector": "Major Pharmaceuticals",
//         "car_make": "Porsche",
//         "car_model": "944",
//         "car_model_year": 1985,
//         "car_vin_number": "WAUAH74F78N631344",
//         "created_at": "2024-03-27T12:59:46.590Z",
//         "updated_at": "2024-03-27T12:59:46.590Z"
//     },
//     {
//         "id": 3,
//         "first_name": "Blondell",
//         "last_name": "Tibbotts",
//         "email": "btibbotts2@virginia.edu",
//         "working_sector": "Major Pharmaceuticals",
//         "car_make": "Buick",
//         "car_model": "Lucerne",
//         "car_model_year": 2010,
//         "car_vin_number": "JN8AZ2KR9BT614164",
//         "created_at": "2024-03-27T12:59:46.590Z",
//         "updated_at": "2024-03-27T12:59:46.590Z"
//     },
//     {
//         "id": 4,
//         "first_name": "Delmore",
//         "last_name": "MacKey",
//         "email": "dmackey3@gmpg.org",
//         "working_sector": "Integrated oil Companies",
//         "car_make": "Volkswagen",
//         "car_model": "Jetta",
//         "car_model_year": 2011,
//         "car_vin_number": "WAUHFAFL5CA746450",
//         "created_at": "2024-03-27T12:59:46.590Z",
//         "updated_at": "2024-03-27T12:59:46.590Z"
//     },
//     {
//         "id": 5,
//         "first_name": "Flor",
//         "last_name": "Pryn",
//         "email": "fpryn4@answers.com",
//         "working_sector": "n/a",
//         "car_make": "Pontiac",
//         "car_model": "Grand Am",
//         "car_model_year": 1987,
//         "car_vin_number": "SALGS2TF8FA309781",
//         "created_at": "2024-03-27T12:59:46.590Z",
//         "updated_at": "2024-03-27T12:59:46.590Z"
//     },
//     {
//         "id": 6,
//         "first_name": "Kati",
//         "last_name": "Coyne",
//         "email": "kcoyne5@prnewswire.com",
//         "working_sector": "Television Services",
//         "car_make": "Volkswagen",
//         "car_model": "GTI",
//         "car_model_year": 2004,
//         "car_vin_number": "3C6TD5DTXCG702059",
//         "created_at": "2024-03-27T12:59:46.590Z",
//         "updated_at": "2024-03-27T12:59:46.590Z"
//     },
//     {
//         "id": 7,
//         "first_name": "Sonny",
//         "last_name": "Gaskin",
//         "email": "sgaskin6@shinystat.com",
//         "working_sector": "Agricultural Chemicals",
//         "car_make": "BMW",
//         "car_model": "525",
//         "car_model_year": 2003,
//         "car_vin_number": "1G6DM1E35C0852205",
//         "created_at": "2024-03-27T12:59:46.590Z",
//         "updated_at": "2024-03-27T12:59:46.590Z"
//     },
//     {
//         "id": 8,
//         "first_name": "Panchito",
//         "last_name": "McCallister",
//         "email": "pmccallister7@bloglovin.com",
//         "working_sector": "Oil & Gas Production",
//         "car_make": "Hyundai",
//         "car_model": "Sonata",
//         "car_model_year": 1997,
//         "car_vin_number": "19UUA8F75DA709560",
//         "created_at": "2024-03-27T12:59:46.590Z",
//         "updated_at": "2024-03-27T12:59:46.590Z"
//     },
//     {
//         "id": 9,
//         "first_name": "Michal",
//         "last_name": "Hugnin",
//         "email": "mhugnin8@guardian.co.uk",
//         "working_sector": "Major Banks",
//         "car_make": "Rolls-Royce",
//         "car_model": "Ghost",
//         "car_model_year": 2010,
//         "car_vin_number": "1GYS3CEF9CR965674",
//         "created_at": "2024-03-27T12:59:46.590Z",
//         "updated_at": "2024-03-27T12:59:46.590Z"
//     },
//     {
//         "id": 10,
//         "first_name": "Irvin",
//         "last_name": "Delamaine",
//         "email": "idelamaine9@last.fm",
//         "working_sector": "Forest Products",
//         "car_make": "Chevrolet",
//         "car_model": "G-Series G10",
//         "car_model_year": 1994,
//         "car_vin_number": "1FTMF1CW1AK060622",
//         "created_at": "2024-03-27T12:59:46.590Z",
//         "updated_at": "2024-03-27T12:59:46.590Z"
//     }
// ];

// console.log(_.countBy(contacts, 'working_sector'));
// console.log(_.orderBy(contacts, 'car_model_year')); 


// console.log(_.countBy([1,2,3,4,4,5,5,1,7,9]));
// console.log(_.countBy([1.2,6.3,6.2,1.3], Math.floor));


var users = [
    { 'user': 'barney', 'age': 42, 'active': true },
    { 'user': 'fred',   'age': 40, 'active': false },
    { 'user': 'pebbles', 'age': 1,  'active': true }
  ];
   
console.log(_.filter(users, function(o) { return !o.active; }));
   
console.log(_.filter(users, { 'age': 36, 'active': true }));
   
console.log(_.filter(users, ['active', false]));
   
console.log(_.filter(users, 'active'));

console.log(_.find(users, function(o) { return o.age < 40; }));
 
console.log(_.find(users, { 'age': 1, 'active': true }));
 
console.log(_.find(users, ['active', false]));
 
console.log(_.find(users, 'active'));

console.log(_.findLast([1, 2, 3, 4], function(n) {
    return n % 2 == 0;
  }));

