// =========================
// Cyber Brain 2026 - Game
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
    scene: [ BootScene, GameScene, ShopScene, ProfileScene ]
};

const game = new Phaser.Game(config);

// =========================
// 2) Boot Scene
// =========================
class BootScene extends Phaser.Scene {
    constructor() { super("Boot"); }

    preload() {
        // صداها
        this.load.audio("click", "assets/sounds/click.mp3");
        this.load.audio("legendary", "assets/sounds/legendary.mp3");
        this.load.audio("ambient", "assets/sounds/ambient.mp3");
        this.load.audio("boss", "assets/sounds/boss.mp3");
        this.load.audio("win", "assets/sounds/win.mp3");
        this.load.audio("lose", "assets/sounds/lose.mp3");

        // کارت‌ها و تصاویر (در صورت موجود بودن)
        // this.load.image("card1", "assets/images/card1.png");
        // ...
    }

    create() {
        this.scene.start("Game");
    }
}

// =========================
// 3) Game Scene
// =========================
class GameScene extends Phaser.Scene {
    constructor() { super("Game"); }

    create() {
        // =========================
        // 3.1) تنظیمات عمومی
        // =========================
        this.score = 0;
        this.hearts = 3;
        this.playerLevel = 1;
        this.cards = [];
        this.legendaryCards = 0;
        this.difficulty = 1;
        this.lastDailyDate = null;

        // افکت صوتی محیط
        this.sound.add("ambient", { volume: 0.4, loop: true }).play();

        // نور و بلوم نئونی
        this.bloomShader = this.add.rectangle(0, 0, config.width, config.height, 0x00ffff, 0.08)
            .setOrigin(0)
            .setBlendMode(Phaser.BlendModes.ADD)
            .setDepth(20);

        // لرزش دوره‌ای
        this.time.addEvent({
            delay: Phaser.Math.Between(2500, 6000),
            loop: true,
            callback: () => { this.cameras.main.shake(120, 0.01); }
        });

        // شروع اولین مرحله
        this.startStage();
    }

    startStage() {
        // انتخاب تصادفی پازل
        this.generatePuzzle();
    }

    generatePuzzle() {
        const puzzles = [
            "memory", "accuracy", "focus", "speed", "logic",
            "neuro", "tunnel", "reflex", "rotation", "ultra",
            "shadow", "flash", "pattern", "reverse", "mirror"
        ];

        let chosen = Phaser.Utils.Array.GetRandom(puzzles);
        console.log("Puzzle: ", chosen);

        // TODO: اضافه کردن منطق پازل‌ها
    }

    update() {
        // =========================
        // 3.2) آپدیت سختی پویا
        // =========================
        if (this.playerFast && this.playerAccurate) {
            this.difficulty *= 1.25;
        } else {
            this.difficulty *= 0.9;
        }

        this.timeLimit = 5000 / this.difficulty;
    }

    // =========================
    // 3.3) کارت‌ها
    // =========================
    applyCard(cardId) {
        console.log("Card Activated:", cardId);
    }

    // =========================
    // 3.4) ذخیره و بارگذاری
    // =========================
    saveGame() {
        let data = {
            level: this.playerLevel,
            score: this.score,
            hearts: this.hearts,
            cards: this.cards,
            legendary: this.legendaryCards,
            lastDaily: this.lastDailyDate
        };
        localStorage.setItem("CyberBrainSave", JSON.stringify(data));
    }

    loadGame() {
        let raw = localStorage.getItem("CyberBrainSave");
        if (!raw) return;
        let data = JSON.parse(raw);

        this.playerLevel = data.level;
        this.score = data.score;
        this.hearts = data.hearts;
        this.cards = data.cards || [];
        this.legendaryCards = data.legendary || 0;
        this.lastDailyDate = data.lastDaily || null;
    }

    // =========================
    // 3.5) Daily Challenge
    // =========================
    dailyAvailable() {
        let today = new Date().toDateString();
        return this.lastDailyDate !== today;
    }

    startDailyChallenge() {
        if (!this.dailyAvailable()) { alert("چالش امروز را انجام داده‌ای!"); return; }
        this.lastDailyDate = new Date().toDateString();
        this.saveGame();
        this.startStage();
    }

    // =========================
    // 3.6) Endless Mode
    // =========================
    startEndless() {
        this.currentSpeed = 1;
        this.stage = 1;
        this.time.addEvent({
            delay: 10000,
            loop: true,
            callback: () => { this.currentSpeed *= 1.1; }
        });
    }
}

// =========================
// 4) Shop Scene
// =========================
class ShopScene extends Phaser.Scene {
    constructor() { super("Shop"); }

    create() {
        // نمونه دکمه خرید
        this.createNeonButton("خرید ۱۰ امتیاز", 200, () => {
            console.log("Item Purchased!");
        });
    }

    createNeonButton(text, y, callback) {
        let box = this.add.rectangle(config.width/2, y, 500, 90, 0x001122, 0.6)
            .setStrokeStyle(4, 0x00ffff)
            .setInteractive();

        let label = this.add.text(config.width/2, y, text, {
            fontSize: "38px",
            color: "#00ffff",
            fontFamily: "Cyber"
        }).setOrigin(0.5);

        box.on("pointerdown", () => {
            this.cameras.main.flash(200, 0, 255, 255);
            this.sound.play("click");
            callback();
        });
    }
}

// =========================
// 5) Profile Scene
// =========================
class ProfileScene extends Phaser.Scene {
    constructor() { super("Profile"); }

    create() {
        console.log("Profile Ready");
    }
}
