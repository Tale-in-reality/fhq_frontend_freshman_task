// 获取所有可触发弹出框的盒子
const triggerBoxes = document.querySelectorAll('.trigger-box');

triggerBoxes.forEach((triggerBox) => {
    // 获取对应的弹出框的 id
    const targetId = triggerBox.dataset.target;
    // 根据 id 获取对应的弹出框元素
    const popupBox = document.getElementById(targetId);
    let timer;
    let isMouseInPopup = false;

    // 鼠标移入触发盒子事件监听器
    triggerBox.addEventListener('mouseenter', function () {
        // 设置定时器，延迟 0.2 秒后显示弹出框
        timer = setTimeout(() => {
            // 获取触发盒子的位置和尺寸信息
            const targetRect = this.getBoundingClientRect();
            // 获取弹出框的宽度
            const popupBoxWidth = popupBox.offsetWidth;
            // 计算弹出框的水平位置，使其在触发盒子正下方且水平居中
            const leftPosition = targetRect.left + (targetRect.width / 2) - (popupBoxWidth / 2);
            // 设置弹出框的位置
            popupBox.style.left = leftPosition + 'px';
            popupBox.style.top = targetRect.bottom + 'px';

            // 添加 show 类，使弹出框显示出来
            popupBox.classList.add('show');
        }, 200);
    });

    // 鼠标移出触发盒子事件监听器
    triggerBox.addEventListener('mouseleave', function () {
        // 清除定时器，避免在延迟期间鼠标移出时仍显示弹出框
        clearTimeout(timer);
        // 如果鼠标不在弹出框内，隐藏弹出框
        if (!isMouseInPopup) {
            popupBox.classList.remove('show');
        }
    });

    // 鼠标移入弹出框事件监听器
    popupBox.addEventListener('mouseenter', function () {
        isMouseInPopup = true;
    });

    // 鼠标移出弹出框事件监听器
    popupBox.addEventListener('mouseleave', function () {
        isMouseInPopup = false;
        popupBox.classList.remove('show');
    });
});