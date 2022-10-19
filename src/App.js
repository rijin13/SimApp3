import './App.css';
import { Button, Avatar } from '@mui/material'
import { useEffect, useRef, createRef, useState } from 'react';


//gripper-0,0,-1   hand-0,0,99
function App() {

  {/* Screen freeze test-start */ }

  const [isLoading, setIsLoading] = useState(false);

  {/* Screen freeze test-end */ }

  //Button
  var B1 = useRef(null);
  var B2 = useRef(null);
  var B3 = useRef(null);
  var B4 = useRef(null);
  var B5 = useRef(null);
  var B6 = useRef(null);
  var B7 = useRef(null);
  var B8 = useRef(null);
  var B9 = useRef(null);
  var B10 = useRef(null);

  var handRef = useRef(null);
  var gripperRef = useRef(null);

  var [loopVariable, setVariable] = useState(false);

  //const [xval, setXval] = useState([""]);

  const [xval, setXval] = useState(new Array(11).fill(""));
  const [yval, setYval] = useState(new Array(11).fill(""));
  const [zval, setZval] = useState(new Array(11).fill("1"));

  const [xvalN, setXvalN] = useState(new Array(11).fill(0));
  const [yvalN, setYvalN] = useState(new Array(11).fill(0));
  const [zvalN, setZvalN] = useState(new Array(11).fill(1));

  // var [btn1xN, setbtn1xN] = useState("");
  //var [btn1yN, setbtn1yN] = useState("");
  //var [btn1zN, setbtn1zN] = useState("1");

  var [btn1N, setbtn1N] = useState("");
  var [btn2N, setbtn2N] = useState("");
  var [btn3N, setbtn3N] = useState("");
  var [btn4N, setbtn4N] = useState("");
  var [btn5N, setbtn5N] = useState("");
  var [btn6N, setbtn6N] = useState("");
  var [btn7N, setbtn7N] = useState("");
  var [btn8N, setbtn8N] = useState("");
  var [btn9N, setbtn9N] = useState("");
  var [btn10N, setbtn10N] = useState("");

  //Button

  var [Letter1, setLetter1] = useState("");
  var [Letter2, setLetter2] = useState("");
  var [Letter3, setLetter3] = useState("");
  var [Letter4, setLetter4] = useState("");
  var [Letter5, setLetter5] = useState("");
  var [Letter6, setLetter6] = useState("");
  var [Letter7, setLetter7] = useState("");
  var [Letter8, setLetter8] = useState("");
  var [Letter9, setLetter9] = useState("");
  var [Letter10, setLetter10] = useState("");

  var [Color1, setColor1] = useState("white");
  var [Color2, setColor2] = useState("white");
  var [Color3, setColor3] = useState("white");
  var [Color4, setColor4] = useState("white");
  var [Color5, setColor5] = useState("white");
  var [Color6, setColor6] = useState("white");
  var [Color7, setColor7] = useState("white");
  var [Color8, setColor8] = useState("white");
  var [Color9, setColor9] = useState("white");
  var [Color10, setColor10] = useState("white");

  var W = "white";
  var B = "black";

  var [source_x, setSourcex] = useState(0);
  var [source_y, setSourcey] = useState(0);
  var [source_z, setSourcez] = useState(0);
  var [source_t, setSourcet] = useState("");

  var [destination_x, setDestinationx] = useState(0);
  var [destination_y, setDestinationy] = useState(0);
  var [destination_z, setDestinationz] = useState(0);
  var [destination_t, setDestinationt] = useState("");

  var tileref = [];
  for (var i = 1; i < 8; i++) {
    var tileref1 = [];
    tileref[i] = tileref1;
  }

  for (var i = 1; i < 8; i++) {
    for (var j = 1; j < 21; j++) {
      tileref[i][j] = createRef(null);
      //console.log(tileref.length);
    }
  }

  var [order1, setorder1] = useState("s");
  var [order2, setorder2] = useState("d");

  //half-position

  var [half1x, sethalf1x] = useState("95vw");
  var [half1y, sethalf1y] = useState("90vh");
  var [half1z, sethalf1z] = useState("1");

  var [half2x, sethalf2x] = useState("95vw");
  var [half2y, sethalf2y] = useState("90vh");
  var [half2z, sethalf2z] = useState("1");

  var [half3x, sethalf3x] = useState("95vw");
  var [half3y, sethalf3y] = useState("90vh");
  var [half3z, sethalf3z] = useState("1");

  var [half1xN, sethalf1xN] = useState("");
  var [half1yN, sethalf1yN] = useState("");
  var [half1zN, sethalf1zN] = useState("");

  var [half2xN, sethalf2xN] = useState("");
  var [half2yN, sethalf2yN] = useState("");
  var [half2zN, sethalf2zN] = useState("");

  var [half3xN, sethalf3xN] = useState("");
  var [half3yN, sethalf3yN] = useState("");
  var [half3zN, sethalf3zN] = useState("");

  var H1 = useRef(null);
  var H2 = useRef(null);
  var H3 = useRef(null);

  var numberOfCubes = 10;

  function init_connection() {

    var ros = new window.ROSLIB.Ros({
      url: 'ws://141.44.50.126:9090'
      // url: 'ws://localhost:9090'
    });

    ros.on('connection', function () {
      console.log('Connected to websocket server.');
    });

    ros.on('error', function (error) {
      console.log('Connected to websocket server.', error);
    });

    ros.on('close', function () {
      console.log('Connection to websocket server closed.');

      setTimeout(() => {
        try {
          ros.connect(`ws://141.44.50.126:9090`);
          // ros.connect(`ws://localhost:9090`);                                   

        }
        catch (error) {
          console.log("connection problem");
        }

      }, 1000);
    });

    // Subscribing to the topic
    var listener = new window.ROSLIB.Topic({
      ros: ros,
      name: '/cube',
      messageType: 'rosa_msgs/Environment'
    });

    listener.subscribe((message) => {
      //console.log('Received message on ' + listener.name + ':' + JSON.stringify(message.cube[0].x));
      console.log('Received message on ' + listener.name + ':' + JSON.stringify(message));

      //setIsLoading(false);//screenfreeeze

      //hand-gripper
      var gripperCounter = 0;
      var handCounter = 0;

      let tempVariableX;
      tempVariableX = [...xval];

      let tempVariableY;
      tempVariableY = [...yval];

      let tempVariableZ;
      tempVariableZ = [...zval];

      let tempVariableXN;
      tempVariableXN = [...xvalN];

      let tempVariableYN;
      tempVariableYN = [...yvalN];

      let tempVariableZN;
      tempVariableZN = [...zvalN];

      var halfPositionCounter = 1;
      var halfPositionCounterReset = 1;


      //do reset button color & letter

      for (var i = 0; i < message.CubeStatus.length; i++) {

        //gripper
        if (message.CubeStatus[i].z == -1) {

          var gripCount = 5 + (gripperCounter * 5);
          tempVariableX[i + 1] = `${gripCount}vw`;
          setXval(tempVariableX);

          tempVariableY[i + 1] = "80vh";
          setYval(tempVariableY);

          var color = message.CubeStatus[i].color;
          var letter = message.CubeStatus[i].letters;

          var tempLetter = eval("setLetter" + (i + 1));
          tempLetter(letter);

          tempVariableXN[i + 1] = 0;
          setXvalN(tempVariableXN);

          tempVariableYN[i + 1] = 0;
          setYvalN(tempVariableYN);

          tempVariableZN[i + 1] = -1;
          setZvalN(tempVariableZN);

          var alphancolor = letter + color;
          var alphancolortemp = eval("setbtn" + (i + 1) + "N");
          alphancolortemp(alphancolor);

          gripperCounter++;

        }

        //hand
        else if (message.CubeStatus[i].z == 99) {

          var handCount = 5 + (handCounter * 5);
          tempVariableX[i + 1] = `${handCount}vw`;
          setXval(tempVariableX);

          tempVariableY[i + 1] = "70vh";
          setYval(tempVariableY);

          var color = message.CubeStatus[i].color;
          var letter = message.CubeStatus[i].letters;

          var tempLetter = eval("setLetter" + (i + 1));
          tempLetter(letter);

          var tempColor = eval("setColor" + (i + 1));
          var tempColorValue = color == "W" ? W : B;
          tempColor(tempColorValue);

          tempVariableXN[i + 1] = 0;
          setXvalN(tempVariableXN);

          tempVariableYN[i + 1] = 0;
          setYvalN(tempVariableYN);

          tempVariableZN[i + 1] = 99;
          setZvalN(tempVariableZN);

          var alphancolor = letter + color;
          var alphancolortemp = eval("setbtn" + (i + 1) + "N");
          alphancolortemp(alphancolor);

          handCounter++;

        }

        else {

          var x = message.CubeStatus[i].x;
          var y = message.CubeStatus[i].y;
          var z = message.CubeStatus[i].z;

          tempVariableXN[i + 1] = x;
          setXvalN(tempVariableXN);

          tempVariableYN[i + 1] = y;
          setYvalN(tempVariableYN);

          tempVariableZN[i + 1] = z;
          setZvalN(tempVariableZN);

          var tempx = (x - 1) * 5;
          var tempy = (y - 1) * 10;
          var tempz = z * 10;

          tempVariableX[i + 1] = `${tempx}vw`;
          setXval(tempVariableX);

          tempVariableY[i + 1] = `${tempy}vh`;
          setYval(tempVariableY);

          tempVariableZ[i + 1] = `${tempz}`;
          setZval(tempVariableZ);

          var color = message.CubeStatus[i].color;
          var letter = message.CubeStatus[i].letters;
          var tempLetter = eval("setLetter" + (i + 1));
          tempLetter(letter);

          var tempColor = eval("setColor" + (i + 1));
          var tempColorValue = color == "W" ? W : B;
          tempColor(tempColorValue);

          var alphancolor = letter + color;
          var alphancolortemp = eval("setbtn" + (i + 1) + "N");
          alphancolortemp(alphancolor);

        }
      }

      //half-start

      //half Position reset
      for (var i = 0; i < 3; i++) {
        var RtxN = eval("sethalf" + halfPositionCounterReset + "x");
        var RtyN = eval("sethalf" + halfPositionCounterReset + "y");
        var RtzN = eval("sethalf" + halfPositionCounterReset + "z");

        RtxN("95vw");
        RtyN("90vh");
        RtzN("1");

        halfPositionCounterReset++;

      }

      for (var i = 0; i < 3; i++) {

        var hx = message.HalfSpaces[i].x;
        var hy = message.HalfSpaces[i].y;
        var hz = message.HalfSpaces[i].z;

        var txN = eval("sethalf" + halfPositionCounter + "xN");
        var tyN = eval("sethalf" + halfPositionCounter + "yN");
        var tzN = eval("sethalf" + halfPositionCounter + "zN");

        txN(hx);
        tyN(hy);
        tzN(hz);

        var htempx = (hx - 1) * 5;
        var htempy = (hy - 1) * 10;
        var htempz = (hz * 10) + 5;

        var htempx2 = `${htempx}vw`
        var htempy2 = `${htempy}vh`
        var htempz2 = `${htempz}`

        var tx = eval("sethalf" + halfPositionCounter + "x");
        var ty = eval("sethalf" + halfPositionCounter + "y");

        var tz = eval("sethalf" + halfPositionCounter + "z");

        tx(htempx2);
        ty(htempy2);
        tz(htempz2);

        halfPositionCounter++;

      }
      //half-end
    });


    // Subscribing to the topic
    var listener2 = new window.ROSLIB.Topic({
      ros: ros,
      name: '/robotanswer',
      messageType: 'std_msgs/Int8'
    });

    listener2.subscribe((message2) => {
      var currentStatus = message2.data;

      if(currentStatus==1){
        setIsLoading(true);
      }
      else if(currentStatus==2){
        setIsLoading(false);
      }
      
    });
  }


  useEffect(
    () => {
      init_connection();
    }, []
  )


  useEffect(
    () => {
      Color();
    }
  )

  //color-start

  function Color() {
    //var sourceValue = source_t.split("");
    // var destinationValue = destination_t.split("");
    Decolor();

    if (order1 == "s") {

      source();
      destination();
    }

    else {
      destination();
      source();
    }


    function source() {

      if (source_t.indexOf("B") > -1) {
        var eSource = eval(source_t);
        eSource.current.style.backgroundColor = "slateblue";
      }
      else if (source_t.indexOf("T") > -1) {

        var source_d = source_t.split("T");

        var x = parseInt(source_d[0]);
        var y = parseInt(source_d[1]);

        var temptileref = tileref[y][x];
        temptileref.current.style.backgroundColor = "slateblue";
      }
    }

    function destination() {
      if (destination_t.indexOf("B") > -1) {
        var eDestination = eval(destination_t);
        eDestination.current.style.backgroundColor = "lightgreen";
      }

      else if (destination_t.indexOf("T") > -1) {

        var destination_d = destination_t.split("T");

        var x = parseInt(destination_d[0]);
        var y = parseInt(destination_d[1]);

        var temptileref = tileref[y][x];
        temptileref.current.style.backgroundColor = "lightgreen";
      }

      else if (destination_t == "hand") {

        handRef.current.style.backgroundColor = "lightgreen";
      }
      else if (destination_t == "gripper") {
        gripperRef.current.style.backgroundColor = "lightgreen";
      }

      //half
      else if (destination_t.indexOf("H") > -1) {
        var eDestination = eval(destination_t);
        eDestination.current.style.backgroundColor = "lightgreen";
      }
    }

  }

  function Decolor() {

    //Decolor button
    for (var i = 0; i < numberOfCubes; i++) {
      var button = eval("B" + (i + 1));

      var tempColor = eval("Color" + (i + 1));
      var tempColor2 = tempColor == W ? B : W;
      button.current.style.backgroundColor = tempColor2;
    }

    //Decolor tile
    for (var i = 1; i < 8; i++) {

      for (var j = 1; j < 21; j++) {
        var tile = tileref[i][j];
        tile.current.style.backgroundColor = "cadetblue";
      }
    }

    //Decolor hand and gripper
    handRef.current.style.backgroundColor = "";
    gripperRef.current.style.backgroundColor = "";

    //Decolor half position
    for (var i = 0; i < 3; i++) {
      var halfPosition = eval("H" + (i + 1));
      halfPosition.current.style.backgroundColor = "";
    }

  }
  //color-end

  const pressButton = event => {

    //console.log(event.currentTarget.id);

    var tempID = event.currentTarget.id;

    var output_d = tempID.substring(1);

    var x = xvalN[output_d];
    var y = yvalN[output_d];
    var z = zvalN[output_d]+1;

    if (loopVariable == false) {
      setVariable(true);
      setSourcex(x);
      setSourcey(y);
      setSourcez(z);
      setSourcet(tempID);

      setorder1(order2);
      setorder2("s");
    }
    else {

      setDestinationx(x);
      setDestinationy(y);
      setDestinationz(z);
      setDestinationt(tempID);
      setVariable(false);

      setorder1(order2);
      setorder2("d");

    }
  }

  const pressHandOrGripper = event => {

    if (loopVariable == true) {

     // console.log(event.currentTarget.id);

      var tempID = event.currentTarget.id;
      if (tempID == "hand") {
        setDestinationx(0);
        setDestinationy(0);
        setDestinationz(99);
        setDestinationt(tempID);
        setVariable(false);

        setorder1(order2);
        setorder2("d");

      }
      else if (tempID == "gripper") {

        setDestinationx(0);
        setDestinationy(0);
        setDestinationz(-1);
        setDestinationt(tempID);
        setVariable(false);

        setorder1(order2);
        setorder2("d");

      }


    }


  }

  const pressTile = event => {

   // console.log(event.currentTarget.id);

    if (loopVariable == true) {

      var tempID = event.currentTarget.id;

      var output_d = tempID.split("T");

      var x = parseInt(output_d[0]);
      var y = parseInt(output_d[1]);

      if (loopVariable == false) {

        setVariable(true);
        setSourcex(x);
        setSourcey(y);
        setSourcez(1);
        setSourcet(tempID);

        setorder1(order2);
        setorder2("s");

      }

      else {

        setDestinationx(x);
        setDestinationy(y);
        setDestinationz(1);
        setDestinationt(tempID);
        setVariable(false);

        setorder1(order2);
        setorder2("d");

      }
    }

  }

  const pressHalfPosition = event => {

    //console.log(event.currentTarget.id);

    if (loopVariable == true) {

      var htempID = event.currentTarget.id;

      var hOutput_d = htempID.substring(1);

      var hpx = eval("half" + hOutput_d + "xN");
      var hpy = eval("half" + hOutput_d + "yN");
      var hpz = eval("half" + hOutput_d + "zN");

      if (loopVariable == false) {
        setVariable(true);
        setSourcex(hpx);
        setSourcey(hpy);
        setSourcez(hpz);
        setSourcet(htempID);
        setorder1(order2);
        setorder2("s");
      }
      else {
        setDestinationx(hpx);
        setDestinationy(hpy);
        setDestinationz(hpz);
        setDestinationt(htempID);
        setVariable(false);
        setorder1(order2);
        setorder2("d");

      }
    }

  }

  function publish() {

    // console.log("source: " + source_x + " " + source_y + " " + source_z + " " + source_t);
    // console.log("destination: " + destination_x + " " + destination_y + " " + destination_z + " " + destination_t);

    var sor_t = source_t;
    var des_t = destination_t;

    if (sor_t != "") {
      var sor_t2 = sor_t.substring(1);
      var soralphancolor = eval("btn" + sor_t2 + "N");
      var tempsoralphancolor = soralphancolor.split("");
      var sor_letter = tempsoralphancolor[0];
      var sor_color = tempsoralphancolor[1];
    }

    if (des_t != "") {
      var des_t2;
      var desalphancolor;
      var tempdesalphancolor;
      var des_letter;
      var des_color;

      if (des_t.indexOf("B") > -1) {
        des_t2 = des_t.substring(1);
        desalphancolor = eval("btn" + des_t2 + "N");
        tempdesalphancolor = desalphancolor.split("");
        des_letter = tempdesalphancolor[0];
        des_color = tempdesalphancolor[1];

      }
      else if (des_t.indexOf("T") > -1) {
        //des_t2 = des_t.split("T");
        des_letter = "";
        des_color = "";

      }
      else if (des_t == "hand" || des_t == "gripper") {
        des_letter = "";
        des_color = "";
      }
      //half
      else if (des_t.indexOf("H") > -1) {
        //des_t2 = des_t.substring(1);
        des_letter = "";
        des_color = "";

      }

    }

    //console.log("gotit " + sor_letter + " " + sor_color + " " + des_letter + " " + des_color);

    var ros = new window.ROSLIB.Ros({
      url: 'ws://141.44.50.126:9090'
      // url: 'ws://localhost:9090'
    });

    var publisher = new window.ROSLIB.Topic({
      ros: ros,
      name: '/cubeAction',
      messageType: 'rosa_msgs/CubeAction'
    });

    if (source_z != 0 && destination_z != 0) {

      var message = new window.ROSLIB.Message({
        source: {
          letters: sor_letter,
          color: sor_color,
          x: source_x,
          y: source_y,
          z: source_z
        },
        destination: {
          letters: des_letter,
          color: des_color,
          x: destination_x,
          y: destination_y,
          z: destination_z
        }
      });

      publisher.publish(message);

    }

    //Reset source and destination 
    Decolor();

    setSourcex(0);
    setSourcey(0);
    setSourcez(0);
    setSourcet("");

    setDestinationx(0);
    setDestinationy(0);
    setDestinationz(0);
    setDestinationt("");


   // setIsLoading(true);//screenfreeeze

  }

  function BackgroundTile(props) {
    let content = [];
    var num = parseInt(props.num);

    for (var i = num; i <= num; i++) {
      for (var j = 1; j <= 20; j++) {
        content.push(
          <div
            key={"BT" + i + j}
            ref={tileref[i][j]}
            id={j + "T" + i} className='Tile' style={{ display: "flex",minWidth: "6rem", maxWidth: "6rem", height: "6rem", zIndex: "0", background: 'cadetblue', borderRadius: "5px" }}
            onClick={pressTile}>

          </div>
        )
      }

    }
    return content;
  }

  function Buttons(props) {
    let content = [];
    var num = parseInt(props.num);

    for (var i = 1; i <= num; i++) {

      var ButtonRef = eval("B" + i);

      var Letter = eval("Letter" + i);

      var Color = eval("Color" + i);
      var ColorOutline = "1px solid " + Color;

      content.push(
        <div key={"B" + i} style={{ position: 'absolute', left: xval[i], top: yval[i], zIndex: zval[i] }}>
          <Button
            id={"B" + i}
            onClick={pressButton}
            ref={ButtonRef}
            variant='text' style={{ alignSelf: 'center', maxWidth: '6rem', maxHeight: '6rem', minHeight: '6rem', minWidth: '6rem', background: Color == W ? B : W, outline: ColorOutline }}
          ><div style={{ fontSize: '4rem', color: Color }}>{Letter}</div></Button>

        </div>
      )
    }
    return content;
  }

  function HalfPosition(props) {
    let content = [];
    var num = parseInt(props.num);

    for (var i = 1; i <= num; i++) {

      var xValue = eval("half" + i + "x");
      var yValue = eval("half" + i + "y");
      var zValue = eval("half" + i + "z");

      var HalfRef = eval("H" + i);

      content.push(

        <div key={"H" + i} style={{ position: 'absolute', left: xValue, top: yValue, zIndex: zValue }}>
          <Button
            id={"H" + i}
            ref={HalfRef}
            onClick={pressHalfPosition}
            variant='text' style={{ maxWidth: '5vw', maxHeight: '10vh', minHeight: '10vh', minWidth: '5vw', border: '1px solid lightgrey' }}
          >HP{i}</Button>
        </div>


      )
    }
    return content;
  }

  return (
    <div className="App">

      {/* <div style={{ position: 'absolute', left: btn1x, top: btn1y, zIndex: btn1z }}>
        <Button
          id="B1"
          onClick={press}
          ref={B1}
          variant='text' style={{ maxWidth: '10vw', maxHeight: '20vh', minHeight: '20vh', minWidth: '10vw', outline: '1px solid lightgrey' }}
          startIcon={<Avatar sx={{ maxWidth: '100%', width: '100%', height: '100%', borderRadius: 0, marginLeft: '0%' }} src={Image1} />}>1</Button>
      </div>

      */}

      {/* Screen freeze test-start */}

      <div style={{ display: isLoading ? 'flex' : 'none' }} className='modal'>
        <div className='modal-content'>
          <div className='loader'></div>
          <div className='modal-text'>Robot is moving please wait...</div>
        </div>
      </div>


      {/* Screen freeze test-end */}

      <Buttons num="10"></Buttons>

      <div className="Row">
        <BackgroundTile num="1"></BackgroundTile>
      </div>

      <div className="Row">
        <BackgroundTile num="2"></BackgroundTile>
      </div>

      <div className="Row">
        <BackgroundTile num="3"></BackgroundTile>
      </div>
      <div className="Row">
        <BackgroundTile num="4"></BackgroundTile>
      </div>
      <div className="Row">
        <BackgroundTile num="5"></BackgroundTile>
      </div>
      <div className="Row">
        <BackgroundTile num="6"></BackgroundTile>
      </div>
      <div className="Row">
        <BackgroundTile num="7"></BackgroundTile>
      </div>


      {/* Hand and gripper */}

      <div className='BottomRow'>
        <Button
          id="hand"
          onClick={pressHandOrGripper}
          ref={handRef}
          variant='text' style={{ maxWidth: '5vw', maxHeight: '10vh', minHeight: '10vh', minWidth: '5vw', outline: '1px solid lightgrey' }}
          startIcon={<Avatar sx={{ maxWidth: '100%', width: '100%', height: '100%', borderRadius: 0, marginLeft: '0%' }} src={"./hand.png"} />}></Button>
      </div>

      <div className='BottomRow'>
        <Button
          id="gripper"
          onClick={pressHandOrGripper}
          ref={gripperRef}
          variant='text' style={{ maxWidth: '5vw', maxHeight: '10vh', minHeight: '10vh', minWidth: '5vw', outline: '1px solid lightgrey' }}
          startIcon={<Avatar sx={{ maxWidth: '100%', width: '100%', height: '100%', borderRadius: 0, marginLeft: '0%' }} src={"./gripper.png"} />}></Button>
      </div>

      {/* Hand and gripper */}


      {/* Move button and Status tab */}

      <Button
        onClick={publish}
        variant='text' style={{ maxWidth: '10vw', maxHeight: '10vh', minHeight: '10vh', minWidth: '10vw', border: '1px solid lightgrey', background: "lightblue" }}
      >MOVE THE CUBE!?</Button>

      <h1 style={{ color: "black", fontSize: "1.5rem", display: "inline" }}>  {loopVariable ? 'Press Destination Position' : 'Press source position'}</h1>

      {/* Move button and Status tab */}




      {/* <div style={{ position: 'absolute', left: half1x, top: half1y, zIndex: "2" }}>
        <Button
          id="1"
          onClick={press}
          variant='text' style={{ maxWidth: '10vw', maxHeight: '20vh', minHeight: '20vh', minWidth: '10vw', border: '1px solid lightgrey' }}
          startIcon={<Avatar sx={{ maxWidth: '100%', width: '100%', height: '100%', borderRadius: 0, marginLeft: '0%' }} src={"./blank.png"} />}>half position</Button>
      </div> */}

      <HalfPosition num="3"></HalfPosition>


      {/* <Button
        variant='text' style={{ maxWidth: '5vw', maxHeight: '10vh', minHeight: '10vh', minWidth: '5vw', border: '1px solid lightgrey', background: loopVariable ? 'black' : 'white' }}
        ><div style={{ fontSize: '4rem', color: loopVariable ? 'white' : 'black' }}>A</div></Button> */}

    </div>
  );
}

export default App;
