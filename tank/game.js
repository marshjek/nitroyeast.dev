let k, blu, red, lazer, graphics, ok, wall, bull

class Main extends Phaser.Scene {

    preload() {
        this.load.image('bg', 'assets/img/background.png')
        this.load.image('blu', 'assets/img/blu-tank.png')
        this.load.image('red', 'assets/img/red-tank.png')
        this.load.image('lazer', 'assets/img/lazer.png')
        this.load.image('wall', 'assets/img/wall.png')
        this.load.image('bull', 'assets/img/bullet.png')
    }
    create() {
        k = this.input.keyboard.addKeys('SHIFT,LEFT,RIGHT,UP,DOWN,W,A,S,D,SPACE')
        this.add.image(0,0, 'bg').setOrigin(0,0)
        blu = this.physics.add.sprite(200,300,'blu')
        red = this.physics.add.sprite(800,400,'red')
        lazer = new Phaser.Geom.Line()
        graphics = this.add.graphics()
        //collide on edge
        red.setCollideWorldBounds(true)
        blu.setCollideWorldBounds(true)
        //set gravity
        red.setGravityY(0)
        blu.setGravityY(0)
        //set speed and damping (friction), applied in setDrag
        red.curSpeed = 160
        blu.curSpeed = 160
        red.body.useDamping = true
        blu.body.useDamping = true
        red.setDrag(.001)
        blu.setDrag(.001)
        //set verticle movement
        blu.curJump = 160
        red.curJump = 160
        //set horizontal movement
        blu.vertX = 90
        red.vertX = 90
        blu.vertY = 90
        red.vertY = 90
        
        //bullet testing
        bull = this.physics.add.sprite(800,600,'bull')
        bull.speed = 30
        bull.stop = 0
        
        
        //wall generation
        wall = this.physics.add.staticGroup()
        wall.create(300, 525, 'wall').setScale(1, 3).refreshBody()
        
        //wall collision
        this.physics.add.collider(blu, wall)
        this.physics.add.collider(red, wall)

    }

    update() {

        // red player

        let right = k.RIGHT.isDown
        let left = k.LEFT.isDown
        let down = k.DOWN.isDown
        let up = k.UP.isDown
        let space = k.SHIFT.isDown

        if (left && down) {
            red.setVelocityX(-red.vertY)
            red.setVelocityY(red.vertY)
            red.rotation = Math.PI * 3/4
        } else if (left && up) {
            red.setVelocityX(-red.vertX)
            red.setVelocityY(-red.vertY)
            red.rotation = -Math.PI * 3/4
        }
        else if (right && up) {
            red.setVelocityX(red.vertX)
            red.setVelocityY(-red.vertY)
            red.rotation = -Math.PI/4
        }
        else if (right && down) {
            red.setVelocityX(red.vertX)
            red.setVelocityY(red.vertY)
            red.rotation = Math.PI/4
        }
        else if (left) {
        
            red.setVelocityX(-red.curSpeed)
            red.rotation = Math.PI
        }

        else if (right) {
            
            red.setVelocityX(red.curSpeed)
            red.rotation = 0
        }

        else if (up) {
            red.setVelocityY(-red.curJump)
            red.rotation = -Math.PI/2
        }

        else if (down) {
            red.setVelocityY(red.curJump)
            red.rotation = Math.PI/2
        }

        if (space) {
            //Phaser.Geom.Line.SetToAngle(lazer,red.x,red.y,red.rotation, 2000)
            //graphics.lineStyle(2,0xffffff)
            //graphics.strokeLineShape(lazer)
            //let brect = blu.getBounds()
            //if (Phaser.Geom.Intersects.LineToRectangle(lazer,brect)) {
              // die die die
              //graphics.lineStyle(2, 0xff0000)
            //}
            //graphics.strokeRectShape(brect)
            //setTimeout( () => {graphics.clear()}, 200)
            bull.setVelocityY(bull.speed)
        }

        // blue player

        let a = k.A.isDown
        let d = k.D.isDown
        let s = k.S.isDown
        let w = k.W.isDown
        let g = k.SPACE.isDown

        if (a && w) {
            blu.setVelocityX(-blu.vertX)
            blu.setVelocityY(-blu.vertY)
            blu.rotation = -Math.PI * 3/4
        }
        else if (a && s) {
            blu.setVelocityX(-blu.vertX)
            blu.setVelocityY(blu.vertY)
            blu.rotation = Math.PI * 3/4
        }
        else if (d && w) {
            blu.setVelocityX(blu.vertX)
            blu.setVelocityY(-blu.vertY)
            blu.rotation = -Math.PI/4
        }
        else if (d && s) {
            blu.setVelocityX(blu.vertX)
            blu.setVelocityY(blu.vertY)
            blu.rotation = Math.PI/4
        }
        else if (a) {
            
            blu.setVelocityX(-blu.curSpeed)
            blu.rotation = Math.PI
        }

        else if (d) {
           
            blu.setVelocityX(blu.curSpeed)
            blu.rotation = 0
        }

        else if (w) {
            blu.setVelocityY(-blu.curJump)
            blu.rotation = -Math.PI/2
        }

        else if (s) {
            blu.setVelocityY(blu.curJump)
            blu.rotation = Math.PI/2
        }

        if (g) {
            /*
            Phaser.Geom.Line.SetToAngle(lazer,blu.x,blu.y,blu.rotation, 2000)
            graphics.lineStyle(2,0xffffff)
            graphics.strokeLineShape(lazer)
            let rrect = red.getBounds()
            if (Phaser.Geom.Intersects.LineToRectangle(lazer,rrect)) {
              // die die die
              graphics.lineStyle(2, 0xff0000)
            }
            graphics.strokeRectShape(rrect)
            setTimeout( () => {graphics.clear()}, 200) */
            bull.setVelocityY(bull.stop)

        }

    }
}

const game = new Phaser.Game({
    scene: Main,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scale: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
})
