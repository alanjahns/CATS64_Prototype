const palette = [
  { id: 0, name: "Transparent", hex: null },
  { id: 1, name: "Deep Ink", hex: "#25180f" },
  { id: 2, name: "Cream", hex: "#f7e6b5" },
  { id: 3, name: "Orange Fur", hex: "#d87a38" },
  { id: 4, name: "Slate", hex: "#51607a" },
  { id: 5, name: "Leaf", hex: "#5c8d43" },
  { id: 6, name: "Rose", hex: "#b75f6c" },
  { id: 7, name: "Sky", hex: "#68a4cf" }
];

const spriteNameInput = document.getElementById("spriteName");
const sizeInputs = [...document.querySelectorAll('input[name="spriteSize"]')];
const toolInputs = [...document.querySelectorAll('input[name="drawTool"]')];
const paletteContainer = document.getElementById("palette");
const zoomRange = document.getElementById("zoomRange");
const spriteMeta = document.getElementById("spriteMeta");
const paintMeta = document.getElementById("paintMeta");
const clearButton = document.getElementById("clearButton");
const mirrorButton = document.getElementById("mirrorButton");
const copyButton = document.getElementById("copyButton");
const downloadButton = document.getElementById("downloadButton");
const loadButton = document.getElementById("loadButton");
const exportBuffer = document.getElementById("exportBuffer");
const statusLine = document.getElementById("statusLine");
const spriteCanvas = document.getElementById("spriteCanvas");
const previewCanvas = document.getElementById("previewCanvas");
const spriteCtx = spriteCanvas.getContext("2d");
const previewCtx = previewCanvas.getContext("2d");

const state = {
  size: 24,
  selectedColor: 1,
  selectedTool: "draw",
  pixels: [],
  pointerDown: false
};

function makePixels(size, fillValue = 0) {
  return Array.from({ length: size * size }, () => fillValue);
}

function indexFor(x, y) {
  return y * state.size + x;
}

function currentExportName() {
  const raw = spriteNameInput.value.trim();
  return raw || "unnamed-sprite";
}

function updateStatus(message) {
  statusLine.textContent = message;
}

function updateCanvasSize() {
  const zoom = Number(zoomRange.value);
  spriteCanvas.width = state.size;
  spriteCanvas.height = state.size;
  spriteCanvas.style.width = `${state.size * zoom}px`;
  spriteCanvas.style.height = `${state.size * zoom}px`;
  previewCanvas.width = state.size;
  previewCanvas.height = state.size;
}

function countPaintedPixels() {
  return state.pixels.reduce((total, pixel) => total + (pixel === 0 ? 0 : 1), 0);
}

function renderPalette() {
  paletteContainer.innerHTML = "";

  palette.forEach((color) => {
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = `color-chip${color.id === state.selectedColor ? " active" : ""}${color.hex ? "" : " transparent"}`;
    chip.setAttribute("aria-label", color.name);

    const swatch = document.createElement("span");
    swatch.className = `swatch${color.hex ? "" : " transparent"}`;
    if (color.hex) {
      swatch.style.background = color.hex;
    }

    const label = document.createElement("span");
    label.className = "chip-label";
    label.textContent = color.name;

    chip.append(swatch, label);
    chip.addEventListener("click", () => {
      state.selectedColor = color.id;
      renderPalette();
      updateStatus(`Selected ${color.name}.`);
    });

    paletteContainer.append(chip);
  });
}

function renderCanvas() {
  spriteCtx.clearRect(0, 0, state.size, state.size);
  previewCtx.clearRect(0, 0, state.size, state.size);

  for (let y = 0; y < state.size; y += 1) {
    for (let x = 0; x < state.size; x += 1) {
      const paletteIndex = state.pixels[indexFor(x, y)];
      const color = palette[paletteIndex];
      if (color && color.hex) {
        spriteCtx.fillStyle = color.hex;
        spriteCtx.fillRect(x, y, 1, 1);
        previewCtx.fillStyle = color.hex;
        previewCtx.fillRect(x, y, 1, 1);
      }
    }
  }

  spriteCtx.strokeStyle = "rgba(65, 49, 30, 0.22)";
  spriteCtx.lineWidth = 0.04;
  for (let line = 0; line <= state.size; line += 1) {
    spriteCtx.beginPath();
    spriteCtx.moveTo(line, 0);
    spriteCtx.lineTo(line, state.size);
    spriteCtx.stroke();
    spriteCtx.beginPath();
    spriteCtx.moveTo(0, line);
    spriteCtx.lineTo(state.size, line);
    spriteCtx.stroke();
  }

  spriteMeta.textContent = `${state.size}x${state.size} sprite`;
  paintMeta.textContent = `${countPaintedPixels()} painted pixels`;
  exportBuffer.value = JSON.stringify(buildSpriteDocument(), null, 2);
}

function buildSpriteDocument() {
  return {
    type: "cats64-sprite",
    version: 1,
    name: currentExportName(),
    width: state.size,
    height: state.size,
    palette: palette.map((entry) => ({
      id: entry.id,
      name: entry.name,
      hex: entry.hex
    })),
    pixels: [...state.pixels]
  };
}

function setSize(nextSize) {
  const size = Number(nextSize);
  state.size = size;
  state.pixels = makePixels(size);
  updateCanvasSize();
  renderCanvas();
  updateStatus(`Started a fresh ${size}x${size} sprite.`);
}

function getPointFromEvent(event) {
  const rect = spriteCanvas.getBoundingClientRect();
  const x = Math.floor(((event.clientX - rect.left) / rect.width) * state.size);
  const y = Math.floor(((event.clientY - rect.top) / rect.height) * state.size);
  return {
    x: Math.max(0, Math.min(state.size - 1, x)),
    y: Math.max(0, Math.min(state.size - 1, y))
  };
}

function fillFrom(x, y, targetColor, nextColor) {
  if (targetColor === nextColor) {
    return;
  }

  const queue = [{ x, y }];
  while (queue.length > 0) {
    const point = queue.pop();
    const index = indexFor(point.x, point.y);
    if (state.pixels[index] !== targetColor) {
      continue;
    }

    state.pixels[index] = nextColor;

    if (point.x > 0) {
      queue.push({ x: point.x - 1, y: point.y });
    }
    if (point.x < state.size - 1) {
      queue.push({ x: point.x + 1, y: point.y });
    }
    if (point.y > 0) {
      queue.push({ x: point.x, y: point.y - 1 });
    }
    if (point.y < state.size - 1) {
      queue.push({ x: point.x, y: point.y + 1 });
    }
  }
}

function paintAt(x, y) {
  const index = indexFor(x, y);

  if (state.selectedTool === "fill") {
    fillFrom(x, y, state.pixels[index], state.selectedColor);
  } else if (state.selectedTool === "erase") {
    state.pixels[index] = 0;
  } else {
    state.pixels[index] = state.selectedColor;
  }

  renderCanvas();
}

function mirrorSprite() {
  const mirrored = makePixels(state.size);
  for (let y = 0; y < state.size; y += 1) {
    for (let x = 0; x < state.size; x += 1) {
      const from = indexFor(x, y);
      const to = indexFor(state.size - 1 - x, y);
      mirrored[to] = state.pixels[from];
    }
  }

  state.pixels = mirrored;
  renderCanvas();
  updateStatus("Mirrored sprite horizontally.");
}

async function copyJson() {
  const json = exportBuffer.value;
  try {
    await navigator.clipboard.writeText(json);
    updateStatus("Sprite JSON copied to clipboard.");
  } catch (error) {
    updateStatus("Clipboard copy failed. You can still copy from the export buffer manually.");
  }
}

function downloadJson() {
  const safeName = currentExportName()
    .toLowerCase()
    .replace(/[^a-z0-9_-]+/g, "-")
    .replace(/^-+|-+$/g, "") || "sprite";
  const blob = new Blob([exportBuffer.value], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `${safeName}.json`;
  link.click();
  URL.revokeObjectURL(link.href);
  updateStatus(`Downloaded ${safeName}.json.`);
}

function loadJson() {
  try {
    const parsed = JSON.parse(exportBuffer.value);
    if (parsed.type !== "cats64-sprite" || typeof parsed.width !== "number" || typeof parsed.height !== "number") {
      throw new Error("Unrecognized sprite format.");
    }
    if (parsed.width !== parsed.height || ![16, 24, 32].includes(parsed.width)) {
      throw new Error("Only 16x16, 24x24, and 32x32 sprites are supported right now.");
    }
    if (!Array.isArray(parsed.pixels) || parsed.pixels.length !== parsed.width * parsed.height) {
      throw new Error("Pixel data length does not match sprite size.");
    }

    state.size = parsed.width;
    state.pixels = parsed.pixels.map((value) => (Number.isInteger(value) && value >= 0 && value < palette.length ? value : 0));
    spriteNameInput.value = typeof parsed.name === "string" && parsed.name.trim() ? parsed.name.trim() : "loaded-sprite";
    sizeInputs.forEach((input) => {
      input.checked = Number(input.value) === state.size;
    });
    updateCanvasSize();
    renderCanvas();
    updateStatus(`Loaded ${state.size}x${state.size} sprite from JSON.`);
  } catch (error) {
    updateStatus(error.message || "Could not load sprite JSON.");
  }
}

spriteCanvas.addEventListener("pointerdown", (event) => {
  state.pointerDown = true;
  spriteCanvas.setPointerCapture(event.pointerId);
  const point = getPointFromEvent(event);
  paintAt(point.x, point.y);
});

spriteCanvas.addEventListener("pointermove", (event) => {
  if (!state.pointerDown || state.selectedTool === "fill") {
    return;
  }
  const point = getPointFromEvent(event);
  paintAt(point.x, point.y);
});

spriteCanvas.addEventListener("pointerup", () => {
  state.pointerDown = false;
});

spriteCanvas.addEventListener("pointerleave", () => {
  state.pointerDown = false;
});

sizeInputs.forEach((input) => {
  input.addEventListener("change", () => {
    if (input.checked) {
      setSize(input.value);
    }
  });
});

toolInputs.forEach((input) => {
  input.addEventListener("change", () => {
    if (input.checked) {
      state.selectedTool = input.value;
      updateStatus(`Tool set to ${input.value}.`);
    }
  });
});

zoomRange.addEventListener("input", () => {
  updateCanvasSize();
  renderCanvas();
});

spriteNameInput.addEventListener("input", () => {
  renderCanvas();
});

clearButton.addEventListener("click", () => {
  state.pixels = makePixels(state.size);
  renderCanvas();
  updateStatus("Cleared the sprite.");
});

mirrorButton.addEventListener("click", mirrorSprite);
copyButton.addEventListener("click", copyJson);
downloadButton.addEventListener("click", downloadJson);
loadButton.addEventListener("click", loadJson);

setSize(24);
renderPalette();
