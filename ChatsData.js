export default { 
    id: 'chatroom1',
    user: [{
        username: 'anya',
        userId: 'u1'
    }, {
        userId: 'u2',
        username: 'Cedric'
    }],
    messages: [{
        id: 'm1',
        content: "Waku Waku",
        created_at: '2022-06-11T07:48:00.000Z',
        user: {
            username: 'Anya',
            id: 'u2',
        }
    },{
        id: 'm2',
        content: "STFU need a long text here to test try and i dk what else to come up with so i shall scold anya. Fuck u anya.",
        created_at: "2022-06-11T07:49:00.000Z",
        user: {
            username: 'Cedric',
            id: 'u1',
        }
    }, {
        id: 'm3',
        content: "HMPF!",
        created_at: "2022-06-11T07:50:00.000Z",
        user: {
            username: 'Anya',
            id: 'u2',
        }
    }
    ]   
}

