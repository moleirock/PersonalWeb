class Layer {
    constructor(app, width, height, speedModifier, image) {
        this.app = app;
        this.width = width;
        this.height = height;
        this.speedModifier = speedModifier;
        this.image = image;
        this.x = 0;
        this.y = 0;
    }
    update() {
        if (this.x < -this.width) this.x = 0;
        else {
            this.x += this.app.player.maxSpeed  * this.speedModifier;
            if (this.x > 0) this.x = 0;
            
        }
    }
    draw(context) {
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
        context.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
    }
}

export class Background {
    constructor(app) {
        this.app = app;
        this.width = this.app.width;
        this.height = this.app.height;
        this.layerImage1 = document.getElementById("layer1");
        this.layer1 = new Layer(this.app, this.width, this.height, 0.1, this.layerImage1);
        this.backgroundLayers = [this.layer1];
    }
    update() {
        this.backgroundLayers.forEach((layer) => {
            layer.update();
        });
    }

    draw(context) {
        this.backgroundLayers.forEach((layer) => {
            layer.draw(context);
        });
    }
}
