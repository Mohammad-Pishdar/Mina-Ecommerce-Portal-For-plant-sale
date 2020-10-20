import bcrypt from "bcryptjs";

const data = {
    //now that we created our user model it's time to add some sample users to our data.js file
    users: [{
        name: 'Mo',
        email: 'mohpish@gmail.com',
        //we should not save plain text password in our databse since it is not secure. So we use bcrypt library.The hashSync method of this library accept two parameters. The first one is the password you want to be hashed. The second parameter is what they call salt rounds 
        password: bcrypt.hashSync('1234', 8),
        isAdmin: true,
    }, {
        name: 'Toby',
        email: 'toby@example.com',
        password: bcrypt.hashSync('1234', 8),
        isAdmin: true,
    }],
    items: [{
            _id: '1',
            name: 'Crassula ovata',
            category: 'Cactus & Succulents',
            image: '/images/item-1.jpg',
            price: 24.99,
            rating: 4.5,
            reviews: 10,
            description: 'It grows like a miniature tree, with a trunk and branches.It is also a succulent that will retain water well within the leaves, just like the cactus plant.',
            numberOfItemInInvetory: 3
        },
        {
            _id: '2',
            name: 'Cordyline fruticosa',
            category: 'Indoor Plants',
            image: '/images/item-2.jpg',
            price: 38.88,
            rating: 4.0,
            reviews: 10,
            description: 'Deep red foliage plant, edged with pink. Very popular with landscapers as it tolerates full sun and has an elegant arching shape. Add gorgeous pops of colour to your subtropical garden or poolside.',
            numberOfItemInInvetory: 15
        },
        {
            _id: '3',
            name: 'Vriesia (Bromeliad)',
            category: 'Cactus & Succulents',
            image: '/images/item-3.jpg',
            price: 18.98,
            rating: 4.8,
            reviews: 17,
            description: 'Vrieseas are a truly diverse genera of bromeliad that includes popular and easy to find and care for plants particularly suited to the beginner bromeliad grower. Their high tolerance of various light levels make them an ideal indoor plant.',
            numberOfItemInInvetory: 5
        },
        {
            _id: '4',
            name: 'Aglaonema hybrid',
            category: 'Indoor Plants',
            image: '/images/item-4.jpg',
            price: 21.77,
            rating: 4.5,
            reviews: 14,
            description: 'A very adaptable plant, Aglaonema tolerates low light and dry air better than most other house plants. One thing it doesnt like is cold air. Keep your plant away from drafts and A/C vents and it will do just fine.',
            numberOfItemInInvetory: 7
        },
        {
            _id: '5',
            name: 'Callistemon',
            category: 'Australian Native Plants',
            image: '/images/item-5.jpg',
            price: 22.95,
            rating: 4.5,
            reviews: 10,
            description: 'Ideal for use as an ornamental hedge, container plant or a colourful addition to native garden displays.',
            numberOfItemInInvetory: 1
        },
        {
            _id: '6',
            name: 'Dichondra Repens',
            category: 'Australian Native Plants',
            image: '/images/item-6.jpg',
            price: 5.88,
            rating: 4.5,
            reviews: 15,
            description: 'Commonly known as Kidney Weed, Dichondra repens is a dense plant, with small green leaves that are shaped like a kidney. It is a great lawn substitute or native ground cover, as it has a rapid spread or is a great feature in a hanging basket due to its natural flowing habit.',
            numberOfItemInInvetory: 0
        }
    ]
}

export default data;