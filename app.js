const viewer = OpenSeadragon({

    id:"viewer",

    prefixUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/openseadragon/4.1.1/images/",

    maxZoomPixelRatio:32,

    zoomPerScroll:1.4,

    background:"#000000",

    showNavigationControl: false
});

 
const markersOpacity = 1;

const layerDefinitions = [
    {
        id: "Noita",
        icon: "icons/noitaLogo.png",
        sublayers: [
            { id: "vanilla_bosses", label: "Bosses", icon: "icons/boss.webp", defaultOn: true },
            { id: "vanilla_structures", label: "Structures", icon: "icons/Star.png", defaultOn: false },
            { id: "vanilla_items", label: "Items", icon: "icons/Vanilla/Items/Item_evil_eye.webp", defaultOn: false },
            { id: "vanilla_orbs", label: "Orbs", icon: "icons/Vanilla/Orbs/orb_empty.gif", defaultOn: true }
        ],
        defaultOn: false
    },
    {
        id: "Apotheosis",
        icon: "icons/Apotheosis.png",
        sublayers: [
            { id: "apotheosis_bosses", label: "Bosses", icon: "icons/boss.webp", defaultOn: true },
            { id: "apotheosis_orbs", label: "Orbs", icon: "icons/Vanilla/Orbs/orb_empty.gif", defaultOn: true },
            { id: "apotheosis_secrets", label: "Points of interest", icon: "icons/SharedIcons/Secret.png", defaultOn: true }
        ],
        defaultOn: false
    },
    {
        id: "Graham's things",
        icon: "icons/Graham.png",
        sublayers: [
            { id: "graham_secrets", label: "Points of interest", icon: "icons/SharedIcons/Secret.png", defaultOn: true },
            { id: "graham_items", label: "Wands", icon: "icons/GrahamThings/Mod_GT-Experimentalwand.png", defaultOn: true },
            { id: "graham_techchest", label: "Tech chests", icon: "icons/GrahamThings/Mod_GT-Techchest.webp", defaultOn: true }
        ],
        defaultOn: false
    },
    {
        id: "New enemies",
        icon: "icons/NewEnemies2.png",
        sublayers: [
            { id: "NE_Elemental", label: "Essence Bosses", icon: "icons/Vanilla/Items/Special_Perk_essence_water.webp", defaultOn: true },
            { id: "NE_Special", label: "Special Bosses", icon: "icons/Star.png", defaultOn: true },
            { id: "NE_Orb", label: "Orb Bosses", icon: "icons/Vanilla/Orbs/orb_empty.gif", defaultOn: true }
        ],
        defaultOn: false
    },
    {
        id: "Chemical curiosities",
        icon: "icons/ChemicalCuriosities.png",
        sublayers: [],
        defaultOn: false
    },
    {
        id: "Other",
        icon: "icons/Other.png",
        sublayers: [
            { id: "Varia", label: "Varia Addons", icon: "icons/Other/Varia/shovel_golden.png", defaultOn: true },
            { id: "SmallMods", label: "Small Mods", icon: "icons/Star.png", defaultOn: true }
        ],
        defaultOn: false
    }
];

const mapDefinitions = [
    {
        id: "regular",
        label: "Regular",
        markersFile: "data/markers.json",
        layers: layerDefinitions,
        tiles: [
            { tileSource: "https://github.com/Kunavi22/NoitaMapFiles/blob/master/regular-main-branch-middle-2025-01-25-786433191.dzi", x: 0.9859 },
            { tileSource: "https://github.com/Kunavi22/NoitaMapFiles/blob/master/regular-main-branch-left-2025-01-25-786433191.dzi", x: 0 },
            { tileSource: "https://github.com/Kunavi22/NoitaMapFiles/blob/master/regular-main-branch-right-2025-01-25-786433191.dzi", x: 1.9718, y: -0.0125 }]
    },
    {
        id: "newgame",
        label: "New Game+",
        markersFile: "data/newgame-markers.json",
        layers: [
            {
                id: "Noita",
                icon: "icons/noitaLogo.png",
                sublayers: [
                    { id: "vanilla_bosses", label: "Bosses", icon: "icons/boss.webp", defaultOn: true },
                    { id: "vanilla_structures", label: "Structures", icon: "icons/Star.png", defaultOn: false },
                    { id: "vanilla_items", label: "Items", icon: "icons/Vanilla/Items/Item_evil_eye.webp", defaultOn: false },
                    { id: "vanilla_orbs", label: "Orbs", icon: "icons/Vanilla/Orbs/orb_empty.gif", defaultOn: true }
                ],
                defaultOn: false
            },
            {
                id: "Apotheosis",
                icon: "icons/Apotheosis.png",
                sublayers: [
                    { id: "apotheosis_bosses", label: "Bosses", icon: "icons/boss.webp", defaultOn: true },
                    { id: "apotheosis_orbs", label: "Orbs", icon: "icons/Vanilla/Orbs/orb_empty.gif", defaultOn: true },
                    { id: "apotheosis_secrets", label: "Points of interest", icon: "icons/SharedIcons/Secret.png", defaultOn: true }
                ],
                defaultOn: false
            },
            {
                id: "Graham's things\n\n(Does not spawns in NG+)",
                icon: "icons/Graham.png",
                sublayers: [
                ],
                defaultOn: false
            },
            {
                id: "New enemies",
                icon: "icons/NewEnemies2.png",
                sublayers: [
                    { id: "NE_Elemental", label: "Essence Bosses", icon: "icons/Vanilla/Items/Special_Perk_essence_water.webp", defaultOn: true },
                    { id: "NE_Special", label: "Special Bosses", icon: "icons/Star.png", defaultOn: true },
                    { id: "NE_Orb", label: "Orb Bosses", icon: "icons/Vanilla/Orbs/orb_empty.gif", defaultOn: true }
                ],
                defaultOn: false
            },
            {
                id: "Chemical curiosities",
                icon: "icons/ChemicalCuriosities.png",
                sublayers: [],
                defaultOn: false
            },
            {
                id: "Other",
                icon: "icons/Other.png",
                sublayers: [
                    { id: "Varia", label: "Varia Addons", icon: "icons/Other/Varia/shovel_golden.png", defaultOn: true }
                ],
                defaultOn: false
            }
        ],
        tiles: [
            { tileSource: "https://github.com/Kunavi22/NoitaMapFiles/blob/master/NewGame/newgame-main-branch-middle-2025-01-25-786433191.dzi", x: 0.9859 },
            { tileSource: "https://github.com/Kunavi22/NoitaMapFiles/blob/master/NewGame/newgame-main-branch-left-2025-01-25-786433191.dzi", x: 0 },
            { tileSource: "https://github.com/Kunavi22/NoitaMapFiles/blob/master/NewGame/newgame-main-branch-right-2025-01-25-786433191.dzi", x: 1.9718, y: -0.0125 }
        ]
    },
    { 
         id: "Yggdrasil",
        label: "Plane of Yggdrasil",
   
        layers: [
             {
                id: "Apotheosis",
                icon: "icons/Apotheosis.png",
                sublayers: [
                     ],
                defaultOn: false
            }
        ],
        tiles: [
            { tileSource: "https://github.com/Kunavi22/NoitaMapFiles/blob/master/Yggdrasil/yggdrasil-main-branch-middle-2025-01-25-786433191.dzi", x: 0.9859 },
            { tileSource: "https://github.com/Kunavi22/NoitaMapFiles/blob/master/Yggdrasil/yggdrasil-main-branch-left-2025-01-25-786433191.dzi", x: 0 },
            { tileSource: "https://github.com/Kunavi22/NoitaMapFiles/blob/master/Yggdrasil/yggdrasil-main-branch-right-2025-01-25-786433191.dzi", x: 1.9718, y: -0.0125 }
        ]
 
    },
    { id: "Soul", label: "Plane of Soul", markersFile: null, layers: [], disabled: true },
    { id: "Experimentation", label: "Plane of Experimentation", markersFile: null, layers: [], disabled: true },
    { id: "Empyrean", label: "Empyrean", markersFile: null, layers: [], disabled: true }
];

let tooltipMode = "marker"; 
// "marker" | "label"

const markerObjects = [];

const mapStates = {};
let checkedMarkers = new Set();
let layerStates = {};
let sublayerStates = {};
let currentMapId = "regular";

let markerTooltipTimer;

function normalizeTileSource(tileSource)
{
    if (typeof tileSource !== "string")
        return tileSource;

    const githubBlobMatch = tileSource.match(/^https?:\/\/github\.com\/([^/]+)\/([^/]+)\/blob\/(.+)$/i);
    if (githubBlobMatch)
    {
        const [, owner, repo, path] = githubBlobMatch;
        return `https://raw.githubusercontent.com/${owner}/${repo}/${path}`;
    }

    return tileSource;
}

function ensureMapState(mapId)
{
    if (!mapStates[mapId])
    {
        mapStates[mapId] = {
            layerStates: {},
            sublayerStates: {},
            checkedMarkers: new Set()
        };
    }

    return mapStates[mapId];
}

function getLayerDefinitions(mapId = currentMapId)
{
    const map = mapDefinitions.find(entry => entry.id === mapId) ?? mapDefinitions[0];
    return map.layers && map.layers.length > 0 ? map.layers : layerDefinitions;
}

function applyMapState(mapId)
{
    const state = ensureMapState(mapId);
    currentMapId = mapId;
    layerStates = state.layerStates;
    sublayerStates = state.sublayerStates;
    checkedMarkers = state.checkedMarkers;

    const layers = getLayerDefinitions(mapId);

    layers.forEach(layer => {
        if (!(layer.id in layerStates))
            layerStates[layer.id] = layer.defaultOn ?? true;

        layer.sublayers.forEach(sublayer => {
            if (!(sublayer.id in sublayerStates))
                sublayerStates[sublayer.id] = sublayer.defaultOn ?? true;
        });
    });

    return state;
}

function createMapSelector()
{
    const container = document.createElement("div");
    container.id = "mapSelectorContainer";

    const select = document.createElement("select");
    select.id = "mapSelector";
    select.title = "Switch map";

    mapDefinitions.forEach(map => {
        const option = document.createElement("option");
        option.value = map.id;
        option.textContent = map.label;
        option.disabled = Boolean(map.disabled);
        if (map.id === currentMapId)
            option.selected = true;
        select.appendChild(option);
    });

    select.addEventListener("change", () => {
        const selectedMap = select.value;
        if (selectedMap && selectedMap !== currentMapId)
            switchMap(selectedMap);
    });

    container.appendChild(select);
    document.body.appendChild(container);
}

function refreshCheckedMarkerVisuals()
{
    markerObjects.forEach(marker => {
        marker.element.classList.toggle("checked", checkedMarkers.has(marker.id));
    });
}

async function switchMap(mapId)
{
    if (!mapDefinitions.some(map => map.id === mapId))
        return;

    const targetMap = mapDefinitions.find(map => map.id === mapId);
    if (targetMap?.disabled)
        return;

    applyMapState(mapId);
    createLayerButtons();
    const selector = document.getElementById("mapSelector");
    if (selector)
        selector.value = mapId;

    loadMap(mapId);
    await loadMarkers(mapId);
    syncLayerButtonState();
    refreshCheckedMarkerVisuals();
    saveState();
}

function getInitialMapId()
{
    const saved = localStorage.getItem('noitaMapState');
    if (!saved)
        return currentMapId;

    try {
        const state = JSON.parse(saved);
        if (state.currentMapId && mapDefinitions.some(map => map.id === state.currentMapId))
            return state.currentMapId;
    } catch (e) {
        console.error('Failed to read saved map selection:', e);
    }

    return currentMapId;
}

const initialMapId = getInitialMapId();
currentMapId = initialMapId;
createMapSelector();
applyMapState(currentMapId);
createLayerButtons();
loadMap(currentMapId);
loadMarkers(currentMapId).then(() => loadState());
loadTutorialPannel();



function addMap(tile)
{
    viewer.addTiledImage({
        tileSource: normalizeTileSource(tile),
        success: function(event)
        {
            const item = event.item;

            const meta =
                item.source.Image;

            const topLeft =
                meta.TopLeft;

            const size =
                meta.Size;

            // Convert Noita world → OpenSeadragon image coords
            const bounds =
                new OpenSeadragon.Rect(
                    parseFloat(topLeft.X),
                    parseFloat(topLeft.Y),
                    size.Width,
                    size.Height
                );

            item.setPosition(bounds.getTopLeft(), true);
            item.setWidth(bounds.width);
        }
    });
}

function toggleMarkerCheck(id)
{
    if(checkedMarkers.has(id))
        checkedMarkers.delete(id);
    else
        checkedMarkers.add(id);

    updateMarkerVisual(id);
    saveState();
    updateUncheckButtonVisibility();
}

function updateMarkerVisual(id)
{
    markerObjects.forEach(m =>
    {
        if(m.id !== id) return;

        if(checkedMarkers.has(id))
            m.element.classList.add("checked");
        else
            m.element.classList.remove("checked");
    });
}

function noitaToViewport(
    noitaX,
    noitaY)
{
     let vpX = 0;
    let vpY = 0;

    let xBias = - 53760.5071;
    let xScale = 36352.4503;

    let yBias = - 31745.1622;
    let yScale = 36352.4503;


        //vpx = (noitax - xbias) / xscale

        //vpy = (noitay - ybias) / yscale

        vpX = (noitaX - xBias) / xScale;


        vpY = (noitaY - yBias) / yScale;


    return new OpenSeadragon.Point(
        vpX,
        vpY
    );
}

function viewportToNoita(
    vpX,
    vpY)
{

    let noitaX = 0;
    let noitaY = 0;

    let xBias = - 53760.5071;
    let xScale = 36352.4503;

    let yBias = - 31745.1622;
    let yScale = 36352.4503;

        noitaX =
            vpX * xScale + xBias;



        noitaY =
            vpY * yScale + yBias


    return new OpenSeadragon.Point(
        noitaX,
        noitaY
    );
}


function createLayerButtons()
{
    const root =
        document.getElementById(
            "layerBar"
        );

    root.innerHTML = "";

    const layers = getLayerDefinitions(currentMapId);

    layers.forEach(
        layer =>
        {
            layer.sublayers.forEach(sublayer =>
            {
                if (!(sublayer.id in sublayerStates))
                    sublayerStates[sublayer.id] = sublayer.defaultOn ?? true;
            });

            if (!(layer.id in layerStates))
                layerStates[layer.id] = layer.defaultOn ?? true;

            const img =
                document.createElement(
                    "img"
                );

            img.src = layer.icon;

            img.className = "layerButton";

            img.dataset.layer = layer.id;

            const defaultOn = layerStates[layer.id];

            if (defaultOn)
                img.classList.add("active");
            else
                img.classList.add("inactive");

            img.onclick =
                function()
                {
                    const enabled =
                        img.classList.contains(
                            "active"
                        );

                    if(enabled)
                    {
                        img.classList.remove(
                            "active"
                        );

                        img.classList.add(
                            "inactive"
                        );
                    }
                    else
                    {
                        img.classList.remove(
                            "inactive"
                        );

                        img.classList.add(
                            "active"
                        );
                    }

                    toggleLayer(
                        layer.id,
                        !enabled
                    );

                    // Refresh tooltip if currently showing for this layer
                    if (currentLayer === layer.id) {
                        currentLayer = null; // Reset to force refresh
                        showLayerTooltip(layer, img);
                    } else {
                        currentLayer = null;
                        document.getElementById("layerTooltip").classList.remove("visible");
                    }
                };

                img.addEventListener(
                    "mouseenter",

                    function()
                    {
     
                        showLayerTooltip(
                            layer,
                            img
                        );
                    });

                img.addEventListener(
                    "mouseleave",

                    hideLayerTooltip
                );

            root.appendChild(
                img
            );
        });
}

function syncLayerButtonState()
{
    document.querySelectorAll('.layerButton[data-layer]').forEach(btn => {
        const layerName = btn.dataset.layer;
        const active = layerStates[layerName] ?? true;
        btn.classList.toggle('active', active);
        btn.classList.toggle('inactive', !active);
    });
}

function loadMap(mapId = currentMapId)
{
    const map = mapDefinitions.find(entry => entry.id === mapId) ?? mapDefinitions[0];

    viewer.world.removeAll();
    viewer.clearOverlays();
    markerObjects.length = 0;

    map.tiles.forEach(tile => {
        viewer.addTiledImage({
            tileSource: normalizeTileSource(tile.tileSource),
            x: tile.x ?? 0,
            y: tile.y ?? 0
        });
    });
}

async function loadMarkers(mapId = currentMapId)
{
    const map = mapDefinitions.find(entry => entry.id === mapId) ?? mapDefinitions[0];
    const markersPath = map?.markersFile;

    viewer.clearOverlays();
    markerObjects.length = 0;

    if (markersPath)
    {
        const markers = await fetch(markersPath).then(r => r.json());
        markers.forEach(createMarker);
    }

    updateMarkerVisibility();
    refreshCheckedMarkerVisuals();
    updateUncheckButtonVisibility();
}

function makeId(title)
{
    return title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "_")
        .replace(/^_+|_+$/g, "");
}

function createMarker(data)
{

    
    const img =
        document.createElement("img");

    img.src = data.icon;

    img.className =
        "marker";

    img.style.opacity = markersOpacity;

    

    img.addEventListener(
    "mouseenter",
    () =>
    {
        img.style.opacity = "1";
    });

    img.addEventListener(
    "mouseenter",
    e =>
    {
        resetTooltipMode();

        clearTimeout(markerTooltipTimer);

        showTooltip(
            data,
            img
        );
    });

    img.addEventListener(
    "mouseleave",
    () =>
    {
        img.style.opacity = markersOpacity;

        hideMarkerTooltip();
    });


    img.style.pointerEvents =
    "auto";

    img.title =
        data.title;



        new OpenSeadragon.MouseTracker({
    element: img,

    clickHandler: function()
    {
        // if(data.url && data.url.length > 0)
        // {
        //     window.open(
        //         data.url,
        //         "_blank"
        //     );
        // }
        toggleMarkerCheck(makeId(data.title  + data.description));
    }
});

   const location =
    noitaToViewport(
        data.x,

        data.y
    );

    // Only add the overlay if the marker's layer and sublayer are enabled
    const layerVisible = layerStates[data.layer] ?? true;
    const sublayerVisible = sublayerStates[data.sublayer] ?? true;

    if (layerVisible && sublayerVisible)
    {
        viewer.addOverlay({
            element: img,
            location: location
        });
    }




        markerObjects.push({
            id: makeId(data.title + data.description),

            layer: data.layer,

            sublayer: data.sublayer,

            element: img,

            location: location
        });
}

function toggleLayer(layerName, visible)
{
    layerStates[layerName] = visible;

   markerObjects
        .filter(m => m.layer === layerName)
        .forEach(m =>
        {
            if(visible)
            {
               
                viewer.addOverlay({
                    element: m.element,
                    location: m.location  // 🔥 reuse exact object
                });
            }
            else
            {
                viewer.removeOverlay(m.element);
            }
        });

         updateMarkerVisibility();
         saveState();
}

function showTooltip(data, markerElement)
{

    resetTooltipLayout();
    tooltipMode = "marker";

    

    document.getElementById("tooltipImage").style.display = "block";

    const desc =
        document.getElementById("tooltipDescription");

    if(desc)
        desc.style.display = "block";

    const tooltip =
    document.getElementById("tooltip");

    tooltip.classList.remove("label");



    tooltip.style.display = "flex";
    tooltip.style.flexDirection = "row";
    tooltip.style.alignItems = "center";
    tooltip.style.textAlign = "left";
  


    document
        .getElementById(
            "tooltipImage"
        )
        .src =
        data.tooltipImage;

    document
        .getElementById(
            "tooltipTitle"
        )
        .innerText =
        data.title;

    document
        .getElementById(
            "tooltipDescription"
        )
        .innerText =
        data.description;

    // Add wiki link
    const wikiLink = document.getElementById("tooltipWikiLink");
    if (data.url && data.url.length > 0) {
        wikiLink.innerHTML = `<a href="${data.url}" target="_blank">Wiki</a>`;
    } else {
        wikiLink.innerHTML = "";
    }

              tooltip.style.display =
        "flex";

    // Position tooltip over marker
    const markerRect = markerElement.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();
    
    tooltip.style.left =
        (markerRect.left + markerRect.width / 2 - tooltipRect.width / 2) + "px";

    tooltip.style.top =
    (markerRect.top - tooltipRect.height - 8) + "px";


}
function resetTooltipLayout()
{
    const tooltip =
        document.getElementById("tooltip");

    tooltip.style.display = "none";

    tooltip.style.flexDirection = "row";

    tooltip.style.alignItems = "center";

    tooltip.style.justifyContent = "flex-start";

    tooltip.style.textAlign = "left";

    document.getElementById("tooltipImage").style.display = "block";

    const desc =
        document.getElementById("tooltipDescription");

    if(desc)
        desc.style.display = "block";
}
function showLabelTooltip(text, x, y)
{
    resetTooltipLayout();
    tooltipMode = "label";

    const tooltip =
    document.getElementById("tooltip");

    tooltip.classList.add("label");


    // hide marker-only parts
    document.getElementById("tooltipImage").style.display = "none";

    const desc =
        document.getElementById("tooltipDescription");

    if(desc)
        desc.style.display = "none";

    // center layout for label
    document.getElementById("tooltipTitle").innerText = text;

    tooltip.style.display = "flex";

    tooltip.style.flexDirection = "column";

    tooltip.style.alignItems = "center";

    tooltip.style.justifyContent = "center";

    tooltip.style.textAlign = "center";

    tooltip.style.left = (x - tooltip.offsetWidth / 2) + "px";

    tooltip.style.top =
        (y  + 12) + "px";
}

function moveTooltip(x,y)
{
    const tooltip =
        document.getElementById(
            "tooltip"
        );

        const rect =
        tooltip.getBoundingClientRect();

    tooltip.style.left =
        (x - rect.width / 2) + "px";

    tooltip.style.top =
        (y - rect.height - 12) + "px";
}

function showSimpleTooltip(text, x, y)
{
    const tooltip =
        document.getElementById("tooltip");

    // reuse existing tooltip container
    document.getElementById("tooltipImage").style.display = "none";

    document.getElementById("tooltipTitle").innerText = text;

    const desc =
        document.getElementById("tooltipDescription");

    if(desc)
        desc.style.display = "none";

    tooltip.style.display = "flex";

    tooltip.style.left =
        (x - tooltip.offsetWidth / 2) + "px";

    tooltip.style.top =
        (y + 12) + "px";
}

function resetTooltipMode()
{
    document.getElementById("tooltipImage").style.display = "block";

    const desc =
        document.getElementById("tooltipDescription");

    if(desc)
        desc.style.display = "block";
}

function hideTooltip()
{
    clearTooltipContent();

    document
        .getElementById(
            "tooltip"
        )
        .style.display =
        "none";
}

function clearTooltipContent()
{
    const image =
        document.getElementById(
            "tooltipImage"
        );

    if(image)
        image.removeAttribute("src");

    const title =
        document.getElementById(
            "tooltipTitle"
        );

    if(title)
        title.innerText = "";

    const description =
        document.getElementById(
            "tooltipDescription"
        );

    if(description)
        description.innerText = "";

    const wikiLink =
        document.getElementById(
            "tooltipWikiLink"
        );

    if(wikiLink)
        wikiLink.innerHTML = "";
}

function hideMarkerTooltip()
{
    clearTimeout(markerTooltipTimer);

   
    markerTooltipTimer = setTimeout(function() {
        if (tooltipMode === "marker") {
            hideTooltip();
        }
    }, 70);
}

// Setup marker tooltip hover persistence - called at end of script
function setupMarkerTooltipListeners() {
    const tooltip = document.getElementById("tooltip");
    tooltip.addEventListener("mouseenter", function() {
        clearTimeout(markerTooltipTimer);
    });

    tooltip.addEventListener("mouseleave", function() {
        if (tooltipMode === "marker") {
            hideMarkerTooltip();
        }
    });
}

//    viewer.canvas.addEventListener(
//     "mousemove",
//     function(event)
//     {
  
//         const rect =
//             viewer.canvas.getBoundingClientRect();

//         const pixel =
//             new OpenSeadragon.Point(
//                 event.clientX - rect.left,
//                 event.clientY - rect.top
//             );

//         const vp =
//             viewer.viewport.pointFromPixel(pixel);

//         let noitaX = 0;
//         let noitaY = 0;

//         // LEFT 109,087
//         if(vp.x < 0.9859)
//         {
//             const local =
//                 vp.x / 0.9859;

//             noitaX =
//                 -53760 +
//                 local * 35490;
//         }

//         // MIDDLE
//         else if(vp.x < 1.9718)
//         {
//             const local =
//                 (vp.x - 0.9859)
//                 / 0.9859;

//             noitaX =
//                 -17920 +
//                 local * 35490;
//         }

//         // RIGHT
//         else
//         {
//             const local =
//                 (vp.x - 1.9718)
//                 / 0.9718;

//             noitaX =
//                 17920 +
//                 local * 35490;
//         }
// //74,766
//         noitaY =
//             -31745 +
//             vp.y * 36352;

//         document
//             .getElementById("coords")
//             .innerText =
//             `X: ${Math.round(noitaX)}
//              Y: ${Math.round(noitaY)}`;
//     });

viewer.canvas.addEventListener(
    "mousemove",
    function(event)
    {
        const rect =
            viewer.canvas.getBoundingClientRect();

        const pixel =
            new OpenSeadragon.Point(
                event.clientX - rect.left,
                event.clientY - rect.top
            );

        const vp =
            viewer.viewport.pointFromPixel(pixel);

        const noita =
            viewportToNoita(vp.x, vp.y); // use your function

        const coords =
            document.getElementById("coords");

        coords.innerText =
            `(${Math.round(noita.x)}, ${Math.round(noita.y)})`;

        coords.style.left =
            (event.clientX + 12) + "px";

        coords.style.top =
            (event.clientY) + "px";
    }
);

function createSubLayerButton(layer, sublayer)
{

    const visible = sublayerStates[sublayer.id] ?? (sublayer.defaultOn ?? true);

    const img = document.createElement("img");

    img.src = sublayer.icon ?? layer.icon;

    img.className = "layerButton";

    if (visible)
    {
        img.classList.add("active");
        img.classList.remove("inactive");
    }
    else
    {
        img.classList.remove("active");
        img.classList.add("inactive");
    }

    img.addEventListener("mouseenter", function(e)
    {
        showButtonTooltip(sublayer.label ?? sublayer.id, e.clientX, e.clientY);
    });

    img.addEventListener("mousemove", function(e)
    {
        showButtonTooltip(sublayer.label ?? sublayer.id, e.clientX, e.clientY);
    });

    img.addEventListener("mouseleave", hideButtonTooltip);

    img.addEventListener("click", function(e)
    {
        e.stopPropagation();

        // toggle with a safe default fallback
        sublayerStates[sublayer.id] = !(sublayerStates[sublayer.id] ?? (sublayer.defaultOn ?? true));

        if (sublayerStates[sublayer.id])
        {
            img.classList.add("active");
            img.classList.remove("inactive");
        }
        else
        {
            img.classList.remove("active");
            img.classList.add("inactive");
        }

        updateMarkerVisibility();
        saveState();
    });

    return img;
}

function showLayerTooltip(
    layer,
    anchor)
{

    clearTimeout(
    layerTooltipTimer
);

  if(currentLayer === layer.id)
        return;

    currentLayer =
        layer.id;

    const tooltip =
        document.getElementById(
            "layerTooltip"
        );

    tooltip.innerHTML = "";

    // Create buttons container
    const buttonsContainer = document.createElement("div");
    buttonsContainer.className = "layerTooltipButtons";

    // only show sublayers if layer is enabled
    if (layerStates[layer.id])
    {
        layer.sublayers.forEach(
            sublayer =>
            {
                buttonsContainer.appendChild(
                    createSubLayerButton(
                        layer,
                        sublayer
                    )
                );
            });
    }

    tooltip.appendChild(buttonsContainer);

    // Create and append title
    const title =
        document.createElement(
            "div"
        );

    title.className =
        "layerTooltipTitle";

    title.innerText =
        layer.id;

    tooltip.appendChild(
        title
    );

    tooltip.classList.add("visible");

    const rect = anchor.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();

    tooltip.style.left = (rect.left + rect.width / 2 - tooltipRect.width / 2) + "px";
    tooltip.style.top = (rect.bottom + 8) + "px";
}

let layerTooltipTimer;

function hideLayerTooltip()
{
    clearTimeout(
        layerTooltipTimer
    );

    layerTooltipTimer =
        setTimeout(
            function()
            {
                currentLayer = null;

                document
                    .getElementById(
                        "layerTooltip"
                    )
                    .classList
                    .remove(
                        "visible"
                    );
            },

            70
        );
}

const tooltip =
    document.getElementById(
        "layerTooltip"
    );

tooltip.addEventListener(
    "mouseenter",

    function()
    {
        clearTimeout(
            layerTooltipTimer
        );
    });

tooltip.addEventListener(
    "mouseleave",

    hideLayerTooltip
);


function updateMarkerVisibility()
{
    markerObjects.forEach(m => {
        viewer.removeOverlay(m.element);
    });

    markerObjects.forEach(m =>
    {
        const layerVisible = layerStates[m.layer] ?? true;
        const visible = sublayerStates[m.sublayer] ?? true;

        if (visible && layerVisible)
        {
            viewer.addOverlay({
                element: m.element,
                location: m.location
            });
            m.element.style.display = "block";
        }
        else
        {
            m.element.style.display = "none";
        }
    });
}

let currentLayer = null;

function showButtonTooltip(
    text,
    x,
    y)
{
    const tooltip =
        document.getElementById(
            "buttonTooltip"
        );

    tooltip.innerText =
        text;

    tooltip.style.display =
        "block";

    tooltip.style.left =
        (x - tooltip.offsetWidth / 2 + 3) + "px";

    tooltip.style.top =
        (y + 14) + "px";
}

function hideButtonTooltip()
{
    document
        .getElementById(
            "buttonTooltip"
        )
        .style.display =
        "none";
}

function updateUncheckButtonVisibility()
{
    const uncheckBtn = document.getElementById('uncheckAllBtn');
    if (uncheckBtn) {
        uncheckBtn.style.display = checkedMarkers.size > 0 ? 'flex' : 'none';
    }
}

// State persistence (localStorage)
function saveState()
{
    const state = {
        currentMapId,
        mapStates: Object.fromEntries(
            Object.entries(mapStates).map(([id, mapState]) => [id, {
                layerStates: { ...mapState.layerStates },
                sublayerStates: { ...mapState.sublayerStates },
                checkedMarkers: Array.from(mapState.checkedMarkers)
            }])
        ),
        tutorialVisible: document.getElementById('tutorialPanel')?.classList.contains('visible') ?? true
    };
    localStorage.setItem('noitaMapState', JSON.stringify(state));
}

function loadState()
{
    const saved = localStorage.getItem('noitaMapState');
    if (!saved) {
        applyMapState(currentMapId);
        syncLayerButtonState();
        updateMarkerVisibility();
        refreshCheckedMarkerVisuals();
        updateUncheckButtonVisibility();
        return;
    }
    
    try {
        const state = JSON.parse(saved);

        if (state.currentMapId && mapDefinitions.some(map => map.id === state.currentMapId)) {
            currentMapId = state.currentMapId;
        }

        if (state.mapStates) {
            Object.entries(state.mapStates).forEach(([id, savedMapState]) => {
                const mapState = ensureMapState(id);
                mapState.layerStates = { ...(savedMapState.layerStates || {}) };
                mapState.sublayerStates = { ...(savedMapState.sublayerStates || {}) };
                mapState.checkedMarkers = new Set(savedMapState.checkedMarkers || []);
            });
        }

        applyMapState(currentMapId);
        syncLayerButtonState();
        updateMarkerVisibility();
        refreshCheckedMarkerVisuals();

        const selector = document.getElementById('mapSelector');
        if (selector)
            selector.value = currentMapId;
        
        if (state.tutorialVisible !== undefined) {
            const panel = document.getElementById('tutorialPanel');
            const toggle = document.getElementById('tutorialToggle');
            if (panel && toggle) {
                if (state.tutorialVisible) {
                    panel.classList.add('visible');
                    toggle.classList.add('active');
                } else {
                    panel.classList.remove('visible');
                    toggle.classList.remove('active');
                }
            }
        }
    } catch (e) {
        console.error('Failed to load saved state:', e);
    }
    
    updateUncheckButtonVisibility();
}

// Tutorial panel + toggle (top-right)
function loadTutorialPannel()
{
    // create uncheck all button
    const uncheckBtn = document.createElement('button');
    uncheckBtn.id = 'uncheckAllBtn';
    uncheckBtn.title = 'Uncheck all marks';
    uncheckBtn.type = 'button';
    uncheckBtn.innerText = 'Uncheck all';
    uncheckBtn.style.display = 'none';
    document.body.appendChild(uncheckBtn);

    uncheckBtn.addEventListener('click', function()
    {
        checkedMarkers.forEach(id => {
            checkedMarkers.delete(id);
            updateMarkerVisual(id);
        });
        saveState();
        updateUncheckButtonVisibility();
    });

    // create toggle button
    const toggle = document.createElement('button');
    toggle.id = 'tutorialToggle';
    toggle.title = 'Toggle tutorial';
    toggle.type = 'button';
    toggle.innerText = '?';
    document.body.appendChild(toggle);

    // create panel
    const panel = document.createElement('div');
    panel.id = 'tutorialPanel';
    panel.innerHTML = `
        <div class="header">
            <div class="title">Quick Tutorial</div>
            <button class="closeBtn" title="Close">✕</button>
        </div>
        <div class="content">
            <p>Welcome to the Kunavi's NoitaMap.</p>
            <p>This is uniform map for most popular terrain-appending mods.</p>
            <p>Use the layer buttons to toggle marker sets.</p>
            <p>Hover markers for details.</p>
            <p>Left-click on a marker to mark it as completed.</p>
            <p>Scroll to zoom and drag to pan.</p>
           <div class="header"><div class="title">Happy Noiting!</div></div>
         </div>
       
    `;
    document.body.appendChild(panel);

    // open by default
    panel.classList.add('visible');
    toggle.classList.add('active');

    toggle.addEventListener('click', function()
    {
        panel.classList.toggle('visible');
        toggle.classList.toggle('active');
        saveState();
    });

    panel.querySelector('.closeBtn').addEventListener('click', function()
    {
        panel.classList.remove('visible');
        toggle.classList.remove('active');
        saveState();
    });

}

function updateScale() {
    const scale = Math.min(
        window.innerWidth / 1920,
        window.innerHeight / 1080
    );

    document.documentElement.style.setProperty('--scale', scale);
}

window.addEventListener('resize', updateScale);
updateScale();
setupMarkerTooltipListeners();
