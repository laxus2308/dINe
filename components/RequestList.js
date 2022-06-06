//Test example of requests that will be retrieved from supabase
const REQUESTS = [{
    id : 1,
    title: 'Lunch at Deck',
    date: '1/7/22',
    time: '1pm',
    username: 'Loid Forger',
    image: require ('../assets/loid.jpg')
}, 
{
    id : 2,
    title: 'Dinner at SS',
    date: '2/7/22',
    time: '7pm',
    username: 'Yor Forger',
    image: require ('../assets/yor.jpg')
},
{
    id : 3,
    title: 'Peanuts Festival',
    date: '3/7/22',
    time: '8pm',
    username: 'Anya Forger',
    image: require ('../assets/Anya.png')
},
{
    id : 4,
    title: 'Alcohol Party',
    date: '4/7/22',
    time: '5pm',
    username: 'Yuri Briar',
    image: require ('../assets/Yuri.jpg')
},
{
    id : 5,
    title: 'Elegant Breakfast',
    date: '5/7/22',
    time: '8am',
    username: 'Henry Henderson',
    image: require ('../assets/Henry.png')
}
];



export function getRequests() {
    return REQUESTS;
}

export function getRequest(id) {
    return PRODUCTS.find((product) => (product.id == id));
}