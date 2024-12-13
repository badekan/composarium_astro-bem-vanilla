const PI2 = Math.PI * 2;

export class GlowParticle {
    constructor(x, y, radius, colors, isStatic = false) {
        this.x = x;
        this.y = y;
        this.baseRadius = radius;
        this.colors = colors;
        this.currentColorIndex = 0;
        this.nextColorIndex = Math.floor(Math.random() * colors.length);

        this.colorTransitionSpeed = 0.001; // Vitesse de transition des couleurs
        this.colorTransitionProgress = 0;

        this.angle = Math.random() * PI2; // Angle initial aléatoire
        this.orbitRadius = this.baseRadius / 1.5; // Rayon de l'orbite
        this.sinValue = Math.random();
        this.speed = Math.random() * 0.1 + 0.001; // Vitesse de rotation aléatoire
        this.direction = Math.random() < 0.5 ? 1 : -1; // Direction aléatoire

        this.isStatic = isStatic; // Détermine si la particule est statique
    }

    interpolateColor(color1, color2, factor) {
        const r = Math.round(color1.r + factor * (color2.r - color1.r));
        const g = Math.round(color1.g + factor * (color2.g - color1.g));
        const b = Math.round(color1.b + factor * (color2.b - color1.b));
        return { r, g, b };
    }

    animate(ctx, stageWidth, stageHeight) {
        if (!this.isStatic) {
            this.angle += this.speed * this.direction; // Incrémente l'angle pour faire tourner la particule

            // Calcule la nouvelle position en utilisant des coordonnées polaires
            this.x = stageWidth / 2 + Math.cos(this.angle) * this.orbitRadius;
            this.y = stageHeight / 2 + Math.sin(this.angle) * this.orbitRadius;
        }

        // Osciller la valeur de this.radius entre minRadius et maxRadius
        this.sinValue += 0.01;
        this.radius = this.baseRadius + (Math.sin(this.sinValue) + 1) / 2 * (this.baseRadius / 3);

        // Interpoler entre les couleurs
        this.colorTransitionProgress += this.colorTransitionSpeed;
        if (this.colorTransitionProgress >= 1) {
            this.colorTransitionProgress = 0;
            this.currentColorIndex = this.nextColorIndex;
            this.nextColorIndex = (this.nextColorIndex + 1) % this.colors.length;
        }
        const currentColor = this.colors[this.currentColorIndex];
        const nextColor = this.colors[this.nextColorIndex];
        const interpolatedColor = this.interpolateColor(currentColor, nextColor, this.colorTransitionProgress);

        ctx.beginPath();

        // the gradient
        const g = ctx.createRadialGradient(
            this.x,
            this.y,
            this.radius * 0.001,
            this.x,
            this.y,
            this.radius
        );
        g.addColorStop(0, `rgba(${interpolatedColor.r}, ${interpolatedColor.g}, ${interpolatedColor.b}, 1)`);
        g.addColorStop(1, `rgba(${interpolatedColor.r}, ${interpolatedColor.g}, ${interpolatedColor.b}, 0)`);
        ctx.fillStyle = g;

        ctx.arc(this.x, this.y, this.radius, 0, PI2, false);
        ctx.fill();
    }
}