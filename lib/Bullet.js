var Bullet = function (game, key) {

			    Phaser.Sprite.call(this, game, 0, 0, key);
			    
			    this.anchor.set(0.5);

			    this.checkWorldBounds = true;
			    this.outOfBoundsKill = true;
			    this.exists = false;

			    this.tracking = false;
			    this.scaleSpeed = 30;


			};
