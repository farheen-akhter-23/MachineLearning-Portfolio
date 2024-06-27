export const drawGiraffe = (ctx, canvas, x, y, r)=>{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgb(255, 255, 255)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawGrass(ctx);
    ctx.save();
    ctx.translate(x, y);

    // Body
    ctx.fillStyle = 'rgb(245, 214, 90)';
    ctx.beginPath();
    ctx.ellipse(200, 275, 75, 39, 0, 0, 2 * Math.PI);
    ctx.fill();


    // Tail
    ctx.strokeStyle = 'rgb(245, 214, 90)';
    ctx.lineWidth = 4.5;
    ctx.beginPath();
    ctx.arc(83, 260, 50, 0, 1.6);
    ctx.stroke();
    drawGrass(ctx);
    ctx.fillStyle = 'rgb(0, 0, 0)';
    ctx.lineWidth = 1;
    drawTriangle(ctx, 75, 310, 85, 300, 70, 300);
    drawTriangle(ctx, 75, 305, 85, 300, 70, 295);
    drawTriangle(ctx, 75, 315, 80, 305, 75, 310);

    // Legs
    ctx.fillStyle = 'rgb(245, 214, 90)';
    drawEllipse(ctx, 145, 339, 5, 60);
    drawEllipse(ctx, 160, 338, 5, 60);
    drawEllipse(ctx, 240, 339, 5, 60);
    drawEllipse(ctx, 255, 338, 5, 60);
    drawGrass(ctx);

    // Feet
    ctx.fillStyle = 'rgb(0, 0, 0)';
    ctx.fillRect(140, 393, 10, 5.6);
    ctx.fillRect(155, 393, 10, 5.2);
    ctx.fillRect(235, 393, 10, 5.5);
    ctx.fillRect(250, 393, 10, 5.3);
    drawGrass(ctx);
    // Neck
    ctx.fillStyle = 'rgb(245, 214, 90)';
    ctx.fillRect(249, 130, 25, 150);

    ctx.fillStyle = 'rgb(0, 0, 0)';
    drawTriangle(ctx, 250, 150, 250, 140, 235, 142);
    drawTriangle(ctx, 250, 155, 250, 145, 235, 148);
    drawTriangle(ctx, 250, 160, 250, 150, 237, 154);
    drawTriangle(ctx, 250, 165, 250, 155, 238, 160);
    drawTriangle(ctx, 250, 170, 250, 160, 239, 166);
    drawTriangle(ctx, 250, 175, 250, 162, 240, 172);
    drawTriangle(ctx, 250, 180, 250, 170, 243, 178);

    // Head
    ctx.save();
    ctx.fillStyle = 'rgb(245, 214, 90)';
    ctx.translate(295, 175);
    ctx.rotate(Math.PI / 4.5);
    drawEllipse(ctx, 0, 0, 35, 27.5);
    ctx.restore();

    ctx.fillStyle = 'rgb(0, 0, 0)';
    drawTriangle(ctx, 250, 150, 250, 140, 235, 141);
    drawTriangle(ctx, 250, 145, 250, 135, 230, 136);
    drawTriangle(ctx, 250, 140, 250, 130, 230, 131);
    drawTriangle(ctx, 250, 145, 250, 125, 230, 126);
    drawTriangle(ctx, 250, 150, 250, 120, 230, 121);
    drawTriangle(ctx, 250, 140, 245, 110, 230, 116);

    // Ears
    ctx.save();
    ctx.fillStyle = 'rgb(245, 214, 90)';
    ctx.translate(200, 200);
    ctx.rotate(Math.PI / 4.0);
    drawEllipse(ctx, 50, -293, 12.5, 5);
    drawEllipse(ctx, 64, -328, 5, 10);
    ctx.restore();

    // Eyes
    ctx.fillStyle = 'rgb(0, 0, 0)';
    drawEllipse(ctx, 278, 118, 3.5, 5);
    drawEllipse(ctx, 288, 115, 3.5, 5);

    // Mouth
    ctx.strokeStyle = 'rgb(0, 0, 0)';
    ctx.beginPath();
    ctx.arc(275, 145, 15, 1, Math.PI);
    ctx.stroke();

    // Nose
    ctx.fillStyle = 'rgb(0, 0, 0)';
    drawEllipse(ctx, 300, 135, 1, 1);
    drawEllipse(ctx, 295, 138, 1, 1);

    // Patches
    drawEllipse(ctx, 264, 205, 10, 15);
    drawEllipse(ctx, 254, 165, 7.5, 10);
    drawEllipse(ctx, 208, 298, 22.5, 12.5);
    drawEllipse(ctx, 265, 275, 10, 15);
    drawEllipse(ctx, 230, 260, 15, 10);
    drawEllipse(ctx, 142, 275, 15, 20);
    drawEllipse(ctx, 188, 248, 15, 10);

    // Antlers
    ctx.fillStyle = 'rgb(245, 214, 90)';
    ctx.fillRect(260, 85, 5, 20);
    ctx.fillRect(250, 90, 5, 20);
    drawEllipse(ctx, 262, 88, 6, 5);
    drawEllipse(ctx, 252, 95, 6, 5);

    ctx.restore();
  };
  function drawTriangle(ctx, x1, y1, x2, y2, x3, y3) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.closePath();
    ctx.fill();
  }
  
  function drawEllipse(ctx, x, y, w, h) {
    ctx.beginPath();
    ctx.ellipse(x, y, w, h, 0, 0, 2 * Math.PI);
    ctx.fill();
  }
  function drawGrass(ctx) {
    ctx.fillStyle = 'green';
    for (let i = 0; i < 400; i += 10) {
      ctx.beginPath();
      ctx.moveTo(i, 500);
      ctx.lineTo(i + 5, 680);
      ctx.lineTo(i + 10, 400);
      ctx.closePath();
      ctx.fill();
    }
  }