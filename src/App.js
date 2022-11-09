import './App.css';
import { Button, Avatar,Alert } from '@mui/material'
import { useEffect, useRef, createRef, useState, useMemo } from 'react';



//gripper-0,0,-1   hand-0,0,99
function App() {

  {/* Screen freeze test-start */ }

  const [isLoading, setIsLoading] = useState(false);

  {/* Screen freeze test-end */ }

  var mainWidth = 5;
  var mainHeight = 8.5;
  var numberOfRows = 7;

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

  var W = "white";
  var B = "black";

  var [loopVariable, setVariable] = useState(false);

  //For storing x,y,z values of the cubes after conversion
  const [xval, setXval] = useState(new Array(11).fill("94.5vw"));
  const [yval, setYval] = useState(new Array(11).fill("91vh"));
  const [zval, setZval] = useState(new Array(11).fill("1"));

  //For storing x,y,z values of the cubes(N-normal)
  const [xvalN, setXvalN] = useState(new Array(11).fill(0));
  const [yvalN, setYvalN] = useState(new Array(11).fill(0));
  const [zvalN, setZvalN] = useState(new Array(11).fill(1));


  let tempVariableX, tempVariableY, tempVariableZ;
  let tempVariableXN, tempVariableYN, tempVariableZN;

  //For storing Letter and Alphabet of the cubes together
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

  //For storing Letter
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

  //For storing Color
  var [Color1, setColor1] = useState(B);
  var [Color2, setColor2] = useState(B);
  var [Color3, setColor3] = useState(B);
  var [Color4, setColor4] = useState(B);
  var [Color5, setColor5] = useState(B);
  var [Color6, setColor6] = useState(B);
  var [Color7, setColor7] = useState(B);
  var [Color8, setColor8] = useState(B);
  var [Color9, setColor9] = useState(B);
  var [Color10, setColor10] = useState(B);

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

  //half-position- start
  var H1 = useRef(null);
  var H2 = useRef(null);
  var H3 = useRef(null);
  var H4 = useRef(null);
  var H5 = useRef(null);
  var H6 = useRef(null);
  var H7 = useRef(null);
  var H8 = useRef(null);
  var H9 = useRef(null);
  var H10 = useRef(null);

  //For storing x,y,z values of the half positions after conversion
  const [halfXval, sethalfXval] = useState(new Array(11).fill("95.5vw"));
  const [halfYval, sethalfYval] = useState(new Array(11).fill("93vh"));
  const [halfZval, sethalfZval] = useState(new Array(11).fill("1"));

  //For storing x,y,z values of the half positions(N-normal)
  const [halfXvalN, sethalfXvalN] = useState(new Array(11).fill(0));
  const [halfYvalN, sethalfYvalN] = useState(new Array(11).fill(0));
  const [halfZvalN, sethalfZvalN] = useState(new Array(11).fill(1));

  let halfTempVariableX, halfTempVariableY, halfTempVariableZ;
  let halfTempVariableXN, halfTempVariableYN, halfTempVariableZN;

  //half-position- end

  var numberOfCubes = 10;
  var numberOfHalfPositions = 10;

  // var ros = useMemo(() => {
  //   return new window.ROSLIB.Ros({
  //     url: 'ws://141.44.50.126:9090'
  //     // url: 'ws://localhost:9090'
  //   })
  // }, []);

  var ros = useMemo(() => {
    return new window.ROSLIB.Ros({
      url: ''
    })
  }, []);

  //var connectionName = "ws://localhost:9090";
   var connectionName ="ws://141.44.50.126:9090";

  var [connection, setConnection] = useState(false);
  var [messageReceived, setMessageReceived] = useState(false);

  function getEnvironmentStatus() {

    // Subscribing to the topic
    var listener = new window.ROSLIB.Topic({
      ros: ros,
      name: '/cube',
      messageType: 'rosa_msgs/Environment'
    });

    listener.subscribe((message) => {
      //console.log('Received message on ' + listener.name + ':' + JSON.stringify(message.cube[0].x));
      console.log('Received message on ' + listener.name + ':' + JSON.stringify(message));

      setMessageReceived(messageReceived => !messageReceived);
      console.log(messageReceived);


      //setIsLoading(false);//screenfreeeze

      //hand-gripper
      var gripperCounter = 0;
      var handCounter = 0;

      // var halfPositionCounter = 1;
      //  var halfPositionCounterReset = 1;


      tempVariableX = [...xval];
      tempVariableY = [...yval];
      tempVariableZ = [...zval];

      tempVariableXN = [...xvalN];
      tempVariableYN = [...yvalN];
      tempVariableZN = [...zvalN];

      halfTempVariableX = [...halfXval];
      halfTempVariableY = [...halfYval];
      halfTempVariableZ = [...halfZval];

      halfTempVariableXN = [...halfXvalN];
      halfTempVariableYN = [...halfYvalN];
      halfTempVariableZN = [...halfZvalN];

      //Reset button color,letter and positions
      for (var t = 0; t < numberOfCubes; t++) {
        var tempLetterReset = eval("setLetter" + (t + 1));
        tempLetterReset("");

        var tempColorReset = eval("setColor" + (t + 1));
        tempColorReset(B);

        tempVariableXN[t + 1] = 0;
        setXvalN(tempVariableXN);

        tempVariableYN[t + 1] = 0;
        setYvalN(tempVariableYN);

        tempVariableZN[t + 1] = 1;
        setZvalN(tempVariableZN);

        tempVariableX[t + 1] = "94.5vw";
        setXval(tempVariableX);

        tempVariableY[t + 1] = "91vh";
        setYval(tempVariableY);

        tempVariableZ[t + 1] = "1";
        setZval(tempVariableZ);
      }

      //To position Buttons
      for (var i = 0; i < message.CubeStatus.length; i++) {

        //gripper
        if (message.CubeStatus[i].z == -1) {

          var gripCount = 5 + (gripperCounter * 5);
          tempVariableX[i + 1] = `${gripCount}vw`;
          setXval(tempVariableX);

          var gripperPosition = mainHeight * (numberOfRows + 1);

          tempVariableY[i + 1] = gripperPosition + "vh";
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

          var handPosition = mainHeight * numberOfRows;

          tempVariableY[i + 1] = handPosition + "vh";
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

          var tempx = (x - 1) * mainWidth;
          var tempy = (y - 1) * mainHeight;
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
      for (var h = 0; h < numberOfHalfPositions; h++) {

        halfTempVariableXN[h + 1] = 0;
        sethalfXvalN(halfTempVariableXN);

        halfTempVariableYN[h + 1] = 0;
        sethalfYvalN(halfTempVariableYN);

        halfTempVariableZN[h + 1] = 1;
        sethalfZvalN(halfTempVariableZN);

        halfTempVariableX[h + 1] = "95.5vw";
        sethalfXval(halfTempVariableX);

        halfTempVariableY[h + 1] = "91vh";
        sethalfYval(halfTempVariableY);

        halfTempVariableZ[h + 1] = "1";
        sethalfZval(halfTempVariableZ);
      }

      //To position half positions
      for (var i = 0; i < message.HalfSpaces.length; i++) {

        var hx = message.HalfSpaces[i].x;
        var hy = message.HalfSpaces[i].y;
        var hz = message.HalfSpaces[i].z;

        halfTempVariableXN[i + 1] = hx;
        sethalfXvalN(halfTempVariableXN);

        halfTempVariableYN[i + 1] = hy;
        sethalfYvalN(halfTempVariableYN);

        halfTempVariableZN[i + 1] = hz;
        sethalfZvalN(halfTempVariableZN);

        var htempx = (hx - 1) * mainWidth + (mainWidth / 4);
        var htempy = (hy - 1) * mainHeight + (mainHeight / 4);
        var htempz = (hz * 10) + 5;

        halfTempVariableX[i + 1] = `${htempx}vw`;
        sethalfXval(halfTempVariableX);

        halfTempVariableY[i + 1] = `${htempy}vh`;
        sethalfYval(halfTempVariableY);

        halfTempVariableZ[i + 1] = `${htempz}`;
        sethalfZval(halfTempVariableZ);

      }
      //half-end
    });

    
  }

  useEffect(
    () => {
      if (connection) {
        getEnvironmentStatus();
      }
    }, [connection]
  )


  useEffect(
    () => {
      Color();
    }
  )

  useEffect(() => {

    if (!connection) {
      handleConnect();
    }

  }, [connection])

  const handleConnect = () => {
    try {
      ros.connect(connectionName)

      ros.on('connection', () => {
        console.log('Connected to websocket server.');
        setConnection(true);
      })

      ros.on('error', (error) => {
        console.log("Connection error" + error);
      })

      ros.on('close', () => {
        console.log('Connection to websocket server closed.');
        setConnection(false);

        setTimeout(() => {
          try {
            // ros.connect(`ws://141.44.50.126:9090`);
            ros.connect(connectionName);

          }
          catch (error) {
            console.log("connection problem");
          }

        }, 2000);
      });
    } catch (e) {
      console.log("error" + e);
    }
  }

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     publishHeartbeat();
  //   }, 2000);

  //   return () => clearInterval(interval);

  // }, []);

  useEffect(() => {

    if (connection) {
      publishHeartbeat();
    }

  }, [connection]);

  useEffect(() => {

    if (connection) {
      const timer = setTimeout(() => {
        publishRefresh();
      }, 3000);
      return () => clearTimeout(timer);
    }

  }, [connection]);

  useEffect(() => {

    if(connection){
      robotMovementStatus();
    }
    
  }, [connection]);

  // To show status screen
  function robotMovementStatus(){

    var statusListener = new window.ROSLIB.Topic({
      ros: ros,
      name: '/robotanswer',
      messageType: 'std_msgs/Int8'
    });

    statusListener.subscribe((statusMessage) => {
      var currentStatus = statusMessage.data;

      if (currentStatus == 1) {
        setIsLoading(true);
      }
      else if (currentStatus == 2) {
        setIsLoading(false);
      }
    });

  }

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
    var z = zvalN[output_d];

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
      setDestinationz(z + 1);
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

      setDestinationx(x);
      setDestinationy(y);
      setDestinationz(1);
      setDestinationt(tempID);
      setVariable(false);
      setorder1(order2);
      setorder2("d");
    }
  }

  const pressHalfPosition = event => {

    //console.log(event.currentTarget.id);

    if (loopVariable == true) {

      var htempID = event.currentTarget.id;

      var hOutput_d = htempID.substring(1);

      var hpx = halfXvalN[hOutput_d];
      var hpy = halfYvalN[hOutput_d];
      var hpz = halfZvalN[hOutput_d];

      setDestinationx(hpx);
      setDestinationy(hpy);
      setDestinationz(hpz);
      setDestinationt(htempID);
      setVariable(false);
      setorder1(order2);
      setorder2("d");

    }
  }

  function publishHeartbeat() {
    // var ros = new window.ROSLIB.Ros({
    //   url: 'ws://141.44.50.126:9090'
    // });

    var publisher = new window.ROSLIB.Topic({
      ros: ros,
      name: '/Heartbeat',
      messageType: 'std_msgs/String'
    });

    var message = new window.ROSLIB.Message({
      data: "/Touch_UI_rosbridge"
    });

    setInterval(() => {
      publisher.publish(message);
      console.log("heartbeat called");
    }, 2000);



  }

  function publishRefresh() {
    // var ros = new window.ROSLIB.Ros({
    //   url: 'ws://141.44.50.126:9090'
    // });

    var publisher = new window.ROSLIB.Topic({
      ros: ros,
      name: 'WS1/commands',
      messageType: 'std_msgs/String'
    });

    var message = new window.ROSLIB.Message({
      data: "Refresh"
    });

    publisher.publish(message);
    console.log("Refresh published");
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

    // var ros = new window.ROSLIB.Ros({
    //   url: 'ws://141.44.50.126:9090'
    //   // url: 'ws://localhost:9090'
    // });

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
            id={j + "T" + i} className='Tile' style={{ display: "flex", minWidth: mainWidth + "vw", maxWidth: mainWidth + "vw", minHeight: mainHeight + "vh", maxHeight: mainHeight + "vh", zIndex: "0", background: 'cadetblue', borderRadius: "5px" }}
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
            variant='text' style={{ alignSelf: 'center', maxWidth: mainWidth + "vw", maxHeight: mainHeight + "vh", minHeight: mainHeight + "vh", minWidth: mainWidth + "vw", background: Color == W ? B : W, outline: ColorOutline }}
          ><div style={{ fontSize: '2rem', color: Color }}>{Letter}</div></Button>
        </div>
      )
    }
    return content;
  }

  function HalfPosition(props) {
    let content = [];
    var num = parseInt(props.num);

    for (var i = 1; i <= num; i++) {

      var HalfRef = eval("H" + i);

      content.push(
        <div key={"H" + i} style={{ position: 'absolute', left: halfXval[i], top: halfYval[i], zIndex: halfZval[i] }}>
          <Button
            id={"H" + i}
            ref={HalfRef}
            onClick={pressHalfPosition}
            variant='text' style={{ maxWidth: (mainWidth / 2) + "vw", maxHeight: (mainHeight / 2) + "vh", minHeight: (mainHeight / 2) + "vh", minWidth: (mainWidth / 2) + "vw", border: '1px solid lightgrey' }}
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
          variant='text' style={{ maxWidth: mainWidth + "vw", maxHeight: mainHeight + "vh", minHeight: mainHeight + "vh", minWidth: mainWidth + "vw", outline: '1px solid lightgrey' }}
          startIcon={<Avatar sx={{ maxWidth: '100%', width: '80%', height: '80%', borderRadius: 0, marginLeft: '0%' }} src={"./hand.png"} />}></Button>
      </div>

      <div className='BottomRow'>
        <Button
          id="gripper"
          onClick={pressHandOrGripper}
          ref={gripperRef}
          variant='text' style={{ maxWidth: mainWidth + "vw", maxHeight: mainHeight + "vh", minHeight: mainHeight + "vh", minWidth: mainWidth + "vw", outline: '1px solid lightgrey' }}
          startIcon={<Avatar sx={{ maxWidth: '100%', width: '80%', height: '80%', borderRadius: 0, marginLeft: '0%' }} src={"./gripper.png"} />}></Button>
      </div>

      {/* Hand and gripper */}

      {/* Move button and Status tab- start */}

      <div className="moveButtonAndStatusTab">
        <Button
          onClick={publish}
          variant='text' style={{ maxWidth: (mainWidth * 2) + "vw", maxHeight: mainHeight + "vh", minHeight: mainHeight + "vh", minWidth: (mainWidth * 2) + "vw", border: '1px solid lightblue', background: "lightblue", fontSize: "0.8vw" }}
        >MOVE THE CUBE!!</Button>

        <h1 style={{ color: "black", fontSize: "1.5rem", display: "inline" }}>  {loopVariable ? 'Press Destination Position' : 'Press source position'}</h1>

        
      </div>

      {/* Move button and Status tab- end */}

      {/* Connection Status- start */}

      <Alert severity={connection?"success":"error"} className="connectionStatus" style={{display: "inline-block"}}>{connection?"Connected":"Disconnected"}</Alert>

      {/* Connection Status- end */}

      {/* <div style={{ position: 'absolute', left: half1x, top: half1y, zIndex: "2" }}>
        <Button
          id="1"
          onClick={press}
          variant='text' style={{ maxWidth: '10vw', maxHeight: '20vh', minHeight: '20vh', minWidth: '10vw', border: '1px solid lightgrey' }}
          startIcon={<Avatar sx={{ maxWidth: '100%', width: '100%', height: '100%', borderRadius: 0, marginLeft: '0%' }} src={"./blank.png"} />}>half position</Button>
      </div> */}

      <HalfPosition num="10"></HalfPosition>

      {/* <Button
        variant='text' style={{ maxWidth: '5vw', maxHeight: '10vh', minHeight: '10vh', minWidth: '5vw', border: '1px solid lightgrey', background: loopVariable ? 'black' : 'white' }}
        ><div style={{ fontSize: '4rem', color: loopVariable ? 'white' : 'black' }}>A</div></Button> */}

    </div>
  );
}

export default App;
