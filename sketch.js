// THE GAME PROJECT
// START - CODE WRITTEN WITHOUT ASSISTANCE

// ----- DECLARING VARIABLES -----
// Game character
var gameChar_x;
var gameChar_y;

// Floor
var floorPos_y;

// Character actions
var isLeft;
var isRight;
var isPlummeting;
var isFalling;

// Collectable 
var collectable;

// Scenario
var tree;
var cloud;
var mountain;
var canyon;

// Sound
var soundtrack_music;
var jump_sound;
var scream_sound;
var book_collection_sound;

// Score
var game_score;

// Flag pole
var flagpole;

// Camera position in X
var cameraPosX;

// Char Lives
var lives;

// Platforms
var platform;

// Enemy
var enemy;
var phase;

// Plummeting
var plummetSpeed;	

// Triggering
var restartTriggered;

// Pre Load Function: Load assets in the sketch (sounds, images, etc.)
function preload() {
	soundFormats('mp3', 'wav');

	// Load sounds
	// Jump
	// Sound collected from: https://pixabay.com/sound-effects/jumping-1-6452/
	jump_sound = loadSound('assets/jump.mp3');
	jump_sound.setVolume(0.8);

	// Scream sound
	// Sound collected from: https://pixabay.com/sound-effects/scream-85294/
	scream_sound = loadSound('assets/scream.mp3');
	scream_sound.setVolume(0.5);
git 
	// Collectable Sound
	// Sound collected from: https://mixkit.co/free-sound-effects/magic/
	book_collection_sound = loadSound('assets/book_collection.mp3');
	book_collection_sound.setVolume(0.5);

	// Music
	// Sound collected from: https://pixabay.com/music/main-title-orchestra-fantasy-111168/
	soundtrack_music = loadSound('assets/soundtrack.mp3');
	soundtrack_music.setVolume(0.1);
}

// Setup Function: Initialize canvas, basic settings and variables
function setup() {
	// Initial configuration
	createCanvas(1024, 576);
	floorPos_y = (height * 3) / 4;

	// Character lives
	lives = 3;

	// Starting game
	startGame();

	// Music
	soundtrack_music.loop();
}


function startGame() {
	// Initial char position
	gameChar_x = width / 2;
	gameChar_y = floorPos_y;

	// Character variables
	isPlummeting = false;
	isFalling = false;

	// Scenario
	// Collectable
	collectable = [
		{x_pos: 580, y_pos: 100, size: 50, isFound: false},
		{x_pos: 2220, y_pos: - 60, size: 50, isFound: false},
		{x_pos: 4950, y_pos: 100, size: 50, isFound: false},
	];

	// Canyon
	canyon = [
		{x_pos: - 800, y_pos: 100, size: 63},
		{x_pos: 1200, y_pos: 100, size: 10},
		{x_pos: 1650, y_pos: 100, size: 10},
		{x_pos: 2300, y_pos: 100, size: 20},
		{x_pos: 5800, y_pos: 100, size: 50},
		{x_pos: 3800, y_pos: 100, size: 10},
		{x_pos: 4000, y_pos: 100, size: 10},
		{x_pos: 4200, y_pos: 100, size: 10},
		{x_pos: 4400, y_pos: 100, size: 10},
	];

	// Tree
	tree = [
		{x_pos: 750, y_pos: height / 2},
		{x_pos: 2100, y_pos: height / 2},
		{x_pos: 5150, y_pos: height / 2},
		{x_pos: 5250, y_pos: height / 2},
		{x_pos: 5350, y_pos: height / 2},
		{x_pos: 5450, y_pos: height / 2},
		{x_pos: 5550, y_pos: height / 2},
		{x_pos: 5650, y_pos: height / 2},
	];
	
	// Cloud
	cloud = [
		{x_pos: 300, y_pos: height / 2},
		{x_pos: 1550, y_pos: height / 1.75},
		{x_pos: 1800, y_pos: height / 2},
		{x_pos: 2700, y_pos: height / 2},
		{x_pos: 2900, y_pos: height / 1.8},
		{x_pos: 3950, y_pos: height / 2},
		{x_pos: 4120, y_pos: height / 1.5},
		{x_pos: 4200, y_pos: height / 2.1},
		{x_pos: 4400, y_pos: height / 1.8},
		{x_pos: 5100, y_pos: height / 2},
		{x_pos: 5400, y_pos: height / 1.8},
		{x_pos: 6600, y_pos: height / 2}
	];

	// Mountain
	mountain = [
		{x_pos: 900, y_pos: height / 2, type: 'all'},
		{x_pos: 3300, y_pos: height / 2, type: 'back'},
		{x_pos: 3600, y_pos: height / 2, type: 'back'},
		{x_pos: 3350, y_pos: height / 2, type: 'main'},
		{x_pos: 3500, y_pos: height / 2, type: 'main'}
	];

	// Platform
	platform = [];
	platform.push(drawPlatforms(2350, floorPos_y - 80, 100));
	platform.push(drawPlatforms(2450, floorPos_y - 160, 100));
	platform.push(drawPlatforms(5900, floorPos_y - 80, 100));
	platform.push(drawPlatforms(6000, floorPos_y - 160, 100));
	platform.push(drawPlatforms(6100, floorPos_y - 240, 100));

	// Initial character state
	isLeft = false;
	isRight = false;
	isFalling = false;

	// Camera Control
	cameraPosX = 0;

	// Initializing Game Score
	game_score = 0;

	// Velocity
	plummetSpeed = 5;
	jumpVelocity = 0;
	gravityAcceleration = 0.5;


	// Flagpole
	flagpole = {isReached: false, x_pos: 6800};

	// Time
	restartTriggered = false;

	// enemies
	enemy = [];
	enemy.push(new enemies(800, floorPos_y - 25, 220, 1));
	enemy.push(new enemies(1400, floorPos_y - 25, 220, 2.2));
	enemy.push(new enemies(2350,  floorPos_y - 100, 220, 1));
	enemy.push(new enemies(2650, floorPos_y - 25, 1200, 2));
	enemy.push(new enemies(3200, floorPos_y - 25, 220, 1));
	enemy.push(new enemies(3400, floorPos_y - 25, 220, 1));
	enemy.push(new enemies(3600, floorPos_y - 25, 220, 1));
	enemy.push(new enemies(4580, floorPos_y - 25, 150, 2));
	phase = 0;

}

// Draw Function: Divied in DRAW SCENARIO, DRAW CHARACTER, and INTERACTION
function draw() {
	// ----- DRAW SCENARIO -----
	// Moving background
	cameraPosX = gameChar_x - width / 2;

	// Sky
	background(250, 250, 250);

	// Ground
	noStroke();
	fill(130, 40, 0);
	rect(0, floorPos_y, width, height - floorPos_y);

	// START - Camera Control 
	push();
	translate(-cameraPosX, 0);

	// Instructions
	drawInstructions();

	// Tree - Creating multiple trees using lenght and the tree array
	for (var i = 0; i < tree.length; i++) {
		drawTree(tree[i]);
	}

	// Mountain - Creating multiple mountains using lenght and array
	for (var i = 0; i < mountain.length; i++) {
		drawMountain(mountain[i], mountain[i].type);
	}
	
	// Cloud - Creating multiple clouds using lenght and array
	for (var i = 0; i < cloud.length; i++) {
		drawCloud(cloud[i]);
	}

	// Collectable - Creating the collectable using lenght and  array
	for (var i = 0; i < collectable.length; i++) {
		if (collectable[i].isFound == false) {
			drawCollectable(collectable[i]);
		}
	}

	// Canyon - Creating multiple canyons using lenght and array
	for (var i = 0; i < canyon.length; i++) {
		drawCanyon(canyon[i]);
	}

	// Platform - Creating multiple platforms using lenght and array
	for (var i = 0; i < platform.length; i++) {
		drawPlatforms(platform[i].draw());
	}

	// Flagpole - Drawing flagpole
	renderFlagpole();

	// Character - Drawing Character
	drawCharacter();

	// Enemy
	for (var i = 0; i < enemy.length; i++) {
		enemy[i].draw();

		var isContact = enemy[i].checkContact(gameChar_x, gameChar_y);

		if (isContact) {
			if(lives > 0) {
				lives -=1;
				startGame();
				scream_sound.play();
				break;
			}
		}
	}

	// END - Camera Control 
	pop();

	// Life - Drawing lives
	for (i = 0; i < lives; i = i + 1) {
		drawLives(18 + i * 15, 70, 10);
	}

	for (i = 0; i < game_score; i = i + 1) {
		var x = i * 40 - 250;
		var y = -250;
		var z = 50;
		drawCollectable({x_pos: x, y_pos: y, size: z});
	}

	// Reducing lives
	checkPlayerDie();

	// ----- INTERACTION CODE -----
	// Moving the character to the left and right
	if (isLeft == true) {
		gameChar_x -= 4;
	} else if (isRight) {
		gameChar_x += 4;
	}

	// Applying gravity for jumps
	if(isPlummeting == false){
		if (gameChar_y < floorPos_y == true) {
			var isContact = false;
			for (var i = 0; i < platform.length; i++) {
				if(platform[i].checkContact(gameChar_x, gameChar_y) == true) {
					isContact = true;
					isFalling = false;
					break;
				}
			}
			if (isContact == false) {
				gameChar_y += 3;
				isFalling = true
			}
		} else {
			isFalling = false;
			plummetSpeed = 5;
		}
	}

	// Restricting movement while falling and adding velocity in y axis to fall
	if(isPlummeting == true){
		isLeft = false;
		isRight = false;
		gameChar_y += plummetSpeed;
		plummetSpeed += 0.2;
	}

	// Restricting movement after winning the first level of the game
	if(flagpole.isReached == true){
		// Draw text of level completed
		textFont("Tahoma");
		textSize(70);
		textStyle(BOLD);
		fill(0);
		text("LEVEL COMPLETED", 250, 300);

		// Draw ballon with text
		drawBalloon(550, 350, 50, 50);

		// Making character stop
		isLeft = false;
		isRight = false;
	}

	// Check flagpole
	if (flagpole.isReached == false) {
		checkFlagpole ();
	}

	// Game over
	if (lives < 1) {
		textFont("Tahoma");
		textSize(70);
		textStyle(BOLD);
		fill(0);
		text("GAME OVER", 320, 300);

		// Setting lives to -1 for the sound to stop
		lives = -1;

		// Seting character to stop
		isLeft = false;
		isRight = false;
	}
		
	// Collecting collectable when the character is less than the collectable size
	checkCollectable(collectable);
	
	// Loop for canyon collision when the character is between the canyon extension
	checkCanyon(canyon);
}

// keyPressed Function: Actions while keys are pressed
function keyPressed() {
	//Making the function stop if the flagpole is reached, making the character not being able to move anymore
	if (flagpole.isReached) {
        return;
    }

	// Setting variables as true when a key is pressed for walking left and right
	if(!isPlummeting == true){
		if(keyCode == 37){
			isLeft = true;
		} else if (keyCode == 39){
			isRight = true;
		}

	// Setting variables as true when a key is pressed for jumping
		if(keyCode == 32){
			if(isFalling == false){
				gameChar_y -= 135;
				jump_sound.play();
			}
		}
	}
}

// keyReleased Function: Actions while keys are released
function keyReleased() {
	//Making the function stop if the flagpole is reached, making the character not being able to move anymore
	if (!flagpole || flagpole.isReached === undefined) {
        return;
    }
	// Setting varibles to false when a key is released for stop walking left and right
	if (keyCode == 37) {
		isLeft = false;
	} else if (keyCode == 39) {
		isRight = false;
	}
}

// Function to draw the clouds (as in game project part 5)
function drawCloud(cloudItem) {
	// Cloud shadow
	noStroke();
	fill(75, 0, 75);
	rect(cloudItem.x_pos - 130, cloudItem.y_pos - 233, 190, 65, 45);
	ellipse(cloudItem.x_pos - 65, cloudItem.y_pos - 223, 90, 90);
	ellipse(cloudItem.x_pos, cloudItem.y_pos - 223, 65, 65);

	// Cloud body
	fill(128, 0, 128);
	rect(cloudItem.x_pos - 140, cloudItem.y_pos - 228, 190, 65, 45);
	ellipse(cloudItem.x_pos - 75, cloudItem.y_pos - 218, 90, 90);
	ellipse(cloudItem.x_pos - 10, cloudItem.y_pos - 218, 65, 65);
}

// Function to draw the trees (as in game project part 5)
function drawTree(treeItem) {
	// Tree leaves
	fill(190, 90, 0);
	ellipse(treeItem.x_pos + 169, treeItem.y_pos + 25, 90, 150);

	// Leaves shadow
	fill(152, 72, 0);
	arc(treeItem.x_pos + 169, treeItem.y_pos + 25, 90, 150, -PI / 2, PI / 2);

	// Tree trunk
	fill(183, 166, 181);
	triangle(
		treeItem.x_pos + 160,
		floorPos_y,
		treeItem.x_pos + 169,
		treeItem.y_pos + 30,
		treeItem.x_pos + 169,
		floorPos_y
	);

	// Tree trunk shadow
	noStroke();
	fill(130, 114, 128);
	triangle(
		treeItem.x_pos + 169,
		floorPos_y,
		treeItem.x_pos + 178,
		floorPos_y,
		treeItem.x_pos + 169,
		treeItem.y_pos + 30
	);
}

// Function to draw the moutain (as in game project part 5)
function drawMountain(mountainItem, part = "all") {
    if (part === "all" || part === "back") {
        // Back mountains (black mountains)
        fill(90, 80, 100);
        triangle(
            mountainItem.x_pos - 350,
            mountainItem.y_pos + 144,
            mountainItem.x_pos - 220,
            mountainItem.y_pos + 144,
            mountainItem.x_pos - 290,
            mountainItem.y_pos + 38
        );

        triangle(
            mountainItem.x_pos - 180,
            mountainItem.y_pos + 144,
            mountainItem.x_pos - 50,
            mountainItem.y_pos + 144,
            mountainItem.x_pos - 110,
            mountainItem.y_pos + 2
        );
    }

    if (part === "all" || part === "main") {
        // Main mountain
        fill(183, 166, 181);
        triangle(
            mountainItem.x_pos - 300,
            mountainItem.y_pos + 144,
            mountainItem.x_pos - 195,
            mountainItem.y_pos + 144,
            mountainItem.x_pos - 195,
            mountainItem.y_pos - 238
        );

        // Mountain shadow
        fill(130, 114, 128);
        triangle(
            mountainItem.x_pos - 90,
            mountainItem.y_pos + 144,
            mountainItem.x_pos - 195,
            mountainItem.y_pos + 144,
            mountainItem.x_pos - 195,
            mountainItem.y_pos - 238
        );

        // Ice
        fill(255, 255, 255);
        triangle(
            mountainItem.x_pos - 231.3,
            mountainItem.y_pos - 105,
            mountainItem.x_pos - 195,
            mountainItem.y_pos - 94,
            mountainItem.x_pos - 195,
            mountainItem.y_pos - 238
        );

        // Ice shadow
        fill(200, 200, 200);
        triangle(
            mountainItem.x_pos - 157.7,
            mountainItem.y_pos - 105,
            mountainItem.x_pos - 195,
            mountainItem.y_pos - 94,
            mountainItem.x_pos - 195,
            mountainItem.y_pos - 238
        );
    }
}

// Function to draw the collectable (as in game project part 5)
function drawCollectable(item) {
	// Book - Pages (in white)
	fill(255);
	stroke(0);
	strokeWeight(1);
	push();
	fill(255, 0, 0);
	fill(255);
	translate(item.x_pos + 283.5, item.y_pos + 285.5);
	rotate(radians(15));
	rect(-12.2, -14.5, item.size * 0.5, item.size * 0.7, 5);
	pop();

	// Book - Page lines
	push();
	stroke(0, 0, 0);
	strokeWeight(0.2);
	translate(item.x_pos + 279.5, item.y_pos + 287.5);
	rotate(radians(15));
	rect(-10, -17.5, item.size * 0.5, item.size * 0.7, 5);
	rect(-11, -17.5, item.size * 0.5, item.size * 0.7, 5);
	pop();

	// Book - Outside
	push();
	fill(190, 90, 0);
	stroke(0, 0, 0);
	strokeWeight(1);
	translate(item.x_pos + 279.5, item.y_pos + 287.5);
	rotate(radians(15));
	rect(-12.5, -17.5, item.size * 0.5, item.size * 0.7, 5);
	pop();

	// Book - Inside
	push();
	fill(190, 90, 0);
	stroke(0, 0, 0);
	strokeWeight(1);
	translate(item.x_pos + 279.5, item.y_pos + 287.5);
	rotate(radians(15));
	rect(-10, -15, item.size * 0.4, item.size * 0.6, 5);
	pop();

	// Book details (Moon)
	noStroke();
	fill(230, 230, 180);
	ellipse(item.x_pos + 280, item.y_pos + 287, item.size * 0.28, item.size * 0.28);

	noStroke();
	fill(190, 90, 0);
	ellipse(item.x_pos + 283, item.y_pos + 287, item.size * 0.21, item.size * 0.28);
}

// Function to draw the canyon (as in game project part 5)
function drawCanyon(canyon) {
	// Canyon body
	fill(250, 250, 250);
	beginShape();
	vertex(canyon.x_pos + 1.5 * canyon.size, canyon.y_pos + 332);
	vertex(canyon.x_pos + 4.6 * canyon.size, canyon.y_pos + 476);
	vertex(canyon.x_pos + 12.6 * canyon.size, canyon.y_pos + 476);
	vertex(canyon.x_pos + 15.7 * canyon.size, canyon.y_pos + 332);
	endShape(CLOSE);

	// Canyon shadow
	fill(100, 30, 0);
	triangle(
		canyon.x_pos + 1.5 * canyon.size,
		canyon.y_pos + 332,
		canyon.x_pos + 2.5 * canyon.size,
		canyon.y_pos + 476,
		canyon.x_pos + 4.6 * canyon.size,
		canyon.y_pos + 476
	);
	triangle(
		canyon.x_pos + 15.7 * canyon.size,
		canyon.y_pos + 332,
		canyon.x_pos + 12.6 * canyon.size,
		canyon.y_pos + 476,
		canyon.x_pos + 14.7 * canyon.size,
		canyon.y_pos + 476
	);
}

// Function to the collectable interaction (as in game project part 5)
function checkCollectable(t_collectable){
	for (var i = 0; i < t_collectable.length; i++) {
		if (
			!t_collectable[i].isFound && 
			dist(gameChar_x, gameChar_y, t_collectable[i].x_pos + 283.5, t_collectable[i].y_pos + 285.5) < t_collectable[i].size 
		) {
			t_collectable[i].isFound = true;
			game_score +=1;
			book_collection_sound.play();
		}
	}
}

function checkCanyon(t_canyon) {
    for (var i = 0; i < t_canyon.length; i++) {
        if (
            gameChar_x > t_canyon[i].x_pos +  t_canyon[i].size * 3.5 &&
            gameChar_x < t_canyon[i].x_pos +  t_canyon[i].size * 15.5 &&
            gameChar_y >= t_canyon[i].y_pos + 332
        ) {
            if (!isPlummeting) {
                isPlummeting = true;
                scream_sound.play();
            }
        }
    }
}

// Draw Character
function drawCharacter() {
	// ----- DRAW GAME CHARACTER -----
	// Game Character - Jumping Left
	if (isLeft && isFalling) {
		// Black reflection
		noStroke();
		fill(0);
		arc(gameChar_x - 15, gameChar_y - 63, 14, 14, 0, PI, PIE);
		arc(gameChar_x + 7, gameChar_y - 63, 14, 14, 0, PI, PIE);

		// Beard
		noStroke();
		fill(200);
		rect(gameChar_x + 2, gameChar_y - 65, 7, 10, 1);

		// Mantle
		// First rectangle
		noStroke();
		fill(87, 87, 87);
		rect(gameChar_x - 20, gameChar_y - 57, 30, 27, 4);

		// Second rectangle
		noStroke();
		fill(87, 87, 87);
		rect(gameChar_x - 20, gameChar_y - 30, 30, 30, 4);

		// Sleeve (left)
		noStroke();
		fill(87, 87, 87);
		arc(gameChar_x - 28 + 2, gameChar_y - 55, 20, 20, PI + HALF_PI, HALF_PI, PIE);


		// Sleeve (right)
		noStroke();
		fill(87, 87, 87);
		arc(gameChar_x + 5, gameChar_y - 40, 20, 32, PI + HALF_PI, HALF_PI, PIE);

		// Sleeve shadow
		noStroke();
		fill(48, 46, 40);
		arc(gameChar_x - 28 + 2, gameChar_y - 52, 14, 14, PI + HALF_PI, HALF_PI, PIE);

		// Final mantle part (curved)
		noStroke();
		fill(87, 87, 87);
		beginShape();
		curveVertex(gameChar_x + 10, gameChar_y - 10);
		curveVertex(gameChar_x + 10, gameChar_y - 8);
		curveVertex(gameChar_x + 13, gameChar_y - 2);
		curveVertex(gameChar_x + 16, gameChar_y);
		vertex(gameChar_x, gameChar_y - 1);
		endShape(CLOSE);

		// Staff
		// Diamond
		noStroke();
		fill(70, 177, 225);
		quad(
			gameChar_x - 25.3,
			gameChar_y - 88.5,
			gameChar_x - 29,
			gameChar_y - 81,
			gameChar_x - 25.3,
			gameChar_y - 71,
			gameChar_x - 21,
			gameChar_y - 81			
		);

		// Big part of staff
		noStroke();
		fill(105, 58, 32);
		rect(gameChar_x - 26.5, gameChar_y - 80, 3, 65);

		// Small parts of staff (right)
		noStroke();
		fill(105, 58, 32);
		quad(
			gameChar_x - 31.4,
			gameChar_y - 79,
			gameChar_x - 28.4,
			gameChar_y - 79,
			gameChar_x - 23.4,
			gameChar_y - 74,
			gameChar_x - 26.4,
			gameChar_y - 74
		);

		// Small parts of staff (left)
		noStroke();
		fill(105, 58, 32);
		quad(
			gameChar_x - 20.8,
			gameChar_y - 79,
			gameChar_x - 17.8,
			gameChar_y - 79,
			gameChar_x - 23.9,
			gameChar_y - 74,
			gameChar_x - 26.9,
			gameChar_y - 74			
		);

		// Hand
		noStroke();
		fill(231, 156, 113);
		rect(gameChar_x - 27.5, gameChar_y - 65, 5, 6, 2);

		// Beard details
		noStroke();
		fill(242, 242, 242);
		arc(gameChar_x - 8, gameChar_y - 47.5, 9.9, 30, HALF_PI, PI + HALF_PI, PIE);
		arc(gameChar_x - 5, gameChar_y - 52.5, 10, 40, HALF_PI, PI + HALF_PI, PIE);
		arc(gameChar_x - 2, gameChar_y - 52.5, 10, 40, HALF_PI, PI + HALF_PI, PIE);
		arc(gameChar_x + 2.2, gameChar_y - 56, 9, 20, HALF_PI, PI + HALF_PI, PIE);
		arc(gameChar_x - 11.5, gameChar_y - 56, 8, 10, HALF_PI, PI + HALF_PI, PIE);
		arc(gameChar_x - 15.4, gameChar_y - 45, 8, 25, PI + HALF_PI, HALF_PI, PIE);

		// Face and beard highlights
		noStroke();
		fill(200);
		arc(gameChar_x + 2.5, gameChar_y - 62, 8, 8, HALF_PI, PI + HALF_PI, PIE);

		noStroke();
		fill(231, 156, 113);
		rect(gameChar_x - 13, gameChar_y - 66, 12, 8, 1);
		rect(gameChar_x - 14, gameChar_y - 63, 10, 5);

		noStroke();
		fill(200);
		arc(gameChar_x - 16, gameChar_y - 62, 5, 6, PI + HALF_PI, HALF_PI, PIE);

		// Hat
		noStroke();
		fill(128, 0, 128);
		arc(gameChar_x + 3, gameChar_y - 81, 20, 20, 0, HALF_PI, PIE);
		arc(gameChar_x + 3, gameChar_y - 67, 28, 28, PI, PI + HALF_PI, PIE);
		triangle(
			gameChar_x - 22,
			gameChar_y - 63,
			gameChar_x + 14,
			gameChar_y - 63,
			gameChar_x - 4,
			gameChar_y - 70
		);
	}

	// Game Character - Jumping Right
	else if (isRight && isFalling) {
		// Black reflection
		noStroke();
		fill(0);
		arc(gameChar_x - 17, gameChar_y - 63, 14, 14, 0, PI, PIE);
		arc(gameChar_x + 5, gameChar_y - 63, 14, 14, 0, PI, PIE);

		// Beard
		noStroke();
		fill(200);
		rect(gameChar_x - 19, gameChar_y - 65, 7, 10, 1);

		// Mantle
		// First rectangle
		noStroke();
		fill(87, 87, 87);
		rect(gameChar_x - 20, gameChar_y - 57, 30, 27, 4);

		// Second rectangle
		noStroke();
		fill(87, 87, 87);
		rect(gameChar_x - 20, gameChar_y - 30, 30, 30, 4);

		// Sleeve (right)
		noStroke();
		fill(87, 87, 87);
		arc(gameChar_x + 16, gameChar_y - 45 - 10, 20, 20, HALF_PI, PI + HALF_PI, PIE);

		// Triangle decoration
		noStroke();
		fill(87, 87, 87);
		triangle(
			gameChar_x + 8,
			gameChar_y - 56,
			gameChar_x + 8,
			gameChar_y - 50,
			gameChar_x + 15,
			gameChar_y - 50
		);

		// Sleeve (left)
		noStroke();
		fill(87, 87, 87);
		arc(gameChar_x - 14, gameChar_y - 40, 20, 32, HALF_PI, PI + HALF_PI, PIE);

		// Sleeve shadow
		noStroke();
		fill(48, 46, 40);
		arc(gameChar_x + 16, gameChar_y - 42 -10, 14, 14, HALF_PI, PI + HALF_PI, PIE);

		// Final mantle part (curved)
		noStroke();
		fill(87, 87, 87);
		beginShape();
		curveVertex(gameChar_x - 20, gameChar_y - 10);
		curveVertex(gameChar_x - 20, gameChar_y - 8);
		curveVertex(gameChar_x - 23, gameChar_y - 2);
		curveVertex(gameChar_x - 26, gameChar_y);
		vertex(gameChar_x, gameChar_y - 1);
		endShape(CLOSE);

		// Staff
		// Diamond
		noStroke();
		fill(70, 177, 225);
		quad(
			gameChar_x + 15.3,
			gameChar_y - 88.5,
			gameChar_x + 19,
			gameChar_y - 81,
			gameChar_x + 15.3,
			gameChar_y - 71,
			gameChar_x + 11,
			gameChar_y - 81
		);

		// Big part of staff
		noStroke();
		fill(105, 58, 32);
		rect(gameChar_x + 13.5, gameChar_y - 80, 3, 65);

		// Small parts of staff (right)
		noStroke();
		fill(105, 58, 32);
		quad(
			gameChar_x + 21.4,
			gameChar_y - 79,
			gameChar_x + 18.4,
			gameChar_y - 79,
			gameChar_x + 13.4,
			gameChar_y - 74,
			gameChar_x + 16.4,
			gameChar_y - 74			
		);

		// Small parts of staff (left)
		noStroke();
		fill(105, 58, 32);
		quad(
			gameChar_x + 10.8,
			gameChar_y - 79,
			gameChar_x + 7.8,
			gameChar_y - 79,
			gameChar_x + 13.9,
			gameChar_y - 74,
			gameChar_x + 16.9,
			gameChar_y - 74			
		);

		// Hand
		noStroke();
		fill(231, 156, 113);
		rect(gameChar_x + 12.5, gameChar_y - 70, 5, 6, 2);

		// Beard
		noStroke();
		fill(242, 242, 242);
		arc(gameChar_x - 13, gameChar_y - 61, 10, 30, PI + HALF_PI, HALF_PI, PIE);
		arc(gameChar_x - 8.8, gameChar_y - 52, 10, 40, PI + HALF_PI, HALF_PI, PIE);
		arc(gameChar_x - 5.8, gameChar_y - 52, 10, 40, PI + HALF_PI, HALF_PI, PIE);
		arc(gameChar_x - 3, gameChar_y - 52, 10, 40, PI + HALF_PI, HALF_PI, PIE);

		// Beard details
		noStroke();
		fill(242, 242, 242);
		arc(gameChar_x + 1.6, gameChar_y - 56, 8, 10, PI + HALF_PI, HALF_PI, PIE);
		arc(gameChar_x + 5.4, gameChar_y - 45, 10, 25, HALF_PI, PI + HALF_PI, PIE);

		// Beard and face highlights
		noStroke();
		fill(200);
		arc(gameChar_x - 13, gameChar_y - 62, 8, 8, -HALF_PI, HALF_PI, PIE);

		noStroke();
		fill(231, 156, 113);
		rect(gameChar_x - 9.2, gameChar_y - 66, 13, 8, 1);
		rect(gameChar_x - 5.9, gameChar_y - 63, 10, 5);

		noStroke();
		fill(200);
		arc(gameChar_x + 6.5, gameChar_y - 62, 6, 6, HALF_PI, PI + HALF_PI, PIE);

		// Hat
		noStroke();
		fill(128, 0, 128);
		arc(gameChar_x - 13, gameChar_y - 81, 20, 20, HALF_PI, PI, PIE);
		arc(gameChar_x - 13, gameChar_y - 67, 28, 28, -HALF_PI, 0, PIE);

		noStroke();
		fill(128, 0, 128);
		triangle(
			gameChar_x - 24,
			gameChar_y - 63,
			gameChar_x + 12,
			gameChar_y - 63,
			gameChar_x - 6,
			gameChar_y - 70
		);
	}

	// Game Character - Walking Left
	else if (isLeft) {
		// Black reflection
		noStroke();
		fill(0);
		arc(gameChar_x - 15, gameChar_y - 63, 14, 14, 0, PI, PIE);
		arc(gameChar_x + 7, gameChar_y - 63, 14, 14, 0, PI, PIE);

		// Beard
		noStroke();
		fill(200);
		rect(gameChar_x + 2, gameChar_y - 65, 7, 10, 1);

		// Mantle
		// First rectangle
		noStroke();
		fill(87, 87, 87);
		rect(gameChar_x - 20, gameChar_y - 57, 30, 27, 4);

		// Second rectangle
		noStroke();
		fill(87, 87, 87);
		rect(gameChar_x - 20, gameChar_y - 30, 30, 30, 4);

		// Sleeve (left)
		noStroke();
		fill(87, 87, 87);
		arc(gameChar_x - 28, gameChar_y - 45, 20, 20, PI + HALF_PI, HALF_PI, PIE);

		// Triangle decoration
		noStroke();
		fill(87, 87, 87);
		triangle(
			gameChar_x - 18,
			gameChar_y - 56,
			gameChar_x - 28,
			gameChar_y - 51,
			gameChar_x - 18,
			gameChar_y - 51
		);

		// Sleeve (right)
		noStroke();
		fill(87, 87, 87);
		arc(gameChar_x + 5, gameChar_y - 40, 20, 32, PI + HALF_PI, HALF_PI, PIE);

		// Sleeve shadow
		noStroke();
		fill(48, 46, 40);
		arc(gameChar_x - 28, gameChar_y - 42, 14, 14, PI + HALF_PI, HALF_PI, PIE);

		// Final mantle part (curved)
		noStroke();
		fill(87, 87, 87);
		beginShape();
		curveVertex(gameChar_x + 10, gameChar_y - 10);
		curveVertex(gameChar_x + 10, gameChar_y - 8);
		curveVertex(gameChar_x + 13, gameChar_y - 2);
		curveVertex(gameChar_x + 16, gameChar_y);
		vertex(gameChar_x, gameChar_y - 1);
		endShape(CLOSE);

		// Staff
		// Diamond
		noStroke();
		fill(70, 177, 225);
		quad(
			gameChar_x - 29.3,
			gameChar_y - 73.5,
			gameChar_x - 33,
			gameChar_y - 66,
			gameChar_x - 29.3,
			gameChar_y - 56,
			gameChar_x - 25,
			gameChar_y - 66
		);

		// Big part of staff
		noStroke();
		fill(105, 58, 32);
		rect(gameChar_x - 30.5, gameChar_y - 65, 3, 65);

		// Small parts of staff (right)
		noStroke();
		fill(105, 58, 32);
		quad(
			gameChar_x - 35.4,
			gameChar_y - 64,
			gameChar_x - 32.4,
			gameChar_y - 64,
			gameChar_x - 27.4,
			gameChar_y - 59,
			gameChar_x - 30.4,
			gameChar_y - 59
		);

		// Small parts of staff (left)
		noStroke();
		fill(105, 58, 32);
		quad(
			gameChar_x - 24.8,
			gameChar_y - 64,
			gameChar_x - 21.8,
			gameChar_y - 64,
			gameChar_x - 27.9,
			gameChar_y - 59,
			gameChar_x - 30.9,
			gameChar_y - 59
		);

		// Hand
		noStroke();
		fill(231, 156, 113);
		rect(gameChar_x - 31.5, gameChar_y - 55, 5, 6, 2);

		// Beard details
		noStroke();
		fill(242, 242, 242);
		arc(gameChar_x - 8, gameChar_y - 47.5, 9.9, 30, HALF_PI, PI + HALF_PI, PIE);
		arc(gameChar_x - 5, gameChar_y - 52.5, 10, 40, HALF_PI, PI + HALF_PI, PIE);
		arc(gameChar_x - 2, gameChar_y - 52.5, 10, 40, HALF_PI, PI + HALF_PI, PIE);
		arc(gameChar_x + 2.2, gameChar_y - 56, 9, 20, HALF_PI, PI + HALF_PI, PIE);
		arc(gameChar_x - 11.5, gameChar_y - 56, 8, 10, HALF_PI, PI + HALF_PI, PIE);
		arc(gameChar_x - 15.4, gameChar_y - 45, 8, 25, PI + HALF_PI, HALF_PI, PIE);

		// Beard highlights
		noStroke();
		fill(200);
		arc(gameChar_x + 2.5, gameChar_y - 62, 8, 8, HALF_PI, PI + HALF_PI, PIE);

		// Face highlights
		noStroke();
		fill(231, 156, 113);
		rect(gameChar_x - 13, gameChar_y - 66, 12, 8, 1);
		rect(gameChar_x - 14, gameChar_y - 63, 10, 5);

		noStroke();
		fill(200);
		arc(gameChar_x - 16, gameChar_y - 62, 5, 6, PI + HALF_PI, HALF_PI, PIE);

		// Hat
		noStroke();
		fill(128, 0, 128);
		arc(gameChar_x + 3, gameChar_y - 81, 20, 20, 0, HALF_PI, PIE);
		arc(gameChar_x + 3, gameChar_y - 67, 28, 28, PI, PI + HALF_PI, PIE);

		noStroke();
		fill(128, 0, 128);
		triangle(
			gameChar_x - 22,
			gameChar_y - 63,
			gameChar_x + 14,
			gameChar_y - 63,
			gameChar_x - 4,
			gameChar_y - 70
		);
	}

	// Game Character - Walking Right
	else if (isRight) {
		// Black reflection
		noStroke();
		fill(0);
		arc(gameChar_x - 17, gameChar_y - 63, 14, 14, 0, PI, PIE);
		arc(gameChar_x + 5, gameChar_y - 63, 14, 14, 0, PI, PIE);

		// Beard
		noStroke();
		fill(200);
		rect(gameChar_x - 19, gameChar_y - 65, 7, 10, 1);

		// Mantle
		// First rectangle
		noStroke();
		fill(87, 87, 87);
		rect(gameChar_x - 20, gameChar_y - 57, 30, 27, 4);

		// Second rectangle
		noStroke();
		fill(87, 87, 87);
		rect(gameChar_x - 20, gameChar_y - 30, 30, 30, 4);

		// Sleeve (right)
		noStroke();
		fill(87, 87, 87);
		arc(gameChar_x + 18, gameChar_y - 45, 20, 20, HALF_PI, PI + HALF_PI, PIE);

		// Triangle decoration
		noStroke();
		fill(87, 87, 87);
		triangle(
			gameChar_x + 8,
			gameChar_y - 56,
			gameChar_x + 8,
			gameChar_y - 50,
			gameChar_x + 15,
			gameChar_y - 50
		);

		// Sleeve (left)
		noStroke();
		fill(87, 87, 87);
		arc(gameChar_x - 14, gameChar_y - 40, 20, 32, HALF_PI, PI + HALF_PI, PIE);

		// Sleeve shadow
		noStroke();
		fill(48, 46, 40);
		arc(gameChar_x + 20, gameChar_y - 42, 14, 14, HALF_PI, PI + HALF_PI, PIE);

		// Final mantle part (curved)
		noStroke();
		fill(87, 87, 87);
		beginShape();
		curveVertex(gameChar_x - 20, gameChar_y - 10);
		curveVertex(gameChar_x - 20, gameChar_y - 8);
		curveVertex(gameChar_x - 23, gameChar_y - 2);
		curveVertex(gameChar_x - 26, gameChar_y);
		vertex(gameChar_x, gameChar_y - 1);
		endShape(CLOSE);

		// Staff
		// Diamond
		noStroke();
		fill(70, 177, 225);
		quad(
			gameChar_x + 19.3,
			gameChar_y - 73.5,
			gameChar_x + 23,
			gameChar_y - 66,
			gameChar_x + 19.3,
			gameChar_y - 56,
			gameChar_x + 15,
			gameChar_y - 66
		);

		// Big part of staff
		noStroke();
		fill(105, 58, 32);
		rect(gameChar_x + 17.5, gameChar_y - 65, 3, 65);

		// Small parts of staff (right)
		noStroke();
		fill(105, 58, 32);
		quad(
			gameChar_x + 25.4,
			gameChar_y - 64,
			gameChar_x + 22.4,
			gameChar_y - 64,
			gameChar_x + 17.4,
			gameChar_y - 59,
			gameChar_x + 20.4,
			gameChar_y - 59
		);

		// Small parts of staff (left)
		noStroke();
		fill(105, 58, 32);
		quad(
			gameChar_x + 14.8,
			gameChar_y - 64,
			gameChar_x + 11.8,
			gameChar_y - 64,
			gameChar_x + 17.9,
			gameChar_y - 59,
			gameChar_x + 20.9,
			gameChar_y - 59
		);

		// Hand
		noStroke();
		fill(231, 156, 113);
		rect(gameChar_x + 16.5, gameChar_y - 55, 5, 6, 2);

		// Beard
		noStroke();
		fill(242, 242, 242);
		arc(gameChar_x - 13, gameChar_y - 61, 10, 30, PI + HALF_PI, HALF_PI, PIE);
		arc(gameChar_x - 8.8, gameChar_y - 52, 10, 40, PI + HALF_PI, HALF_PI, PIE);
		arc(gameChar_x - 5.8, gameChar_y - 52, 10, 40, PI + HALF_PI, HALF_PI, PIE);
		arc(gameChar_x - 3, gameChar_y - 52, 10, 40, PI + HALF_PI, HALF_PI, PIE);
		arc(gameChar_x + 1.6, gameChar_y - 56, 8, 10, PI + HALF_PI, HALF_PI, PIE);
		arc(gameChar_x + 5.4, gameChar_y - 45, 10, 25, HALF_PI, PI + HALF_PI, PIE);

		// Beard highlights
		noStroke();
		fill(200);
		arc(gameChar_x - 13, gameChar_y - 62, 8, 8, -HALF_PI, HALF_PI, PIE);

		// Face highlights
		noStroke();
		fill(231, 156, 113);
		rect(gameChar_x - 9.2, gameChar_y - 66, 13, 8, 1);
		rect(gameChar_x - 5.9, gameChar_y - 63, 10, 5);

		noStroke();
		fill(200);
		arc(gameChar_x + 6.5, gameChar_y - 62, 6, 6, HALF_PI, PI + HALF_PI, PIE);

		// Hat
		noStroke();
		fill(128, 0, 128);
		arc(gameChar_x - 13, gameChar_y - 81, 20, 20, HALF_PI, PI, PIE);
		arc(gameChar_x - 13, gameChar_y - 67, 28, 28, -HALF_PI, 0, PIE);

		noStroke();
		fill(128, 0, 128);
		triangle(
			gameChar_x - 26 + 2,
			gameChar_y - 63,
			gameChar_x + 10 + 2,
			gameChar_y - 63,
			gameChar_x - 8 + 2,
			gameChar_y - 70
		);
	}

	// Game Character - Jumping Facing Forwards
	else if (isFalling || isPlummeting) {
		// Black reflection
		noStroke();
		fill(0);
		arc(gameChar_x - 17, gameChar_y - 63, 14, 14, 0, PI, PIE);
		arc(gameChar_x + 5, gameChar_y - 63, 14, 14, 0, PI, PIE);

		// Beard
		noStroke();
		fill(200);
		rect(gameChar_x - 19, gameChar_y - 65, 7, 10, 1);

		// Mantle
		// First rectangle
		noStroke();
		fill(87, 87, 87);
		rect(gameChar_x - 20, gameChar_y - 57, 30, 27, 4);

		// Second rectangle
		noStroke();
		fill(87, 87, 87);
		rect(gameChar_x - 20, gameChar_y - 30, 30, 30, 4);

		// Sleeve (right)
		noStroke();
		fill(87, 87, 87);
		arc(gameChar_x + 16, gameChar_y - 45 - 10, 20, 20, HALF_PI, PI + HALF_PI, PIE);

		// Triangle decoration
		noStroke();
		fill(87, 87, 87);
		triangle(
			gameChar_x + 8,
			gameChar_y - 56,
			gameChar_x + 8,
			gameChar_y - 50,
			gameChar_x + 15,
			gameChar_y - 50
		);

		// Sleeve (left)
		noStroke();
		fill(87, 87, 87);
		arc(gameChar_x - 14, gameChar_y - 40, 20, 32, HALF_PI, PI + HALF_PI, PIE);

		// Sleeve shadow
		noStroke();
		fill(48, 46, 40);
		arc(gameChar_x + 16, gameChar_y - 42 -10, 14, 14, HALF_PI, PI + HALF_PI, PIE);

		// Final mantle part (curved)
		noStroke();
		fill(87, 87, 87);
		beginShape();
		curveVertex(gameChar_x - 20, gameChar_y - 10);
		curveVertex(gameChar_x - 20, gameChar_y - 8);
		curveVertex(gameChar_x - 23, gameChar_y - 2);
		curveVertex(gameChar_x - 26, gameChar_y);
		vertex(gameChar_x, gameChar_y - 1);
		endShape(CLOSE);

		// Staff
		// Diamond
		noStroke();
		fill(70, 177, 225);
		quad(
			gameChar_x + 15.3,
			gameChar_y - 88.5,
			gameChar_x + 19,
			gameChar_y - 81,
			gameChar_x + 15.3,
			gameChar_y - 71,
			gameChar_x + 11,
			gameChar_y - 81
		);

		// Big part of staff
		noStroke();
		fill(105, 58, 32);
		rect(gameChar_x + 13.5, gameChar_y - 80, 3, 65);

		// Small parts of staff (right)
		noStroke();
		fill(105, 58, 32);
		quad(
			gameChar_x + 21.4,
			gameChar_y - 79,
			gameChar_x + 18.4,
			gameChar_y - 79,
			gameChar_x + 13.4,
			gameChar_y - 74,
			gameChar_x + 16.4,
			gameChar_y - 74			
		);

		// Small parts of staff (left)
		noStroke();
		fill(105, 58, 32);
		quad(
			gameChar_x + 10.8,
			gameChar_y - 79,
			gameChar_x + 7.8,
			gameChar_y - 79,
			gameChar_x + 13.9,
			gameChar_y - 74,
			gameChar_x + 16.9,
			gameChar_y - 74			
		);

		// Hand
		noStroke();
		fill(231, 156, 113);
		rect(gameChar_x + 12.5, gameChar_y - 70, 5, 6, 2);

		// Beard
		noStroke();
		fill(242, 242, 242);
		arc(gameChar_x - 13, gameChar_y - 61, 10, 30, PI + HALF_PI, HALF_PI, PIE);
		arc(gameChar_x - 8.8, gameChar_y - 52, 10, 40, PI + HALF_PI, HALF_PI, PIE);
		arc(gameChar_x - 5.8, gameChar_y - 52, 10, 40, PI + HALF_PI, HALF_PI, PIE);
		arc(gameChar_x - 3, gameChar_y - 52, 10, 40, PI + HALF_PI, HALF_PI, PIE);

		// Beard details
		noStroke();
		fill(242, 242, 242);
		arc(gameChar_x + 1.6, gameChar_y - 56, 8, 10, PI + HALF_PI, HALF_PI, PIE);
		arc(gameChar_x + 5.4, gameChar_y - 45, 10, 25, HALF_PI, PI + HALF_PI, PIE);

		// Beard and face highlights
		noStroke();
		fill(200);
		arc(gameChar_x - 13, gameChar_y - 62, 8, 8, -HALF_PI, HALF_PI, PIE);

		noStroke();
		fill(231, 156, 113);
		rect(gameChar_x - 9.2, gameChar_y - 66, 13, 8, 1);
		rect(gameChar_x - 5.9, gameChar_y - 63, 10, 5);

		noStroke();
		fill(200);
		arc(gameChar_x + 6.5, gameChar_y - 62, 6, 6, HALF_PI, PI + HALF_PI, PIE);

		// Hat
		noStroke();
		fill(128, 0, 128);
		arc(gameChar_x - 13, gameChar_y - 81, 20, 20, HALF_PI, PI, PIE);
		arc(gameChar_x - 13, gameChar_y - 67, 28, 28, -HALF_PI, 0, PIE);

		noStroke();
		fill(128, 0, 128);
		triangle(
			gameChar_x - 24,
			gameChar_y - 63,
			gameChar_x + 12,
			gameChar_y - 63,
			gameChar_x - 6,
			gameChar_y - 70
		);
	} 

	// Game Character - Standing front facing
	else {
		noStroke();
		fill(0);
		arc(gameChar_x - 17, gameChar_y - 63, 14, 14, 0, PI, PIE);
		arc(gameChar_x + 5, gameChar_y - 63, 14, 14, 0, PI, PIE);

		// Beard
		noStroke();
		fill(200);
		rect(gameChar_x - 19, gameChar_y - 65, 7, 10, 1);

		// Mantle
		// First rectangle
		noStroke();
		fill(87, 87, 87);
		rect(gameChar_x - 20, gameChar_y - 57, 30, 27, 4);

		// Second rectangle
		noStroke();
		fill(87, 87, 87);
		rect(gameChar_x - 20, gameChar_y - 30, 30, 30, 4);

		// Sleeve (right)
		noStroke();
		fill(87, 87, 87);
		arc(gameChar_x + 18, gameChar_y - 45, 20, 20, HALF_PI, PI + HALF_PI, PIE);

		//Triangle
		noStroke();
		fill(87, 87, 87);
		triangle(
			gameChar_x + 8,
			gameChar_y - 56,
			gameChar_x + 8,
			gameChar_y - 50,
			gameChar_x + 15,
			gameChar_y - 50
		);

		//  Sleeve (Left)
		noStroke();
		fill(87, 87, 87);
		arc(gameChar_x - 14, gameChar_y - 40, 20, 32, HALF_PI, PI + HALF_PI, PIE);

		// Sleeve shadow
		noStroke();
		fill(48, 46, 40);
		arc(gameChar_x + 20, gameChar_y - 42, 14, 14, HALF_PI, PI + HALF_PI, PIE);

		// Final mantle part (curved)
		noStroke();
		fill(87, 87, 87);
		beginShape();
		curveVertex(gameChar_x - 20, gameChar_y - 10);
		curveVertex(gameChar_x - 20, gameChar_y - 8);
		curveVertex(gameChar_x - 23, gameChar_y - 2);
		curveVertex(gameChar_x - 26, gameChar_y);
		vertex(gameChar_x, gameChar_y - 1);
		endShape(CLOSE);

		// Staff
		// Diamont
		noStroke();
		fill(70, 177, 225);
		quad(
			gameChar_x + 19.3,
			gameChar_y - 73.5,
			gameChar_x + 23,
			gameChar_y - 66,
			gameChar_x + 19.3,
			gameChar_y - 56,
			gameChar_x + 15,
			gameChar_y - 66
		);

		// Big part of staff
		noStroke();
		fill(105, 58, 32);
		rect(gameChar_x + 17.5, gameChar_y - 65, 3, 65);

		// Small parts of staff (right)
		noStroke();
		fill(105, 58, 32);
		quad(
			gameChar_x + 25.4,
			gameChar_y - 64,
			gameChar_x + 22.4,
			gameChar_y - 64,
			gameChar_x + 17.4,
			gameChar_y - 59,
			gameChar_x + 20.4,
			gameChar_y - 59
		);

		// Small parts of staff (left)
		noStroke();
		fill(105, 58, 32);
		quad(
			gameChar_x + 14.8,
			gameChar_y - 64,
			gameChar_x + 11.8,
			gameChar_y - 64,
			gameChar_x + 17.9,
			gameChar_y - 59,
			gameChar_x + 20.9,
			gameChar_y - 59
		);

		// Hand
		noStroke();
		fill(231, 156, 113);
		rect(gameChar_x + 16.5, gameChar_y - 55, 5, 6, 2);

		// Beard
		noStroke();
		fill(242, 242, 242);
		arc(gameChar_x - 13, gameChar_y - 61, 10, 30, PI + HALF_PI, HALF_PI, PIE);

		noStroke();
		fill(242, 242, 242);
		arc(gameChar_x - 8.8, gameChar_y - 52, 10, 40, PI + HALF_PI, HALF_PI, PIE);

		noStroke();
		fill(242, 242, 242);
		arc(gameChar_x - 5.8, gameChar_y - 52, 10, 40, PI + HALF_PI, HALF_PI, PIE);

		noStroke();
		fill(242, 242, 242);
		arc(gameChar_x - 3, gameChar_y - 52, 10, 40, PI + HALF_PI, HALF_PI, PIE);

		noStroke();
		fill(242, 242, 242);
		arc(gameChar_x + 1.6, gameChar_y - 56, 8, 10, PI + HALF_PI, HALF_PI, PIE);
		noStroke();
		fill(242, 242, 242);
		arc(gameChar_x + 5.4, gameChar_y - 45, 10, 25, HALF_PI, PI + HALF_PI, PIE);

		noStroke();
		fill(200);
		arc(gameChar_x - 13, gameChar_y - 62, 8, 8, -HALF_PI, HALF_PI, PIE);

		noStroke();
		fill(231, 156, 113);
		rect(gameChar_x - 9.2, gameChar_y - 66, 13, 8, 1);

		noStroke();
		fill(231, 156, 113);
		rect(gameChar_x - 5.9, gameChar_y - 63, 10, 5);

		noStroke();
		fill(200);
		arc(gameChar_x + 6.5, gameChar_y - 62, 6, 6, HALF_PI, PI + HALF_PI, PIE);

		// Hat
		noStroke();
		fill(128, 0, 128);
		arc(gameChar_x - 13, gameChar_y - 81, 20, 20, HALF_PI, PI, PIE);

		noStroke();
		fill(128, 0, 128);
		arc(gameChar_x - 13, gameChar_y - 67, 28, 28, -HALF_PI, 0, PIE);

		noStroke();
		fill(128, 0, 128);
		triangle(
			gameChar_x - 26 + 2,
			gameChar_y - 63,
			gameChar_x + 10 + 2,
			gameChar_y - 63,
			gameChar_x - 8 + 2,
			gameChar_y - 70
		);
	}
}

function drawInstructions () {
	// Main Instructions
	textFont("Tahoma");
	textSize(15);
	textStyle(BOLD);
	fill(0);
	text("Use the LEFT and RIGHT arrows to move.", 130, 160);
	text("Press SPACEBAR to jump.", 130, 180);

	// Correct way 
	textFont("Tahoma");
	textSize(28);
	textStyle(BOLD);
	fill(0);
	text("It's the other way,", - 260, 250);
	text("dear wizard", - 260, 280);
}



function drawScore () {
	textFont("Tahoma");
	textSize(20);
	textStyle(NORMAL);
	fill(0);
}

// Function made by Mithru, published in p5.js website 
function drawLives (x, y, size) {
	fill(220, 0, 0);
	beginShape();
	vertex(x, y);
	bezierVertex(x - size / 2, y - size / 2, x - size, y + size / 3, x, y + size);
	bezierVertex(x + size, y + size / 3, x + size / 2, y - size / 2, x, y);
	endShape(CLOSE);
}

function renderFlagpole() {
	push();
	strokeWeight(5);
	stroke(130, 130, 130);
	line(flagpole.x_pos, floorPos_y, flagpole.x_pos, floorPos_y - 250);
	fill(128, 0, 128)
	noStroke();

	if(flagpole.isReached == true) {
		rect(flagpole.x_pos + 2, floorPos_y - 250, 40, 30); 
	}
	else {
		rect(flagpole.x_pos + 2, floorPos_y - 30, 40, 30);
	}
	pop();
}

function checkFlagpole () {
	var d = abs(gameChar_x - flagpole.x_pos);

	if(d < 15) {
		flagpole.isReached = true;
	}
}

// Code got from here: https://editor.p5js.org/jordanne/sketches/lAQF2I-Gh
function drawBalloon(shapePosX, shapePosY, shapeWidth, shapeHeight) {
	push();
	translate(shapePosX, shapePosY);
	scale(shapeWidth/235.20299400000002, shapeHeight/233.80118399999998);
	stroke(0);
	fill(255);
	beginShape();
	vertex(-105, -86);
	bezierVertex(-105, -142, -67, -160, 3, -160);
	bezierVertex(73, -160, 122, -165, 122, -85);
	bezierVertex(122, -5, 87, 28, -5, 28);
	bezierVertex(-8, 47, -15, 64, -41, 72);
	bezierVertex(-93, 79, -24, 62, -38, 28);
	bezierVertex(-86, 28, -108, -22, -104, -85);
	endShape();
	pop();
	textFont("Tahoma");
	textSize(10);
	textStyle(NORMAL);
	fill(0);
	text("You, shall", 532, 332);
	text("not, pass!", 532, 345);
}

function checkPlayerDie() {
	if (gameChar_y > 576 && !restartTriggered) {
	  restartTriggered = true;
	  setTimeout(function() {
		lives -= 1;
		if (lives > 0) {
		  startGame();
		}
		restartTriggered = false;
	  }, 1000); // Delaying one second after restart the dame
	}
}

function drawPlatforms (x,y,length) {
	var p = {
		x: x,
		y: y,
		length: length,
		draw: function() {
			fill(130, 40, 0);
			rect(this.x, this.y, this.length, 20);
		},
		checkContact: function(gc_x, gc_y) {
			if(gc_x > this.x && gc_x < this.x + this.length) {
				var d = this.y - gc_y;
				if(d >= 0 && d < 5) {
					return true;
				}
			}
			return false;
		}
	}

	return p;
}

function enemies (x, y, range, speed) {
	this.x = x;
	this.y = y;
	this.range = range;
	this.speed = speed;

	this.currentX = x;
	this.inc = speed;

	this.update = function() {
		this.currentX += this.inc;

		if (this.currentX >= this.x + this.range) {
			this.inc = -speed;
		}
		else if (this.currentX < this.x) {
			this.inc = speed;
		}
	}

    this.draw = function () {
        this.update();
		// GOT FROM https://editor.p5js.org/jackiehu/sketches/Sy7JkKJk4
        // Centralize a forma em torno de currentX e y
        push();
        translate(this.currentX, this.y);
		scale(0.4);

		// Calcula a transparência dinâmica usando seno
		let alphaValue = map(sin(phase), -1, 1, 200, 255); // Oscila entre 50 e 255
		phase += 0.05; // Incrementa a fase para a próxima iteração

        // Main
        fill(244, 170, 43, alphaValue);
        beginShape();
        vertex(-80, 0);
        bezierVertex(-30, -50, 30, -50, 80, 0);
        bezierVertex(30, 50, -30, 50, -80, 0);
        endShape(CLOSE);

        // Internal ellipses
		fill(201, 57, 33, alphaValue * 0.8);
        ellipse(0, 0, 60, 60);
        ellipse(0, 0, 30, 30);

		// Orange
		fill(244, 170, 43, alphaValue * 0.5);
		ellipse(0, 0, 22, 50);

		// Black
		fill(0, 0, 0);
		ellipse(0, 0, 10, 50);

        pop();
    };

	this.checkContact = function(gc_x, gx_y) {
		var d = dist(gc_x, gx_y, this.currentX, this.y)

		if(d < 30) {
			return true;
		}
		return false;
	}
}
// END - CODE WRITTEN WITHOUT ASSISTANCE