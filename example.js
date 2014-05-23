(function() {

    var pics = [
        'https://en.gravatar.com/userimage/5053945/d4ec23b8e0a86088429ed9d084650fe1.png',
        'https://en.gravatar.com/userimage/5053945/a6136e6baad9b71ad694a5916ab207e2.jpg',
        'https://en.gravatar.com/userimage/5053945/c74c95e6e1536f39448f4da539bd6d7b.png',
        'https://en.gravatar.com/userimage/5053945/8d258ade4531f00dcece3d3b6417451f.png',
        'https://en.gravatar.com/userimage/5053945/f0d9b8b0182f1e37de2fe096460cca08.png',
    ]

    function gen_item(index) {
        var item = document.createElement('img');
        item.src = pics[index];
        return item;
    }

    var group1 = new concentric.Init(document.getElementById('container1'), 4);
    var group2 = new concentric.Init(document.getElementById('container2'), 6);

    group1.setCore(gen_item(0));
    for (var layer = 1; layer <= 4; layer++) {
        for (var item = 0; item <  7 * layer; item++) {
            group1.addItem(layer, gen_item(Math.floor(Math.random() * pics.length)));
        }
    }

    group2.setCore(gen_item(0));
    for (var layer = 1; layer <= 6; layer++) {
        for (var item = 0; item <  7 * layer; item++) {
            group2.addItem(layer, gen_item(Math.floor(Math.random() * pics.length)));
        }
    }

})();
