//Test example of requests that will be retrieved from supabase
import { supabase } from '../supabase.js';

export const getData = async() => {
    const {data, error} = await supabase.from('Requests').select().order('Date', { ascending: true }).order('Time', { ascending: true });
    console.log(data);
    return data;
}  

export function getRequest(id) {
    return PRODUCTS.find((product) => (product.id == id));
}

// [{
//     id : 1,
//     title: 'Lunch at Deck',
//     location: 'Deck',
//     date: '1/7/22',
//     time: '1pm',
//     username: 'Loid Forger',
//     pax: '3',
//     image: require ('../assets/loid.jpg')
// }, 
// {
//     id : 2,
//     title: 'Dinner at SS',
//     location: 'Deck',
//     date: '2/7/22',
//     time: '7pm',
//     username: 'Yor Forger',
//     pax: '3',
//     image: require ('../assets/yor.jpg')
// },
// {
//     id : 3,
//     title: 'Peanuts Festival',
//     location: 'Deck',
//     date: '3/7/22',
//     time: '8pm',
//     username: 'Anya Forger',
//     pax: '3',
//     image: require ('../assets/Anya.png')
// },
// {
//     id : 4,
//     title: 'Alcohol Party',
//     date: '4/7/22',
//     time: '5pm',
//     username: 'Yuri Briar',
//     pax: '3',
//     image: require ('../assets/Yuri.jpg')
// },
// {
//     id : 5,
//     title: 'Elegant Breakfast',
//     date: '5/7/22',
//     time: '8am',
//     username: 'Henry Henderson',
//     pax: '3',
//     image: require ('../assets/Henry.png')
// }
// ];