document.addEventListener("DOMContentLoaded", function () {
    const animContainer = document.getElementById("happy");
    const noBtn = document.getElementById("noBtn");
    const yesBtn = document.getElementById("yesBtn");
    const heading = document.querySelector("h1");
    const DEFAULT_ANIM = "animations/hand-over-mouth.json";
    const YES_ANIM = "animations/head-nod.json";
    const NO_ANIM = "animations/happy-cry.json";
    const noPrompts = [
        "Cho em thêm một cơ hội nho nhỏ được không?",
        "Hay mình đi 15 phút thôi, em mời chị ly cà phê nha ☕",
        "Em hứa sẽ kể chuyện thật vui cho chị nghe.",
        "Nếu hôm nay bận, mình hẹn ngày khác cũng được mà.",
        "Em vẫn mong câu trả lời là Có đó nhe 💖"
    ];

    if (!animContainer || typeof lottie === "undefined") {
        return;
    }

    let currentAnimation = null;
    let currentAnimationPath = "";
    let noClickCount = 0;

    function loadAnimation(path) {
        // Skip reloading if this animation is already active.
        if (path === currentAnimationPath) {
            return;
        }

        if (currentAnimation) {
            currentAnimation.destroy();
        }

        currentAnimation = lottie.loadAnimation({
            container: animContainer,
            renderer: "svg",
            loop: true,
            autoplay: true,
            path: path
        });

        currentAnimationPath = path;
    }

    // Default animation
    loadAnimation(DEFAULT_ANIM);

    function resetIfNotHoveringButtons() {
        const isOverYes = yesBtn && yesBtn.matches(":hover");
        const isOverNo = noBtn && noBtn.matches(":hover");

        if (!isOverYes && !isOverNo) {
            loadAnimation(DEFAULT_ANIM);
        }
    }

    if (noBtn) {
        noBtn.addEventListener("mouseover", function () {
            loadAnimation(NO_ANIM);
        });
        noBtn.addEventListener("click", function () {
            if (!heading) {
                return;
            }

            const promptIndex = Math.min(noClickCount, noPrompts.length - 1);
            heading.textContent = noPrompts[promptIndex];
            noClickCount += 1;
        });
        noBtn.addEventListener("mouseleave", resetIfNotHoveringButtons);
    }

    if (yesBtn) {
        yesBtn.addEventListener("mouseover", function () {
            loadAnimation(YES_ANIM);
        });
        yesBtn.addEventListener("mouseleave", resetIfNotHoveringButtons);
    }

    document.addEventListener("mousemove", resetIfNotHoveringButtons);
});
