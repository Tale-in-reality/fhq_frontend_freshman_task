const follow = document.getElementById('follow');

follow.addEventListener('click', function () {
    if (this.classList.contains('followed')) {
        this.textContent = '+ 关注';
        this.classList.remove('followed');
        this.classList.add('unfollowed');
    } else {
        this.textContent = '三 已关注';
        this.classList.remove('unfollowed');
        this.classList.add('followed');
    }
});







const search = document.getElementById('dp');
const infoBox = document.getElementById('dianpu');
let timer;

// 鼠标移入事件
search.addEventListener('mouseenter', function () {
    // 设置定时器，延迟 0.5 秒后显示信息框
    timer = setTimeout(() => {
        // 获取悬停盒子的位置和尺寸信息
        const targetRect = search.getBoundingClientRect();
        // 获取信息框的宽度
        const infoBoxWidth = infoBox.offsetWidth;
        // 计算信息框的水平位置，使其在悬停盒子正下方且水平居中
        const leftPosition = targetRect.left + (targetRect.width / 2) - (infoBoxWidth / 2);
        // 设置信息框的位置
        infoBox.style.left = leftPosition + 'px';
        infoBox.style.top = targetRect.bottom + 'px';

        infoBox.classList.add('show');
    }, 200);
});

// 鼠标移出事件
search.addEventListener('mouseleave', function () {
    // 清除定时器，避免在延迟期间鼠标移出时仍显示信息框
    clearTimeout(timer);
    infoBox.classList.remove('show');
});

// ------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------

// 获取所有可触发弹出框的盒子
const head_search = document.querySelectorAll('.head-search');

head_search.forEach((searchBox) => {
    // 获取对应的弹出框的 id
    const searchId = searchBox.dataset.search;
    // 根据 id 获取对应的弹出框元素
    const popupBox = document.getElementById(searchId);
    console.log('Search ID:', searchId);
    console.log('Popup Box:', popupBox); // 检查是否正确获取到弹出框元素
    let showTimer;
    let hideTimer;
    let isMouseInPopup = false;

    // 鼠标移入触发盒子事件监听器
    searchBox.addEventListener('mouseenter', function () {
        // 清除隐藏定时器
        clearTimeout(hideTimer);
        // 设置定时器，延迟 0.2 秒后显示弹出框
        showTimer = setTimeout(() => {
            if (popupBox) { // 确保弹出框元素存在
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
            }
        }, 200);
    });

    // 鼠标移出触发盒子事件监听器
    searchBox.addEventListener('mouseleave', function () {
        // 清除显示定时器
        clearTimeout(showTimer);
        // 如果鼠标不在弹出框内，设置隐藏定时器
        if (!isMouseInPopup && popupBox) {
            hideTimer = setTimeout(() => {
                popupBox.classList.remove('show');
            }, 200);
        }
    });

    // 鼠标移入弹出框事件监听器
    if (popupBox) {
        popupBox.addEventListener('mouseenter', function () {
            // 清除隐藏定时器
            clearTimeout(hideTimer);
            isMouseInPopup = true;
        });

        // 鼠标移出弹出框事件监听器
        popupBox.addEventListener('mouseleave', function () {
            isMouseInPopup = false;
            // 设置隐藏定时器，延迟 0.2 秒后隐藏弹出框
            hideTimer = setTimeout(() => {
                popupBox.classList.remove('show');
            }, 200);
        });
    }
});