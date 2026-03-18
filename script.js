document.addEventListener("DOMContentLoaded", function () {
    const animContainer = document.getElementById("happy");
    const noBtn = document.getElementById("noBtn");
    const yesBtn = document.getElementById("yesBtn");
    const heading = document.querySelector("h1");
    const supportsHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const originalPrompt = heading ? heading.textContent : "";
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

    function resetToDefaultIfNotHoveringButtons() {
        const isOverYes = yesBtn && yesBtn.matches(":hover");
        const isOverNo = noBtn && noBtn.matches(":hover");

        if (!isOverYes && !isOverNo) {
            loadAnimation(DEFAULT_ANIM);
        }
    }

    function resetToDefaultIfTappedOutsideButtons(event) {
        const target = event.target;
        const clickedYes = yesBtn && yesBtn.contains(target);
        const clickedNo = noBtn && noBtn.contains(target);

        if (!clickedYes && !clickedNo) {
            loadAnimation(DEFAULT_ANIM);
            if (heading) {
                heading.textContent = originalPrompt;
            }
        }
    }

    if (noBtn) {
        if (supportsHover) {
            noBtn.addEventListener("mouseover", function () {
                loadAnimation(NO_ANIM);
            });
            noBtn.addEventListener("mouseleave", resetToDefaultIfNotHoveringButtons);
        }

        noBtn.addEventListener("click", function () {
            loadAnimation(NO_ANIM);

            if (!heading) {
                return;
            }

            const promptIndex = Math.min(noClickCount, noPrompts.length - 1);
            heading.textContent = noPrompts[promptIndex];
            noClickCount += 1;
        });
    }

    if (yesBtn) {
        if (supportsHover) {
            yesBtn.addEventListener("mouseover", function () {
                loadAnimation(YES_ANIM);
            });
            yesBtn.addEventListener("mouseleave", resetToDefaultIfNotHoveringButtons);
        }

        yesBtn.addEventListener("click", function () {
            loadAnimation(YES_ANIM);
            if (heading) {
                heading.textContent = originalPrompt;
            }
        });
    }

    if (supportsHover) {
        document.addEventListener("mousemove", resetToDefaultIfNotHoveringButtons);
    } else {
        document.addEventListener("touchstart", resetToDefaultIfTappedOutsideButtons, { passive: true });
        document.addEventListener("click", resetToDefaultIfTappedOutsideButtons);
    }
});
