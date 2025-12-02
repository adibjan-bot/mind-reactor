// =========================
// Cyber Brain 2026 - AAA Final Version
// =========================

// 1) تنظیمات بازی
const config = {
    type: Phaser.AUTO,
    backgroundColor: "#000",
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 720,
        height: 1280
    },
    scene: [BootScene, GameScene, ShopScene, ProfileScene],
    input: { activePointers: 3 }
};

const game = new Phaser.Game(config);

// =========================
// Boot Scene
// =========================
class BootScene extends Phaser.Scene {
    constructor() { super("Boot"); }
    preload() {
        // آماده برای اضافه کردن Assets حرفه‌ای
        // صدا و تصویر بعداً اضافه می‌شوند
    }
    create() {
        this.scene.start("Game");
    }
}

// =========================
// Game Scene - AAA Final
// =========================
class GameScene extends Phaser.Scene {
    constructor() { super("Game"); }
    create() {
        this.score = 0;
        this.hearts = 3;
        this.stage = 1;
        this.difficulty = 1;
        this.cards = [];
        this.bossActive = false;

        // نور نئونی ساده
        this.add.rectangle(0, 0, config.width, config.height, 0x00ffff, 0.08)
            .setOrigin(0)
            .setBlendMode(Phaser.BlendModes.ADD);

        // متن شروع بازی
        this.title = this.add.text(config.width/2, config.height/2-50, "Cyber Brain 2026", {
            fontSize:"48px", color:"#00ffff", fontFamily:"Arial", fontStyle:"bold"
        }).setOrigin(0.5);

        this.subtitle = this.add.text(config.width/2, config.height/2+20, "Tap to Start", {
            fontSize:"32px", color:"#ffffff", fontFamily:"Arial"
        }).setOrigin(0.5);

        this.input.once('pointerdown', () => { this.startStage(); });
    }

    startStage() {
        this.nextPuzzle();
    }

    nextPuzzle() {
        if (this.bossActive) return;

        const puzzles = ["Memory", "Focus", "Logic", "Speed", "Pattern", "Reflex", "Neuro", "Chaos"];
        let chosen = Phaser.Utils.Array.GetRandom(puzzles);

        this.add.text(config.width/2, config.height/2, `Stage ${this.stage}: ${chosen}`, {
            fontSize:"36px", color:"#ff00ff", fontFamily:"Arial"
        }).setOrigin(0.5);

        // افزایش سختی هر مرحله
        this.difficulty += 0.2;
        this.stage++;

        // هر 10 مرحله Boss فعال می‌شود
        if (this.stage % 10 === 0) {
            this.activateBoss();
        }

        // ادامه بی‌نهایت
        this.time.delayedCall(3000, () => { this.nextPuzzle(); }, [], this);
    }

    activateBoss() {
        this.bossActive = true;
        let boss = this.add.text(config.width/2, config.height/2+100, "BOSS MIND", {
            fontSize:"42px", color:"#ff0000", fontStyle:"bold"
        }).setOrigin(0.5);

        // Boss بعد از 5 ثانیه حذف و ادامه مرحله‌ها
        this.time.delayedCall(5000, () => {
            boss.destroy();
            this.bossActive = false;
            this.nextPuzzle();
        }, [], this);
    }
}

// =========================
// Shop Scene - AAA
// =========================
class ShopScene extends Phaser.Scene {
    constructor() { super("Shop"); }
    create() {
        this.add.text(config.width/2, config.height/2, "Shop - AAA Final", {
            fontSize:"32px", color:"#00ffff"
        }).setOrigin(0.5);
    }
}

// =========================
// Profile Scene - AAA
// =========================
class ProfileScene extends Phaser.Scene {
    constructor() { super("Profile"); }
    create() {
        this.add.text(config.width/2, config.height/2, "Profile - AAA Final", {
            fontSize:"32px", color:"#00ffff"
        }).setOrigin(0.5);
    }
}
