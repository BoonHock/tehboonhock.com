window.addEventListener('load', function(){
	var breakoutCanvas = document.getElementById('breakout-canvas');
	var ctx = breakoutCanvas.getContext('2d');
	var breakoutGameStarted = false;
	var gameOn;
	var numOfBricks;
	function drawPad(Pad, Ball){
		ctx.fillStyle = '#000000';
		ctx.fillRect(Pad.positionX,Pad.positionY,Pad.width,Pad.height);
		// if game has not been started, keep redrawing ball to be on top of pad
		if (!breakoutGameStarted){
			clearBall(Ball.positionX, Ball.positionY, Ball.radius);
			Ball.positionX = Pad.positionX + Pad.width/2;
			Ball.positionY = Pad.positionY - Ball.radius;
			drawBall(Ball);
		}
	};
	function drawBall(Ball){
		ctx.beginPath();
		ctx.arc(Ball.positionX,Ball.positionY,Ball.radius,0,2*Math.PI);
		ctx.fillStyle = '#FF0000';
		ctx.fill();
	};
	function drawBricks(Bricks, color, row){
		ctx.fillStyle = color;
		var positionX = 1;
		var positionY = Bricks.brickSpacing + row * (Bricks.brickHeight + Bricks.brickSpacing);
		var tmpBricks = []; // to temporarily store array to push into Bricks array
		/*
		 * create an array where true means the brick is not broken 
		 * and the x position of the brick
		 * Then, insert into Bricks array to form first row of bricks
		 * Bricks will then become a 3 dimensional array where 
		 * first dimension has length of 4 (4 rows of bricks)
		 * second dimension has length of 7 (brick position y and each column of bricks)
		 * third dimension has length of 2 (true/false, position x of brick)
		 */
		for(i = 0; i < 6; i++){
			(i == 0)?(tmpBricks = [positionY,[true,positionX]]):(tmpBricks.push([true,positionX]));
			ctx.fillRect(positionX, positionY, Bricks.brickWidth, Bricks.brickHeight);
			positionX += Bricks.brickWidth + Bricks.brickSpacing;
		}
		Bricks.bricks.push(tmpBricks);
	};
	function movePad(Pad, Ball, event){
		ctx.clearRect(Pad.positionX-10, Pad.positionY, Pad.width+20, Pad.height);
		Pad.positionX = event.clientX - breakoutCanvas.getBoundingClientRect().left - Pad.width/2;
		drawPad(Pad, Ball);
	};
	function clearBall(x, y, radius){	
		ctx.save();
		ctx.globalCompositeOperation = 'destination-out';
		ctx.beginPath();
		// 0.5 to prevent leaving uncleared residue
		ctx.arc(x, y, radius + 0.5, 0, 2 * Math.PI);
		ctx.fill();
		ctx.restore();
	};
	function moveBall(Pad, Ball, Bricks){
		// if ball touches right side of breakoutCanvas
		if (Ball.positionX + Ball.radius >= breakoutCanvas.width){
			Ball.speedX = -speed();
		// if ball touches left side of breakoutCanvas	
		}else if(Ball.positionX - Ball.radius <= 0){
			Ball.speedX = speed();
		// if Ball.speedX and Ball.speedY are undefined, define them
		}
		clearBall(Ball.positionX, Ball.positionY,	Ball.radius);
		Ball.positionX += Ball.speedX;
		Ball.positionY -= Ball.speedY;
		drawBall(Ball);
		// if ball hits top of breakoutCanvas, reverse y speed
		if (Ball.positionY - Ball.radius <= 0){
			Ball.speedY = -Ball.speedY;
		// if ball has reached Y axis height of pad,
		// check if it is on pad
		} else if (Ball.positionY + Ball.radius == Pad.positionY){
			if(Ball.positionX >= Pad.positionX &&
				 Ball.positionX <= Pad.positionX + Pad.width){
				Ball.speedY = -Ball.speedY;
			}
		// if ball hits bottom of breakoutCanvas or no more bricks left, stop the ball
		} else if (Ball.positionY + Ball.radius >= breakoutCanvas.height || numOfBricks === 0){
			clearInterval(gameOn);
			breakoutGameStarted = false;
			breakoutCanvas.addEventListener('click',initializeBreakout);
			$('#breakout-message').text('Game over! Click to restart');
		}
		for (row = 0, i = Bricks.bricks.length; row < i; row++){
			// if ball is within bricks region
			if (Ball.positionY - Ball.radius <= Bricks.bricks[row][0] + Bricks.brickHeight &&
					Ball.positionY + Ball.radius >= Bricks.bricks[row][0]){
				// col starts with 1 because Bricks [row][0] is the bottom position y of the row
				for (col = 1; col < 7; col++){
					// Bricks.bricks[row][col][0] == true (brick not broken) / false (brick broken)
					if (Bricks.bricks[row][col][0]){
						// when ball hits bottom of or top of brick
						if (Ball.positionX >= Bricks.bricks[row][col][1] &&
								Ball.positionX <= Bricks.bricks[row][col][1] + Bricks.brickWidth){
							ctx.clearRect(Bricks.bricks[row][col][1], Bricks.bricks[row][0], Bricks.brickWidth, Bricks.brickHeight);
							// brick has been hit, break it by setting to false
							Bricks.bricks[row][col][0] = false;
							numOfBricks--;
							// reverse vertical speed
							Ball.speedY = -Ball.speedY;
							// change magnitude and maintain direction of horizontal speed
							Ball.speedX = (Ball.speedX < 0)? (-speed()):(speed());
							continue;
						}
						// when ball hits sides of brick
						if (Ball.positionX - Ball.radius <= Bricks.bricks[row][col][1] + Bricks.brickWidth &&
								Ball.positionX + Ball.radius >= Bricks.bricks[row][col][1]){
							ctx.clearRect(Bricks.bricks[row][col][1], Bricks.bricks[row][0], Bricks.brickWidth, Bricks.brickHeight);
							numOfBricks--;
							// brick has been hit, break it by setting to false
							Bricks.bricks[row][col][0] = false;
							// reverse horizontal speed
							Ball.speedX = (Ball.speedX < 0)? (speed()):(-speed());
						}
					}
				}
			}
		}
	};
	function speed(){
		var ballSpeed = Math.random();
		// loop so that horizontal speed is not ridiculously small
		while(ballSpeed < 0.3){
			ballSpeed = Math.random();
		}
		// make initial horizontal speed negative about 50% of the time
		// (1,max speed - 0.3,min speed)/2 + 0.3,min speed = 0.65
		if (Math.random() < 0.65 && !breakoutGameStarted){ballSpeed = -ballSpeed;}
		return ballSpeed * 2;
	};
	function initializeBreakout(){
		/*
		 * PAD's reference point is at top left corner of pad
		 * BALL's reference point is at center of ball
		 */
		// define variables and objects
		var Pad = {width:50, height:6, positionY: 425};
		// set initial position of Pad to be center x-axis
		Pad.positionX = breakoutCanvas.width/2 - Pad.width/2;
		var Ball = {radius: 10, speedX: speed(), speedY: 2};
		Ball.positionX = Pad.positionX + Pad.width/2;
		Ball.positionY = Pad.positionY - Ball.radius;
		var Bricks = {brickWidth: 90, brickHeight: 30, brickSpacing: 1, bricks: []};
		ctx.clearRect(Ball.positionX - Ball.radius - 10, Ball.positionY - Ball.radius,
									Ball.radius*2 + 20, Ball.radius*2);
		drawBricks(Bricks, '#00FF00', 0);
		drawBricks(Bricks, '#00FFFF', 1);
		drawBricks(Bricks, '#FF00FF', 2);
		drawBricks(Bricks, '#FFFF00', 3);
		numOfBricks = Bricks.bricks.length * (Bricks.bricks[0].length - 1);
		drawPad(Pad, Ball);
		drawBall(Ball);
		breakoutCanvas.addEventListener('mousemove',function(){movePad(Pad, Ball, event);});
		// if initializeBreakout function is attached to onclick, remove it
		// initializeBreakout is attached when player clicks on breakoutCanvas after losing/winning
		breakoutCanvas.removeEventListener('click',initializeBreakout);
		breakoutCanvas.addEventListener('click', startBreakout);
		function startBreakout(){
			breakoutGameStarted = true;
			$('#breakout-message').text('GAME ON!');
			breakoutCanvas.removeEventListener('click',startBreakout);
			gameOn = setInterval(function(){moveBall(Pad, Ball, Bricks);},10);
		};
	};
	initializeBreakout();
});