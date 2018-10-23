function Banner() {
    this.banner = document.getElementById('banner');
    this.ul = document.querySelector('.img-list');
    this.imgWidth = this.ul.children[0].offsetWidth;
    this.dots = document.querySelector('.dots').children;
    this.num = this.dots.length;
    this.leftBtn = document.querySelector('.left-btn');
    this.rightBtn = document.querySelector('.right-btn');
    this.index = 0;
    this.init();
    this.leftBtnClick();
    this.rightBtnClick();
    this.autoPlay();
    this.bannerEnter();
    this.bannerLeave();
    this.dotsEnter();
}

Banner.prototype = {
    init: function() {
        var li = this.ul.children[0].cloneNode(true);
        this.ul.appendChild(li);
    },
    slide: function() {
        //this.ul.style.left = -this.index * this.imgWidth + 'px';
        this.animate(this.ul, -this.index * this.imgWidth);
        for (var i = 0; i < this.num; i++) {
            this.dots[i].className = '';
        }
        if (this.index == 5) {
            this.dots[this.index - 5].className = 'active';
        } else {
            this.dots[this.index].className = 'active';
        }
    },
    leftBtnClick: function() {
        var that = this;
        this.leftBtn.onclick = function() {
            --that.index;
            if (that.index == -1) {
                that.ul.style.left = -that.num * that.imgWidth + 'px';
                that.index = that.num - 1;
            }
            that.slide();
        }
    },
    rightBtnClick: function() {
        var that = this;
        this.rightBtn.onclick = function() {
            ++that.index;
            if (that.index == that.num + 1) {
                that.ul.style.left = 0;
                that.index = 1;
            }
            that.slide();
        }
    },
    dotsEnter: function() {
        var that = this;
        for (var i = 0; i < this.num; i++) {
            
            this.dots[i].indexA = i;
            this.dots[i].onmouseenter = function() {
                that.index = this.indexA;
                that.slide();
            }
        }
    },
    autoPlay: function() {
        var that = this;
        this.timer = setInterval(function() {
            ++that.index;
            if (that.index == that.num + 1) {
                that.ul.style.left = 0;
                that.index = 1;
            }
            that.slide();
        }, 3000);
    },
    bannerEnter: function() {
        var that = this;
        this.banner.onmouseenter = function() {
            clearInterval(that.timer);
        }
    },
    bannerLeave: function() {
        var that = this;
        this.banner.onmouseleave = function() {
            that.autoPlay();
        }
    },
    animate: function(obj, target) {
        clearInterval(obj.timer);
        var speed = obj.offsetLeft < target ? 15 : -15;
        obj.timer = setInterval(function() {
            if (Math.abs(target - obj.offsetLeft) < Math.abs(speed)) {
                obj.style.left = target + 'px';
                clearInterval(obj.timer);
            } else {
                //这里是个坑，一定要写在else里
                obj.style.left = obj.offsetLeft + speed + 'px';
            }
        }, 10);
    }
};

new Banner();