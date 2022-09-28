

const posts = []

const images = [
    'https://d2w9rnfcy7mm78.cloudfront.net/18267429/original_9740952c6d5c6c33abe7d2c40fb5b7ad.png?1664398089?bc=0',
    'https://d2w9rnfcy7mm78.cloudfront.net/18267452/original_cf6f799bd8fc85d1f9c5bc6d5bc5502d.png?1664398152?bc=0',
    'https://d2w9rnfcy7mm78.cloudfront.net/18267442/original_2be49bc8f702a8c6f7aef69dea0af283.png?1664398127?bc=0',
    'https://d2w9rnfcy7mm78.cloudfront.net/18267488/original_f24fa377757921ee5c44dda9424a84a3.png?1664398337?bc=0',
    'https://d2w9rnfcy7mm78.cloudfront.net/18267644/original_e4022dee65e6912f4cd075f3c8e072ac.jpg?1664398869?bc=0',
    'https://d2w9rnfcy7mm78.cloudfront.net/18267504/original_dbdaf97a80b83194a503f74e245dfae0.png?1664398372?bc=0',
    'https://d2w9rnfcy7mm78.cloudfront.net/18268415/original_d8f8021da5ac5b85e40207fce3100646.png?1664401571?bc=0',
    'https://d2w9rnfcy7mm78.cloudfront.net/18267458/original_b3e2451d01144d0edbaf277a33d16a49.webp?1664398172?bc=0',
    'https://d2w9rnfcy7mm78.cloudfront.net/18267477/original_2b5fdc8394d9523eb2ea7d7ff130aa8a.png?1664398257?bc=0',
    'https://d2w9rnfcy7mm78.cloudfront.net/18267480/original_594d72d3470d78f09487bac5597394d3.gif?1664398295?bc=0',
    'https://d2w9rnfcy7mm78.cloudfront.net/18267490/original_51528ecefc3df1d242e1b31da07d5203.png?1664398344?bc=0',
    'https://d2w9rnfcy7mm78.cloudfront.net/18267435/original_ae2bff374c79634d671d14b753430a82.png?1664398113?bc=0'

]

let imageIndex = 0;

for (let i = 1; i <= 15; i++) {
    let item = {
        id: i,
        title: `Post ${i}`,
        date: `${i < 10 ? 0 : ''}${i}/10/2021 `,
        image: images[imageIndex]
    }
    posts.push(item);
    imageIndex++;
    if (imageIndex > images.length - 1) imageIndex = 0;
}

console.log(posts)



const container = document.querySelector('.contain');

function generateMasonryGrid(columns, posts) {

    container.innerHTML = '';

    let columnWrappers = {};

    for (let i = 0; i < columns; i++) {
        columnWrappers[`column${i}`] = [];
    }

    for (let i = 0; i < posts.length; i++) {
        const column = i % columns;
        columnWrappers[`column${column}`].push(posts[i]);
    }

    for (let i = 0; i < columns; i++) {
        let columnPosts = columnWrappers[`column${i}`];
        let div = document.createElement('div');
        div.classList.add('column');

        columnPosts.forEach(post => {
            let postDiv = document.createElement('div');
            postDiv.classList.add('post');
            let image = document.createElement('img');
            image.src = post.image;
            let hoverDiv = document.createElement('div');
            hoverDiv.classList.add('overlay');
            let title = document.createElement('h3');
            title.innerText = post.title;
            hoverDiv.appendChild(title);


            postDiv.append(image, hoverDiv)
            div.appendChild(postDiv)
        });
        container.appendChild(div);
    }
}

let previousScreenSize = window.innerWidth;

window.addEventListener('resize', () => {
    imageIndex = 0;
    if (window.innerWidth < 600 && previousScreenSize >= 600) {
        generateMasonryGrid(2, posts);
    } else if (window.innerWidth >= 600 && window.innerWidth < 1000 && (previousScreenSize < 600 || previousScreenSize >= 1000)) {
        generateMasonryGrid(2, posts);

    } else if (window.innerWidth >= 1000 && previousScreenSize < 1000) {
        generateMasonryGrid(4, posts)
    }
    previousScreenSize = window.innerWidth;

})

if (previousScreenSize < 600) {
    generateMasonryGrid(2, posts)
} else if (previousScreenSize >= 600 && previousScreenSize < 1000) {
    generateMasonryGrid(2, posts)
} else {
    generateMasonryGrid(4, posts)
}
