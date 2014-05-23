window.concentric = (function() {

    var proto;

    function Item(layer, item) {
        this.layer = layer;
        this.item = item;
        this.container = document.createElement('div');
        this.container.classList.add('concentric-item');
        this.container.appendChild(this.item);
        this.layer.container.appendChild(this.container);
    }
    proto = Item.prototype;

    proto.redraw = function(index) {
        this.container.style.width = this.container.style.height = this.layer.itemSize + 'px';
        this.container.style.marginTop = this.container.style.marginLeft = Math.round(-this.layer.itemSize / 2 - 2) + 'px';
        this.container.style.top = Math.round(this.layer.container.clientHeight / 2 + Math.sin(this.layer.itemRadians * index) * this.layer.itemDistance) + 'px';
        this.container.style.left = Math.round(this.layer.container.clientWidth / 2 + Math.cos(this.layer.itemRadians * index) * this.layer.itemDistance) + 'px';
    }

    function Layer(onion, layer) {
        this.onion = onion;
        this.layer = layer;
        this.container = document.createElement('div');
        this.container.classList.add('concentric-layer');
        this.container.classList.add('concentric-layer-' + (this.layer + 1));
        this.container.style.zIndex = (this.onion.length - this.layer) * 100;
        this.onion.container.appendChild(this.container);
        this.items = [];
    }
    proto = Layer.prototype;

    proto.redrawItems = function() {
        this.itemRadians = Math.PI * 2 / this.length;
        this.itemSize = Math.round(this.onion.layerThickness * 0.5);
        this.itemDistance = Math.round(this.radius - this.onion.layerThickness / 2);
        for (var i = 0; i < this.items.length; i++) {
            this.items[i].redraw(i);
        }
    };

    proto.redraw = function() {
        this.radius = Math.round(this.onion.layerThickness * (this.layer + 1.5));
        var size = Math.round(this.radius * 2 - 2);
        this.container.style.width = this.container.style.height = size + 'px';
        this.container.style.marginLeft = this.container.style.marginTop = (-this.radius) + 'px';
        this.redrawItems();
    };

    proto.addItem = function(item) {
        this.items.push(new Item(this, item));
        this.length = this.items.length;
        this.redrawItems();
    };

    function Onion(root, layers) {
        this.root = root;
        this.length = layers;
        this.container = document.createElement('div');
        this.container.classList.add('concentric-onion');
        this.core = document.createElement('div');
        this.core.classList.add('concentric-core');
        this.core.style.zIndex = (this.length + 1) * 100;
        this.container.appendChild(this.core);
        this.root.appendChild(this.container);
        this.layers = [];
        for (var i = 0; i < this.length; i++) {
            this.layers.push(new Layer(this, i));
        }
        this.redraw();
    }
    proto = Onion.prototype;

    proto.redraw = function() {
        this.layerThickness = Math.floor(Math.min(this.container.clientWidth, this.container.clientHeight) / (this.length + .5) / 2);
        this.core.style.width = this.core.style.height = (this.layerThickness) + 'px';
        this.core.style.marginLeft = this.core.style.marginTop = Math.round(-(this.layerThickness / 2) - 3) + 'px';
        for (var i = 0; i < this.layers.length; i++) {
            this.layers[i].redraw();
        }
    };

    proto.setCore = function(core) {
        this.core.innerHTML = '';
        this.core.appendChild(core);
    };

    proto.addItem = function(layer, item) {
        if (item >= this.length) {
            throw new Error('Layer out of bounds: ' + layer);
        }
        this.layers[layer - 1].addItem(item);
    };

    return {
        Init: Onion
    };

})();
