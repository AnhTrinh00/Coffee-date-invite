document.addEventListener("DOMContentLoaded", function () {
    const animContainer = document.getElementById("happy");
    const noBtn = document.getElementById("noBtn");
    const yesBtn = document.getElementById("yesBtn");
    const heading = document.querySelector("h1");
    const originalPrompt = heading ? heading.textContent : "";
    const DEFAULT_ANIM = "animations/hand-over-mouth.json";
    const YES_ANIM = "animations/head-nod.json";
    const NO_ANIM = "animations/happy-cry.json";
    const AGREE_ANIM = "animations/heart-eyes.json";
    const noPrompts = [
        "Lâu lắm rồi em chưa được đi cà phê sáng với chị đó!",
        "Đi chút thôi rồi về, em hứa không có lâu đâu.",
        "Trời nóng ấy nên đi uống cho nó mát",
        "Em vẫn mong câu trả lời là Có đó nha!"
    ];
    const yesPrompts = [
        "Yay! Em rất vui khi chị đồng ý! 😊",
    ];
    const notifyEmail = "vasmogna191004@gmail.com";

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
        yesBtn.addEventListener("click", function () {
            loadAnimation(AGREE_ANIM);
            if (heading) {
                heading.textContent = yesPrompts[0];
            }
            if (noBtn) {
                noBtn.style.display = "none";
            }

            const subject = encodeURIComponent("She said YES to coffee! ☕");
            const body = encodeURIComponent("Good news! The user clicked 'Có' on the invite page.");
            window.location.href = "mailto:" + notifyEmail + "?subject=" + subject + "&body=" + body;
        });
    }

    document.addEventListener("touchstart", resetToDefaultIfTappedOutsideButtons, { passive: true });
    document.addEventListener("click", resetToDefaultIfTappedOutsideButtons);
});
