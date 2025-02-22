// 关注按钮点击事件
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

// 关注按钮弹出框显示逻辑
const followButton = document.getElementById('follow');
const guanzhuBox = document.getElementById('guanzhu');
let isMouseInGuanzhu = false;
let isMouseInButton = false;
let hideTimer;

// 鼠标移入关注按钮事件监听器
followButton.addEventListener('mouseenter', function () {
    isMouseInButton = true;
    clearTimeout(hideTimer);
    if (guanzhuBox) {
        // 获取目标盒子相对于其父元素的位置
        const targetRect = this.getBoundingClientRect();
        const parent = this.offsetParent;
        const parentRect = parent.getBoundingClientRect();
        const targetLeft = targetRect.left - parentRect.left;
        const targetTop = targetRect.top - parentRect.top;

        // 获取弹出框的宽度
        const popupBoxWidth = guanzhuBox.offsetWidth;
        // 计算弹出框的水平位置，使其在触发盒子正下方且水平居中
        const leftPosition = targetLeft + (this.offsetWidth / 2) - (popupBoxWidth / 2);
        // 计算弹出框的垂直位置
        const topPosition = targetTop + this.offsetHeight;

        console.log('关注按钮相对于父元素的位置:', targetLeft, targetTop);
        console.log('弹出框宽度:', popupBoxWidth);
        console.log('弹出框 left 位置:', leftPosition);
        console.log('弹出框 top 位置:', topPosition);

        guanzhuBox.style.left = leftPosition + 'px';
        guanzhuBox.style.top = topPosition + 'px';

        // 添加 show 类，使弹出框显示出来
        guanzhuBox.classList.add('show');
    }
});

// 鼠标移出关注按钮事件监听器
followButton.addEventListener('mouseleave', function () {
    isMouseInButton = false;
    if (!isMouseInGuanzhu) {
        hideTimer = setTimeout(() => {
            if (guanzhuBox) {
                guanzhuBox.classList.remove('show');
            }
        }, 200);
    }
});

// 鼠标移入弹出框事件监听器
if (guanzhuBox) {
    guanzhuBox.addEventListener('mouseenter', function () {
        isMouseInGuanzhu = true;
        clearTimeout(hideTimer);
    });

    // 鼠标移出弹出框事件监听器
    guanzhuBox.addEventListener('mouseleave', function () {
        isMouseInGuanzhu = false;
        if (!isMouseInButton) {
            hideTimer = setTimeout(() => {
                if (guanzhuBox) {
                    guanzhuBox.classList.remove('show');
                }
            }, 200);
        }
    });
}

// 店铺相关代码
const search = document.getElementById('dp');
const infoBox = document.getElementById('dianpu');
let timer;

// 鼠标移入事件
search.addEventListener('mouseenter', function () {
    // 设置定时器，延迟 0.2 秒后显示信息框
    timer = setTimeout(() => {
        if (infoBox) {
            // 获取目标盒子相对于其父元素的位置
            const targetRect = this.getBoundingClientRect();
            const parent = this.offsetParent;
            const parentRect = parent.getBoundingClientRect();
            const targetLeft = targetRect.left - parentRect.left;
            const targetTop = targetRect.top - parentRect.top;

            // 获取信息框的宽度
            const infoBoxWidth = infoBox.offsetWidth;
            // 计算信息框的水平位置，使其在悬停盒子正下方且水平居中
            const leftPosition = targetLeft + (this.offsetWidth / 2) - (infoBoxWidth / 2);
            // 计算信息框的垂直位置
            const topPosition = targetTop + this.offsetHeight;

            infoBox.style.left = leftPosition + 'px';
            infoBox.style.top = topPosition + 'px';

            infoBox.classList.add('show');
        }
    }, 200);
});

// 鼠标移出事件
search.addEventListener('mouseleave', function () {
    // 清除定时器，避免在延迟期间鼠标移出时仍显示信息框
    clearTimeout(timer);
    infoBox.classList.remove('show');
});

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
                // 获取目标盒子相对于其父元素的位置
                const targetRect = this.getBoundingClientRect();
                const parent = this.offsetParent;
                const parentRect = parent.getBoundingClientRect();
                const targetLeft = targetRect.left - parentRect.left;
                const targetTop = targetRect.top - parentRect.top;

                // 获取弹出框的宽度
                const popupBoxWidth = popupBox.offsetWidth;
                // 计算弹出框的水平位置，使其在触发盒子正下方且水平居中
                const leftPosition = targetLeft + (this.offsetWidth / 2) - (popupBoxWidth / 2);
                // 计算弹出框的垂直位置
                const topPosition = targetTop + this.offsetHeight;

                popupBox.style.left = leftPosition + 'px';
                popupBox.style.top = topPosition + 'px';

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

// 搜索框
const search_middle = document.querySelectorAll('.nav-search-content');

search_middle.forEach((searchBox) => {
    const searchId = searchBox.dataset.search;
    const popupBox = document.getElementById(searchId);
    console.log('Search ID:', searchId);
    console.log('Popup Box:', popupBox);

    // 点击搜索框触发显示或隐藏
    searchBox.addEventListener('click', function (e) {
        e.stopPropagation(); // 阻止事件冒泡
        if (popupBox) {
            // 获取目标盒子相对于其父元素的位置
            const targetRect = this.getBoundingClientRect();
            const parent = this.offsetParent;
            const parentRect = parent.getBoundingClientRect();
            const targetLeft = targetRect.left - parentRect.left;
            const targetTop = targetRect.top - parentRect.top;

            // 获取弹出框的宽度
            const popupBoxWidth = popupBox.offsetWidth;
            // 计算弹出框的水平位置，使其在触发盒子正下方且水平居中
            const leftPosition = targetLeft + (this.offsetWidth / 2) - (popupBoxWidth / 2);
            // 计算弹出框的垂直位置
            const topPosition = targetTop + this.offsetHeight;

            popupBox.style.left = leftPosition + 'px';
            popupBox.style.top = topPosition + 'px';

            if (popupBox.classList.contains('show')) {
                popupBox.classList.remove('show');
                this.classList.remove('show'); // 隐藏搜索框时移除 show 类
            } else {
                popupBox.classList.add('show');
                this.classList.add('show'); // 添加 show 类
            }
        }
    });

    // 点击页面其他区域隐藏搜索框
    document.addEventListener('click', function (e) {
        if (popupBox && popupBox.classList.contains('show') && !searchBox.contains(e.target) && !popupBox.contains(e.target)) {
            popupBox.classList.remove('show');
            searchBox.classList.remove('show'); // 点击其他区域时移除 show 类
        }
    });
});