class Layer {
    constructor(app, width, height, speedDefault = 0, speedModifier, image) {
        this.app = app;
        this.width = width;
        this.height = height;
        this.speedModifier = speedModifier;
        this.speedDefault = speedDefault;
        this.image = image;
        this.x = 0;
        this.y = 0;
        this.boundaryLeft = 0;
        this.boudaryRight;
    }
    update() {
        this.boudaryRight = -this.app.contactLeftX;

        if (this.app.player.speed < this.boundaryLeft && this.app.player.speed > this.boudaryRight) {
            if (this.x < -this.width) this.x = 0;
            else if (this.x > 0) this.x = -this.width;
            else {
                this.x += this.app.player.maxSpeed * this.speedModifier - this.speedDefault;
            }
        } else if (this.speedDefault != 0) {
            this.x += -this.speedDefault;
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
        this.layerImage2 = document.getElementById("layer2");
        this.layerImage3 = document.getElementById("layer3");
        this.layerImage4 = document.getElementById("layer4");
        this.layerImage5 = document.getElementById("layer5");
        this.layer1 = new Layer(this.app, this.width, this.height, 0, 0.09, this.layerImage1);
        this.layer2 = new Layer(this.app, this.width, this.height, 0.05, 0.1, this.layerImage2);
        this.layer3 = new Layer(this.app, this.width, this.height, 0, 0.1, this.layerImage3);
        this.layer4 = new Layer(this.app, this.width, this.height, 0.12, 0.1, this.layerImage4);
        this.layer5 = new Layer(this.app, this.width, this.height, 0.2, 0.1, this.layerImage5);
        this.backgroundLayers = [this.layer1, this.layer2, this.layer3, this.layer4, this.layer5];
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
