const viewer = OpenSeadragon({

    id:"viewer",

    prefixUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/openseadragon/4.1.1/images/",

    maxZoomPixelRatio:32,

    zoomPerScroll:1.4,

    background:"#000000"
});


const markersOpacity = 0.4;

const sublayerStates = {};

let tooltipMode = "marker"; 
// "marker" | "label"

const markerObjects = [];

const checkedMarkers = new Set();

const layerStates = {};

loadMap();
createLayerButtons();
loadMarkers();

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
    id:"Vanilla",

    icon:"icons/noitaLogo.png",

    sublayers:
    [
        { id: "vanilla_bosses", label: "bosses" , icon:"icons/Star.png"},
        { id: "vanilla_structures", label: "structures" , icon:"icons/Star.png"},
        { id: "vanilla_items", label: "items", icon:"icons/Star.png" }
    ]
},

{
    id:"Apotheosis",

    icon:"icons/Apotheosis.png",

    sublayers:
    [
        { id: "Apotheosis_bosses", label: "bosses" , icon:"icons/Star.png"},
        { id: "Apotheosis_structures", label: "structures" , icon:"icons/Star.png"},
        { id: "Apotheosis_items", label: "items", icon:"icons/Star.png" }
    ]
},

{
    id:"Chemical curiosities",

    icon:"icons/ChemicalCuriosities.png",

    sublayers:
    [
        { id: "vanilla_bosses", label: "bosses" , icon:"icons/Star.png"},
        { id: "vanilla_structures", label: "structures" , icon:"icons/Star.png"},
        { id: "vanilla_items", label: "items", icon:"icons/Star.png" }
    ]
},

{
    id:"Graham's things",

    icon:"icons/Graham.png",

    sublayers:
    [
        { id: "vanilla_bosses", label: "bosses" , icon:"icons/Star.png"},
        { id: "vanilla_structures", label: "structures" , icon:"icons/Star.png"},
        { id: "vanilla_items", label: "items", icon:"icons/Star.png" }
    ]
},

{
    id:"New enemies",

    icon:"icons/NewEnemies2.png",

    sublayers:
    [
        { id: "vanilla_bosses", label: "bosses" , icon:"icons/Star.png"},
        { id: "vanilla_structures", label: "structures" , icon:"icons/Star.png"},
        { id: "vanilla_items", label: "items", icon:"icons/Star.png" }
    ]
},

{
    id:"Other",

    icon:"icons/other.png",

    sublayers:
    [
        { id: "vanilla_bosses", label: "bosses" , icon:"icons/Star.png"},
        { id: "vanilla_structures", label: "structures" , icon:"icons/Star.png"},
        { id: "vanilla_items", label: "items", icon:"icons/Star.png" }
    ]
}
];

    layers.forEach(
        layer =>
        {

             layer.sublayers.forEach(sublayer =>
            {
                sublayerStates[sublayer.id] = true;
            });

            const img =
                document.createElement(
                    "img"
                );

               

            img.src = layer.icon;

            img.className = "layerButton active";

            img.dataset.layer = layer.id;

            layerStates[layer.id] = true;

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

                        currentLayer = null;

                        document
                            .getElementById(
                                "layerTooltip"
                            )
                            .classList
                            .remove(
                                "visible"
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

                         showLayerTooltip(
                            layer,
                            img
                        );
                    }

                    toggleLayer(
                        layer.id,
                        !enabled
                    );
                };

                img.addEventListener(
                    "mouseenter",

                    function()
                    {
                        if(layerStates[layer.id])
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
        "maps/regular-main-branch-left-2025-01-25-786433191.dzi",

        x: 0
    });

    viewer.addTiledImage({
        tileSource:
        "maps/regular-main-branch-middle-2025-01-25-786433191.dzi",

        x: 0.9859
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

    

    img.addEventListener("contextmenu", e =>
    {
    e.preventDefault();

    toggleMarkerCheck(makeId(data.title));
    });


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

        showTooltip(
            data,
            e.clientX,
            e.clientY
        );
    });

    img.addEventListener(
    "mouseleave",
    () =>
    {
        img.style.opacity = markersOpacity;
    });

    img.addEventListener(
    "mouseenter",
    e =>
    {
        showTooltip(
            data,
            e.clientX,
            e.clientY
        );
    });

    img.addEventListener(
    "mousemove",
    e =>
    {
        moveTooltip(
            e.clientX,
            e.clientY
        );
    });


    img.style.pointerEvents =
    "auto";

    img.title =
        data.title;



        new OpenSeadragon.MouseTracker({
    element: img,

    clickHandler: function()
    {
        if(data.url && data.url.length > 0)
        {
            window.open(
                data.url,
                "_blank"
            );
        }
    }
});

    img.addEventListener(
    "mouseleave",
    hideTooltip
    );

   const location =
    noitaToViewport(
        data.x,

        data.y
    );

    viewer.addOverlay({
        element: img,

        location: location
    });




        markerObjects.push({
            id: makeId(data.title),

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
}

function showTooltip(data,x,y)
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

              tooltip.style.display =
        "flex";

    tooltip.style.left =
        (x - tooltip.offsetWidth / 2) + "px";

    tooltip.style.top =
    (y - tooltip.offsetHeight - 12) + "px";


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

    const visible =
    sublayerStates[sublayer] ?? true;

    

    const img =
        document.createElement("img");

    img.src =
        sublayer.icon ??
        layer.icon;

    img.className =
        "layerButton";

         if(sublayerStates[sublayer.id])
        {
            img.classList.add(
                "active"
            );

            img.classList.remove(
                "inactive"
            );
        }
        else
        {
            img.classList.remove(
                "active"
            );

            img.classList.add(
                "inactive"
            );
        }

        img.addEventListener(
    "mouseenter",


    function(e)
    {
        showButtonTooltip(
            sublayer.label ??
            sublayer.id,

            e.clientX,

            e.clientY
        );
    });

img.addEventListener(
    "mousemove",

    function(e)
    {
        showButtonTooltip(
            sublayer.label ??
            sublayer.id,

            e.clientX,

            e.clientY
        );
    });

img.addEventListener(
    "mouseleave",

    hideButtonTooltip
);

    img.classList.add("active");

    img.addEventListener(
    "click",

    function(e)
    {
        e.stopPropagation();

        sublayerStates[sublayer.id] =
            !sublayerStates[sublayer.id];

        if(sublayerStates[sublayer.id])
        {
            img.classList.add(
                "active"
            );

            img.classList.remove(
                "inactive"
            );
        }
        else
        {
            img.classList.remove(
                "active"
            );

            img.classList.add(
                "inactive"
            );
        }

        updateMarkerVisibility();
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


//     const enabled =
//     img.classList.contains(
//         "active"
//     );

// if (!enabled)
    layer.sublayers.forEach(
        sublayer =>
        {
            tooltip.appendChild(
                createSubLayerButton(
                    layer,
                    sublayer
                )
            );
        });
      

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

    // const rect =
    //     anchor.getBoundingClientRect();

         tooltip.classList.add("visible");
        // tooltip.style.visibility = "hidden";
        // tooltip.style.display = "flex";

        const rect = anchor.getBoundingClientRect();
        const tooltipRect = tooltip.getBoundingClientRect();

            tooltip.style.left = (rect.left + rect.width / 2 - tooltipRect.width / 2) + "px";
        tooltip.style.top = (rect.bottom + 8) + "px";

            tooltip.classList.add(
                "visible"
            );
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