var ZombieAttack = function () { 
	
		};
		
	ZombieAttack.prototype =   {

		init: function(){

			game.stage.backgroundColor = 0xf9f8dc;
			game.scale.pageAlignVertically = true;
		    game.scale.pageAlignHorizontally = true;
		    game.scale.scaleMode = Phaser.	ScaleManager.SHOW_ALL;

		    game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
		 	game.scale.refresh();

			game.physics.startSystem(Phaser.Physics.ARCADE);

		},
		preload: function () {
		this.load.image('bearTank', 'assets/bearTank.png')
		this.load.image('candy', 'assets/candy.png')

		this.load.image('zombie', 'assets/zombie.png')
		this.load.image('trinchera', 'assets/trinchera.png')
		this.load.image('ground', 'assets/ground.png')
		game.load.spritesheet('zombieWalk', 'assets/sprites/zombieWalk.png', 94, 157, 2);
	
			
			},
		create: function() {
			
			game.stage.backgroundColor = 0xD3E5E0;
			this.bearTank = this.add.sprite(190, 745, 'bearTank');
			this.bearTank.inputEnabled = true;
			this.bearTank.events.onInputDown.add(this.SingleBullet, this);
			weapon = game.add.weapon(20, 'candy');
			weapon.setBulletFrames(0, 80, true); //animacion de la bala
			weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
			weapon.bulletGravity= new Phaser.Point(0, 260);
			weapon.bulletSpeed = 600;
			weapon.bulletAngleOffset =120;
			weapon.bulletRotateToVelocity =true;
			weapon.fireAngle=330;
			weapon.fireRate = 350;
			weapon.trackSprite(this.bearTank, 180, 50, false);

			
			this.bearTank = this.add.sprite(370, 835, 'trinchera');
			this.ground = this.add.sprite(0, 930, 'ground');
			game.physics.enable(this.ground, Phaser.Physics.ARCADE);
			this.ground.body.friction.x = 100;
			this.ground.body.immovable = true;

			this.zombieWalk =  this.add.sprite(1700,775,'zombieWalk');
			game.physics.enable(this.zombieWalk, Phaser.Physics.ARCADE);
			this.zombieWalk.body.collideWorldBounds = true;
			this.zombieWalk.body.bounce.setTo(0.3, 0);	
			this.zombieWalk.body.checkCollision.up = true;
			this.zombieWalk.body.checkCollision.down = false;
			this.zombieWalk.body.velocity.x=-30;
			this.zombieWalk.body.velocity.y=0;
			this.zombieWalk.body.immovable = false;
			

			zombieWalking = this.zombieWalk.animations.add('walk');
		 	zombieWalking.play(10, true);

			},


		SingleBullet: function (game) {
			weapon.fire();
		 
		},

		update: function(){

			var mouseX=game.input.x;
			var mouseY=game.input.y;

			game.physics.arcade.collide(weapon.bullets, this.zombieWalk);
			game.physics.arcade.collide(weapon.bullets, this.ground, destroyBullet);
			game.physics.arcade.collide( this.zombieWalk,this.ground);

			function destroyBullet(bullets, ground) {
   				 ground.kill();
				}
		}


		};