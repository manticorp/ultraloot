// Small original icons drawn directly on a 16-pixel grid. No font or CDN assets.
export function drawIcon (ctx, icon, x = 0, y = 0, size = 32) {
  ctx.save(); ctx.translate(Math.round(x), Math.round(y)); ctx.scale(size / 16, size / 16);
  const rect = (x, y, w, h, color) => { ctx.fillStyle = color; ctx.fillRect(x, y, w, h); };
  const leaf = (x, y) => { rect(x, y, 5, 2, '#718c44'); rect(x + 1, y - 1, 3, 2, '#99ae5a'); };
  switch (icon) {
    case 'berry':
      leaf(5, 2); rect(7, 3, 2, 3, '#5e6e34'); rect(3, 6, 9, 7, '#703e4c'); rect(2, 8, 11, 3, '#703e4c'); rect(4, 6, 3, 3, '#c96972'); rect(8, 9, 3, 3, '#a44d68'); rect(4, 7, 1, 1, '#f3b09a'); break;
    case 'mushroom':
      rect(6, 9, 4, 5, '#e3d6a1'); rect(5, 13, 6, 1, '#bcab7e'); rect(3, 5, 10, 5, '#ae6543'); rect(2, 7, 12, 3, '#ae6543'); rect(5, 3, 6, 3, '#d29253'); rect(4, 6, 2, 2, '#f1d7a3'); rect(9, 5, 2, 2, '#f1d7a3'); rect(11, 8, 2, 1, '#f1d7a3'); break;
    case 'twig':
      rect(3, 11, 3, 3, '#725537'); rect(5, 8, 3, 4, '#8c6940'); rect(7, 5, 3, 4, '#947447'); rect(9, 2, 2, 4, '#947447'); rect(9, 7, 4, 2, '#725537'); rect(12, 5, 2, 3, '#947447'); leaf(3, 5); break;
    case 'acorn':
      rect(5, 7, 7, 5, '#bf9253'); rect(6, 11, 5, 2, '#a97a44'); rect(8, 13, 1, 1, '#8c6139'); rect(4, 5, 9, 3, '#6d5838'); rect(6, 4, 5, 1, '#826a3d'); rect(8, 2, 2, 3, '#6d5838'); rect(6, 8, 2, 3, '#e1bd7c'); break;
    case 'button':
      rect(4, 3, 8, 10, '#ae8037'); rect(3, 5, 10, 6, '#ae8037'); rect(5, 4, 6, 8, '#d9b365'); rect(4, 6, 8, 4, '#d9b365'); rect(6, 6, 1, 1, '#785e34'); rect(9, 6, 1, 1, '#785e34'); rect(6, 9, 1, 1, '#785e34'); rect(9, 9, 1, 1, '#785e34'); break;
    case 'ribbon':
      rect(2, 4, 4, 6, '#b46766'); rect(3, 3, 2, 8, '#cc8880'); rect(10, 4, 4, 6, '#b46766'); rect(11, 3, 2, 8, '#cc8880'); rect(6, 6, 4, 3, '#a45c60'); rect(4, 10, 3, 4, '#c9877e'); rect(9, 10, 3, 4, '#c9877e'); break;
    case 'pebble':
      rect(4, 6, 8, 7, '#7b8d85'); rect(2, 9, 12, 3, '#7b8d85'); rect(6, 4, 5, 3, '#a7b2a3'); rect(4, 7, 7, 3, '#a7b2a3'); rect(5, 7, 3, 1, '#d0d3ba'); break;
    case 'feather':
      rect(7, 5, 4, 6, '#7594a6'); rect(9, 2, 4, 5, '#9db9bd'); rect(6, 8, 4, 4, '#618398'); rect(4, 11, 4, 2, '#7594a6'); rect(3, 13, 2, 2, '#d4cdb0'); rect(5, 11, 2, 2, '#d4cdb0'); rect(7, 8, 1, 3, '#d4cdb0'); break;
    case 'bottle':
      rect(6, 2, 4, 2, '#997a4b'); rect(6, 4, 4, 3, '#9cbeb0'); rect(4, 7, 8, 7, '#79a99c'); rect(5, 8, 6, 5, '#b0d0b5'); rect(5, 11, 6, 2, '#78ada0'); rect(5, 8, 1, 3, '#e4e9cd'); break;
    case 'teacup':
      rect(3, 6, 8, 6, '#c7cdb0'); rect(4, 7, 6, 4, '#f2e7c9'); rect(11, 7, 3, 4, '#c7cdb0'); rect(12, 8, 1, 2, '#f2e7c9'); rect(2, 13, 11, 1, '#a2ad91'); rect(4, 6, 6, 1, '#947650'); rect(6, 2, 1, 2, '#b7c2a2'); rect(7, 1, 1, 1, '#b7c2a2'); break;
    case 'moonstone':
      rect(5, 3, 6, 10, '#827d9d'); rect(3, 6, 10, 4, '#827d9d'); rect(6, 4, 4, 8, '#beb6d2'); rect(4, 7, 8, 2, '#a69fc6'); rect(6, 4, 2, 4, '#e6d9df'); rect(12, 2, 1, 3, '#d8b573'); rect(11, 3, 3, 1, '#d8b573'); break;
    case 'firefly':
      rect(5, 4, 6, 9, '#8b8647'); rect(4, 6, 8, 6, '#a9af69'); rect(6, 5, 4, 7, '#e4d388'); rect(7, 7, 2, 3, '#fff2af'); rect(6, 2, 4, 2, '#8a784d'); rect(7, 1, 2, 1, '#8a784d'); break;
    case 'crown':
      rect(3, 7, 10, 6, '#bd8c3d'); rect(2, 4, 2, 6, '#deb65d'); rect(7, 3, 2, 7, '#deb65d'); rect(12, 4, 2, 6, '#deb65d'); rect(4, 8, 8, 3, '#e4c87b'); rect(7, 10, 2, 2, '#ac5a59'); rect(4, 13, 8, 1, '#8f6d37'); break;
    case 'pack':
      rect(5, 2, 6, 2, '#86643c'); rect(3, 5, 10, 9, '#a67c48'); rect(4, 4, 8, 5, '#c49c5c'); rect(5, 9, 6, 4, '#b98c4e'); rect(7, 7, 2, 3, '#6f5b37'); rect(2, 7, 1, 6, '#6f5b37'); rect(13, 7, 1, 6, '#6f5b37'); break;
    case 'net':
      rect(8, 2, 6, 2, '#8b9a79'); rect(7, 4, 1, 5, '#8b9a79'); rect(14, 4, 1, 5, '#8b9a79'); rect(8, 9, 6, 1, '#8b9a79'); rect(9, 4, 1, 5, '#bdc7a5'); rect(12, 4, 1, 5, '#bdc7a5'); rect(8, 6, 6, 1, '#bdc7a5'); rect(5, 9, 2, 3, '#a5804f'); rect(3, 12, 2, 3, '#a5804f'); break;
    case 'shovel':
      rect(4, 2, 4, 2, '#a28051'); rect(4, 4, 1, 3, '#a28051'); rect(7, 4, 1, 3, '#a28051'); rect(5, 6, 2, 4, '#9c7949'); rect(4, 9, 5, 4, '#91a092'); rect(5, 13, 3, 2, '#b0b9a4'); break;
    case 'badger': case 'owl': case 'rabbit': case 'frog': {
      const color = { badger: '#7d8579', owl: '#a18559', rabbit: '#c7b69b', frog: '#8caa68' }[icon];
      rect(3, 5, 10, 8, color); rect(5, 4, 6, 10, color);
      if (icon === 'rabbit') { rect(4, 0, 3, 6, color); rect(9, 0, 3, 6, color); rect(5, 1, 1, 4, '#c29288'); rect(10, 1, 1, 4, '#c29288'); }
      if (icon === 'badger') { rect(3, 6, 3, 6, '#e4dfc6'); rect(10, 6, 3, 6, '#e4dfc6'); rect(7, 5, 2, 6, '#e4dfc6'); }
      if (icon === 'owl') { rect(4, 6, 3, 5, '#e8d6a8'); rect(9, 6, 3, 5, '#e8d6a8'); rect(7, 10, 2, 2, '#c29955'); }
      rect(5, 8, 1, 2, '#34483b'); rect(10, 8, 1, 2, '#34483b'); rect(7, 11, 2, 1, '#526146'); break;
    }
    default: rect(5, 5, 6, 6, '#b7c09c');
  }
  ctx.restore();
}
export function iconNode (icon, size = 32) {
  const canvas = document.createElement('canvas'); canvas.width = canvas.height = size;
  canvas.className = 'pixel-icon'; canvas.setAttribute('aria-hidden', 'true');
  drawIcon(canvas.getContext('2d'), icon, 0, 0, size); return canvas;
}
