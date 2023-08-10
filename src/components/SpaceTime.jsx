import React from "react";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";
import { Dot } from "./";

const data = [
  {
    city: "Marfa",
    state: "Texas",
    lat: 30.310646822592897,
    long: -104.02083509934168,
  },
  {
    city: "Cologne",
    state: "Germany",
    lat: 50.93725424444354,
    long: 6.963878595994134,
  },
  {
    city: "New York",
    state: "New York",
    lat: 40.70951235877124,
    long: -74.01543765182817,
  },
  {
    city: "Beacon",
    state: "New York",
    lat: 41.504698143404106,
    long: -73.96911047641316,
  },
];

const SpaceTime = () => {
  const handlerRef = useRef(null);
  const horizontalRef = useRef(null);
  const verticalRef = useRef(null);
  const locationRef = useRef(null);
  const yearLabelRef = useRef(null);
  const locationLabelRef = useRef(null);
  const bottomDotRef = useRef(null);
  const contentRef = useRef(null);
  gsap.registerPlugin(ScrollTrigger);
  gsap.registerPlugin(Draggable);
  const yearInterval = 1;
  const startYear = 1983;
  const endYear = 2024;

  let cities = [];
  let states = [];
  let lats = [];
  let longs = [];
  //turn data into lists
  for (let i = 0; i<data.length; i++){
    cities.push(data[i].city)
    states.push(data[i].state)
    lats.push(data[i].lat)
    longs.push(data[i].long)
  }

  const getMin = (list) => {
    let min = 0;
    for (let i = 0; i < list.length; i++) {
      if (i < min) {
        min = i;
      }
    }
    return min;
  };

  const getMax = (list) => {
    let max = 0;
    for (let i = 0; i < list.length; i++) {
      if (i > max) {
        max = i;
      }
    }
    return max;
  };

  const getScreenCoordinates = (
    lat,
    long,
    minLat,
    maxLat,
    minLong,
    maxLong
  ) => {
    //no negative values
    //min possible lat is -90
    let scaledMinLat = minLat + 90;
    let scaledMaxLat = maxLat + 90;

    //min possible lat is -180
    let scaledMinLong = minLong + 180;
    let scaledMaxLong = maxLong + 180;

    const latRange = scaledMaxLat - scaledMinLat;
    const longRange = scaledMaxLong - scaledMinLong;

    let scaledLat = lat + 90;
    let scaledLong = long + 90;

    let x = (scaledLat / latRange) * window.innerWidth;
    let y = (scaledLong / longRange) * window.innerHeight;

    return { x: x, y: y };
  };

  useEffect(() => {
    //set up location values
    for(let i = 0; i < cities.length; i++){

    }

    //set up navigation values
    let handler = handlerRef.current,
      barLength,
      maxScroll,
      trigger,
      draggable;
    console.log(handler);

    // this ScrollTrigger will use the window/<body> by default, calling onRefresh when the page resizes, and onUpdate whenever any scroll happens.
    trigger = ScrollTrigger.create({
      onRefresh: onResize,
      onUpdate: updateHandler,
      // markers: true,
    });

    draggable = Draggable.create(handler, {
      type: "x,y",
      // bounds: ".merp",
      onDragStart: function () {
        gsap.to(bottomDotRef.current, { top: 28, duration: 0.1 });
        gsap.to(locationLabelRef.current, { opacity: 1, duration: 0.2 });
        gsap.to(contentRef.current, { opacity: 0.2, duration: 0.2 });
      },
      onDrag: function () {
        horizontalRef.current.style.visibility = "visible";
        verticalRef.current.style.visibility = "visible";
        locationRef.current.style.visibility = "visible";

        trigger.scroll((this.y / barLength) * maxScroll); // when dragging, scroll the page to the corresponding ratio
        gsap.set(horizontalRef.current, { y: this.y });
        gsap.set(verticalRef.current, { x: this.x });
      },
      onDragEnd: function () {
        horizontalRef.current.style.visibility = "hidden";
        verticalRef.current.style.visibility = "hidden";
        locationRef.current.style.visibility = "hidden";
        gsap.to(bottomDotRef.current, { top: 0, duration: 0.1 });
        gsap.to(locationLabelRef.current, { opacity: 0, duration: 0.2 });
        gsap.to(contentRef.current, { opacity: 1, duration: 0.2 });
      },
    })[0];

    function onResize() {
      if (trigger) {
        maxScroll = ScrollTrigger.maxScroll(window); // record the maximum scroll value for the page
        barLength = document.querySelector(".bar").offsetHeight;
        updateHandler();
      }
    }
    onResize();

    function setText(x, y) {
      const percent = y / window.innerHeight;
      yearLabelRef.current.innerHTML =
        startYear + Math.round((endYear - startYear) * percent);
      locationLabelRef.current.innerHTML = "Location: " + x;
    }

    function updateHandler() {
      //move the handler to the corresponding ratio according to the page's scroll position.
      const newY = (barLength * trigger.scroll()) / maxScroll;
      setText(draggable.x, newY);
      gsap.set(handler, { y: newY });
      gsap.set(horizontalRef.current, { y: newY });
    }
  }, []);

  return (
    <div>
      <div
        ref={locationRef}
        className="invisible w-screen min-h-screen fixed top-0 left-0 right-0 bottom-0 justify-center align-center flex fixed"
      >
        {data.map((object, i) => <Dot object={object} key={i} />)}
        <img src="locations.svg" className="w-1/2"></img>
      </div>
      <div
        ref={verticalRef}
        className="bar bg-[#959BA2] mx-[20px] w-[2px] fixed top-0 left-0 bottom-0 opacity-50"
      ></div>
      <div
        id="handler"
        ref={handlerRef}
        className="fixed top-0 left-[10px] bottom-0"
      >
        <div className="w-[20px] h-[20px] rounded-full bg-[#959BA2]"></div>
        <span ref={yearLabelRef} className="relative -top-[22px] left-[25px]">
          Drag me
        </span>
        <div
          ref={bottomDotRef}
          className="w-[20px] h-[20px] rounded-full bg-[#959BA2] absolute top-0 left-0"
        ></div>
        <span
          ref={locationLabelRef}
          className="absolute left-[25px] top-[25px] opacity-0"
        >
          Location
        </span>
      </div>
      <div
        ref={horizontalRef}
        className="bg-[#959BA2] h-[2px] fixed top-[10px] left-0 right-0 opacity-50"
      ></div>
      <div ref={contentRef} className="h-[10000px] w-1/2 mx-[25%]">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Mus mauris vitae
        ultricies leo integer malesuada. In metus vulputate eu scelerisque. Hac
        habitasse platea dictumst quisque sagittis purus sit amet volutpat.
        Egestas pretium aenean pharetra magna ac placerat vestibulum lectus
        mauris. Mi sit amet mauris commodo quis imperdiet massa tincidunt nunc.
        Metus dictum at tempor commodo ullamcorper a lacus vestibulum. Fermentum
        posuere urna nec tincidunt praesent semper feugiat nibh. Eu consequat ac
        felis donec et odio. Amet risus nullam eget felis eget nunc lobortis
        mattis aliquam. Aliquam ultrices sagittis orci a scelerisque purus
        semper. Turpis in eu mi bibendum neque egestas. Pretium aenean pharetra
        magna ac placerat vestibulum lectus mauris ultrices. Fermentum posuere
        urna nec tincidunt praesent semper. Et ligula ullamcorper malesuada
        proin libero nunc. Cras semper auctor neque vitae tempus. Risus viverra
        adipiscing at in tellus integer feugiat scelerisque varius. Condimentum
        mattis pellentesque id nibh tortor. Faucibus pulvinar elementum integer
        enim neque. Nascetur ridiculus mus mauris vitae ultricies leo. Duis at
        tellus at urna. A erat nam at lectus urna duis convallis convallis. Quam
        elementum pulvinar etiam non quam lacus suspendisse. Urna nec tincidunt
        praesent semper feugiat nibh sed pulvinar proin. Pulvinar etiam non quam
        lacus suspendisse. Non quam lacus suspendisse faucibus interdum posuere
        lorem ipsum. Quis auctor elit sed vulputate. Tempor commodo ullamcorper
        a lacus vestibulum sed arcu. Non odio euismod lacinia at quis risus sed.
        Quis vel eros donec ac odio tempor. Posuere ac ut consequat semper
        viverra. Iaculis urna id volutpat lacus laoreet. Pulvinar mattis nunc
        sed blandit libero. Arcu non odio euismod lacinia at quis. Tincidunt
        vitae semper quis lectus nulla at volutpat diam ut. Facilisi nullam
        vehicula ipsum a. Dignissim suspendisse in est ante in nibh. Urna duis
        convallis convallis tellus. Egestas diam in arcu cursus euismod quis
        viverra nibh. Et molestie ac feugiat sed lectus vestibulum mattis
        ullamcorper velit. A diam maecenas sed enim ut sem viverra. Enim
        lobortis scelerisque fermentum dui faucibus in ornare. Consequat
        interdum varius sit amet mattis vulputate. Odio pellentesque diam
        volutpat commodo sed egestas egestas fringilla. Sed ullamcorper morbi
        tincidunt ornare. Eget magna fermentum iaculis eu non diam phasellus
        vestibulum lorem. Donec ultrices tincidunt arcu non sodales neque
        sodales ut. Nibh sed pulvinar proin gravida hendrerit lectus. Sit amet
        volutpat consequat mauris nunc congue nisi. Volutpat commodo sed egestas
        egestas fringilla phasellus faucibus scelerisque. Eget mauris pharetra
        et ultrices neque ornare aenean. Et molestie ac feugiat sed lectus
        vestibulum mattis. Condimentum vitae sapien pellentesque habitant morbi
        tristique senectus et. Nunc mattis enim ut tellus elementum. Massa
        sapien faucibus et molestie ac feugiat sed. Sodales neque sodales ut
        etiam sit. Mattis molestie a iaculis at. Diam vel quam elementum
        pulvinar etiam non. Nunc eget lorem dolor sed. Enim sed faucibus turpis
        in eu mi bibendum. Euismod quis viverra nibh cras pulvinar mattis nunc.
        Arcu non odio euismod lacinia at. Donec ultrices tincidunt arcu non.
        Ultricies leo integer malesuada nunc. Mauris sit amet massa vitae
        tortor. Justo eget magna fermentum iaculis eu. Ultricies mi eget mauris
        pharetra et ultrices neque ornare aenean. Pellentesque nec nam aliquam
        sem et tortor consequat id. Sed velit dignissim sodales ut eu sem
        integer. Neque ornare aenean euismod elementum nisi quis eleifend quam.
        Leo vel fringilla est ullamcorper eget nulla. Purus sit amet luctus
        venenatis. Fames ac turpis egestas maecenas pharetra convallis posuere.
        Tempor id eu nisl nunc mi. Tellus at urna condimentum mattis
        pellentesque id. Aenean et tortor at risus. In hac habitasse platea
        dictumst vestibulum rhoncus est pellentesque. Arcu ac tortor dignissim
        convallis aenean et tortor at risus. Accumsan in nisl nisi scelerisque
        eu. Vitae purus faucibus ornare suspendisse. Auctor neque vitae tempus
        quam pellentesque. Est ullamcorper eget nulla facilisi etiam dignissim
        diam quis enim. Sit amet venenatis urna cursus eget nunc scelerisque
        viverra mauris. Tellus orci ac auctor augue. Suspendisse interdum
        consectetur libero id faucibus nisl tincidunt eget nullam. Viverra
        suspendisse potenti nullam ac tortor vitae purus faucibus ornare. Mi in
        nulla posuere sollicitudin aliquam ultrices sagittis orci. Pellentesque
        habitant morbi tristique senectus. Aliquam nulla facilisi cras fermentum
        odio eu feugiat pretium nibh. Mi sit amet mauris commodo quis. Arcu
        vitae elementum curabitur vitae nunc sed velit. Sodales neque sodales ut
        etiam sit. Orci dapibus ultrices in iaculis nunc sed augue. Suscipit
        adipiscing bibendum est ultricies integer quis auctor elit. Nunc eget
        lorem dolor sed viverra ipsum nunc. Egestas erat imperdiet sed euismod
        nisi. Duis at consectetur lorem donec massa sapien. Ornare aenean
        euismod elementum nisi quis eleifend. A erat nam at lectus urna duis.
        Amet venenatis urna cursus eget nunc scelerisque viverra mauris in. Nisi
        est sit amet facilisis. Et tortor at risus viverra adipiscing at in.
        Dignissim cras tincidunt lobortis feugiat. Hendrerit gravida rutrum
        quisque non tellus orci ac auctor. Nunc sed augue lacus viverra vitae
        congue eu. In arcu cursus euismod quis. Eget nunc scelerisque viverra
        mauris. Odio pellentesque diam volutpat commodo sed egestas egestas.
        Sagittis purus sit amet volutpat consequat mauris. Ornare arcu odio ut
        sem nulla pharetra diam. At tellus at urna condimentum mattis
        pellentesque id nibh. Sed felis eget velit aliquet sagittis id
        consectetur purus. Quam pellentesque nec nam aliquam sem et. Mauris nunc
        congue nisi vitae suscipit. Aliquam sem fringilla ut morbi tincidunt
        augue interdum velit euismod. Metus vulputate eu scelerisque felis
        imperdiet proin fermentum leo. Amet nisl purus in mollis nunc. Sit amet
        venenatis urna cursus eget nunc scelerisque viverra mauris. Sagittis eu
        volutpat odio facilisis. Justo nec ultrices dui sapien eget mi. Porta
        lorem mollis aliquam ut porttitor leo a diam. Nunc non blandit massa
        enim nec dui nunc mattis enim. Enim blandit volutpat maecenas volutpat
        blandit aliquam etiam erat. Scelerisque purus semper eget duis at tellus
        at urna condimentum. Faucibus ornare suspendisse sed nisi lacus sed.
        Natoque penatibus et magnis dis parturient montes nascetur ridiculus
        mus. Pulvinar etiam non quam lacus suspendisse. Lobortis elementum nibh
        tellus molestie nunc non. Lorem ipsum dolor sit amet consectetur. Cursus
        euismod quis viverra nibh cras pulvinar mattis. Dictum non consectetur a
        erat nam at lectus. Id consectetur purus ut faucibus pulvinar elementum
        integer. Aliquam eleifend mi in nulla posuere. Vivamus arcu felis
        bibendum ut tristique et egestas. Diam in arcu cursus euismod quis.
        Felis eget nunc lobortis mattis aliquam faucibus purus in. Malesuada
        nunc vel risus commodo viverra maecenas accumsan. Risus quis varius quam
        quisque id diam. Montes nascetur ridiculus mus mauris vitae ultricies
        leo. Faucibus scelerisque eleifend donec pretium vulputate sapien.
        Pharetra vel turpis nunc eget lorem dolor sed. Faucibus a pellentesque
        sit amet porttitor eget dolor. Facilisi cras fermentum odio eu feugiat
        pretium. Accumsan sit amet nulla facilisi morbi. Et netus et malesuada
        fames ac turpis egestas integer eget. Massa vitae tortor condimentum
        lacinia. Varius sit amet mattis vulputate enim nulla aliquet porttitor.
        Mattis vulputate enim nulla aliquet porttitor lacus luctus. Tortor
        dignissim convallis aenean et tortor. Nulla malesuada pellentesque elit
        eget gravida cum sociis. Faucibus a pellentesque sit amet. Tortor at
        auctor urna nunc id cursus. Viverra vitae congue eu consequat ac felis.
        Ultricies tristique nulla aliquet enim tortor at. Eros in cursus turpis
        massa tincidunt dui ut ornare lectus. Lacus suspendisse faucibus
        interdum posuere lorem ipsum dolor. Nunc sed id semper risus in
        hendrerit gravida. Porttitor rhoncus dolor purus non enim praesent
        elementum. Ut venenatis tellus in metus vulputate eu. Libero enim sed
        faucibus turpis in. Etiam tempor orci eu lobortis elementum. Aliquet
        eget sit amet tellus cras. Adipiscing enim eu turpis egestas pretium
        aenean pharetra magna ac. Vivamus arcu felis bibendum ut tristique et
        egestas quis ipsum. Amet aliquam id diam maecenas ultricies mi eget. Est
        ultricies integer quis auctor elit sed vulputate. Porttitor lacus luctus
        accumsan tortor posuere ac ut consequat semper. Pharetra magna ac
        placerat vestibulum lectus. Vestibulum lorem sed risus ultricies
        tristique. Ipsum nunc aliquet bibendum enim facilisis gravida. Quis
        viverra nibh cras pulvinar mattis nunc sed blandit libero. Fermentum dui
        faucibus in ornare quam viverra orci sagittis. Amet est placerat in
        egestas erat imperdiet sed euismod nisi. Enim blandit volutpat maecenas
        volutpat blandit aliquam etiam erat. Non sodales neque sodales ut etiam
        sit amet nisl purus. Tempus egestas sed sed risus pretium quam
        vulputate. Ullamcorper eget nulla facilisi etiam dignissim diam quis
        enim. Et malesuada fames ac turpis egestas integer eget aliquet nibh.
        Sed arcu non odio euismod lacinia at. Nisl purus in mollis nunc sed. Id
        donec ultrices tincidunt arcu non sodales neque sodales ut. Senectus et
        netus et malesuada fames ac. Mauris pellentesque pulvinar pellentesque
        habitant morbi. Tortor pretium viverra suspendisse potenti nullam.
        Semper eget duis at tellus at urna condimentum. Magna sit amet purus
        gravida quis blandit. Condimentum mattis pellentesque id nibh tortor id
        aliquet lectus. Malesuada fames ac turpis egestas maecenas pharetra
        convallis. Condimentum vitae sapien pellentesque habitant morbi
        tristique senectus et. Amet venenatis urna cursus eget nunc. Sit amet
        cursus sit amet dictum sit amet. Est placerat in egestas erat imperdiet
        sed. Ac ut consequat semper viverra nam libero justo laoreet sit. Et
        ultrices neque ornare aenean euismod elementum. Volutpat sed cras ornare
        arcu dui. Quis lectus nulla at volutpat diam ut venenatis. Dui id ornare
        arcu odio ut. Posuere sollicitudin aliquam ultrices sagittis orci. Urna
        condimentum mattis pellentesque id nibh tortor id. In aliquam sem
        fringilla ut morbi tincidunt augue. Ut morbi tincidunt augue interdum
        velit euismod in pellentesque massa. Condimentum id venenatis a
        condimentum vitae sapien pellentesque habitant morbi. Aliquet porttitor
        lacus luctus accumsan tortor. Placerat in egestas erat imperdiet sed
        euismod nisi porta. Nunc aliquet bibendum enim facilisis gravida neque.
        Ac turpis egestas sed tempus urna. Ipsum dolor sit amet consectetur.
        Lorem ipsum dolor sit amet consectetur adipiscing elit. Amet justo donec
        enim diam vulputate ut pharetra sit amet. Adipiscing elit pellentesque
        habitant morbi tristique senectus et netus. Quam id leo in vitae turpis
        massa sed elementum tempus. Fringilla est ullamcorper eget nulla
        facilisi etiam dignissim. Malesuada fames ac turpis egestas sed. Quisque
        egestas diam in arcu cursus. Eget arcu dictum varius duis at
        consectetur. Potenti nullam ac tortor vitae purus. Integer malesuada
        nunc vel risus commodo viverra maecenas accumsan. Velit sed ullamcorper
        morbi tincidunt ornare massa eget. Vel turpis nunc eget lorem dolor sed
        viverra ipsum nunc. Lectus sit amet est placerat in egestas erat
        imperdiet. Mi bibendum neque egestas congue. Duis convallis convallis
        tellus id interdum velit. Etiam tempor orci eu lobortis elementum nibh
        tellus molestie nunc. Montes nascetur ridiculus mus mauris vitae
        ultricies leo integer.
      </div>
    </div>
  );
};

export default SpaceTime;
