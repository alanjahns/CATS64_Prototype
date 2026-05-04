const palette = [
  { id: 0, name: "Transparent", hex: null },
  { id: 1, name: "Black", hex: "#000000" },
  { id: 2, name: "White", hex: "#ffffff" },
  { id: 3, name: "Red", hex: "#813338" },
  { id: 4, name: "Cyan", hex: "#75cec8" },
  { id: 5, name: "Purple", hex: "#8e3c97" },
  { id: 6, name: "Green", hex: "#56ac4d" },
  { id: 7, name: "Blue", hex: "#2e2c9b" },
  { id: 8, name: "Yellow", hex: "#edf171" },
  { id: 9, name: "Orange", hex: "#8e5029" },
  { id: 10, name: "Brown", hex: "#553800" },
  { id: 11, name: "Light Red", hex: "#c46c71" },
  { id: 12, name: "Dark Gray", hex: "#4a4a4a" },
  { id: 13, name: "Gray", hex: "#7b7b7b" },
  { id: 14, name: "Light Green", hex: "#a9ff9f" },
  { id: 15, name: "Light Blue", hex: "#706deb" },
  { id: 16, name: "Light Gray", hex: "#b2b2b2" },
  { id: 17, name: "Cream", hex: "#f7e6b5" },
  { id: 18, name: "Warm Sand", hex: "#d7b98c" },
  { id: 19, name: "Tan Fur", hex: "#b88a5a" },
  { id: 20, name: "Dark Fur", hex: "#5a4332" },
  { id: 21, name: "Orange Fur", hex: "#d87a38" },
  { id: 22, name: "Gold", hex: "#f0c95e" },
  { id: 23, name: "Pink Nose", hex: "#e39aa5" },
  { id: 24, name: "Rose", hex: "#b75f6c" },
  { id: 25, name: "Slate", hex: "#51607a" },
  { id: 26, name: "Denim", hex: "#3d5a98" },
  { id: 27, name: "Leaf", hex: "#5c8d43" },
  { id: 28, name: "Grass", hex: "#84a94f" },
  { id: 29, name: "Mint", hex: "#9fd6b2" },
  { id: 30, name: "Sky", hex: "#68a4cf" },
  { id: 31, name: "Lavender", hex: "#a58cc7" },
  { id: 32, name: "Sunset", hex: "#e38a6a" }
];

const stampDefinitions = [
  { id: "full", label: "Full", mask: (x, y, size) => true },
  { id: "top", label: "Top Half", mask: (x, y, size) => y < Math.ceil(size / 2) },
  { id: "bottom", label: "Bottom Half", mask: (x, y, size) => y >= Math.floor(size / 2) },
  { id: "left", label: "Left Half", mask: (x, y, size) => x < Math.ceil(size / 2) },
  { id: "right", label: "Right Half", mask: (x, y, size) => x >= Math.floor(size / 2) },
  { id: "quad-tl", label: "Top Left", mask: (x, y, size) => x < Math.ceil(size / 2) && y < Math.ceil(size / 2) },
  { id: "quad-tr", label: "Top Right", mask: (x, y, size) => x >= Math.floor(size / 2) && y < Math.ceil(size / 2) },
  { id: "quad-bl", label: "Bottom Left", mask: (x, y, size) => x < Math.ceil(size / 2) && y >= Math.floor(size / 2) },
  { id: "quad-br", label: "Bottom Right", mask: (x, y, size) => x >= Math.floor(size / 2) && y >= Math.floor(size / 2) },
  { id: "frame", label: "Frame", mask: (x, y, size) => x === 0 || y === 0 || x === size - 1 || y === size - 1 },
  { id: "h-line", label: "H Line", mask: (x, y, size) => Math.abs(y - Math.floor(size / 2)) <= Math.max(0, Math.floor(size / 10)) },
  { id: "v-line", label: "V Line", mask: (x, y, size) => Math.abs(x - Math.floor(size / 2)) <= Math.max(0, Math.floor(size / 10)) },
  { id: "cross", label: "Cross", mask: (x, y, size) => Math.abs(y - Math.floor(size / 2)) <= Math.max(0, Math.floor(size / 10)) || Math.abs(x - Math.floor(size / 2)) <= Math.max(0, Math.floor(size / 10)) },
  { id: "diag-fwd", label: "Diag /", mask: (x, y, size) => Math.abs((size - 1 - x) - y) <= Math.max(0, Math.floor(size / 10)) },
  { id: "diag-back", label: "Diag \\", mask: (x, y, size) => Math.abs(x - y) <= Math.max(0, Math.floor(size / 10)) },
  { id: "checker", label: "Checker", mask: (x, y) => (x + y) % 2 === 0 },
  { id: "diamond", label: "Diamond", mask: (x, y, size) => Math.abs(x - Math.floor(size / 2)) + Math.abs(y - Math.floor(size / 2)) <= Math.floor(size / 2) },
  { id: "corner-tl", label: "Corner TL", mask: (x, y, size) => x < Math.ceil(size / 3) || y < Math.ceil(size / 3) },
  { id: "corner-tr", label: "Corner TR", mask: (x, y, size) => x >= size - Math.ceil(size / 3) || y < Math.ceil(size / 3) },
  { id: "corner-bl", label: "Corner BL", mask: (x, y, size) => x < Math.ceil(size / 3) || y >= size - Math.ceil(size / 3) },
  { id: "corner-br", label: "Corner BR", mask: (x, y, size) => x >= size - Math.ceil(size / 3) || y >= size - Math.ceil(size / 3) },
  { id: "round-tl", label: "Round TL", mask: (x, y, size) => {
    const radius = Math.max(2, Math.floor(size * 0.48));
    const cutX = radius - 1;
    const cutY = radius - 1;
    if (x >= cutX || y >= cutY) {
      return true;
    }
    return ((x - cutX) ** 2 + (y - cutY) ** 2) <= radius ** 2;
  } },
  { id: "round-tr", label: "Round TR", mask: (x, y, size) => {
    const radius = Math.max(2, Math.floor(size * 0.48));
    const cutX = size - radius;
    const cutY = radius - 1;
    if (x < cutX || y >= cutY) {
      return true;
    }
    return ((x - cutX) ** 2 + (y - cutY) ** 2) <= radius ** 2;
  } },
  { id: "round-bl", label: "Round BL", mask: (x, y, size) => {
    const radius = Math.max(2, Math.floor(size * 0.48));
    const cutX = radius - 1;
    const cutY = size - radius;
    if (x >= cutX || y < cutY) {
      return true;
    }
    return ((x - cutX) ** 2 + (y - cutY) ** 2) <= radius ** 2;
  } },
  { id: "round-br", label: "Round BR", mask: (x, y, size) => {
    const radius = Math.max(2, Math.floor(size * 0.48));
    const cutX = size - radius;
    const cutY = size - radius;
    if (x < cutX || y < cutY) {
      return true;
    }
    return ((x - cutX) ** 2 + (y - cutY) ** 2) <= radius ** 2;
  } },
  { id: "pill-h", label: "Pill H", mask: (x, y, size) => {
    const radius = Math.max(2, Math.floor(size * 0.24));
    const centerY = Math.floor(size / 2);
    const leftCenter = radius;
    const rightCenter = size - radius - 1;
    const inBody = x >= leftCenter && x <= rightCenter && Math.abs(y - centerY) <= radius;
    const inLeftCap = ((x - leftCenter) ** 2 + (y - centerY) ** 2) <= radius ** 2;
    const inRightCap = ((x - rightCenter) ** 2 + (y - centerY) ** 2) <= radius ** 2;
    return inBody || inLeftCap || inRightCap;
  } },
  { id: "pill-v", label: "Pill V", mask: (x, y, size) => {
    const radius = Math.max(2, Math.floor(size * 0.24));
    const centerX = Math.floor(size / 2);
    const topCenter = radius;
    const bottomCenter = size - radius - 1;
    const inBody = y >= topCenter && y <= bottomCenter && Math.abs(x - centerX) <= radius;
    const inTopCap = ((x - centerX) ** 2 + (y - topCenter) ** 2) <= radius ** 2;
    const inBottomCap = ((x - centerX) ** 2 + (y - bottomCenter) ** 2) <= radius ** 2;
    return inBody || inTopCap || inBottomCap;
  } },
  { id: "round-frame", label: "Round Frame", mask: (x, y, size) => {
    const center = (size - 1) / 2;
    const radius = center;
    const inner = Math.max(0, radius - Math.max(1, Math.floor(size / 5)));
    const dist = Math.hypot(x - center, y - center);
    return dist <= radius && dist >= inner;
  } },
  { id: "disc", label: "Disc", mask: (x, y, size) => {
    const center = (size - 1) / 2;
    const radius = size * 0.38;
    return Math.hypot(x - center, y - center) <= radius;
  } }
];

const spriteNameInput = document.getElementById("spriteName");
const sizeInputs = [...document.querySelectorAll('input[name="spriteSize"]')];
const toolInputs = [...document.querySelectorAll('input[name="drawTool"]')];
const paletteContainer = document.getElementById("palette");
const stampGrid = document.getElementById("stampGrid");
const zoomRange = document.getElementById("zoomRange");
const spriteMeta = document.getElementById("spriteMeta");
const paintMeta = document.getElementById("paintMeta");
const clearButton = document.getElementById("clearButton");
const mirrorButton = document.getElementById("mirrorButton");
const mirrorVerticalButton = document.getElementById("mirrorVerticalButton");
const rotateClockwiseButton = document.getElementById("rotateClockwiseButton");
const rotateCounterClockwiseButton = document.getElementById("rotateCounterClockwiseButton");
const rotate180Button = document.getElementById("rotate180Button");
const undoButton = document.getElementById("undoButton");
const redoButton = document.getElementById("redoButton");
const copyButton = document.getElementById("copyButton");
const downloadButton = document.getElementById("downloadButton");
const loadButton = document.getElementById("loadButton");
const loadFileInput = document.getElementById("loadFileInput");
const referenceLoadButton = document.getElementById("referenceLoadButton");
const referenceToggleButton = document.getElementById("referenceToggleButton");
const referenceSmoothingButton = document.getElementById("referenceSmoothingButton");
const referenceResetButton = document.getElementById("referenceResetButton");
const referenceScaleRange = document.getElementById("referenceScaleRange");
const referenceOpacityRange = document.getElementById("referenceOpacityRange");
const referenceOffsetXRange = document.getElementById("referenceOffsetXRange");
const referenceOffsetYRange = document.getElementById("referenceOffsetYRange");
const referenceMeta = document.getElementById("referenceMeta");
const referenceFileInput = document.getElementById("referenceFileInput");
const exportBuffer = document.getElementById("exportBuffer");
const statusLine = document.getElementById("statusLine");
const canvasStack = document.getElementById("canvasStack");
const referenceCanvas = document.getElementById("referenceCanvas");
const referenceImage = document.getElementById("referenceImage");
const spriteCanvas = document.getElementById("spriteCanvas");
const previewCanvas = document.getElementById("previewCanvas");
const referenceCtx = referenceCanvas.getContext("2d");
const spriteCtx = spriteCanvas.getContext("2d");
const previewCtx = previewCanvas.getContext("2d");

const state = {
  size: 24,
  selectedColor: 1,
  selectedTool: "draw",
  selectedStamp: "full",
  pixels: [],
  pointerDown: false,
  history: [],
  future: [],
  reference: {
    image: null,
    name: "",
    visible: true,
    pixelated: true,
    scale: 1,
    opacity: 0.45,
    offsetX: 0,
    offsetY: 0
  }
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

function snapshotPixels() {
  return [...state.pixels];
}

function pushHistory() {
  state.history.push(snapshotPixels());
  if (state.history.length > 80) {
    state.history.shift();
  }
  state.future = [];
  updateHistoryButtons();
}

function updateHistoryButtons() {
  undoButton.disabled = state.history.length === 0;
  redoButton.disabled = state.future.length === 0;
}

function updateCanvasSize() {
  const zoom = Number(zoomRange.value);
  referenceCanvas.width = state.size;
  referenceCanvas.height = state.size;
  referenceCanvas.style.width = `${state.size * zoom}px`;
  referenceCanvas.style.height = `${state.size * zoom}px`;
  spriteCanvas.width = state.size;
  spriteCanvas.height = state.size;
  spriteCanvas.style.width = `${state.size * zoom}px`;
  spriteCanvas.style.height = `${state.size * zoom}px`;
  canvasStack.style.width = `${state.size * zoom}px`;
  canvasStack.style.height = `${state.size * zoom}px`;
  previewCanvas.width = state.size;
  previewCanvas.height = state.size;
  updateReferenceOffsetRanges();
  updateReferencePresentation();
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
      renderStampTray();
      updateStatus(`Selected ${color.name}.`);
    });

    paletteContainer.append(chip);
  });
}

function getSelectedStampDefinition() {
  return stampDefinitions.find((stamp) => stamp.id === state.selectedStamp) || stampDefinitions[0];
}

function renderStampPreview(canvas, definition) {
  const context = canvas.getContext("2d");
  const size = 16;
  canvas.width = size;
  canvas.height = size;
  context.clearRect(0, 0, size, size);

  const color = palette[state.selectedColor];
  if (!color || !color.hex) {
    return;
  }

  context.fillStyle = color.hex;
  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      if (definition.mask(x, y, size)) {
        context.fillRect(x, y, 1, 1);
      }
    }
  }
}

function renderStampTray() {
  stampGrid.innerHTML = "";

  stampDefinitions.forEach((definition) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `stamp-chip${definition.id === state.selectedStamp ? " active" : ""}`;
    button.draggable = true;
    button.dataset.stampId = definition.id;

    const canvas = document.createElement("canvas");
    renderStampPreview(canvas, definition);

    const label = document.createElement("span");
    label.className = "stamp-label";
    label.textContent = definition.label;

    button.append(canvas, label);
    button.addEventListener("click", () => {
      state.selectedStamp = definition.id;
      renderStampTray();
      updateStatus(`Selected PETSCII-style stamp: ${definition.label}.`);
    });
    button.addEventListener("dragstart", (event) => {
      state.selectedStamp = definition.id;
      renderStampTray();
      event.dataTransfer.setData("text/plain", definition.id);
      event.dataTransfer.effectAllowed = "copy";
    });

    stampGrid.append(button);
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
  updateHistoryButtons();
}

function updateReferenceMeta() {
  if (!state.reference.image) {
    referenceMeta.textContent = "No reference image loaded.";
    referenceToggleButton.disabled = true;
    referenceSmoothingButton.disabled = true;
    referenceResetButton.disabled = true;
    return;
  }

  const visibility = state.reference.visible ? "visible" : "hidden";
  const renderMode = state.reference.pixelated ? "pixel" : "smooth";
  referenceMeta.textContent = `${state.reference.name} | ${Math.round(state.reference.scale * 100)}% scale | ${Math.round(state.reference.opacity * 100)}% opacity | ${renderMode} | ${visibility}`;
  referenceToggleButton.disabled = false;
  referenceSmoothingButton.disabled = false;
  referenceResetButton.disabled = false;
  referenceToggleButton.textContent = state.reference.visible ? "Hide Ref" : "Show Ref";
  referenceSmoothingButton.textContent = state.reference.pixelated ? "Smooth Ref" : "Pixel Ref";
}

function updateReferencePresentation() {
  const { image, visible, opacity, scale, offsetX, offsetY, pixelated } = state.reference;
  const zoom = Number(zoomRange.value);
  referenceCtx.clearRect(0, 0, state.size, state.size);

  if (!image || !visible) {
    referenceCanvas.style.opacity = "0";
    referenceImage.hidden = true;
    referenceImage.style.opacity = "0";
    return;
  }

  referenceImage.src = image.src;
  referenceImage.style.width = `${state.size * scale * zoom}px`;
  referenceImage.style.height = `${state.size * scale * zoom}px`;
  referenceImage.style.transform = `translate(calc(-50% + ${offsetX * zoom}px), calc(-50% + ${offsetY * zoom}px))`;
  referenceImage.style.opacity = String(opacity);

  if (!pixelated) {
    referenceCanvas.style.opacity = "0";
    referenceImage.hidden = false;
    return;
  }

  const width = state.size * scale;
  const height = state.size * scale;
  const drawX = ((state.size - width) / 2) + offsetX;
  const drawY = ((state.size - height) / 2) + offsetY;

  referenceImage.hidden = true;
  referenceImage.style.opacity = "0";
  referenceCanvas.style.imageRendering = pixelated ? "pixelated" : "auto";
  referenceCtx.save();
  referenceCtx.globalAlpha = opacity;
  referenceCtx.imageSmoothingEnabled = !pixelated;
  referenceCtx.clearRect(0, 0, state.size, state.size);
  referenceCtx.drawImage(image, drawX, drawY, width, height);
  referenceCtx.restore();
  referenceCanvas.style.opacity = "1";
}

function updateReferenceOffsetRanges() {
  const maxOffset = state.size * 2;
  referenceOffsetXRange.min = String(-maxOffset);
  referenceOffsetXRange.max = String(maxOffset);
  referenceOffsetYRange.min = String(-maxOffset);
  referenceOffsetYRange.max = String(maxOffset);
}

function syncReferenceControls() {
  referenceScaleRange.value = String(Math.round(state.reference.scale * 100));
  referenceOpacityRange.value = String(Math.round(state.reference.opacity * 100));
  referenceOffsetXRange.value = String(Math.round(state.reference.offsetX));
  referenceOffsetYRange.value = String(Math.round(state.reference.offsetY));
  updateReferenceMeta();
  updateReferencePresentation();
}

function resetReferenceSettings() {
  state.reference.scale = 1;
  state.reference.opacity = 0.45;
  state.reference.offsetX = 0;
  state.reference.offsetY = 0;
  state.reference.visible = true;
  state.reference.pixelated = true;
  syncReferenceControls();
}

function loadReferenceImage() {
  referenceFileInput.click();
}

function toggleReferenceVisibility() {
  if (!state.reference.image) {
    return;
  }
  state.reference.visible = !state.reference.visible;
  syncReferenceControls();
  updateStatus(`Reference image ${state.reference.visible ? "shown" : "hidden"}.`);
}

function toggleReferenceSmoothing() {
  if (!state.reference.image) {
    return;
  }
  state.reference.pixelated = !state.reference.pixelated;
  updateReferenceMeta();
  updateReferencePresentation();
  updateStatus(`Reference render mode set to ${state.reference.pixelated ? "pixel" : "smooth"}.`);
}

function handleReferenceRangeInput() {
  state.reference.scale = Number(referenceScaleRange.value) / 100;
  state.reference.opacity = Number(referenceOpacityRange.value) / 100;
  state.reference.offsetX = Number(referenceOffsetXRange.value);
  state.reference.offsetY = Number(referenceOffsetYRange.value);
  updateReferenceMeta();
  updateReferencePresentation();
}

async function handleReferenceFileSelection() {
  const [file] = referenceFileInput.files || [];
  if (!file) {
    return;
  }

  try {
    const dataUrl = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(new Error("Could not read reference image."));
      reader.readAsDataURL(file);
    });

    const image = await new Promise((resolve, reject) => {
      const nextImage = new Image();
      nextImage.onload = () => resolve(nextImage);
      nextImage.onerror = () => reject(new Error("Could not load reference image."));
      nextImage.src = dataUrl;
    });

    state.reference.image = image;
    state.reference.name = file.name;
    resetReferenceSettings();
    updateStatus(`Loaded reference image ${file.name}.`);
  } catch (error) {
    updateStatus(error.message || "Could not load reference image.");
  } finally {
    referenceFileInput.value = "";
  }
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
  state.history = [];
  state.future = [];
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

function applyStampAt(centerX, centerY) {
  const definition = getSelectedStampDefinition();
  const stampSize = Math.max(4, Math.floor(state.size / 3));
  const startX = centerX - Math.floor(stampSize / 2);
  const startY = centerY - Math.floor(stampSize / 2);

  for (let y = 0; y < stampSize; y += 1) {
    for (let x = 0; x < stampSize; x += 1) {
      if (!definition.mask(x, y, stampSize)) {
        continue;
      }
      const spriteX = startX + x;
      const spriteY = startY + y;
      if (spriteX < 0 || spriteX >= state.size || spriteY < 0 || spriteY >= state.size) {
        continue;
      }
      state.pixels[indexFor(spriteX, spriteY)] = state.selectedColor;
    }
  }

  renderCanvas();
}

function undoAction() {
  if (state.history.length === 0) {
    return;
  }
  state.future.push(snapshotPixels());
  state.pixels = state.history.pop();
  renderCanvas();
  updateStatus("Undid the last change.");
}

function redoAction() {
  if (state.future.length === 0) {
    return;
  }
  state.history.push(snapshotPixels());
  state.pixels = state.future.pop();
  renderCanvas();
  updateStatus("Redid the last change.");
}

function paintAt(x, y) {
  const index = indexFor(x, y);

  if (state.selectedTool === "stamp") {
    applyStampAt(x, y);
  } else if (state.selectedTool === "fill") {
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

function mirrorSpriteVertical() {
  const mirrored = makePixels(state.size);
  for (let y = 0; y < state.size; y += 1) {
    for (let x = 0; x < state.size; x += 1) {
      const from = indexFor(x, y);
      const to = (state.size - 1 - y) * state.size + x;
      mirrored[to] = state.pixels[from];
    }
  }

  state.pixels = mirrored;
  renderCanvas();
  updateStatus("Mirrored sprite vertically.");
}

function rotateClockwise() {
  const rotated = makePixels(state.size);
  for (let y = 0; y < state.size; y += 1) {
    for (let x = 0; x < state.size; x += 1) {
      const from = indexFor(x, y);
      const toX = state.size - 1 - y;
      const toY = x;
      rotated[toY * state.size + toX] = state.pixels[from];
    }
  }

  state.pixels = rotated;
  renderCanvas();
  updateStatus("Rotated sprite 90 degrees clockwise.");
}

function rotateCounterClockwise() {
  const rotated = makePixels(state.size);
  for (let y = 0; y < state.size; y += 1) {
    for (let x = 0; x < state.size; x += 1) {
      const from = indexFor(x, y);
      const toX = y;
      const toY = state.size - 1 - x;
      rotated[toY * state.size + toX] = state.pixels[from];
    }
  }

  state.pixels = rotated;
  renderCanvas();
  updateStatus("Rotated sprite 90 degrees counterclockwise.");
}

function rotate180() {
  const rotated = makePixels(state.size);
  for (let y = 0; y < state.size; y += 1) {
    for (let x = 0; x < state.size; x += 1) {
      const from = indexFor(x, y);
      const toX = state.size - 1 - x;
      const toY = state.size - 1 - y;
      rotated[toY * state.size + toX] = state.pixels[from];
    }
  }

  state.pixels = rotated;
  renderCanvas();
  updateStatus("Rotated sprite 180 degrees.");
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

function applyLoadedSprite(parsed, sourceLabel) {
  if (parsed.type !== "cats64-sprite" || typeof parsed.width !== "number" || typeof parsed.height !== "number") {
    throw new Error("Unrecognized sprite format.");
  }
  if (parsed.width !== parsed.height || ![16, 24, 32].includes(parsed.width)) {
    throw new Error("Only 16x16, 24x24, and 32x32 sprites are supported right now.");
  }
  if (!Array.isArray(parsed.pixels) || parsed.pixels.length !== parsed.width * parsed.height) {
    throw new Error("Pixel data length does not match sprite size.");
  }

  pushHistory();
  state.size = parsed.width;
  state.pixels = parsed.pixels.map((value) => (Number.isInteger(value) && value >= 0 && value < palette.length ? value : 0));
  spriteNameInput.value = typeof parsed.name === "string" && parsed.name.trim() ? parsed.name.trim() : "loaded-sprite";
  sizeInputs.forEach((input) => {
    input.checked = Number(input.value) === state.size;
  });
  exportBuffer.value = JSON.stringify(parsed, null, 2);
  updateCanvasSize();
  renderCanvas();
  renderStampTray();
  updateStatus(`Loaded ${state.size}x${state.size} sprite from ${sourceLabel}.`);
}

function loadJsonFromBuffer() {
  try {
    const parsed = JSON.parse(exportBuffer.value);
    applyLoadedSprite(parsed, "the import buffer");
  } catch (error) {
    updateStatus(error.message || "Could not load sprite JSON.");
  }
}

function loadJsonFromFile() {
  loadFileInput.click();
}

async function handleFileSelection() {
  const [file] = loadFileInput.files || [];
  if (!file) {
    return;
  }

  try {
    const parsed = JSON.parse(await file.text());
    applyLoadedSprite(parsed, file.name);
  } catch (error) {
    updateStatus(error.message || "Could not load sprite JSON.");
  } finally {
    loadFileInput.value = "";
  }
}

spriteCanvas.addEventListener("pointerdown", (event) => {
  pushHistory();
  state.pointerDown = true;
  spriteCanvas.setPointerCapture(event.pointerId);
  const point = getPointFromEvent(event);
  paintAt(point.x, point.y);
});

spriteCanvas.addEventListener("pointermove", (event) => {
  if (!state.pointerDown || state.selectedTool === "fill" || state.selectedTool === "stamp") {
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

spriteCanvas.addEventListener("dragover", (event) => {
  event.preventDefault();
  event.dataTransfer.dropEffect = "copy";
});

spriteCanvas.addEventListener("drop", (event) => {
  event.preventDefault();
  const stampId = event.dataTransfer.getData("text/plain");
  if (stampDefinitions.some((stamp) => stamp.id === stampId)) {
    state.selectedStamp = stampId;
    state.selectedTool = "stamp";
    toolInputs.forEach((input) => {
      input.checked = input.value === "stamp";
    });
    renderStampTray();
  }
  const point = getPointFromEvent(event);
  pushHistory();
  applyStampAt(point.x, point.y);
  updateStatus(`Dropped ${getSelectedStampDefinition().label} stamp onto the canvas.`);
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
      updateStatus(input.value === "stamp" ? `Tool set to stamp mode with ${getSelectedStampDefinition().label}.` : `Tool set to ${input.value}.`);
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
  pushHistory();
  state.pixels = makePixels(state.size);
  renderCanvas();
  updateStatus("Cleared the sprite.");
});

mirrorButton.addEventListener("click", () => {
  pushHistory();
  mirrorSprite();
});
mirrorVerticalButton.addEventListener("click", () => {
  pushHistory();
  mirrorSpriteVertical();
});
rotateClockwiseButton.addEventListener("click", () => {
  pushHistory();
  rotateClockwise();
});
rotateCounterClockwiseButton.addEventListener("click", () => {
  pushHistory();
  rotateCounterClockwise();
});
rotate180Button.addEventListener("click", () => {
  pushHistory();
  rotate180();
});
undoButton.addEventListener("click", undoAction);
redoButton.addEventListener("click", redoAction);
undoButton.disabled = true;
redoButton.disabled = true;
copyButton.addEventListener("click", copyJson);
downloadButton.addEventListener("click", downloadJson);
loadButton.addEventListener("click", loadJsonFromFile);
loadFileInput.addEventListener("change", handleFileSelection);
referenceLoadButton.addEventListener("click", loadReferenceImage);
referenceToggleButton.addEventListener("click", toggleReferenceVisibility);
referenceSmoothingButton.addEventListener("click", toggleReferenceSmoothing);
referenceResetButton.addEventListener("click", () => {
  if (!state.reference.image) {
    return;
  }
  resetReferenceSettings();
  renderCanvas();
  updateStatus("Reset reference image controls.");
});
referenceFileInput.addEventListener("change", handleReferenceFileSelection);
referenceScaleRange.addEventListener("input", handleReferenceRangeInput);
referenceOpacityRange.addEventListener("input", handleReferenceRangeInput);
referenceOffsetXRange.addEventListener("input", handleReferenceRangeInput);
referenceOffsetYRange.addEventListener("input", handleReferenceRangeInput);

setSize(24);
renderPalette();
renderStampTray();
syncReferenceControls();
