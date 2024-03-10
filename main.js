const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)


const cd = $('.cd')
const cdWidth = cd.offsetWidth
const next = $('.btn-next')
const pre = $('.btn-prev')
const random = $('.btn-random')
const repeat = $('.btn-repeat')
const playlist = $('.playlist')
const app = {
    isPlaying: false,
    currentIndex: 0,
    isRandom: 0,
    isRepeat: 0,
    currentVolume: 1,
    songs: [
        {
            name: "Navada",
            singer: "VideTone",
            path: "./songs/y2mate.com - Vicetone  Nevada feat Cozi Zuehlsdorff Monstercat Official Music Video.mp3",
            image:
                "https://avatar-ex-swe.nixcdn.com/song/2018/06/19/7/b/9/3/1529382807600_640.jpg"
        },
        {
            name: "The Fat Rat",
            singer: "Monody",
            path: "./songs/y2mate.com - TheFatRat  Monody feat Laura Brehm.mp3",
            image:
                "https://i.pinimg.com/236x/13/1b/07/131b071ac49e15471ab36a8a4b2fc89b.jpg"
        },
        {
            name: "2002",
            singer: "AnneMarie",
            path: "./songs/y2mate.com - AnneMarie  2002 Official Video.mp3",
            image:
                "https://home.voca.vn/assets/img/upload/images/Loi-dich-bai-hat-2002.jpg"
        },
        {
            name: "Người Tình Mùa Đông",
            singer: "Hà Anh Tuấn",
            path: "./songs/y2mate.com -   SEE SING SHARE 2  Tập 3 Người Tình Mùa Đông  Hà Anh Tuấn.mp3",
            image: "https://i.ytimg.com/vi/dns2WLu8Su8/0.jpg"
        },
        
        {
            name: "Chúng ta của hiện tại",
            singer: "Sơn Tùng",
            path: "./songs/y2mate.com - Chúng Ta Của Hiện Tại.mp3",
            image:
                "https://i.ytimg.com/vi/bNp9pn0ni3I/0.jpg"
        }
        ,
        {
            name: "2 triệu năm",
            singer: "Đen",
            path: "./songs/y2mate.com - Đen  hai triệu năm ft Biên mv.mp3",
            image:
                "https://i.ytimg.com/vi/LSMDNL4n0kM/maxresdefault.jpg"
        }
        ,
       
        {
            name: "Thanh Xuân",
            singer: "Da LAB ",
            path: "./songs/y2mate.com - Thanh Xuân  Da LAB Official MV.mp3",
            image:
                "https://i.ytimg.com/vi/GgQFO8dL5XQ/0.jpg"
        }
        ,
        {
            name: "I'm Not Her",
            singer: "Clara Mae ",
            path: "./songs/y2mate.com - Clara Mae  Im Not Her Official Video.mp3",
            image:
                "https://i.ytimg.com/vi/iUNxOzxPEVI/0.jpg"
        }
        ,
        {
            name: "Why Not Me",
            singer: "Enrique Iglesias",
            path: "./songs/y2mate.com - Why Not Me Enrique Iglesias Lyrics Vietsub.mp3",
            name: "Why Not Me",
            singer: "Enrique Iglesias",
            path: "./songs/y2mate.com - Why Not Me  Enrique Iglesias Lyrics  Vietsub.mp3",
            image:
                "https://i.ytimg.com/vi/rtzebRfn0_I/0.jpg"
                
        }
        ,
        {
            name: "Hello",
            singer: "Adele",
            path: "./songs/y2mate.com - Adele  Hello Official Music Video.mp3",
            image:
                "https://i.ytimg.com/vi/YQHsXMglC9A/0.jpg"
        }
        ,
        {
            name: "La la la ft. Sam Smith",
            singer: "Naughty Boy",
            path: "./songs/y2mate.com - Naughty Boy  La la la ft Sam Smith Official Video.mp3",
            image:
                "https://i.ytimg.com/vi/3O1_3zBUKM8/0.jpg"
        }

        
        
    ],
    defineProperties: function () {
        // Lấy ra bài hát đầu tiên
        Object.defineProperty(this, 'currentSong', {
            get: function () {
                return this.songs[this.currentIndex]
            }
        })
    },
    render: function () {
        const htmls = this.songs.map((song, index) => {
            return `
            <div data-index="${index}" class="song ${(this.currentIndex == index) ? 'active' : ''}">
                <div class="thumb" style="background-image: url(${song.image})"></div>
                <div class="body">
                    <h3 class="title">${song.name}</h3>
                    <p class="author">${song.singer}</p>
                </div>
                <div class="option" data-index="${index}">
                    <i class="fas fa-ellipsis-h"></i>
                    <div class="setting" data-index="${index}">
                        <i class="fa-solid fa-volume-high fa-xs"></i>
                        <input  data-index="${index}" type="range" class="volume" name="" id="" value="${this.currentVolume}" step="0.01" min="0" max="1">
                    </div>
                </div>
            </div>
            `;
        }).join("");
        playlist.innerHTML = htmls;
    },
    // Add Active Song && set volume
    addActive: function () {
        // Lấy ra bài hát
        const currentSongDiv = $(`.song:nth-child(${app.currentIndex + 1})`);
        // Thêm lớp "active"
        currentSongDiv.classList.add('active');
        currentSongDiv.querySelector('.volume').value = this.currentVolume
    },
    // Remove Active Song
    removeActive: function () {
        if ($('.song.active')) {
            const songActive = $('.song.active');
            songActive.classList.remove('active');
        }
    },
    scrollToActiveSong: function () {
        const currentSongDiv = $(`.song:nth-child(${app.currentIndex + 1})`);
        currentSongDiv.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" })
    },
    showVolume: function(index) {
        const settings = $$('.setting');
        settings.forEach(setting => {
            if(setting.dataset.index == index) {
                setting.style.display = 'flex';
            }
        });
        
    },
    hideVolume: function(index) {
        const settings = $$('.setting');
        settings.forEach(setting => {
            setting.style.display = 'none';
        });
    
    },
    handleEvents: function () {
        // Xử lí CD quay / dừng
        const cdAnimate = cd.animate([
            { transform: 'rotate(360deg)' }
        ], {
            duration: 10000, // 10s
            iterations: Infinity
        })
        cdAnimate.pause()
        
        // Play / Pause Song
        function playSong() {
            audio.play();
            cdAnimate.play()
            app.isPlaying = true;
        }
        function pauseSong() {
            audio.pause();
            cdAnimate.pause()
            app.isPlaying = false
        }
        // Xử lí phóng to thu nhỏ
        document.addEventListener('scroll', function () {
            const scroll = window.scrollY
            newcdWidth = cdWidth - scroll
            cd.style.width = newcdWidth > 0 ? `${newcdWidth}px` : 0
            cd.style.opacity = newcdWidth / cdWidth

        })

        // Xử lí khi click play
        const play = $('.btn-toggle-play')
        const progress = $('#progress')
        const player = $('.player')
        play.addEventListener('click', function () {
            if (app.isPlaying) {
                pauseSong()
            } else {
                playSong()
            }
            // Kiểm tra và change nút play
            player.classList.toggle('playing')
            // Update vị trí con trỏ tua
            seek()
        })

        // Update vị trí con trỏ tua
        function seek() {
            audio.addEventListener('timeupdate', function () {
                if(audio.duration) {
                    const progressPercent = (audio.currentTime / audio.duration) * 100;
                    progress.value = progressPercent
                }
            })
        }
        // Xử lí khi tua
        progress.addEventListener('input', function (e) {
            const seekTime = (audio.duration / 100 * e.target.value);
            audio.currentTime = seekTime
            seek()
            player.classList.add('playing')
            playSong()
        })

        // Xử lí Song khi Next / Prev / Random
        function handleSong() {
                audio.volume = app.currentVolume;
                console.log(app.currentVolume);
                audio.currentTime = progress.value = 0
                seek()
                player.classList.add('playing')  
                app.hideVolume();
                playSong()
        }
        // Xử lí khi Next Song
        next.addEventListener('click', function () {
            if (app.isRandom) {
                app.playRandomSong()
                app.removeActive()
                app.addActive()
                app.scrollToActiveSong()
            } else {
                app.removeActive()
                app.nextSong()
                app.addActive()
                app.scrollToActiveSong()
            }
            handleSong()
        })
        // Xử lí khi Prev Song
        pre.addEventListener('click', function () {
            if (app.isRandom) {
                app.playRandomSong()
                app.removeActive()
                app.addActive()
                app.scrollToActiveSong()
            } else {
                app.removeActive()
                app.prevSong()
                app.addActive()
                app.scrollToActiveSong()
            }
            handleSong()
        })
        // Xử lí Random Song
        random.addEventListener('click', function () {
            app.isRandom = !app.isRandom
            random.classList.toggle('active', app.isRandom)

        })
        // Xử lí Repeat 1 Song
        repeat.addEventListener('click', function () {
            app.isRepeat = !app.isRepeat
            repeat.classList.toggle('active', app.isRepeat)

        })
        // Xử lí khi End Song / Next Song khi Repeat On
        audio.addEventListener('ended', function () {
            if (app.isRepeat) {
                playSong()
            } else {
                next.click()
            }
        })
        // Xử lí khi click chuyển bài
        playlist.addEventListener('click', function (e) {
            // Lấy ra Element không phải active || option
            const songElement = e.target.closest('.song:not(.active)')
            if (songElement && !e.target.closest('.option')) {
                app.currentIndex = Number(songElement.dataset.index)
                app.loadCurrentSongs()
                app.removeActive()
                app.addActive()
                app.scrollToActiveSong()
                handleSong()
            }
            if(e.target.closest('.option') && e.target.closest('.song.active')) {
                app.showVolume(e.target.closest('.option').dataset.index);
                // change volume
                const volumes = document.querySelectorAll('.volume');
                volumes.forEach(volume => {
                    if(volume.dataset.index == e.target.closest('.option').dataset.index) {
                        audio.volume = Number(volume.value);
                        app.currentVolume = Number(volume.value);
                        volume.addEventListener('input', function(e) {
                            audio.volume = Number(e.target.value);
                            app.currentVolume = Number(e.target.value);
                        });
                        
                    }
                });
            } 
            else {
                app.hideVolume();
                if(e.target.closest('.song:not(.active)') && !e.target.closest('.option')) {
                    const indexSong = e.target.closest('.song').dataset.index;
                      
                }
            }   

        })
    },
    nextSong: function () {
        this.currentIndex++
        if (this.currentIndex > this.songs.length - 1) {
            this.currentIndex = 0
        }
        this.loadCurrentSongs()
    },
    prevSong: function () {
        this.currentIndex--;
        if (this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1
        }
        this.loadCurrentSongs()
    },
    playRandomSong: function () {
        let newInDex
        do {
            newInDex = Math.floor(Math.random() * this.songs.length)
        }
        while (newInDex === this.currentIndex)
        this.currentIndex = newInDex
        this.loadCurrentSongs()
    },
    loadCurrentSongs: function () {
        const header = $('header h2')
        const cdThumb = $('.cd-thumb')
        const audio = $('audio')
        header.innerHTML = this.currentSong.name
        cdThumb.style.backgroundImage = `url(${this.currentSong.image})`
        audio.src = this.currentSong.path

    },

    start: function () {
        this.defineProperties()
        this.loadCurrentSongs()
        this.handleEvents()
        this.render()
    }
}
app.start()
