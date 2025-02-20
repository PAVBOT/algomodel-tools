class VectorLibrary {
    constructor(name, components) {
        this.name = name;
        this.components = components;
    }

    add(vector) {
        return new VectorLibrary(this.name, this.components.map((val, i) => val + vector.components[i]));
    }

    sub(vector) {
        return new VectorLibrary(this.name, this.components.map((val, i) => val - vector.components[i]));
    }

    mul(scalar) {
        return new VectorLibrary(this.name, this.components.map(val => val * scalar));
    }

    dot(vector) {
        return this.components.reduce((sum, val, i) => sum + val * vector.components[i], 0);
    }

    cross(vector) {
        if (this.components.length !== 3 || vector.components.length !== 3) {
            throw new Error("Cross product is only defined for 3D vectors.");
        }
        const [x1, y1, z1] = this.components;
        const [x2, y2, z2] = vector.components;
        return new VectorLibrary(this.name, [
            y1 * z2 - z1 * y2,
            z1 * x2 - x1 * z2,
            x1 * y2 - y1 * x2
        ]);
    }

    toString() {
        return `Vector ${this.name}: (${this.components.join(", ")})`;
    }
}

class MatrixLibrary {
    constructor(name, rows) {
        this.name = name;
        this.rows = rows;
    }

    rowCount() {
        return this.rows.length;
    }

    colCount() {
        return this.rows[0].length;
    }

    toString() {
        return `Matrix ${this.name}:\n` + this.rows.map(row => `[${row.join(", ")}]`).join("\n");
    }
}
