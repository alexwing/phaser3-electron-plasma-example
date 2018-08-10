const Game = new Phaser.Scene(STATE.GAME)

var CustomPipeline = new Phaser.Class({

    Extends: Phaser.Renderer.WebGL.Pipelines.TextureTintPipeline,

    initialize:
            function CustomPipeline(game)
            {
                Phaser.Renderer.WebGL.Pipelines.TextureTintPipeline.call(this, {
                    game: game,
                    renderer: game.renderer,
                    fragShader: `
            precision mediump float;

            uniform sampler2D uMainSampler;
            uniform vec2 uResolution;
            uniform float uTime;

            varying vec2 outTexCoord;
            varying vec4 outTint;

            vec4 plasma()
            {
                vec2 pixelPos = gl_FragCoord.xy / uResolution * 20.0;
                float freq = 0.8;
                float value =
                    sin(uTime + pixelPos.x * freq) +
                    sin(uTime + pixelPos.y * freq) +
                    sin(uTime + (pixelPos.x + pixelPos.y) * freq) +
                    cos(uTime + sqrt(length(pixelPos - 0.5)) * freq * 2.0);

                return vec4(
                    cos(value),
                    sin(value),
                    sin(value * 3.14 * 2.0),
                    cos(value)
                );
            }

            void main() 
            {
                vec4 texel = texture2D(uMainSampler, outTexCoord);
                texel *= vec4(outTint.rgb * outTint.a, outTint.a);
                gl_FragColor = texel * plasma();
            }

            `
                });
            }


});

var tilesprite;
var cursors;
Game.init = function () {
}

Game.preload = function () {
    this.load.image('atari', 'assets/sprites/pixels.png');

    customPipeline = game.renderer.addPipeline('Custom', new CustomPipeline(game));
    customPipeline.setFloat2('uResolution', game.config.width, game.config.height);
}

Game.create = function () {
    const back = this.add.text(50, 300, 'Go back to menu').setInteractive()
    back.on('pointerdown', () => {
        this.scene.start(STATE.MAINMENU)
    })
//tileSprite = Game.add.tileSprite(0, 0, 800, 600, 'atari');
  tileSprite = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'atari');
    tileSprite.setPipeline('Custom');
    cursors = Game.input.keyboard.createCursorKeys();

}

var time = 0.0;

Game.update = function () {

    customPipeline.setFloat1('uTime', time);
    time += 0.05;
    // Move tilesprite position by pressing arrow keys
    if (cursors.left.isDown)
    {
        tileSprite.tilePosition.x += 8;
    } else if (cursors.right.isDown)
    {
        tileSprite.tilePosition.x -= 8;
    }

    if (cursors.up.isDown)
    {
        tileSprite.tilePosition.y += 8;
    } else if (cursors.down.isDown)
    {
        tileSprite.tilePosition.y -= 8;
    }

}

