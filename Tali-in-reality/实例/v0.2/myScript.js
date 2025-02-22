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