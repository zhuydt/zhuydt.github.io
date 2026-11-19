const myPosts = [
    {
        "title": "Adb System - Edit Hệ Thống",
        "thumb": "images/adb_system.png",
        "desc": "Làm chủ điện thoại Android — không cần máy tính, không cần root. Adb System dùng Gỡ lỗi không dây (ADB qua Wi-Fi) ngay trên máy để gỡ bloatware, quản lý ứng dụng chạy nền và chỉnh các cài đặt hệ thống ẩn.",
        "link": "https://play.google.com/store/apps/details?id=com.huydt.adb_system",
        "author": "huydt",
        "date": "2026-11-09",
        "tags": [
            "Application", "System"
        ],
        "category": "Apps",
        "badge": "★4.6",
        "views": 346,
        "extra": "<div class='extra-info'>Editor's Choice</div>"
    },
    {
        "title": "PSmu - Retro Game Emulator",
        "thumb": "images/ps_emulator.png",
        "desc": "PSmu là trình giả lập game cổ điển nhẹ và mượt cho Android. Thêm file game của bạn, chạm vào game và chơi ngay sau vài giây.",
        "link": "https://play.google.com/store/apps/details?id=com.huydt.ps_emulator",
        "author": "huydt",
        "date": "2026-10-18",
        "tags": [
            "Application", "Emulator"
        ],
        "category": "Apps",
        "badge": "★4.5",
        "views": 1764,
        "extra": "<div class='extra-info'>Editor's Choice</div>"
    },
    {
        "title": "Gpad 3 - Gán bàn phím ngoài",
        "thumb": "images/gpad.png",
        "desc": "Gán phím bàn phím ngoài thành thao tác chạm màn hình cho game và ứng dụng",
        "link": "https://play.google.com/store/apps/details?id=com.huydt.gpad",
        "author": "huydt",
        "date": "2026-09-21",
        "tags": [
            "Application", "Store"
        ],
        "category": "Apps",
        "badge": "★5",
        "views": 1023,
        "extra": "<div class='extra-info'>Editor's Choice</div>"
    },
    {
        "title": "",
        "thumb": "images/xep_chai.png",
        "desc": "Kéo đổi chỗ các chai để sắp đúng thứ tự bí mật!",
        "link": "https://play.google.com/store/apps/details?id=com.huydt.xep_chai",
        "author": "huydt",
        "date": "2026-09-3",
        "tags": [
            "Game", "Store"
        ],
        "category": "Apps",
        "badge": "★4.9",
        "views": 492,
        "extra": "<div class='extra-info'>Editor's Choice</div>"
    },
    {
        "title": "Gọi Món - Server",
        "thumb": "images/order_server.png",
        "desc": "Quản lý quán ăn OFFLINE + Gọi món qua LAN",
        "link": "https://play.google.com/store/apps/details?id=com.huydt.order_server",
        "author": "huydt",
        "date": "2025-06-30",
        "tags": [
            "Food", "Store"
        ],
        "category": "Apps",
        "badge": "★4.5",
        "views": 934,
        "extra": "<div class='extra-info'>Editor's Choice</div>"
    },
    {
        "title": "Âm lịch 99",
        "thumb": "images/lunar_calendar.png",
        "desc": "Xem âm lịch, ghi chú lich thêm nhắc nhở.",
        "link": "https://play.google.com/store/apps/details?id=com.huydt.lunar_calendar",
        "author": "huydt",
        "date": "2025-06-19",
        "tags": [
            "Mobile App", "Calendar"
        ],
        "category": "Lịch",
        "badge": "★4.7",
        "views": 352,
        "extra": "<div class='extra-info'>Editor's Choice</div>"
    },
    {
        "title": "Đập Muỗi - Buzz Off!",
        "thumb": "images/buzz_off.png",
        "desc": "Đập Muỗi là trò chơi giải trí vui nhộn, phải nhanh tay đập các con muỗi.",
        "link": "https://play.google.com/store/apps/details?id=com.huydt.buzz_off",
        "author": "huydt",
        "date": "2025-06-12",
        "tags": [
            "Brain Game", "Mô phỏng"
        ],
        "category": "Giải đố",
        "badge": "★4.9",
        "views": 732,
        "extra": "<div class='extra-info'>Editor's Choice</div>"
    },
    {
        "title": "Maze 3D - Mê cung",
        "thumb": "images/me_cung.png",
        "desc": "Explore stunning 3D mazes, solve puzzles, and find your way out!",
        "link": "https://play.google.com/store/apps/details?id=com.huydt.me_cung",
        "author": "huydt",
        "date": "2025-05-29",
        "tags": [
            "Brain Game", "Giải đố"
        ],
        "category": "Giải đố",
        "badge": "★4.8",
        "views": 342,
        "extra": "<div class='extra-info'>Editor's Choice</div>"
    },
    {
        "title": "Tìm số (1-300)",
        "thumb": "images/tim_so.png",
        "desc": "Trò chơi tìm số giải trí thời học sinh",
        "link": "https://play.google.com/store/apps/details?id=com.huydt.tim_so",
        "author": "huydt",
        "date": "2025-05-25",
        "tags": [
            "Brain Game", "Relaxing"
        ],
        "category": "Board",
        "badge": "★4.8",
        "views": 1562,
        "extra": "<div class='extra-info'>Editor's Choice</div>"
    },
    {
        "title": "Loto Server",
        "thumb": "images/loto_server.png",
        "desc": "Server dùng cho Loto(Bingo) VN, dùng để kết nối nhiều client dùng chung wifi có thể chơi chung với nhau.",
        "link": "https://play.google.com/store/apps/details?id=com.huydt.loto_server",
        "author": "huydt",
        "date": "2025-05-15",
        "tags": [
             "Board Game", "Multiplayer"
        ],
        "category": "Casino",
        "badge": "★5.0",
        "views": 1562,
    },
    {
        "title": "Loto",
        "thumb": "images/loto.png",
        "desc": "Trò chơi dò số lô tô giống phiên bản chơi giấy.",
        "link": "https://play.google.com/store/apps/details?id=com.huydt.loto",
        "author": "huydt",
        "date": "2025-05-13",
        "tags": [
            "Board Game"
        ],
        "category": "Casino",
        "badge": "★4.9",
        "views": 1562,
        "extra": "<div class='extra-info'>Editor's Choice</div>"
    },
];
