import { vi } from "vitest";

class Graphics {
    beginFill() {}
    drawRect() {}
    drawRoundRect() {}
}

class ShapeMock {
    graphics: Graphics;
    x = 0;
    y = 0;

    constructor() {
        this.graphics = new Graphics();
    }
}

class ContainerMock {
    graphics: Graphics;

    constructor() {
        this.graphics = new Graphics();
    }

    addChild() {}
}

const CreatejsMock = {
    Shape: ShapeMock,
    Container: ContainerMock,
};

vi.stubGlobal("createjs", CreatejsMock);
