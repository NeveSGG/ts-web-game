"use strict";
class Canvas {
    constructor(canvasId, heroSpriteSrc, heroSpriteStates, heroSpriteStateHeight, heroSpriteStateWidth) {
        this.heroSpriteImageElement = new Image();
        this.heroSpriteStates = 0;
        this.currentHeroSpriteState = 0;
        this.heroSpriteStateHeight = 0;
        this.heroSpriteStateWidth = 0;
        const canvasEl = document.getElementById(canvasId);
        if (!canvasEl) {
            throw new Error('Элемент с id "canvas" не найден');
        }
        this.canvasElement = canvasEl;
        this.setCanvasSize();
        this.setHeroSpriteImageElement(heroSpriteSrc, heroSpriteStates);
        this.heroSpriteStateHeight = heroSpriteStateHeight;
        this.heroSpriteStateWidth = heroSpriteStateWidth;
    }
    get canvasElement2dContext() {
        return this.canvasElement.getContext("2d");
    }
    setHeroSpriteImageElement(src, spriteStatesNumber) {
        this.heroSpriteImageElement = new Image();
        this.heroSpriteImageElement.src = src;
        this.heroSpriteStates = spriteStatesNumber;
    }
    setCanvasSize(width, height) {
        this.canvasElement.width = width !== null && width !== void 0 ? width : window.innerWidth;
        this.canvasElement.height = height !== null && height !== void 0 ? height : window.innerHeight;
    }
    clearCanvas() {
        if (this.canvasElement2dContext) {
            this.canvasElement2dContext.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
        }
    }
    drawHero() {
        if (this.canvasElement2dContext) {
            let defaultSx = this.heroSpriteStateWidth * this.currentHeroSpriteState;
            let defaultSy = 0;
            let defaultSWidth = this.heroSpriteStateWidth;
            let defaultSHeight = this.heroSpriteStateHeight;
            let defaultDx = 10 * this.currentHeroSpriteState + 1.4 ** this.currentHeroSpriteState;
            let defaultDy = 0;
            let defaultDWidth = this.heroSpriteStateWidth;
            let defaultDHeight = this.heroSpriteStateHeight;
            this.canvasElement2dContext.drawImage(this.heroSpriteImageElement, defaultSx, defaultSy, defaultSWidth, defaultSHeight, defaultDx, defaultDy, defaultDWidth, defaultDHeight);
        }
    }
    anim() {
        setInterval(() => {
            this.currentHeroSpriteState =
                (this.currentHeroSpriteState + 1) % this.heroSpriteStates;
        }, 80);
    }
    render() {
        this.clearCanvas();
        this.drawHero();
    }
    run() {
        window.requestAnimationFrame(() => {
            this.setCanvasSize();
            this.render();
            this.run();
        });
    }
    start() {
        this.run();
        this.anim();
    }
}
const canvas = new Canvas("canvas", "./img/sonic_sprite.png", 19, 100, 100);
window.addEventListener("DOMContentLoaded", () => {
    canvas.start();
});
