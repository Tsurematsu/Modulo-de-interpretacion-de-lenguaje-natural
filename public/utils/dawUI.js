import draw from "./draw.js";

export default new function drawUI() {
    // Método para dibujar un botón
    this.drawButton = function({ctx, x=0, y=0, width=100, height=200, text="click", color = 'lightgray', textColor = 'black'}) {
        // Dibujar el fondo del botón
        draw.box({x, y, width, height}, color, ctx);
        
        // Dibujar el texto del botón
        const textX = x + width / 2;
        const textY = y + height / 2;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        draw.text(text, {x: textX, y: textY}, textColor, ctx);
        return {x, y, width, height};
    }

    // Método para dibujar una ventana
    this.drawWindow = function({ctx, x=0, y=0, width=400, height=400, title, backgroundColor = 'white', borderColor = 'black'}) {
        // Dibujar el fondo de la ventana
        draw.box({x, y, width, height}, backgroundColor, ctx);
        
        // Dibujar el borde de la ventana
        draw.box({x, y, width, height}, borderColor, ctx);
        
        // Dibujar la barra de título
        const titleBarHeight = 30;
        draw.box({x, y, width, height: titleBarHeight}, borderColor, ctx);
        
        // Dibujar el título
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        draw.text(title, {x: x + 10, y: y + titleBarHeight / 2}, 'white', ctx);
        return {x, y, width, height};
    }

    // Método para dibujar un checkbox
    this.drawCheckbox = function({ctx, x=0, y=0, size, isChecked, color = 'black'}) {
        draw.box({x, y, width: size, height: size}, color, ctx);
        if (isChecked) {
            const padding = size * 0.2;
            draw.line({x: x + padding, y: y + padding}, {x: x + size - padding, y: y + size - padding}, color, ctx);
            draw.line({x: x + size - padding, y: y + padding}, {x: x + padding, y: y + size - padding}, color, ctx);
        }
        return {x, y, width: size, height: size};
    }

    // Método para dibujar un campo de texto
    this.drawTextField = function({ctx, x=0, y=0, width=100, height=10, text, backgroundColor = 'white', borderColor = 'black', textColor = 'black'}) {
        // Dibujar el fondo y el borde
        draw.box({x, y, width, height}, backgroundColor, ctx);
        draw.box({x, y, width, height}, borderColor, ctx);
        
        // Dibujar el texto
        const padding = 5;
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        draw.text(text, {x: x + padding, y: y + height / 2}, textColor, ctx);
        return {x, y, width, height};
    }

    // Método para dibujar un botón redondeado
    this.drawRoundedButton = function({
        ctx, 
        x = 0, 
        y = 0, 
        width = 100, 
        height = 40, 
        radius = 10,
        text = "Click", 
        color = 'lightblue', 
        textColor = 'black',
        borderColor = 'darkblue'
    }) {
        // Guardar el estado actual del contexto
        ctx.save();

        // Comenzar un nuevo path
        ctx.beginPath();

        // Dibujar el botón redondeado
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + width - radius, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        ctx.lineTo(x + width, y + height - radius);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        ctx.lineTo(x + radius, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
        ctx.closePath();

        // Rellenar el botón
        ctx.fillStyle = color;
        ctx.fill();

        // Dibujar el borde
        ctx.strokeStyle = borderColor;
        ctx.stroke();

        // Dibujar el texto del botón
        ctx.fillStyle = textColor;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = '14px Arial'; // Puedes ajustar el tamaño y la fuente según necesites
        ctx.fillText(text, x + width / 2, y + height / 2);

        // Restaurar el estado del contexto
        ctx.restore();
        return {x, y, width, height};
    }

}