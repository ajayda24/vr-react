import { useEffect } from "react";
// import AFRAME from "aframe";

const KentSanctuary = () => {
  useEffect(() => {
    // Inline scripts from the HTML are moved here
    AFRAME.registerComponent("infoicon", {
      schema: {
        linkto: { type: "string", default: "" },
        infogroup: { type: "string", default: "" },
      },
      init: function () {
        this.el.setAttribute("src", "#info-icon");
        this.el.setAttribute("scale", "0.5 0.5 0.5");
        this.el.setAttribute("look-at", "#cam");

        const data = this.data;
        this.el.addEventListener("click", function () {
          this.setAttribute("scale", "2.5 1.25 1");
          this.setAttribute("src", data.linkto);
        });
      },
    });

    AFRAME.registerComponent("hotspots", {
      init: function () {
        this.el.addEventListener("reloadspots", function (evt) {
          const currspotgroup = document.getElementById(evt.detail.currspots);
          currspotgroup.setAttribute("scale", "0 0 0");
          const newspotgroup = document.getElementById(evt.detail.newspots);
          newspotgroup.setAttribute("scale", "1 1 1");
        });
      },
    });

    function loadNewSpotDetails() {
      const sky = document.getElementById("skybox");
      sky.setAttribute("src", ndata.linkto);
      const spotcomp = document.getElementById("spots");
      const currspots = nthis.parentElement.getAttribute("id");
      spotcomp.emit("reloadspots", { newspots: ndata.spotgroup, currspots });
      document.getElementById("cam").emit("zoomout"); // Trigger zoom out animation
    }

    let ndata;
    let nthis;

    AFRAME.registerComponent("spot", {
      schema: {
        linkto: { type: "string", default: "" },
        spotgroup: { type: "string", default: "" },
      },
      init: function () {
        this.el.setAttribute("src", "#hotspot");
        this.el.setAttribute("look-at", "#cam");
        const data = this.data;
        this.el.addEventListener("click", function () {
          ndata = data;
          nthis = this;
          const cam = document.getElementById("cam");
          cam.emit("zoomin");
        });
      },
    });

    window.addEventListener("wheel", (event) => {
      const delta = event.wheelDelta / 120 / 10;
      const cam = document.getElementById("cam");
      const camAttributes = cam.getAttribute("camera");
      let finalzoom = camAttributes.zoom + delta;
      if (finalzoom < 0.5) finalzoom = 0.5;
      if (finalzoom > 2) finalzoom = 2;
      camAttributes.zoom = finalzoom;
      cam.setAttribute("camera", camAttributes);
    });

    const cam = document.getElementById("cam");
    cam.addEventListener("animationcomplete__zoomin", function () {
      loadNewSpotDetails();
    });

    cam.addEventListener("animationcomplete__zoomout", function () {
      // Any additional actions after zoom out can be added here.
    });
  }, []);

  return (
    <a-scene background="color: #FAFAFA" cursor="rayOrigin: mouse">
      <a-assets>
        <a-mixin
          id="hotspot-text"
          text="font: roboto; width: 2; align: center; color: black;"
          geometry="primitive: plane; width: 0.68; height: 0.11"
        ></a-mixin>
        {/* Main Gate */}
        <img id="room0" src="images/p0_0.jpg" alt="room0" />
        {/* Flat Entrance */}
        <img id="room1" src="images/p0_1.jpg" alt="room1" />
        {/* Open Lobby */}
        <img id="room2" src="images/p0_2.jpg" alt="room2" />
        {/* Open Lounge */}
        <img id="room3" src="images/p0_3.jpg" alt="room3" />
        {/* Grand Lounge */}
        <img id="room4" src="images/p0_4.jpg" alt="room4" />
        {/* Multi Gym */}
        <img id="room5" src="images/p0_5.jpg" alt="room5" />
        {/* Game Lounge */}
        <img id="room6" src="images/p0_6.jpg" alt="room6" />
        {/* Co-working Space */}
        <img id="room7" src="images/p0_7.jpg" alt="room7" />
        {/* Main Lift Lobby */}
        <img id="room8" src="images/p0_8.jpg" alt="room8" />
        {/* Shuttle Court */}
        <img id="room9" src="images/p0_9.jpg" alt="room9" />
        <img id="hotspot" src="images/Eye.png" alt="hotspot" />
      </a-assets>

      <a-entity id="spots" hotspots>
        <a-entity id="group-room0">
          <a-text
            position="-2 1.55 0.30"
            geometry="primitive: plane; width: .35; height: 0.11"
            value="Gate Entrance"
            mixin="hotspot-text"
            rotation="0 90 0"
          ></a-text>
          <a-image
            spot="linkto:#room1; spotgroup:group-room1"
            position="-6.91 1 0"
          ></a-image>
        </a-entity>

        <a-entity id="group-room1" scale="0 0 0">
          <a-text
            position="-1.50 1.55 -0.70"
            geometry="primitive: plane; width: .40; height: 0.11"
            value="Open Lobby"
            mixin="hotspot-text"
            rotation="0 45 0"
          ></a-text>
          <a-image
            spot="linkto:#room2; spotgroup:group-room2"
            position="-6.865 2 -4.50"
          ></a-image>
          <a-text
            position="3.5 2.01 1"
            geometry="primitive: plane; width: .33; height: 0.11"
            value="Exit"
            mixin="hotspot-text"
            rotation="0 250 0"
          ></a-text>
          <a-image
            spot="linkto:#room0; spotgroup:group-room0"
            position="6.865 2 1.89"
          ></a-image>
        </a-entity>

        <a-entity id="group-room2" scale="0 0 0">
          <a-text
            position="-0.50 1.45 -0.70"
            geometry="primitive: plane; width: .33; height: 0.11"
            value="Open Lounge"
            mixin="hotspot-text"
            rotation="0 45 0"
          ></a-text>
          <a-image
            spot="linkto:#room3; spotgroup:group-room3"
            position="-2 1.5 -4"
          ></a-image>
          <a-text
            position="1.08 1.60 -0.16"
            geometry="primitive: plane; width: .33; height: 0.11"
            value="Open Lobby"
            mixin="hotspot-text"
            rotation="0 -90 0"
          ></a-text>
          <a-image
            spot="linkto:#room1; spotgroup:group-room1"
            position="4 1 0"
          ></a-image>
        </a-entity>

        <a-entity id="group-room3" scale="0 0 0">
          <a-text
            position="0.4 1.6 1"
            geometry="primitive: plane; width: .33; height: 0.11"
            value="Grand Lounge"
            mixin="hotspot-text"
            rotation="0 180 0"
          ></a-text>
          <a-image
            spot="linkto:#room4; spotgroup:group-room4"
            position="2 1 5"
          ></a-image>
          <a-text
            position="1.08 1.65 .16"
            geometry="primitive: plane; width: .33; height: 0.11"
            value="Open Lounge"
            mixin="hotspot-text"
            rotation="0 -90 0"
          ></a-text>
          <a-image
            spot="linkto:#room2; spotgroup:group-room2"
            position="4 1.01 0"
          ></a-image>
        </a-entity>

        <a-entity id="group-room4" scale="0 0 0">
          <a-text
            position="-2 1.58 .16"
            geometry="primitive: plane; width: .33; height: 0.11"
            value="Grand Lounge"
            mixin="hotspot-text"
            rotation="0 90 0"
          ></a-text>
          <a-image
            spot="linkto:#room3; spotgroup:group-room3"
            position="-8 1 0"
          ></a-image>
          <a-text
            position="-1.08 1.58 -1.50"
            geometry="primitive: plane; width: .33; height: 0.11"
            value="Game Lounge"
            mixin="hotspot-text"
            rotation="0 55 0"
          ></a-text>
          <a-image
            spot="linkto:#room6; spotgroup:group-room6"
            position="-4 1 -5"
          ></a-image>
          <a-text
            position="0 1.58 -1.50"
            geometry="primitive: plane; width: .33; height: 0.11"
            value="Co-working Space"
            mixin="hotspot-text"
            rotation="0 15 0"
          ></a-text>
          <a-image
            spot="linkto:#room7; spotgroup:group-room7"
            position="-1 1 -5"
          ></a-image>
          <a-text
            position="1.08 1.58 -1.50"
            geometry="primitive: plane; width: .33; height: 0.11"
            value="Multi Gym"
            mixin="hotspot-text"
            rotation="0 -35 0"
          ></a-text>
          <a-image
            spot="linkto:#room5; spotgroup:group-room5"
            position="4 1 -5"
          ></a-image>
          <a-text
            position="2 1.58 .13"
            geometry="primitive: plane; width: .33; height: 0.11"
            value="Main Lift Lobby"
            mixin="hotspot-text"
            rotation="0 -90 0"
          ></a-text>
          <a-image
            spot="linkto:#room8; spotgroup:group-room8"
            position="6 1 -1"
          ></a-image>
        </a-entity>

        <a-entity id="group-room5" scale="0 0 0">
          <a-text
            position="1.08 1.81 -1.16"
            geometry="primitive: plane; width: .33; height: 0.11"
            value="Exit"
            mixin="hotspot-text"
            rotation="0 -60 0"
          ></a-text>
          <a-image
            spot="linkto:#room4; spotgroup:group-room4"
            position="4 1.8 -4"
          ></a-image>
        </a-entity>

        <a-entity id="group-room6" scale="0 0 0">
          <a-text
            position="1.08 1.61 1.58"
            geometry="primitive: plane; width: .33; height: 0.11"
            value="Exit"
            mixin="hotspot-text"
            rotation="0 -120 0"
          ></a-text>
          <a-image
            spot="linkto:#room4; spotgroup:group-room4"
            position="3 1 5"
          ></a-image>
        </a-entity>

        <a-entity id="group-room7" scale="0 0 0">
          <a-text
            position="-1.08 1.61 1.10"
            geometry="primitive: plane; width: .33; height: 0.11"
            value="Exit"
            mixin="hotspot-text"
            rotation="0 110 0"
          ></a-text>
          <a-image
            spot="linkto:#room4; spotgroup:group-room4"
            position="-4.5 1 4"
          ></a-image>
        </a-entity>

        <a-entity id="group-room8" scale="0 0 0">
          <a-text
            position="-0.08 1.56 2.16"
            geometry="primitive: plane; width: .33; height: 0.11"
            value="Grand Lounge"
            mixin="hotspot-text"
            rotation="0 180 0"
          ></a-text>
          <a-image
            spot="linkto:#room4; spotgroup:group-room4"
            position="-1 1 8"
          ></a-image>
          <a-text
            position="0.59 1.91 -2.16"
            geometry="primitive: plane; width: .33; height: 0.11"
            value="Shuttle Court"
            mixin="hotspot-text"
            rotation="0 20 0"
          ></a-text>
          <a-image
            spot="linkto:#room9; spotgroup:group-room9"
            position="1 1.8 -4"
          ></a-image>
        </a-entity>

        <a-entity id="group-room9" scale="0 0 0">
          <a-text
            position="1.08 1.61 0.46"
            geometry="primitive: plane; width: .33; height: 0.11"
            value="Main Lift Lobby"
            mixin="hotspot-text"
            rotation="0 -90 0"
          ></a-text>
          <a-image
            spot="linkto:#room8; spotgroup:group-room8"
            position="4.5 1 2"
          ></a-image>
          <a-text
            position="-1.08 1.81 .10"
            geometry="primitive: plane; width: .33; height: 0.11"
            value="Exit"
            mixin="hotspot-text"
            rotation="0 90 0"
          ></a-text>
          <a-image
            spot="linkto:#room0; spotgroup:group-room0"
            position="-4 1.8 0.1"
          ></a-image>
        </a-entity>
      </a-entity>

      <a-sky id="skybox" src="#room0"></a-sky>

      <a-entity
        id="cam"
        camera="zoom:1"
        position="0 1.6 0"
        look-controls="reverseMouseDrag: false"
        wasd-controls
        animation__zoomin="property: camera.zoom; startEvents: zoomin; from: 1; to: 2; dur: 1000; easing: linear"
        animation__zoomout="property: camera.zoom; startEvents: zoomout; from: 2; to: 1; dur: 1000; easing: linear"
      ></a-entity>
    </a-scene>
  );
};

export default KentSanctuary;
