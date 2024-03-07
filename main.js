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
            name: "Cơm áo gạo tiền",
            singer: "7dnight",
            path: "./songs/y2mate.com - 7dnight  Cơm Áo Gạo Tiền Official Video.mp3",
            image: "https://i.ytimg.com/vi/dOXGoW0yu0o/sddefault.jpg"
        },
        {
            name: "Chắc là say òi",
            singer: "24kright",
            path: "./songs/y2mate.com - CHẮC LÀ SAY ÒI.mp3",
            image:
                "https://i.ytimg.com/vi/70tC2lC3EIk/maxresdefault.jpg"
        },
        {
            name: "Last night",
            singer: "Hazel",
            path:
                "./songs/y2mate.com - Last Night  Animated Video Lyrics.mp3",
            image: "https://avatar-ex-swe.nixcdn.com/song/2023/10/24/8/7/6/4/1698132443188_640.jpg"
        },
        {
            name: "Tip Toe",
            singer: "HYBS",
            path: "./songs/y2mate.com - HYBS  Tip Toe speed up.mp3",
            image:
                "https://i.ytimg.com/vi/sK_us-qNYQ0/hqdefault.jpg"
        },
        {
            name: "At my worst",
            singer: "Pink sweat",
            path:
                "./songs/y2mate.com - Pink Sweat  At My Worst Official Video.mp3",
            image:
                "https://avatar-ex-swe.nixcdn.com/song/2020/09/15/3/7/8/3/1600184151280_640.jpg"
        },
        {
            name: "Hello VietNam",
            singer: "Pham Quynh Anh",
            path: "./songs/y2mate.com - Hello Viet NamPham Quynh Anh HDLyricsHD Kara  Vietsub.mp3",
            image:
                "https://royalasiatravelvncom994.chiliweb.org/wp-content/uploads/2017/12/maxresdefault.jpg"
        },
        {
            name: "Open your eyes",
            singer: "MONO",
            path: "./songs/y2mate.com - MONO  Open Your Eyes Official Music Video.mp3",
            image:
                "https://i.ytimg.com/vi/PjLnZ3T11f4/maxresdefault.jpg"
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
            name: "Soda",
            singer: "MCK",
            path: "./songs/y2mate.com - SODA  MCK prodGC.mp3",
            image:
                "https://i.ytimg.com/vi/kJw-XWgfPm8/0.jpg"
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
            name: "BUỒN HAY VUI",
            singer: "VSOUL x MCK x Obito x Ronboogz x Boyzed",
            path: "./songs/y2mate.com - BUỒN HAY VUI  VSOUL x MCK x Obito x Ronboogz x Boyzed Official Audio.mp3",
            image:
                "https://i.ex-cdn.com/60giay.com/files/content/2024/01/11/414681110_753932120092030_7490686123113949773_n-1322.jpg"
        }
        ,
        {
            name: "CHƯƠNG 2 CỦA TƯƠNG LAI",
            singer: "WEAN x MCK x TENKITSUNE",
            path: "./songs/y2mate.com - CHƯƠNG 2 CỦA TƯƠNG LAI  WEAN x MCK x TENKITSUNE.mp3",
            image:
                "https://i.ytimg.com/vi/PjLnZ3T11f4/maxresdefault.jpg"
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
                <div class="song ${index === app.currentIndex ? 'active' : ''}" data-index= ${index}>
                    <div class="thumb" style="background-image: url(${song.image})"></div>
                        <div class="body">
                            <h3 class="title">${song.name}</h3>
                            <p class="author">${song.singer}</p>
                        </div>
                        <div class="option">
                            <i class="fas fa-ellipsis-h"></i>
                        </div>
                </div>
                `;
        }).join('');
        playlist.innerHTML = htmls;
    },
    // Add Active Song
    addActive: function () {
        // Lấy ra bài hát
        const currentSongDiv = $(`.song:nth-child(${app.currentIndex + 1})`);
        // Thêm lớp "active"
        currentSongDiv.classList.add('active');
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
            audio.currentTime = progress.value = seekTime
            seek()
            player.classList.add('playing')
            playSong()
        })

        // Xử lí Song khi Next / Prev / Random
        function handleSong() {
            audio.addEventListener('canplay', function () {
                audio.currentTime = progress.value = 0
                seek()
                player.classList.add('playing')
                playSong()
            }, { once: true });
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