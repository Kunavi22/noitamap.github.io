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

const sublayerStates = {};

let tooltipMode = "marker"; 
// "marker" | "label"

const markerObjects = [];

const checkedMarkers = new Set();

const layerStates = {};

let markerTooltipTimer;

loadMap();

createLayerButtons();
loadMarkers();
loadTutorialPannel();

function addMap(tile)
{
    viewer.addTiledImage({
        tileSource: tile,
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

        

   const layers =
[
{
    id:"Noita",

    icon:"icons/noitaLogo.png",

    sublayers:
    [
        { id: "vanilla_bosses", label: "Bosses" , icon:"icons/boss.webp", defaultOn: true},
        { id: "vanilla_structures", label: "Structures" , icon:"icons/Star.png", defaultOn: false},
        { id: "vanilla_items", label: "Items", icon:"icons/Vanilla/Items/evil_eye.png" , defaultOn: false},
        { id: "vanilla_orbs", label: "Orbs", icon:"icons/Vanilla/Items/icon-orbs.webp" , defaultOn: true}
    ],

    defaultOn: false
},

{
    id:"Apotheosis",

    icon:"icons/Apotheosis.png",

    sublayers:
    [
         { id: "apotheosis_bosses", label: "Bosses" , icon:"icons/boss.webp", defaultOn: true},
         { id: "apotheosis_orbs", label: "Orbs", icon:"icons/Vanilla/Items/icon-orbs.webp" , defaultOn: true}
    ],

    defaultOn: false
},

{
    id:"Chemical curiosities",

    icon:"icons/ChemicalCuriosities.png",

    sublayers:
    [
        
    ],

    defaultOn: false
},

{
    id:"Graham's things",

    icon:"icons/Graham.png",

    sublayers:
    [
        
    ],

    defaultOn: false
},

{
    id:"New enemies",

    icon:"icons/NewEnemies2.png",

    sublayers:
    [
        
    ],

    defaultOn: false
},

{
    id:"Other",

    icon:"icons/Other.png",

    sublayers:
    [
        
    ],

    defaultOn: false
}
];

    layers.forEach(
        layer =>
        {

            layer.sublayers.forEach(sublayer =>
            {
                // keep sublayers enabled by default for now
                sublayerStates[sublayer.id] = sublayer.defaultOn ?? true;
            });

            const img =
                document.createElement(
                    "img"
                );

            img.src = layer.icon;

            img.className = "layerButton";

            img.dataset.layer = layer.id;

            // use layer.defaultOn when provided, otherwise default to true
            const defaultOn = layer.defaultOn ?? true;
            layerStates[layer.id] = defaultOn;

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

function loadMap()
{

  viewer.addTiledImage({
        tileSource:
        "maps/regular-main-branch-middle-2025-01-25-786433191.dzi",

        x: 0.9859
    });

    viewer.addTiledImage({
        tileSource:
        "maps/regular-main-branch-left-2025-01-25-786433191.dzi",

        x: 0
    });

  

    viewer.addTiledImage({
        tileSource:
        "maps/regular-main-branch-right-2025-01-25-786433191.dzi",

        x: 1.9718,
         y: -0.0125   // start small
    });
}

async function loadMarkers()
{
    const markers =
        await fetch("data/markers.json")
        .then(r => r.json());

    markers.forEach(
        createMarker
    );

    loadState();
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
    document
        .getElementById(
            "tooltip"
        )
        .style.display =
        "none";
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
    // markerObjects.forEach(m =>
    // {
    //     const visible =
    //         sublayerStates[m.sublayer] ?? true;

    //     m.element.style.display =
    //         visible ? "block" : "none";
    // });

    
    
   markerObjects
        .forEach(m =>
        {

            const layerVisible = layerStates[m.layer] ?? true;

            const visible =
            sublayerStates[m.sublayer] ?? true;

            if(visible && layerVisible)
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
        layerStates: layerStates,
        sublayerStates: sublayerStates,
        checkedMarkers: Array.from(checkedMarkers),
        tutorialVisible: document.getElementById('tutorialPanel')?.classList.contains('visible') ?? true
    };
    localStorage.setItem('noitaMapState', JSON.stringify(state));
}

function loadState()
{
    const saved = localStorage.getItem('noitaMapState');
    if (!saved) return;
    
    try {
        const state = JSON.parse(saved);
        
        // restore layer states
        if (state.layerStates) {
            Object.assign(layerStates, state.layerStates);
            document.querySelectorAll('.layerButton[data-layer]').forEach(btn => {
                const layer = btn.dataset.layer;
                if (layerStates[layer]) {
                    btn.classList.add('active');
                    btn.classList.remove('inactive');
                } else {
                    btn.classList.remove('active');
                    btn.classList.add('inactive');
                }
            });
        }
        
        // restore sublayer states
        if (state.sublayerStates) {
            Object.assign(sublayerStates, state.sublayerStates);
        }
        
        // Update marker visibility after restoring both layer and sublayer states
        updateMarkerVisibility();
        
        // restore checked markers
        if (state.checkedMarkers && Array.isArray(state.checkedMarkers)) {
            state.checkedMarkers.forEach(id => checkedMarkers.add(id));
            markerObjects.forEach(m => {
                if (checkedMarkers.has(m.id)) {
                    m.element.classList.add('checked');
                }
            });
        }
        
        // restore tutorial state
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